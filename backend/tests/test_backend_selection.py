"""Engine routing and asset-export checks; fixture geometry is not inference."""
import inspect
import os
from pathlib import Path
import tempfile
import threading
import time
import types
import unittest
from unittest.mock import Mock, patch

from PIL import Image
import numpy as np
import trimesh

from backend import generator
from backend.backends import factory
from backend.backends.assets import inspect_glb_asset


class SelectionTests(unittest.TestCase):
    def setUp(self):
        self.directory = tempfile.TemporaryDirectory()
        self.root = Path(self.directory.name)
        self.image = self.root / 'input.png'
        Image.new('RGB', (24, 24), 'white').save(self.image)
        self.env = patch.dict(os.environ, {'SKETCH2SHAPE_3D_BACKEND': 'triposr', 'SKETCH2SHAPE_3D_FALLBACK': 'error'})
        self.env.start()
        generator.shutdown_worker()

    def tearDown(self):
        generator.shutdown_worker()
        self.env.stop()
        self.directory.cleanup()

    def test_default_and_invalid_engine_configuration(self):
        self.assertEqual(factory.selected_engine(), 'triposr')
        with patch.dict(os.environ, {'SKETCH2SHAPE_3D_BACKEND': 'sf3d'}):
            self.assertEqual(factory.selected_engine(), 'sf3d')
        for name in ('', 'unsupported', '../sf3d'):
            with self.subTest(name=name), self.assertRaises(ValueError):
                factory.get_backend(name)
        with patch.dict(os.environ, {'SKETCH2SHAPE_3D_FALLBACK': 'auto'}):
            with self.assertRaises(ValueError):
                factory.fallback_enabled('sf3d')

    def test_contract_and_direct_return_type(self):
        signature = inspect.signature(generator.generate_3d)
        self.assertEqual(list(signature.parameters), ['image_path', 'prompt'])
        self.assertEqual(signature.return_annotation, str)
        self.assertIsNone(signature.parameters['prompt'].default)
        backend = Mock()
        path = str(self.root / 'fixture.glb')
        backend.generate_report.return_value = {'path': path, 'actual_engine': 'triposr'}
        with patch.object(factory, 'get_backend', return_value=backend):
            self.assertEqual(generator.generate_3d(str(self.image), 'ceramic'), path)
        backend.generate_report.assert_called_once_with(str(self.image.resolve()), 'ceramic', preprocessing=None, output_dir=None)

    def test_default_is_preserved_triposr_adapter(self):
        sentinel = {'path': str(self.root / 'fixture.glb')}
        with patch.object(generator, '_generate_triposr_report', return_value=sentinel) as legacy:
            report = generator.generate_with_report(str(self.image))
        legacy.assert_called_once()
        self.assertEqual(report['actual_engine'], 'triposr')
        self.assertEqual(report['requested_engine'], 'triposr')
        self.assertNotIn('fallback', report)

    def test_sf3d_error_is_not_silently_replaced(self):
        backend = Mock()
        backend.generate_report.side_effect = RuntimeError('SF3D weights unavailable')
        with patch.object(factory, 'get_backend', return_value=backend) as choose:
            with self.assertRaisesRegex(RuntimeError, 'weights unavailable'):
                generator.generate_with_report(str(self.image), engine='sf3d')
        self.assertEqual(choose.call_count, 1)

    def test_explicit_fallback_identifies_actual_engine(self):
        sf = Mock()
        sf.generate_report.side_effect = RuntimeError('Missing SF3D dependencies')
        triposr = Mock()
        triposr.generate_report.return_value = {'path': 'fixture.glb', 'engine': 'triposr', 'actual_engine': 'triposr'}
        with patch.object(factory, 'get_backend', side_effect=lambda name: sf if name == 'sf3d' else triposr):
            with patch.dict(os.environ, {'SKETCH2SHAPE_3D_FALLBACK': 'triposr'}):
                report = generator.generate_with_report(str(self.image), engine='sf3d')
        self.assertEqual(report['requested_engine'], 'sf3d')
        self.assertEqual(report['actual_engine'], 'triposr')
        self.assertIn('Missing SF3D', report['fallback']['reason'])
        triposr.generate_report.assert_called_once()

    def test_comparison_can_disable_configured_fallback(self):
        backend = Mock()
        backend.generate_report.side_effect = RuntimeError('SF3D unsupported here')
        with patch.dict(os.environ, {'SKETCH2SHAPE_3D_FALLBACK': 'triposr'}), \
             patch.object(factory, 'get_backend', return_value=backend) as choose:
            with self.assertRaises(RuntimeError):
                generator.generate_with_report(str(self.image), engine='sf3d', fallback=False)
        self.assertEqual(choose.call_count, 1)

    def test_invalid_input_and_config_do_not_trigger_fallback(self):
        backend = Mock()
        backend.generate_report.side_effect = ValueError('invalid SF3D configuration')
        with patch.object(factory, 'get_backend', return_value=backend):
            with self.assertRaises(ValueError):
                generator.generate_with_report(str(self.image), engine='sf3d', fallback=True)
            with self.assertRaises(FileNotFoundError):
                generator.generate_with_report(str(self.root / 'missing.png'), engine='sf3d', fallback=True)
        self.assertEqual(backend.generate_report.call_count, 1)

    def test_factory_caches_engines_and_shutdown_closes_both(self):
        self.assertIs(factory.get_backend('triposr'), factory.get_backend('triposr'))
        a, b = Mock(), Mock()
        with patch.dict(factory._ENGINES, {'triposr': a, 'sf3d': b}, clear=True):
            generator.shutdown_worker()
            a.close.assert_called_once()
            b.close.assert_called_once()
            self.assertEqual(factory._ENGINES, {})

    def test_requests_for_different_engines_do_not_overlap(self):
        active = peak = 0
        started, release = threading.Event(), threading.Event()
        def run(*args, **kwargs):
            nonlocal active, peak
            active += 1
            peak = max(peak, active)
            started.set()
            release.wait(5)
            active -= 1
            return {'path': 'fixture.glb'}
        engine = types.SimpleNamespace(generate_report=run)
        results = []
        def request(name):
            results.append(generator.generate_with_report(str(self.image), engine=name))
        with patch.object(factory, 'get_backend', return_value=engine):
            a = threading.Thread(target=request, args=('triposr',))
            b = threading.Thread(target=request, args=('sf3d',))
            a.start()
            self.assertTrue(started.wait(5))
            b.start()
            release.set()
            a.join(5)
            b.join(5)
        self.assertEqual(peak, 1)
        self.assertEqual(len(results), 2)
        self.assertFalse(a.is_alive() or b.is_alive())

    def test_connected_embedded_texture_and_uv_validation(self):
        # Unit fixture with an actual embedded image, UVs and PBR material.
        mesh = trimesh.creation.box()
        material = trimesh.visual.material.PBRMaterial(baseColorTexture=Image.new('RGB', (4, 4), 'red'))
        mesh.visual = trimesh.visual.texture.TextureVisuals(uv=np.zeros((len(mesh.vertices), 2)), material=material)
        textured = self.root / 'textured.glb'
        mesh.export(textured)
        details = inspect_glb_asset(textured)
        self.assertTrue(details['has_uv'] and details['has_materials'] and details['has_textures'])
        self.assertGreater(details['face_count'], 0)
        plain = self.root / 'plain.glb'
        trimesh.creation.box().export(plain)
        self.assertFalse(inspect_glb_asset(plain)['has_textures'])
        bad = self.root / 'bad.glb'
        bad.write_bytes(b'no model')
        with self.assertRaises(ValueError):
            inspect_glb_asset(bad)

    def test_corrupted_embedded_texture_is_rejected(self):
        import json
        import struct
        mesh = trimesh.creation.box()
        mesh.visual = trimesh.visual.texture.TextureVisuals(
            uv=np.zeros((len(mesh.vertices), 2)),
            material=trimesh.visual.material.PBRMaterial(baseColorTexture=Image.new('RGB', (4, 4), 'red')))
        path = self.root / 'broken-texture.glb'
        mesh.export(path)
        raw = bytearray(path.read_bytes())
        json_size = struct.unpack_from('<I', raw, 12)[0]
        manifest = json.loads(raw[20:20+json_size])
        view = manifest['bufferViews'][manifest['images'][0]['bufferView']]
        binary_start = 20 + json_size + 8
        start = binary_start + view.get('byteOffset', 0)
        raw[start:start+view['byteLength']] = b'\0' * view['byteLength']
        path.write_bytes(raw)
        with self.assertRaisesRegex(ValueError, 'texture cannot be decoded'):
            inspect_glb_asset(path)

    def test_switching_releases_inactive_engine(self):
        tripo, sf = Mock(), Mock()
        tripo.generate_report.return_value = {'path': 'fixture.glb', 'actual_engine': 'triposr'}
        sf.generate_report.return_value = {'path': 'fixture.glb', 'actual_engine': 'sf3d'}
        with patch.dict(factory._ENGINES, {'triposr': tripo, 'sf3d': sf}, clear=True):
            generator.generate_with_report(str(self.image), engine='sf3d')
            tripo.close.assert_called_once()
            generator.generate_with_report(str(self.image), engine='triposr')
            sf.close.assert_called_once()

    def test_nonfinite_texture_uv_is_rejected(self):
        mesh = trimesh.creation.box()
        uv = np.zeros((len(mesh.vertices), 2))
        uv[0, 0] = np.nan
        mesh.visual = trimesh.visual.texture.TextureVisuals(
            uv=uv, material=trimesh.visual.material.PBRMaterial(baseColorTexture=Image.new('RGB', (4, 4), 'red')))
        path = self.root / 'bad-uv.glb'
        mesh.export(path)
        with self.assertRaisesRegex(ValueError, 'UV'):
            inspect_glb_asset(path)

    def test_legacy_preprocessing_evaluator_stays_on_triposr(self):
        from backend import evaluate_preprocessing
        engine = Mock()
        engine.generate_report.return_value = {'path': 'fixture.glb', 'actual_engine': 'triposr'}
        with patch.dict(os.environ, {'SKETCH2SHAPE_3D_BACKEND': 'sf3d'}), \
             patch.object(factory, 'get_backend', return_value=engine) as choose:
            report = evaluate_preprocessing.generate_with_report(str(self.image))
        choose.assert_called_once_with('triposr')
        self.assertEqual(report['actual_engine'], 'triposr')
