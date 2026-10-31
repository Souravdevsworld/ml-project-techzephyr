import json
import struct
import tempfile
import types
import unittest
from pathlib import Path
from unittest.mock import patch

from PIL import Image
import trimesh

import app


class FrontendTests(unittest.TestCase):
    def test_preprocess_composite_white_rgb_aspect(self):
        with tempfile.TemporaryDirectory() as directory:
            image = Image.new('RGBA', (2000, 1000), (0, 0, 0, 0))
            image.putpixel((0, 0), (0, 0, 0, 255))
            path = app.preprocess_sketch({'composite': image}, Path(directory) / 'input.png')
            with Image.open(path) as result:
                self.assertEqual(result.mode, 'RGB')
                self.assertEqual(result.size, (1024, 512))
                self.assertEqual(result.getpixel((500, 250)), (255, 255, 255))

    def test_upload_jpeg(self):
        with tempfile.TemporaryDirectory() as directory:
            path = Path(directory) / 'upload.jpg'
            Image.new('RGB', (80, 160), 'red').save(path)
            result = app.preprocess_sketch(path, Path(directory) / 'output.png')
            with Image.open(result) as image:
                self.assertEqual(image.size, (80, 160))
                self.assertEqual(image.format, 'PNG')

    def test_empty_input(self):
        with self.assertRaises(ValueError):
            app.preprocess_sketch({'composite': None}, '/tmp/unused.png')

    def test_missing_backend_clears_output(self):
        with patch.object(app.importlib, 'import_module', side_effect=ModuleNotFoundError("No module named backend", name='backend')):
            output = list(app.generate(Image.new('RGB', (16, 16)), None, 'Draw', ''))[-1]
        self.assertEqual(output[:2], (None, None))
        self.assertIn('backend/generator.py', output[2])

    def test_valid_output_and_prompt_contract(self):
        with tempfile.TemporaryDirectory() as directory:
            path = Path(directory) / 'model.glb'
            trimesh.creation.box().export(path)
            def backend(image_path, prompt):
                self.assertTrue(Path(image_path).is_file())
                self.assertEqual(prompt, 'ceramic')
                return path
            with patch.object(app.importlib, 'import_module', return_value=types.SimpleNamespace(generate_3d=backend)):
                output = list(app.generate(None, Image.new('RGB', (16, 16)), 'Upload', ' ceramic '))[-1]
            self.assertEqual(output[0], output[1])
            self.assertTrue(Path(output[0]).is_file())
            Path(output[0]).unlink()

    def test_invalid_glb(self):
        with tempfile.TemporaryDirectory() as directory:
            path = Path(directory) / 'invalid.glb'
            path.write_bytes(b'not a model')
            with self.assertRaises(ValueError):
                app.validate_glb(path)
            payload = json.dumps({'asset': {'version': '2.0'}, 'scenes': [{'nodes': []}], 'scene': 0}).encode()
            payload += b' ' * (-len(payload) % 4)
            path.write_bytes(struct.pack('<4sII', b'glTF', 2, 20 + len(payload)) + struct.pack('<II', len(payload), 0x4E4F534A) + payload)
            with self.assertRaises(ValueError):
                app.validate_glb(path)

    def test_app_builds(self):
        demo = app.build_app()
        self.assertIn('Sketch2Shape', demo.title)
        self.assertTrue(any(item.get('type') == 'model3d' for item in demo.config['components']))


if __name__ == '__main__':
    unittest.main()
