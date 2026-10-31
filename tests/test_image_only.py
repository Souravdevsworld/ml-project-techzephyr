import unittest
from unittest.mock import patch
from PIL import Image
import app


class ImageOnlyTests(unittest.TestCase):
    def test_ui_has_upload_but_no_drawing_controls(self):
        demo = app.build_app()
        components = demo.config['components']
        self.assertFalse(any(c['type'] in {'imageeditor', 'radio'} for c in components))
        images = [c for c in components if c['type'] == 'image']
        upload = next(c for c in images if c['props']['label'] == 'Upload PNG or JPG')
        self.assertEqual(upload['props']['sources'], ['upload'])
        self.assertNotIn('Reset canvas', str(components))
        self.assertIn('model3d', [c['type'] for c in components])

    def test_upload_uses_existing_snapshot_and_prompt(self):
        session = app.new_session()
        image = Image.new('RGB', (20, 30), 'red')
        app.submit_upload(image, ' ceramic ', session)
        image.paste('blue', (0, 0, 20, 30))
        self.assertEqual(session['active']['prompt'], 'ceramic')
        self.assertEqual(session['active']['image'].getpixel((0, 0)), (255, 0, 0))

    def test_missing_upload_is_rejected(self):
        session = app.new_session()
        result = app.submit_upload(None, '', session)
        self.assertIn('Upload a PNG', result[1])
        self.assertEqual(session['error'], result[1])
        self.assertIsNone(session['active'])
