"""Offline Colab orchestration tests; no CUDA or model downloads are performed."""
import ast
import json
from pathlib import Path
import subprocess
import sys
import types
from unittest.mock import MagicMock, patch
import zipfile

import pytest
import trimesh

import app
from scripts import setup_colab as setup
from scripts.colab_runtime import AppServer, export_latest_job

ROOT=Path(__file__).resolve().parents[1]


def test_notebook_is_valid_python_with_safe_run_all_defaults():
    notebook=json.loads((ROOT/'notebooks/Sketch2Shape_App_Colab.ipynb').read_text())
    cells=notebook['cells']
    assert len({cell['id'] for cell in cells})==len(cells)
    constants={}
    for cell in cells:
        if cell['cell_type']!='code':
            continue
        assert cell['outputs']==[] and cell['execution_count'] is None
        tree=ast.parse(''.join(cell['source']))
        for node in tree.body:
            if isinstance(node,ast.Assign) and isinstance(node.value,ast.Constant):
                for target in node.targets:
                    if isinstance(target,ast.Name):
                        constants[target.id]=node.value.value
    assert constants['ACCESS_MODE']=='proxy'
    assert constants['DOWNLOAD_LAST_SUCCESS'] is False
    assert constants['STOP_APP'] is False
    assert notebook['metadata']['accelerator']=='GPU'


def test_cache_configuration_stays_inside_selected_root(tmp_path):
    storage=setup.cache_environment(tmp_path/'cache')
    assert 'HOME' not in storage
    assert all(Path(path).is_relative_to(tmp_path/'cache') for path in storage.values())
    assert Path(storage['TMPDIR']).is_dir()


def test_existing_venv_policy_mismatch_is_preserved(tmp_path):
    directory=tmp_path/'environment'
    (directory/'bin').mkdir(parents=True)
    (directory/'bin/python').touch()
    (directory/'pyvenv.cfg').write_text('include-system-site-packages = false\n')
    with pytest.raises(RuntimeError,match='nothing was removed'):
        setup.create_venv(sys.executable,directory,{},inherit_torch=True)
    assert (directory/'bin/python').exists()


def test_ensurepip_failure_uses_local_virtualenv_fallback(tmp_path,monkeypatch):
    monkeypatch.setattr(setup,'ROOT',tmp_path)
    commands=[]
    def run(command,**kwargs):
        commands.append(command)
        if command[1:3]==['-m','venv']:
            raise subprocess.CalledProcessError(1,command)
        return types.SimpleNamespace(stdout='')
    monkeypatch.setattr(setup,'run',run)
    setup.create_venv(Path(sys.executable),tmp_path/'ml',{},inherit_torch=True)
    fallback=[command for command in commands if '-m' in command and 'virtualenv' in command]
    assert len(fallback)==1 and '--system-site-packages' in fallback[0]
    assert any('--target' in command for command in commands)


def test_python_313_fallback_does_not_change_notebook_kernel(tmp_path,monkeypatch):
    commands=[]
    def run(command,**kwargs):
        commands.append(command)
        return types.SimpleNamespace(stdout='/isolated/python3.12\n')
    monkeypatch.setattr(setup,'run',run)
    monkeypatch.setattr(setup.shutil,'which',lambda name:None)
    with patch.object(setup.sys,'version_info',(3,13,0)):
        python=setup.select_python(tmp_path,{})
    assert python==Path('/isolated/python3.12')
    assert any('uv>=0.9,<1' in command for command in commands)
    assert any(command[-3:]==['python','install','3.12'] for command in commands)


@pytest.fixture
def setup_calls(tmp_path,monkeypatch):
    monkeypatch.setattr(setup,'ROOT',tmp_path)
    monkeypatch.setattr(setup.shutil,'which',lambda name:'/usr/bin/nvidia-smi')
    monkeypatch.setattr(setup,'select_python',lambda *args:Path(sys.executable))
    commands=[]
    environments=[]
    def run(command,**kwargs):
        commands.append([str(part) for part in command])
        return types.SimpleNamespace(stdout='CUDA Version: 12.8' if command[0]=='/usr/bin/nvidia-smi' else 'source-sha\n')
    def create(python,directory,env,inherit_torch=False):
        environments.append((directory,inherit_torch))
        return directory/'bin/python'
    monkeypatch.setattr(setup,'run',run)
    monkeypatch.setattr(setup,'create_venv',create)
    monkeypatch.setattr(setup,'prepare_triposr',lambda work,env:work/'TripoSR')
    return commands,environments


def gpu_info(available=True):
    return {'available':available,'version':'2.11.0+cu128','cuda':'12.8','gpu':'OFFLINE GPU MOCK','vram_bytes':16*1024**3}


def test_setup_preserves_existing_cuda_torch_and_records_no_secrets(tmp_path,setup_calls,monkeypatch):
    commands,environments=setup_calls
    monkeypatch.setenv('EXAMPLE_RUNTIME_SECRET','not-for-manifest')
    monkeypatch.setattr(setup,'probe_torch',lambda *args:gpu_info())
    target=setup.setup(tmp_path/'cache')
    data=json.loads(target.read_text())
    assert [inherit for _,inherit in environments]==[False,True]
    assert data['reuses_runtime_torch'] is True and data['models_downloaded'] is False
    assert data['environment']['SKETCH_PYTHON']==data['ml_python']
    assert data['environment']['TRIPOSR_PYTHON']==data['ml_python']
    assert 'not-for-manifest' not in target.read_text()
    assert not any('torch==2.11.0' in command for command in commands)
    install=next(command for command in commands if str(tmp_path/'backend/requirements-local.txt') in command)
    assert '-c' in install
    assert (tmp_path/'work/colab/keep-torch.txt').read_text()=='torch==2.11.0+cu128\n'


def test_fresh_interpreter_installs_cuda_only_in_ml_env(tmp_path,setup_calls,monkeypatch):
    commands,environments=setup_calls
    answers=iter([gpu_info(False),gpu_info(True)])
    monkeypatch.setattr(setup,'probe_torch',lambda *args:next(answers))
    setup.setup()
    install=next(command for command in commands if 'torch==2.11.0' in command)
    assert install[0]==str(tmp_path/'.venv-colab-ml/bin/python')
    assert install[-1]=='https://download.pytorch.org/whl/cu128'
    assert all(not inherited for _,inherited in environments)


def test_kernel_venv_torch_does_not_get_mistaken_for_base_system_torch(tmp_path,setup_calls,monkeypatch):
    commands,environments=setup_calls
    kernel=dict(gpu_info(),prefix='/kernel-venv',base_prefix='/base-python')
    answers=iter([kernel,gpu_info()])
    monkeypatch.setattr(setup,'probe_torch',lambda *args:next(answers))
    setup.setup()
    assert all(not inherited for _,inherited in environments)
    assert any('torch==2.11.0' in command for command in commands)


def test_no_gpu_stops_before_installation(tmp_path,monkeypatch):
    monkeypatch.setattr(setup.shutil,'which',lambda name:None)
    with patch.object(setup,'run') as run,pytest.raises(RuntimeError,match='T4 GPU'):
        setup.setup()
    run.assert_not_called()


def test_existing_triposr_ref_is_not_reset(tmp_path,monkeypatch):
    checkout=tmp_path/'TripoSR'
    checkout.mkdir()
    (checkout/'run.py').write_text('preserve')
    calls=[]
    def run(command,**kwargs):
        calls.append(command)
        return types.SimpleNamespace(stdout='different-commit')
    monkeypatch.setattr(setup,'run',run)
    with pytest.raises(RuntimeError,match='no files were overwritten'):
        setup.prepare_triposr(tmp_path,{})
    assert (checkout/'run.py').read_text()=='preserve'
    assert not any('checkout' in command for command in calls)


@pytest.fixture
def runtime(tmp_path):
    return {'project':str(tmp_path),'ui_python':sys.executable,'environment':{'SKETCH2SHAPE_DEVICE':'cuda'}}


def test_private_server_does_not_request_external_share_or_inherit_password(runtime,monkeypatch):
    monkeypatch.setenv('SKETCH2SHAPE_SHARE_PASSWORD','fictional-password')
    server=AppServer(runtime)
    assert '--share' not in server.command
    assert 'SKETCH2SHAPE_SHARE_PASSWORD' not in server.environment


def test_shared_server_requires_auth_and_keeps_password_out_of_arguments(runtime):
    with pytest.raises(ValueError,match='12 characters'):
        AppServer(runtime,access='share',password='short')
    server=AppServer(runtime,access='share',password='fictional-password')
    assert '--share' in server.command
    assert 'fictional-password' not in ' '.join(server.command)
    assert server.environment['SKETCH2SHAPE_SHARE_PASSWORD']=='fictional-password'


def test_port_collision_does_not_start_another_server(runtime):
    with patch('scripts.colab_runtime.socket.socket') as socket,patch('scripts.colab_runtime.subprocess.Popen') as popen:
        socket.return_value.__enter__.return_value.bind.side_effect=OSError('in use')
        with pytest.raises(RuntimeError,match='already in use'):
            AppServer(runtime).start()
    popen.assert_not_called()


def test_server_start_reuses_own_live_process_and_stops_group(runtime):
    server=AppServer(runtime)
    process=MagicMock()
    process.poll.return_value=None
    process.pid=987654
    response=MagicMock()
    response.__enter__.return_value.status=200
    with patch('scripts.colab_runtime.socket.socket'),patch('scripts.colab_runtime.subprocess.Popen',return_value=process) as popen,patch('scripts.colab_runtime.urllib.request.urlopen',return_value=response),patch('scripts.colab_runtime.os.killpg') as kill:
        server.start()
        server.start()
        assert popen.call_count==1
        server.stop()
        kill.assert_called_once()
    assert server.stream is None


def test_cli_share_guard_rejects_unauthenticated_link(monkeypatch):
    monkeypatch.delenv('SKETCH2SHAPE_SHARE_PASSWORD',raising=False)
    monkeypatch.setattr(sys,'argv',['app.py','--share'])
    with patch.object(app,'build_app') as build,pytest.raises(SystemExit) as error:
        app.main()
    assert error.value.code==2
    build.assert_not_called()


def test_cli_passes_auth_only_for_explicit_share(monkeypatch):
    monkeypatch.setenv('SKETCH2SHAPE_SHARE_PASSWORD','fictional-password')
    monkeypatch.setattr(sys,'argv',['app.py','--share'])
    with patch.object(app,'build_app') as build,patch.object(app.signal,'signal'),patch('backend.process.stop_workers'):
        app.main()
    options=build.return_value.launch.call_args.kwargs
    assert options['share'] is True
    assert options['auth']==('sketch2shape','fictional-password')


def completed_job(tmp_path,name='job'):
    job=tmp_path/'outputs/jobs'/name
    job.mkdir(parents=True)
    (job/'metadata.json').write_text(json.dumps({'status':'success'}))
    (job/'input.png').write_bytes(b'original fixture')
    # Offline fixture only; export never creates geometry in production.
    (job/'model.glb').write_bytes(trimesh.creation.box().export(file_type='glb'))
    return job


def test_export_validates_and_packages_completed_job_only(tmp_path):
    job=completed_job(tmp_path)
    (job/'refine.log').write_text('diagnostic log not included')
    outside=tmp_path/'outside.json'
    outside.write_text('not included')
    (job/'external.json').symlink_to(outside)
    archive=export_latest_job(tmp_path)
    with zipfile.ZipFile(archive) as package:
        assert set(package.namelist())=={'job/metadata.json','job/input.png','job/model.glb'}
        assert package.read('job/model.glb')==(job/'model.glb').read_bytes()


def test_export_failed_run_does_not_fabricate_output(tmp_path):
    job=tmp_path/'outputs/jobs/failed'
    job.mkdir(parents=True)
    (job/'metadata.json').write_text(json.dumps({'status':'failed'}))
    assert export_latest_job(tmp_path) is None


def test_export_rejects_invalid_glb(tmp_path):
    job=completed_job(tmp_path)
    (job/'model.glb').write_text('invalid')
    with pytest.raises(ValueError):
        export_latest_job(tmp_path)
