"""Offline integration: mocked model workers, real preprocessing and GLB validation.

The box mesh is a test fixture only. It is never used by application inference.
"""
import json
import os
from pathlib import Path
import threading
from unittest.mock import patch

import pytest
from PIL import Image, ImageDraw
import trimesh

from backend import pipeline
from backend.sketch_preprocess import preprocess_sketch


@pytest.fixture
def input_image(tmp_path):
    image = Image.new('RGB', (256,128),'white')
    ImageDraw.Draw(image).rectangle((30,20,180,100),outline='black',width=5)
    target = tmp_path / 'sketch.png'
    image.save(target)
    return target


@pytest.fixture
def workers(tmp_path, monkeypatch):
    monkeypatch.setattr(pipeline,'OUTPUT_DIR', tmp_path / 'jobs')
    calls = []
    def execute(command, **kwargs):
        stage = command[-2]
        request = json.loads(Path(command[-1]).read_text())
        directory = Path(request['directory'])
        calls.append((stage, request, kwargs))
        if stage == 'refine':
            artifacts = preprocess_sketch(request['input'], str(directory))
            output = Path(artifacts.directory) / 'refined.png'
            image = Image.new('RGB',(512,512),'white')
            ImageDraw.Draw(image).ellipse((120,90,390,450),fill='brown')
            image.save(output)
        else:
            output = directory / 'generated.glb'
            output.write_bytes(trimesh.creation.box().export(file_type='glb'))
        Path(request['response']).write_text(json.dumps({'output':str(output), 'hardware': {'gpu':'OFFLINE MOCK'},'seconds':0.01}))
    monkeypatch.setattr(pipeline,'run_worker',execute)
    return calls


def test_sketch_routes_preprocess_refine_then_reconstruction(input_image, workers):
    stages = []
    result = pipeline.generate_result(input_image, '  wooden chair ',progress=stages.append)
    assert [call[0] for call in workers] == ['refine','reconstruct']
    assert workers[1][1]['input'] == result.refined
    assert workers[0][1]['prompt'] == 'wooden chair'
    assert all(Path(p).is_file() for p in [result.original,result.cleaned,result.conditioning,result.refined,result.glb,result.metadata])
    assert pipeline.validate_mesh(result.glb)['faces'] > 0
    metadata = json.loads(Path(result.metadata).read_text())
    assert metadata['status'] == 'success' and metadata['effective_prompt'] == 'wooden chair'
    assert metadata['prompt_guides_triposr'] is False
    assert stages[-1] == 'Generation completed'


def test_photo_bypasses_refinement(input_image,workers):
    result = pipeline.generate_result(input_image,'ignored',mode='Image to 3D')
    assert [call[0] for call in workers] == ['reconstruct']
    assert workers[0][1]['input'] == result.original
    assert workers[0][1]['prompt'] is None
    assert result.refined is None and result.conditioning is None and result.cleaned is None
    assert json.loads(Path(result.metadata).read_text())['effective_prompt'] is None


def test_neutral_prompt_and_unique_jobs(input_image,workers):
    first = pipeline.generate_result(input_image)
    second = pipeline.generate_result(input_image,'')
    assert first.directory != second.directory and first.glb != second.glb
    assert workers[0][1]['prompt'] == pipeline.DEFAULT_PROMPT


def test_worker_settings_are_isolated_per_process(input_image,workers,monkeypatch):
    monkeypatch.setenv('SKETCH_STEPS','77')
    settings = pipeline.GenerationSettings(seed=17,steps=25,guidance_scale=8.5,conditioning_scale=0.8,mesh_resolution=192,remove_background=False)
    pipeline.generate_result(input_image,settings=settings)
    env = workers[0][2]['env']
    assert env['SKETCH_STEPS'] == '25' and env['SKETCH_SEED'] == '17'
    assert env['SKETCH_CFG'] == '8.5' and env['SKETCH_CONTROL_STRENGTH'] == '0.8'
    assert env['TRIPOSR_MC_RESOLUTION'] == '192' and env['TRIPOSR_REMOVE_BG'] == 'false'
    assert os.environ['SKETCH_STEPS'] == '77'


@pytest.mark.parametrize('change', [dict(seed=-1),dict(steps=2.5),dict(guidance_scale=float('nan')),dict(conditioning_scale=3),dict(mesh_resolution=0),dict(remove_background='yes')])
def test_bad_settings_never_start_models(input_image,workers,change):
    with pytest.raises(ValueError):
        pipeline.generate_result(input_image,settings=pipeline.GenerationSettings(**change))
    assert workers == []


def test_blank_input_prevents_downstream(input_image,workers):
    with pytest.raises(ValueError,match='blank'):
        pipeline.generate_result(Image.new('RGB',(40,40),'white'))
    assert not workers


def test_refinement_failure_prevents_reconstruction(input_image,workers):
    with patch.object(pipeline,'run_worker',side_effect=RuntimeError('weights missing')) as run:
        with pytest.raises(RuntimeError,match='weights missing'):
            pipeline.generate_result(input_image)
    assert run.call_count == 1
    records = list(pipeline.OUTPUT_DIR.glob('*/metadata.json'))
    assert len(records) == 1 and json.loads(records[0].read_text())['status'] == 'failed'
    assert not list(pipeline.OUTPUT_DIR.glob('*/model.glb'))


@pytest.mark.parametrize('bad', ['missing','corrupt','blank','outside','bad-glb'])
def test_invalid_worker_outputs_never_return_a_model(input_image,workers,bad,tmp_path):
    real = pipeline.run_worker
    def execute(command,**kwargs):
        stage = command[-2]
        if stage == 'reconstruct' and bad != 'bad-glb':
            pytest.fail('Reconstruction must not run after failed refinement')
        real(command,**kwargs)
        request = json.loads(Path(command[-1]).read_text())
        response = Path(request['response'])
        manifest = json.loads(response.read_text())
        output = Path(manifest['output'])
        if bad == 'bad-glb' and stage == 'refine':
            return
        if bad == 'missing':
            output.unlink()
        elif bad == 'corrupt' or bad == 'bad-glb':
            output.write_bytes(b'not a valid file')
        elif bad == 'blank':
            Image.new('RGB',(512,512),'white').save(output)
        elif bad == 'outside':
            outside = tmp_path / 'stale.png'
            outside.write_bytes(output.read_bytes())
            manifest['output'] = str(outside)
            response.write_text(json.dumps(manifest))
    with patch.object(pipeline,'run_worker',side_effect=execute),pytest.raises(Exception):
        pipeline.generate_result(input_image)
    assert not list(pipeline.OUTPUT_DIR.glob('*/model.glb'))


def test_worker_with_no_manifest_fails(input_image,workers):
    with patch.object(pipeline,'run_worker',return_value=None),pytest.raises(RuntimeError,match='manifest'):
        pipeline.generate_result(input_image)


def test_gpu_workers_cannot_overlap_across_sessions(input_image,workers):
    actual = pipeline.run_worker
    entered, release, second_started = threading.Event(), threading.Event(), threading.Event()
    active = peak = 0
    guard = threading.Lock()
    failures = []
    def execute(*args,**kwargs):
        nonlocal active,peak
        with guard:
            active += 1
            peak = max(peak,active)
        entered.set()
        assert release.wait(5)
        try:
            actual(*args,**kwargs)
        finally:
            with guard:
                active -= 1
    def generate(second=False):
        if second:
            second_started.set()
        try:
            pipeline.generate_result(input_image,mode='Image to 3D')
        except Exception as exc:
            failures.append(exc)
    with patch.object(pipeline,'run_worker',side_effect=execute):
        first = threading.Thread(target=generate)
        second = threading.Thread(target=generate,args=(True,))
        first.start()
        assert entered.wait(5)
        second.start()
        assert second_started.wait(5)
        release.set()
        first.join(5)
        second.join(5)
    assert not failures and peak == 1
    assert not first.is_alive() and not second.is_alive()


def test_cpu_and_low_memory_config_reach_both_workers(input_image,workers,monkeypatch):
    monkeypatch.delenv('TRIPOSR_CHUNK_SIZE',raising=False)
    monkeypatch.delenv('TRIPOSR_TIMEOUT_SECONDS',raising=False)
    settings=pipeline.GenerationSettings(device='cpu',low_memory=True,mesh_resolution=64)
    pipeline.generate_result(input_image,settings=settings)
    for stage,request,kwargs in workers:
        assert kwargs['env']['SKETCH2SHAPE_DEVICE']=='cpu'
        assert kwargs['env']['SKETCH2SHAPE_LOW_MEMORY']=='true'
        assert kwargs['env']['TRIPOSR_CHUNK_SIZE']=='256'
        assert kwargs['timeout']==7200


def test_specific_worker_error_points_to_job_log(input_image,workers):
    from backend.process import WorkerError
    def fail(command,**kwargs):
        request=json.loads(Path(command[-1]).read_text())
        Path(request['response']).write_text(json.dumps({'error_code':'dependency'}))
        raise WorkerError('worker failed')
    with patch.object(pipeline,'run_worker',side_effect=fail),pytest.raises(WorkerError,match='ML dependency.*outputs/jobs/'):
        pipeline.generate_result(input_image)
