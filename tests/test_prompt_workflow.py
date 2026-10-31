"""Regression tests for immutable queued requests and failure-safe results."""
import threading
from pathlib import Path
from unittest.mock import patch

import gradio as gr
import pytest
import trimesh

import app
from backend.pipeline import GenerationResult
from test_app import drawing


def submit(state, image, prompt='', **kwargs):
    return app.submit_request({'composite':image}, None, 'Draw', prompt, state, **kwargs)


def result(tmp_path):
    model = tmp_path / 'fixture.glb'
    model.write_bytes(trimesh.creation.box().export(file_type='glb'))
    return GenerationResult(str(tmp_path), 'original.png', 'clean.png', 'control.png', 'refined.png', str(model), 'metadata.json')


def test_click_snapshots_pixels_settings_and_optional_prompt(drawing, tmp_path):
    state = app.new_session()
    submitted = submit(state, drawing, None)
    frozen = state['active']['image'].tobytes()
    drawing.paste('blue', (0,0,*drawing.size))
    assert state['active']['image'].tobytes() == frozen
    assert submitted[5:] == (None,) * app.ARTIFACT_COUNT
    with patch.object(app, 'generate_result', return_value=result(tmp_path)) as backend:
        output = app.run_request(state)
    assert backend.call_args.args[1] == ''
    assert backend.call_args.kwargs['settings'].seed == 42
    assert output[0] == output[1] == state['model']
    assert output[6][-1] == 'metadata.json'


def test_prompt_edit_and_duplicate_click_during_inference(drawing, tmp_path):
    state = app.new_session()
    submit(state, drawing, 'first')
    started, finish = threading.Event(), threading.Event()
    def inference(*args, **kwargs):
        started.set()
        assert finish.wait(5)
        return result(tmp_path)
    with patch.object(app, 'generate_result', side_effect=inference) as backend:
        thread = threading.Thread(target=app.run_request, args=(state,))
        thread.start()
        try:
            assert started.wait(5)
            app.pending_prompt('second', state)
            assert state['active']['prompt'] == 'first'
            with pytest.raises(gr.Error):
                submit(state, drawing, 'third')
            assert app.run_request(state) == (gr.skip(),) * app.RESULT_COUNT
        finally:
            finish.set()
            thread.join(5)
    assert not thread.is_alive()
    assert backend.call_args.args[1] == 'first'
    assert state['latest_prompt'] == 'second'


def test_regeneration_keeps_original_and_clears_failure(drawing, tmp_path):
    state = app.new_session()
    submit(state, drawing)
    with patch.object(app,'generate_result',return_value=result(tmp_path)):
        app.run_request(state)
    original = state['original'].tobytes()
    admission = app.submit_regeneration('new', state, 'Sketch to 3D', 12, 30, 6.0, 0.8, 128, True)
    assert admission[5:] == (None,) * app.ARTIFACT_COUNT
    assert state['model'] is None
    assert state['active']['image'].tobytes() == original
    with patch.object(app,'generate_result',side_effect=RuntimeError('Refinement failed')):
        output = app.run_request(state)
    assert output[:app.ARTIFACT_COUNT] == (None,) * app.ARTIFACT_COUNT
    assert 'Refinement failed' in output[7]
    assert state['model'] is None
    error = state['error']
    app.pending_prompt('retry',state)
    assert state['error'] == error and state['active'] is None and not state['running']


def test_invalid_input_clears_previous_result(drawing):
    state = app.new_session()
    state['model'] = 'old.glb'
    output = app.submit_request(None, None, 'Draw', '', state)
    assert state['model'] is None
    assert output[5:] == (None,) * app.ARTIFACT_COUNT
    assert 'Draw' in output[1] and state['active'] is None
    assert app.run_request(state) == (gr.skip(),) * app.RESULT_COUNT


def test_stale_completion_cannot_publish(drawing, tmp_path):
    state = app.new_session()
    submit(state,drawing)
    newer = {'id':'newer'}
    def inference(*args,**kwargs):
        state['active'] = newer
        return result(tmp_path)
    with patch.object(app,'generate_result',side_effect=inference):
        assert app.run_request(state) == (gr.skip(),) * app.RESULT_COUNT
    assert state['active'] is newer and state['model'] is None


def test_uploaded_image_mode_does_not_use_hidden_canvas(drawing, tmp_path):
    path = tmp_path / 'photo.webp'
    drawing.save(path)
    state = app.new_session()
    app.submit_request(None, str(path), 'Draw', 'unused', state, mode='Image to 3D')
    assert state['active']['mode'] == 'Image to 3D'
    with patch.object(app, 'generate_result', return_value=result(tmp_path)) as backend:
        app.run_request(state)
    assert backend.call_args.kwargs['mode'] == 'Image to 3D'
