import threading
import unittest
from unittest.mock import patch

from PIL import Image
import gradio as gr

import app


class PromptWorkflowTests(unittest.TestCase):
    def submit(self, state, prompt='', image=None):
        return app.submit_request(image or Image.new('RGB', (24, 12), 'red'), None, 'Draw', prompt, state)

    def test_click_snapshots_pixels_and_optional_prompt(self):
        for prompt, expected in [(None, ''), (' ceramic ', 'ceramic')]:
            state = app.new_session()
            image = Image.new('RGBA', (24, 12), 'red')
            self.submit(state, prompt, {'composite': image})
            image.paste('blue', (0, 0, 24, 12))
            self.assertEqual(state['active']['image'].getpixel((0, 0)), (255, 0, 0))
            with patch.object(app, 'generate', return_value=iter([('model.glb', 'model.glb', 'ok')])) as backend:
                app.run_request(state)
            self.assertEqual(backend.call_args.args[3], expected)

    def test_prompt_edit_during_blocking_inference_is_pending(self):
        state = app.new_session()
        self.submit(state, 'first')
        started, finish = threading.Event(), threading.Event()
        received = []
        def inference(image, upload, source, prompt, progress):
            received.append(prompt)
            started.set()
            self.assertTrue(finish.wait(5))
            yield 'one.glb', 'one.glb', 'ok'
        with patch.object(app, 'generate', side_effect=inference):
            worker = threading.Thread(target=app.run_request, args=(state,))
            worker.start()
            try:
                self.assertTrue(started.wait(5))
                self.assertIn('second', app.pending_prompt('second', state))
                self.assertEqual(state['active']['prompt'], 'first')
                with self.assertRaises(gr.Error):
                    self.submit(state, 'third')
                self.assertEqual(app.run_request(state), (gr.skip(),) * 7)
            finally:
                finish.set()
                worker.join(5)
        self.assertFalse(worker.is_alive())
        self.assertEqual(received, ['first'])
        self.assertEqual(state['latest_prompt'], 'second')
        self.assertEqual(state['model'], 'one.glb')

    def test_regenerate_uses_original_and_keeps_history(self):
        state = app.new_session()
        self.submit(state, 'first')
        with patch.object(app, 'generate', return_value=iter([('one.glb', 'one.glb', 'ok')])):
            app.run_request(state)
        original = state['original'].tobytes()
        app.pending_prompt('updated', state)
        app.submit_regeneration('updated', state)
        self.assertEqual(state['active']['image'].tobytes(), original)
        with patch.object(app, 'generate', return_value=iter([('two.glb', 'two.glb', 'ok')])) as backend:
            result = app.run_request(state)
        self.assertEqual(backend.call_args.args[3], 'updated')
        self.assertEqual(result[:3], ('two.glb', 'two.glb', 'one.glb'))
        self.assertEqual(state['original'].tobytes(), original)

    def test_error_retains_model_and_edits_do_not_erase_error(self):
        state = app.new_session()
        self.submit(state)
        with patch.object(app, 'generate', return_value=iter([('one.glb', 'one.glb', 'ok')])):
            app.run_request(state)
        app.submit_regeneration('new', state)
        with patch.object(app, 'generate', return_value=iter([(None, None, 'backend error')])):
            result = app.run_request(state)
        self.assertEqual(result[:2], ('one.glb', 'one.glb'))
        self.assertIn('backend error', result[4])
        app.pending_prompt('retry', state)
        self.assertEqual(state['error'], 'backend error')
        self.assertIsNone(state['active'])
        self.assertFalse(state['running'])

    def test_invalid_input_and_regeneration_without_success(self):
        state = app.new_session()
        with self.assertRaises(gr.Error):
            app.submit_regeneration('new', state)
        with self.assertRaises(gr.Error):
            app.submit_request(None, None, 'Draw', '', state)
        self.assertIsNone(state['active'])

    def test_stale_completion_cannot_publish_or_unlock_new_request(self):
        state = app.new_session()
        self.submit(state)
        newer = {'id': 'newer', 'image': Image.new('RGB', (1, 1)), 'prompt': 'new'}
        def inference(*args):
            state['active'] = newer
            yield 'stale.glb', 'stale.glb', 'ok'
        with patch.object(app, 'generate', side_effect=inference):
            self.assertEqual(app.run_request(state), (gr.skip(),) * 7)
        self.assertIs(state['active'], newer)
        self.assertIsNone(state['model'])

    def test_both_actions_share_single_queue(self):
        demo = app.build_app()
        jobs = [fn for fn in demo.fns.values() if fn.fn is app.run_request]
        self.assertEqual(len(jobs), 2)
        self.assertTrue(all(fn.concurrency_id == 'inference' and fn.concurrency_limit == 1 for fn in jobs))

    def test_different_sessions_cannot_overlap_inference(self):
        first, second = app.new_session(), app.new_session()
        self.submit(first)
        self.submit(second)
        start, release = threading.Event(), threading.Event()
        active = 0
        peak = 0
        lock = threading.Lock()
        def inference(*args):
            nonlocal active, peak
            with lock:
                active += 1
                peak = max(peak, active)
            start.set()
            release.wait(5)
            with lock:
                active -= 1
            yield 'model.glb', 'model.glb', 'ok'
        with patch.object(app, 'generate', side_effect=inference):
            a = threading.Thread(target=app.run_request, args=(first,))
            b = threading.Thread(target=app.run_request, args=(second,))
            a.start()
            self.assertTrue(start.wait(5))
            b.start()
            release.set()
            a.join(5)
            b.join(5)
        self.assertEqual(peak, 1)
        self.assertFalse(a.is_alive() or b.is_alive())
