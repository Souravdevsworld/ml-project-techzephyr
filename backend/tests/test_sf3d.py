"""SF3D integration unit fixtures only; no learned SF3D inference is claimed."""
from dataclasses import replace
import json
import os
from pathlib import Path
import subprocess
import sys
import tempfile
import types
import unittest
from unittest.mock import Mock, patch

import numpy as np
from PIL import Image, ImageDraw
import trimesh
import torch  # Backend test environment; keep torch outside sys.modules mocks.

from backend.backends.sf3d_backend import SF3DBackend
from backend.backends.sf3d_config import SF3DSettings, configure_device_environment, select_device
from backend.backends.sf3d_runtime import SF3DRuntime


def textured_fixture():
    """Synthetic UV/PBR test fixture, never used by production generation."""
    mesh = trimesh.creation.box()
    mesh.visual = trimesh.visual.texture.TextureVisuals(
        uv=np.zeros((len(mesh.vertices), 2)),
        material=trimesh.visual.material.PBRMaterial(
            baseColorTexture=Image.new('RGB', (4, 4), 'red'),
            roughnessFactor=.6, metallicFactor=.1))
    return mesh


class SF3DTests(unittest.TestCase):
    def setUp(self):
        self.directory = tempfile.TemporaryDirectory()
        self.root = Path(self.directory.name)
        self.source = self.root / 'source'
        self.weights = self.root / 'weights'
        self.image = self.root / 'image.png'
        self.rgba = Image.new('RGBA', (100, 80), (0, 0, 0, 0))
        draw = ImageDraw.Draw(self.rgba)
        draw.rectangle((20, 15, 69, 64), fill='white')
        draw.rectangle((69, 25, 84, 50), outline='white', width=2)
        self.rgba.save(self.image)
        self.settings = SF3DSettings(str(self.source), str(self.weights))
        self.env = patch.dict(os.environ, {'SF3D_SOURCE': str(self.source), 'SF3D_MODEL_DIR': str(self.weights),
            'SF3D_DEVICE': 'cpu', 'SF3D_PYTHON': sys.executable,
            'SF3D_OUTPUT_DIR': str(self.root / 'outputs')})
        self.env.start()
        self.backend = SF3DBackend()

    def tearDown(self):
        self.backend.close()
        self.env.stop()
        self.directory.cleanup()

    def create_layout(self):
        (self.source / 'sf3d').mkdir(parents=True)
        (self.source / 'sf3d/system.py').touch()
        (self.source / 'load/tets').mkdir(parents=True)
        (self.source / 'load/tets/160_tets.npz').touch()
        self.weights.mkdir()
        (self.weights / 'config.yaml').touch()
        (self.weights / 'model.safetensors').touch()

    def test_configuration_validation(self):
        for changes in [{'device': 'automatic'}, {'texture_resolution': 123}, {'texture_resolution': True},
                        {'foreground_ratio': float('nan')}, {'foreground_ratio': 1.0},
                        {'timeout': 0}, {'timeout': float('inf')}, {'segmentation_model': 'unknown'}]:
            with self.subTest(changes=changes), self.assertRaises(ValueError):
                replace(self.settings, **changes)
        with patch.dict(os.environ, {'SF3D_TIMEOUT': 'bad'}), self.assertRaisesRegex(ValueError, 'numeric'):
            SF3DSettings.from_env()
        self.assertEqual(SF3DSettings.from_env().device, 'cpu')

    def test_missing_source_grid_and_weights_are_actionable(self):
        runtime = SF3DRuntime(self.settings)
        with self.assertRaisesRegex(RuntimeError, 'source is missing'):
            runtime.load()
        (self.source / 'sf3d').mkdir(parents=True)
        (self.source / 'sf3d/system.py').touch()
        with self.assertRaisesRegex(RuntimeError, 'tetrahedral grid'):
            runtime.load()
        (self.source / 'load/tets').mkdir(parents=True)
        (self.source / 'load/tets/160_tets.npz').touch()
        with self.assertRaisesRegex(RuntimeError, 'config.yaml'):
            runtime.load()
        self.weights.mkdir()
        (self.weights / 'config.yaml').touch()
        with self.assertRaisesRegex(RuntimeError, 'model.safetensors'):
            runtime.load()

    def test_explicit_cpu_and_experimental_mps_rules(self):
        fake_torch = types.SimpleNamespace(backends=types.SimpleNamespace(mps=types.SimpleNamespace(is_available=lambda: False)),
                                           cuda=types.SimpleNamespace(is_available=lambda: False))
        self.assertEqual(select_device(fake_torch, 'cpu'), 'cpu')
        for requested in ['mps', 'cuda']:
            with self.assertRaisesRegex(RuntimeError, 'unavailable'):
                select_device(fake_torch, requested)
        configure_device_environment(self.settings)
        self.assertEqual(os.environ['SF3D_USE_CPU'], '1')
        with patch.dict(os.environ, {'PYTORCH_ENABLE_MPS_FALLBACK': '0'}), self.assertRaisesRegex(RuntimeError, 'PYTORCH_ENABLE_MPS_FALLBACK=1'):
            configure_device_environment(replace(self.settings, device='mps'))
        with patch.dict(os.environ, {'PYTORCH_ENABLE_MPS_FALLBACK': '1'}):
            configure_device_environment(replace(self.settings, device='mps'))
            self.assertEqual(os.environ['SF3D_USE_CPU'], '0')

    def test_existing_alpha_and_opening_are_preserved(self):
        runtime = SF3DRuntime(self.settings)
        runtime.segmenter = Mock()
        prepared, report = runtime.prepare(self.image, .85)
        runtime.segmenter.segment.assert_not_called()
        self.assertEqual(prepared.mode, 'RGBA')
        self.assertEqual(prepared.size, (512, 512))
        self.assertEqual(report['segmentation_outcome'], 'existing_alpha')
        self.assertEqual(prepared.getextrema()[3], (0, 255))
        # A hole within the handle remains transparent after framing.
        mask = np.asarray(prepared.getchannel('A'))
        self.assertGreater(int((mask == 0).sum()), 0)
        self.assertEqual(prepared.getpixel((0, 0))[3], 0)
        bounds = report['mask']['bbox']
        scale = .85*512/max(bounds[2]-bounds[0], bounds[3]-bounds[1])
        offset_x = (512-round((bounds[2]-bounds[0])*scale))//2
        offset_y = (512-round((bounds[3]-bounds[1])*scale))//2
        self.assertEqual(prepared.getpixel((round(offset_x+(77-bounds[0])*scale), round(offset_y+(35-bounds[1])*scale)))[3], 0)

    def test_rgb_segmentation_is_reused_and_no_opaque_fallback(self):
        self.rgba.convert('RGB').save(self.image)
        runtime = SF3DRuntime(self.settings)
        mask = self.rgba.getchannel('A')
        runtime.segmenter = types.SimpleNamespace(segment=Mock(return_value=(mask, {'mask_cached': True})))
        prepared, metadata = runtime.prepare(self.image, .75)
        self.assertEqual(metadata['segmentation_outcome'], 'predicted_mask')
        self.assertEqual(prepared.mode, 'RGBA')
        runtime.segmenter.segment.return_value = (Image.new('L', self.rgba.size), {})
        with self.assertRaisesRegex(ValueError, 'foreground mask is suspicious'):
            runtime.prepare(self.image, .75)
        runtime.segmenter.segment.side_effect = RuntimeError('model unavailable')
        with self.assertRaisesRegex(RuntimeError, 'segmentation failed'):
            runtime.prepare(self.image, .75)

    def test_real_api_wiring_and_native_textured_export_with_mock_model(self):
        runtime = SF3DRuntime(self.settings)
        model = Mock()
        model.cfg = types.SimpleNamespace(cond_image_size=512)
        model.run_image.return_value = (textured_fixture(), {})
        runtime.model = model
        runtime.device = 'cpu'
        a = runtime.infer(self.image, self.root / 'fixture-a.glb')
        b = runtime.infer(self.image, self.root / 'fixture-b.glb', {'texture_resolution': 512, 'foreground_ratio': .75})
        self.assertNotEqual(a, b)
        self.assertTrue(runtime.last_report['has_uv'] and runtime.last_report['has_materials'] and runtime.last_report['has_textures'])
        self.assertTrue(runtime.last_report['model_reused'])
        kwargs = model.run_image.call_args.kwargs
        self.assertEqual(kwargs, {'bake_resolution': 512, 'remesh': 'none', 'vertex_count': -1})
        self.assertEqual(model.run_image.call_args.args[0].mode, 'RGBA')

    def test_model_is_loaded_once_and_errors_are_not_fake_success(self):
        self.create_layout()
        runtime = SF3DRuntime(self.settings)
        factory = Mock()
        model = factory.from_pretrained.return_value
        original_path = list(sys.path)
        try:
            with patch.dict(sys.modules, {'sf3d.system': types.SimpleNamespace(SF3D=factory)}):
                self.assertIs(runtime.load(), model)
                self.assertIs(runtime.load(), model)
            factory.from_pretrained.assert_called_once_with(str(self.weights), config_name='config.yaml', weight_name='model.safetensors')
            model.to.assert_called_once_with('cpu')
        finally:
            sys.path[:] = original_path
        model.cfg = types.SimpleNamespace(cond_image_size=512)
        model.run_image.side_effect = RuntimeError('native baking failed')
        with self.assertRaisesRegex(RuntimeError, 'native baking failed'):
            runtime.infer(self.image, self.root / 'missing.glb')
        self.assertFalse((self.root / 'missing.glb').exists())
        self.assertFalse(runtime.last_report['valid_glb'])

    def test_plain_geometry_is_not_presented_as_textured_sf3d(self):
        runtime = SF3DRuntime(self.settings)
        runtime.model = Mock()
        runtime.model.cfg = types.SimpleNamespace(cond_image_size=512)
        runtime.model.run_image.return_value = (trimesh.creation.box(), {})
        with self.assertRaisesRegex(RuntimeError, 'missing expected UVs'):
            runtime.infer(self.image, self.root / 'plain.glb')
        self.assertFalse((self.root / 'plain.glb').exists())

    def test_adapter_unique_paths_worker_reuse_and_prompt_unused(self):
        class FixtureWorker:
            def __init__(self, python, **kwargs):
                self.process = types.SimpleNamespace(poll=lambda: None)
                self.last_response = {'preprocessing': {'effective_mode': 'sf3d_rgba'}}
                self.kwargs = kwargs
            def request(self, payload, timeout):
                textured_fixture().export(payload['output'])
                return payload['output']
            def close(self):
                pass
        with patch('backend.generator.Worker', side_effect=FixtureWorker) as factory:
            a = self.backend.generate_report(str(self.image))
            with self.assertLogs('backend.backends.sf3d_backend', level='WARNING') as warnings:
                b = self.backend.generate_report(str(self.image), 'make it blue')
            self.assertIn('unused', warnings.output[0])
            self.assertNotEqual(a['path'], b['path'])
            self.assertTrue(Path(a['path']).is_absolute())
            self.assertEqual(b['actual_engine'], 'sf3d')
            self.assertEqual(b['engine'], 'sf3d')
            self.assertTrue(b['has_textures'])
            factory.assert_called_once_with(sys.executable, worker_module='backend.sf3d_worker', label='SF3D')

    def test_adapter_missing_environment_and_invalid_output(self):
        with patch.dict(os.environ, {'SF3D_PYTHON': ''}), self.assertRaisesRegex(RuntimeError, 'SF3D_PYTHON'):
            self.backend.generate_report(str(self.image))
        worker = Mock()
        worker.process.poll.return_value = None
        def broken(payload, timeout):
            Path(payload['output']).write_text('not a model')
            return payload['output']
        worker.request.side_effect = broken
        with patch('backend.generator.Worker', return_value=worker), self.assertRaisesRegex(RuntimeError, 'validation failed'):
            self.backend.generate_report(str(self.image))
        self.assertIsNone(self.backend._client)
        self.assertEqual(list((self.root / 'outputs').glob('*.glb')), [])
        worker.close.assert_called_once()

    def test_real_sf3d_worker_missing_weights_protocol(self):
        self.create_layout()
        (self.weights / 'model.safetensors').unlink()
        request = {'id': 'missing', 'image': str(self.image), 'output': str(self.root / 'missing.glb')}
        process = subprocess.run([sys.executable, '-m', 'backend.sf3d_worker'], input=json.dumps(request)+'\n',
                                 text=True, capture_output=True, timeout=30)
        self.assertEqual(process.returncode, 0, process.stderr)
        reply = json.loads(process.stdout)
        self.assertEqual(reply['id'], 'missing')
        self.assertIn('Missing SF3D checkpoint/config', reply['error'])
        self.assertFalse(reply['report']['valid_glb'])
        self.assertFalse((self.root / 'missing.glb').exists())

    def test_missing_native_dependency_is_actionable(self):
        self.create_layout()
        runtime = SF3DRuntime(self.settings)
        original_path = list(sys.path)
        try:
            with patch.dict(sys.modules, {'sf3d.system': None}), self.assertRaisesRegex(RuntimeError, 'native extensions'):
                runtime.load()
        finally:
            sys.path[:] = original_path

    def test_worker_startup_os_errors_are_actionable_and_leave_no_client(self):
        for error in (PermissionError('interpreter is not executable'), FileNotFoundError('interpreter disappeared')):
            with self.subTest(error=type(error).__name__):
                with patch('backend.generator.Worker', side_effect=error), self.assertRaisesRegex(RuntimeError, 'Could not start the SF3D worker') as caught:
                    self.backend.generate_report(str(self.image))
                self.assertIs(caught.exception.__cause__, error)
                self.assertIsNone(self.backend._client)
                self.assertIsNone(self.backend._key)
                self.assertEqual(list((self.root / 'outputs').glob('*.glb')), [])
