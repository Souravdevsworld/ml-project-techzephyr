import inspect
import os
from pathlib import Path
import tempfile
import types
import unittest
from unittest.mock import patch, Mock

from PIL import Image
import trimesh

from backend.config import Settings, select_device
from backend import generator
from backend.runtime import Runtime


class BackendTests(unittest.TestCase):
    def setUp(self):
        self.directory = tempfile.TemporaryDirectory()
        self.root = Path(self.directory.name)
        self.image = self.root / 'input.png'
        Image.new('RGB', (32, 16), 'white').save(self.image)
        self.environment = patch.dict(os.environ, {
            'TRIPOSR_PYTHON': __import__('sys').executable,
            'TRIPOSR_OUTPUT_DIR': str(self.root / 'outputs'),
            'TRIPOSR_DEVICE': 'cpu',
        })
        self.environment.start()
        generator.shutdown_worker()

    def tearDown(self):
        generator.shutdown_worker()
        self.environment.stop()
        self.directory.cleanup()

    def settings(self, **kwargs):
        values = dict(source=str(self.root / 'source'), model_dir=str(self.root / 'weights'),
                      device='cpu', resolution=32, chunk_size=256, remove_background=False)
        values.update(kwargs)
        return Settings(**values)

    def test_signature_and_lightweight_import(self):
        signature = inspect.signature(generator.generate_3d)
        self.assertEqual(list(signature.parameters), ['image_path', 'prompt'])
        self.assertIsNone(signature.parameters['prompt'].default)
        self.assertEqual(signature.return_annotation, str)

    def test_invalid_input_and_prompt(self):
        with self.assertRaises(FileNotFoundError):
            generator.generate_3d(str(self.root / 'missing.png'))
        self.image.write_text('not image bytes')
        with self.assertRaises(Exception):
            generator.generate_3d(str(self.image))
        Image.new('RGB', (1, 1)).save(self.image)
        with self.assertRaises(ValueError):
            generator.generate_3d(str(self.image), {'unsupported': 1})
        with patch.dict(os.environ, {'TRIPOSR_PYTHON': ''}):
            with self.assertRaisesRegex(RuntimeError, 'TRIPOSR_PYTHON'):
                generator.generate_3d(str(self.image))

    def test_missing_source_and_weights(self):
        runtime = Runtime(self.settings())
        with self.assertRaisesRegex(RuntimeError, 'source missing'):
            runtime.load()
        (self.root / 'source/tsr').mkdir(parents=True)
        (self.root / 'source/tsr/system.py').touch()
        with self.assertRaisesRegex(RuntimeError, 'config.yaml'):
            runtime.load()
        (self.root / 'weights').mkdir()
        (self.root / 'weights/config.yaml').touch()
        with self.assertRaisesRegex(RuntimeError, 'model.ckpt'):
            runtime.load()

    def test_device_selection_is_explicit(self):
        torch = types.SimpleNamespace(backends=types.SimpleNamespace(mps=types.SimpleNamespace(is_available=lambda: False)),
                                      cuda=types.SimpleNamespace(is_available=lambda: False))
        self.assertEqual(select_device(torch, 'cpu'), 'cpu')
        for name in ('mps', 'cuda'):
            with self.assertRaisesRegex(RuntimeError, 'unavailable'):
                select_device(torch, name)
        with self.assertRaises(ValueError):
            select_device(torch, 'invalid')
        torch.backends.mps.is_available = lambda: True
        self.assertEqual(select_device(torch, 'mps'), 'mps')

    def test_unique_outputs_reuse_worker_and_ignore_prompt(self):
        class FakeWorker:
            def __init__(self, python):
                self.process = types.SimpleNamespace(poll=lambda: None)
            def request(self, payload, timeout):
                # Unit-test fixture only; production never constructs this mesh.
                trimesh.creation.box().export(payload['output'])
                self.payload = payload
                return payload['output']
            def close(self):
                pass
        with patch.object(generator, 'Worker', side_effect=FakeWorker) as factory:
            a = generator.generate_3d(str(self.image))
            with self.assertLogs(generator.log, level='WARNING') as logs:
                b = generator.generate_3d(str(self.image), 'ceramic')
            self.assertIn('unused', logs.output[0])
            self.assertNotEqual(a, b)
            self.assertTrue(Path(a).is_absolute() and Path(b).is_file())
            factory.assert_called_once()
            self.assertNotIn('prompt', generator._CLIENT[1].payload)

    def test_failed_inference_discards_worker_and_partial_output(self):
        worker = Mock()
        worker.process.poll.return_value = None
        def fail(payload, timeout):
            Path(payload['output']).write_text('partial')
            raise RuntimeError('inference failed')
        worker.request.side_effect = fail
        with patch.object(generator, 'Worker', return_value=worker):
            with self.assertRaisesRegex(RuntimeError, 'inference failed'):
                generator.generate_3d(str(self.image))
        self.assertIsNone(generator._CLIENT)
        worker.close.assert_called_once()
        self.assertEqual(list((self.root / 'outputs').iterdir()), [])

    def test_glb_validation(self):
        path = self.root / 'model.glb'
        path.write_bytes(b'not a GLB')
        with self.assertRaises(ValueError):
            generator.validate_glb(path)
        trimesh.creation.box().export(path)
        self.assertEqual(generator.validate_glb(path), str(path.resolve()))

    def test_preprocessing_preserves_lines(self):
        image = Image.new('RGB', (32, 16), 'white')
        for y in range(16):
            image.putpixel((16, y), (0, 0, 0))
        image.save(self.image)
        result = Runtime(self.settings()).prepare(self.image)
        self.assertEqual(result.mode, 'RGB')
        self.assertEqual(result.size, (512, 512))
        self.assertLess(min(sum(pixel) for pixel in result.getdata()), 100)

    def test_runtime_failure_does_not_fabricate_output(self):
        runtime = Runtime(self.settings())
        runtime.device = 'cpu'
        model = Mock(side_effect=RuntimeError('model execution failed'))
        with patch.object(runtime, 'load', return_value=model):
            with self.assertRaisesRegex(RuntimeError, 'model execution failed'):
                runtime.infer(self.image, self.root / 'absent.glb')
        self.assertFalse((self.root / 'absent.glb').exists())

    def test_portable_surface_preserves_axis_order_and_scaling(self):
        import torch
        from backend.surface import MarchingCubeHelper
        helper = MarchingCubeHelper(32)
        grid = helper.grid_vertices
        # Analytic field solely tests extraction, NOT pretrained inference.
        field = grid[:, 0] - 0.25
        vertices, faces = helper(-field)
        self.assertTrue(torch.allclose(vertices[:, 0], torch.full_like(vertices[:, 0], .25), atol=1e-5))
        self.assertGreater(len(faces), 0)
        self.assertGreaterEqual(float(vertices.min()), 0)
        self.assertLessEqual(float(vertices.max()), 1)
        with self.assertRaises(ValueError):
            helper(torch.ones(32**3))

    def test_worker_protocol_id_error_and_timeout(self):
        import queue
        worker = object.__new__(generator.Worker)
        worker.process = types.SimpleNamespace(stdin=Mock())
        worker.responses = queue.Queue()
        worker.responses.put('{"id":"wrong","path":"model.glb"}')
        with self.assertRaisesRegex(RuntimeError, 'mismatched'):
            worker.request({'id': 'right'}, .1)
        worker.responses.put('{"id":"right","error":"weights missing"}')
        with self.assertRaisesRegex(RuntimeError, 'weights missing'):
            worker.request({'id': 'right'}, .1)
        with self.assertRaises(TimeoutError):
            worker.request({'id': 'right'}, .001)

    def test_real_subprocess_reports_missing_weights(self):
        import json
        import subprocess
        import sys
        (self.root / 'source/tsr').mkdir(parents=True)
        (self.root / 'source/tsr/system.py').touch()
        env = dict(os.environ, TRIPOSR_SOURCE=str(self.root / 'source'), TRIPOSR_MODEL_DIR=str(self.root / 'weights'))
        request = {'id': 'missing-model-test', 'image': str(self.image), 'output': str(self.root / 'missing.glb')}
        process = subprocess.run([sys.executable, '-m', 'backend.worker'], input=json.dumps(request)+'\n',
                                 text=True, capture_output=True, timeout=30, env=env)
        self.assertEqual(process.returncode, 0)
        response = json.loads(process.stdout)
        self.assertEqual(response['id'], request['id'])
        self.assertIn('Missing TripoSR weights/config', response['error'])
        self.assertFalse((self.root / 'missing.glb').exists())

    def test_runtime_reuses_loaded_model(self):
        (self.root / 'source/tsr').mkdir(parents=True)
        (self.root / 'source/tsr/system.py').touch()
        (self.root / 'weights').mkdir()
        for name in ('config.yaml', 'model.ckpt'):
            (self.root / 'weights' / name).touch()
        model = Mock()
        factory = Mock()
        factory.from_pretrained.return_value = model
        runtime = Runtime(self.settings())
        import sys
        original_path = list(sys.path)
        try:
            with patch.dict(sys.modules, {'tsr.system': types.SimpleNamespace(TSR=factory)}):
                self.assertIs(runtime.load(), model)
                self.assertIs(runtime.load(), model)
            factory.from_pretrained.assert_called_once()
            model.renderer.set_chunk_size.assert_called_once_with(256)
            model.eval.return_value.to.assert_called_once_with('cpu')
        finally:
            sys.path[:] = original_path
