import tempfile
from pathlib import Path
from unittest.mock import patch
import unittest
import types
from PIL import Image
import trimesh
import app
from backend.frontend_sf3d import generate_3d


class SF3DConnectionTests(unittest.TestCase):
    def test_adapter_selects_sf3d_without_fallback_and_preserves_prompt(self):
        with patch('backend.frontend_sf3d.configure_local_environment'), \
             patch('backend.generator.generate_with_report', return_value={'path': '/tmp/model.glb', 'actual_engine': 'sf3d'}) as run:
            self.assertEqual(generate_3d('/tmp/input.png', 'ceramic'), '/tmp/model.glb')
        run.assert_called_once_with('/tmp/input.png', 'ceramic', engine='sf3d', fallback=False)

    def test_wrong_engine_and_backend_failure_are_not_success(self):
        with patch('backend.frontend_sf3d.configure_local_environment'), \
             patch('backend.generator.generate_with_report', return_value={'path': '/tmp/model.glb', 'actual_engine': 'triposr'}):
            with self.assertRaises(RuntimeError):
                generate_3d('/tmp/input.png')
        with patch('backend.frontend_sf3d.configure_local_environment'), \
             patch('backend.generator.generate_with_report', side_effect=RuntimeError('missing SF3D weights')):
            with self.assertRaisesRegex(RuntimeError, 'weights'):
                generate_3d('/tmp/input.png')

    def test_upload_to_sf3d_adapter_to_viewer_and_download(self):
        with tempfile.TemporaryDirectory() as directory:
            fixture = Path(directory) / 'fixture.glb'
            trimesh.creation.box().export(fixture)  # Unit fixture only.
            with patch('backend.frontend_sf3d.configure_local_environment'), \
                 patch('backend.generator.generate_with_report', return_value={'path': str(fixture), 'actual_engine': 'sf3d'}) as backend, \
                 patch.object(app.importlib, 'import_module', return_value=types.SimpleNamespace(generate_3d=generate_3d)) as imported:
                state = app.new_session()
                app.submit_upload(Image.new('RGB', (32, 32), 'red'), '', state)
                result = app.run_request(state)
                imported.assert_called_with('backend.frontend_sf3d')
                image_path = backend.call_args.args[0]
                self.assertTrue(str(image_path).endswith('.png'))
                self.assertEqual(result[0], result[1])
                self.assertTrue(Path(result[0]).is_file())
                self.assertIn('SF3D model ready', result[4])
                Path(result[0]).unlink()
