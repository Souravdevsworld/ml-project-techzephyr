"""Fixture/mock tests for comparison mechanics, not real model-quality evidence."""
import csv
import json
from pathlib import Path
import struct
import tempfile
import unittest
from unittest.mock import patch

import numpy as np
from PIL import Image
import trimesh

from backend.compare_backends import (RUBRIC, comparison_inputs, inspect_asset,
                                      main, run_comparison)


class CompareBackendTests(unittest.TestCase):
    def setUp(self):
        self.directory = tempfile.TemporaryDirectory()
        self.root = Path(self.directory.name)
        self.examples = self.root / 'examples'
        self.examples.mkdir()
        for filename in ('teapot.png', 'chair.png', 'hamburger.png'):
            Image.new('RGB', (32, 24), 'white').save(self.examples / filename)
        self.output = self.root / 'comparisons'

    def tearDown(self):
        self.directory.cleanup()

    def fixture_generation(self, image, *, engine, fallback, preprocessing, output_dir):
        self.assertFalse(fallback)
        directory = Path(output_dir)
        directory.mkdir(parents=True, exist_ok=True)
        path = directory / 'unit-test-fixture.glb'
        trimesh.creation.box().export(path)
        return {'path': str(path), 'actual_engine': engine,
                'preprocessing': {'effective_mode': preprocessing.mode if preprocessing else 'sf3d_native',
                                  'warnings': []}, 'timings': {'total_seconds': 0.01}}

    def test_inspect_untextured_and_textured_glb_exports(self):
        mesh = trimesh.creation.box()
        plain = self.root / 'plain.glb'
        mesh.export(plain)
        actual = inspect_asset(plain)
        self.assertTrue(actual['valid_glb'])
        self.assertEqual((actual['vertex_count'], actual['face_count']), (8, 12))
        self.assertFalse(actual['has_textures'])
        self.assertFalse(actual['has_uvs'])
        uv = np.column_stack((np.linspace(0, 1, len(mesh.vertices)), np.linspace(1, 0, len(mesh.vertices))))
        material = trimesh.visual.material.PBRMaterial(
            baseColorTexture=Image.new('RGB', (8, 8), 'red'), metallicFactor=0, roughnessFactor=1)
        mesh.visual = trimesh.visual.texture.TextureVisuals(uv=uv, material=material)
        textured = self.root / 'textured.glb'
        mesh.export(textured)
        actual = inspect_asset(textured)
        self.assertTrue(actual['has_uvs'] and actual['has_materials'] and actual['has_textures'])
        self.assertEqual(actual['image_count'], 1)
        self.assertEqual(actual['texture_count'], 1)
        self.assertTrue(actual['images_embedded'])
        self.assertFalse(actual['external_image_resources'])

    def test_default_matrix_compares_examples_and_marks_missing_mug(self):
        with patch('backend.compare_backends.generate_with_report', side_effect=self.fixture_generation) as generation:
            directory, report = run_comparison(self.examples, self.output)
        self.assertEqual(generation.call_count, 6)
        self.assertEqual(len(report['runs']), 8)
        self.assertEqual({r['input_name'] for r in report['runs']}, {'teapot', 'chair', 'hamburger', 'user_mug'})
        self.assertEqual([r['status'] for r in report['runs']].count('generated'), 6)
        self.assertEqual([r['status'] for r in report['runs']].count('skipped'), 2)
        self.assertFalse(report['fallback_enabled'] or report['quality_improvement_verified'])
        for record in (r for r in report['runs'] if r['status'] == 'generated'):
            self.assertEqual(record['requested_engine'], record['actual_engine'])
            self.assertTrue(record['valid_glb'])
            self.assertEqual(record['output_format'], 'glb')
            self.assertGreaterEqual(record['runtime_seconds'], 0)
        saved = json.loads((directory / 'report.json').read_text())
        self.assertEqual(saved['runs'], report['runs'])
        with (directory / 'review.csv').open() as handle:
            rows = list(csv.DictReader(handle))
        self.assertEqual(len(rows), 8)
        self.assertTrue(all(row[criterion] == '' for row in rows for criterion in RUBRIC))

    def test_same_inputs_and_distinct_output_paths_keep_old_results(self):
        with patch('backend.compare_backends.generate_with_report', side_effect=self.fixture_generation) as generation:
            first, report = run_comparison(self.examples, self.output)
            before = (first / 'report.json').read_bytes()
            second, _ = run_comparison(self.examples, self.output)
        self.assertNotEqual(first, second)
        self.assertEqual((first / 'report.json').read_bytes(), before)
        for i in range(3):
            self.assertEqual(generation.call_args_list[i].args[0], generation.call_args_list[i+3].args[0])
        outputs = [r['path'] for r in report['runs'] if r['status'] == 'generated']
        self.assertEqual(len(outputs), len(set(outputs)))
        self.assertTrue(all(Path(path).is_absolute() for path in outputs))

    def test_supplied_mug_and_additional_images_are_included(self):
        mug = self.root / 'mug.jpg'
        extra = self.root / 'another.png'
        Image.new('RGB', (12, 20), 'white').save(mug)
        Image.new('RGB', (12, 20), 'green').save(extra)
        with patch('backend.compare_backends.generate_with_report', side_effect=self.fixture_generation) as generation:
            _, report = run_comparison(self.examples, self.output, mug=mug, images=[extra])
        self.assertEqual(generation.call_count, 10)
        self.assertTrue(all(r['status'] == 'generated' for r in report['runs']))
        self.assertIn('extra_1_another', {r['input_name'] for r in report['runs']})

    def test_missing_required_examples_do_not_start_generation(self):
        with patch('backend.compare_backends.generate_with_report') as generation:
            _, report = run_comparison(self.root / 'missing', self.output)
        generation.assert_not_called()
        self.assertEqual([r['status'] for r in report['runs']].count('error'), 6)
        self.assertEqual([r['status'] for r in report['runs']].count('skipped'), 2)
        self.assertTrue(all(r['path'] is None for r in report['runs']))

    def test_sf3d_failure_is_visible_without_fallback(self):
        def fake(image, **kwargs):
            if kwargs['engine'] == 'sf3d':
                self.assertFalse(kwargs['fallback'])
                raise RuntimeError('SF3D device unsupported')
            return self.fixture_generation(image, **kwargs)
        with patch('backend.compare_backends.generate_with_report', side_effect=fake):
            _, report = run_comparison(self.examples, self.output)
        generated = [r for r in report['runs'] if r['status'] == 'generated']
        failures = [r for r in report['runs'] if r['status'] == 'error']
        self.assertEqual(len(generated), 3)
        self.assertEqual(len(failures), 3)
        self.assertTrue(all(r['requested_engine'] == 'sf3d' and r['path'] is None and not r['valid_glb'] for r in failures))
        self.assertTrue(all('unsupported' in r['error'] for r in failures))

    def test_wrong_or_unreported_actual_engine_is_not_attributed_to_sf3d(self):
        for wrong in ('triposr', None):
            def fake(image, **kwargs):
                result = self.fixture_generation(image, **kwargs)
                result['actual_engine'] = wrong
                return result
            with self.subTest(actual=wrong), patch('backend.compare_backends.generate_with_report', side_effect=fake):
                _, report = run_comparison(self.examples, self.output, engines=['sf3d'])
            for record in report['runs'][:3]:
                self.assertEqual(record['status'], 'error')
                self.assertTrue(record['valid_glb'])  # valid asset, wrong/unverified engine
                self.assertIn('cannot be attributed', record['error'])

    def test_invalid_asset_is_not_a_successful_comparison(self):
        def fake(image, **kwargs):
            directory = Path(kwargs['output_dir'])
            directory.mkdir(parents=True, exist_ok=True)
            path = directory / 'not-glb.glb'
            path.write_text('invalid')
            return {'path': str(path), 'actual_engine': kwargs['engine']}
        with patch('backend.compare_backends.generate_with_report', side_effect=fake):
            _, report = run_comparison(self.examples, self.output, engines=['sf3d'])
        self.assertTrue(all(r['status'] == 'error' and r['valid_glb'] is False for r in report['runs'][:3]))

    def test_glb_declared_length_is_validated(self):
        path = self.root / 'bad-length.glb'
        trimesh.creation.box().export(path)
        payload = bytearray(path.read_bytes())
        struct.pack_into('<I', payload, 8, len(payload)+4)
        path.write_bytes(payload)
        with self.assertRaises(ValueError):
            inspect_asset(path)

    def test_invalid_engine_selection_is_rejected_before_running(self):
        with patch('backend.compare_backends.generate_with_report') as generation:
            with self.assertRaises(ValueError):
                run_comparison(self.examples, self.output, engines=['unknown'])
        generation.assert_not_called()
        self.assertFalse(self.output.exists())

    def test_cli_failure_exit_and_cleanup(self):
        with patch('backend.compare_backends.run_comparison', return_value=(self.root, {'runs': [{'status': 'error'}]})), \
             patch('backend.compare_backends.shutdown_worker') as shutdown:
            status = main(['--examples-dir', str(self.examples)])
        self.assertEqual(status, 1)
        shutdown.assert_called_once()

    def test_cli_optional_missing_mug_skip_is_not_a_failure(self):
        with patch('backend.compare_backends.run_comparison', return_value=(self.root, {'runs': [{'status': 'generated'}, {'status': 'skipped'}]})), \
             patch('backend.compare_backends.shutdown_worker'):
            self.assertEqual(main(['--examples-dir', str(self.examples)]), 0)

    def test_unused_texture_material_does_not_make_asset_textured(self):
        mesh = trimesh.creation.box()
        uv = np.zeros((len(mesh.vertices), 2))
        mesh.visual = trimesh.visual.texture.TextureVisuals(uv=uv,
            material=trimesh.visual.material.PBRMaterial(baseColorTexture=Image.new('RGB', (4, 4), 'blue')))
        path = self.root / 'unused-material.glb'
        mesh.export(path)
        raw = path.read_bytes()
        json_size, kind = struct.unpack_from('<II', raw, 12)
        document = json.loads(raw[20:20+json_size])
        for item in document['meshes']:
            for primitive in item['primitives']:
                primitive.pop('material', None)
        encoded = json.dumps(document).encode()
        encoded += b' ' * (-len(encoded) % 4)
        other_chunks = raw[20+json_size:]
        payload = struct.pack('<4sII', b'glTF', 2, 20+len(encoded)+len(other_chunks))
        payload += struct.pack('<II', len(encoded), kind) + encoded + other_chunks
        path.write_bytes(payload)
        details = inspect_asset(path)
        self.assertTrue(details['valid_glb'])
        self.assertGreater(details['image_count'], 0)
        self.assertFalse(details['has_textures'])
        self.assertFalse(details['has_materials'])

    def test_runs_grouped_by_engine_to_reuse_one_warm_model(self):
        with patch('backend.compare_backends.generate_with_report', side_effect=self.fixture_generation) as generation:
            _, report = run_comparison(self.examples, self.output)
        self.assertEqual([call.kwargs['engine'] for call in generation.call_args_list],
                         ['triposr'] * 3 + ['sf3d'] * 3)
        self.assertEqual(report['execution_order'], 'grouped_by_engine')
        pairs = {}
        for record in report['runs']:
            if record['status'] == 'generated':
                pairs.setdefault(record['input_name'], []).append(record)
        self.assertEqual(len(pairs), 3)
        for records in pairs.values():
            self.assertEqual({r['requested_engine'] for r in records}, {'triposr', 'sf3d'})
            self.assertEqual(len({r['input_sha256'] for r in records}), 1)
            self.assertEqual(len({r['input_path'] for r in records}), 1)
