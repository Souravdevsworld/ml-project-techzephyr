import unittest
from unittest.mock import patch
from PIL import Image
import app

class SimpleFrontendTests(unittest.TestCase):
    def test_only_one_generate_action_and_no_unsupported_controls(self):
        demo = app.build_app()
        components = demo.config['components']
        labels = [c['props'].get('value') for c in components if c['type'] == 'button']
        self.assertEqual(len(labels), 1)
        self.assertIn('Generate 3D', labels[0])
        self.assertFalse(any(c['type'] in ('textbox','imageeditor','radio','accordion') for c in components))
        self.assertEqual(sum(c['type']=='model3d' for c in components), 1)
        self.assertEqual(sum(c['type']=='image' for c in components), 1)
        self.assertFalse(next(c for c in components if c['type']=='downloadbutton')['props']['visible'])
        event_ids = {key for key, fn in demo.fns.items()
                     if fn.fn in (app.submit_photo, app.finish_photo)}
        events = [fn for fn in demo.config['dependencies'] if fn['id'] in event_ids]
        self.assertEqual(len(events), 2)
        self.assertTrue(all(fn['show_progress']=='hidden' for fn in events))

    def test_blank_prompt_and_download_only_after_success(self):
        state=app.new_session()
        app.submit_photo(Image.new('RGB',(20,20)),state)
        self.assertEqual(state['active']['prompt'],'')
        with patch.object(app,'run_request',return_value=('model.glb','model.glb',None,None,'Ready',True,True)):
            result=app.finish_photo(state)
        self.assertEqual(result[1]['value'],'model.glb')
        self.assertTrue(result[1]['visible'])

    def test_missing_image_and_failure_leave_download_hidden(self):
        state=app.new_session()
        _,status,_=app.submit_photo(None,state)
        self.assertIn('Upload',status)
        with patch.object(app,'run_request',return_value=(None,None,None,None,'Failed',True,False)):
            result=app.finish_photo(state)
        self.assertFalse(result[1]['visible'])
