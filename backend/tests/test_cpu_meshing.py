"""Actual CPU density-to-mesh extraction; synthetic fields are test fixtures."""
import json
from pathlib import Path
import subprocess
import sys

import numpy as np
import pytest
import trimesh

from backend.validate_mesh import validate_mesh

torch=pytest.importorskip('torch')
pytest.importorskip('skimage')
from backend.cpu_isosurface import MarchingCubeHelper


def test_real_cpu_marching_cubes_axis_order_and_valid_glb(tmp_path):
    helper=MarchingCubeHelper(32)
    xyz=helper.grid_vertices
    assert xyz.shape==(32**3,3)
    assert helper.grid_vertices is xyz
    radii=torch.tensor([0.15,0.25,0.35])
    density=1-(((xyz-0.5)/radii)**2).sum(dim=-1)
    vertices,faces=helper(-density)
    assert vertices.device.type=='cpu' and faces.device.type=='cpu'
    mesh=trimesh.Trimesh(vertices=vertices.numpy(),faces=faces.numpy(),process=False)
    assert np.allclose(mesh.extents,[0.3,0.5,0.7],atol=0.02)
    path=tmp_path/'offline-ellipsoid.glb'
    path.write_bytes(mesh.export(file_type='glb'))
    assert validate_mesh(str(path))['faces']>0


def test_runner_imports_cpu_helper_before_upstream_entrypoint(tmp_path):
    script=tmp_path/'run.py'
    target=tmp_path/'ran.json'
    script.write_text("import json,sys; from tsr.models.isosurface import MarchingCubeHelper; from pathlib import Path; Path(sys.argv[1]).write_text(json.dumps({'helper':MarchingCubeHelper.__module__,'args':sys.argv[2:]}))")
    runner=Path(__file__).resolve().parents[1]/'triposr_runner.py'
    subprocess.run([sys.executable,str(runner),str(script),str(target),'--model-save-format','glb'],check=True,timeout=30)
    record=json.loads(target.read_text())
    assert record['helper']=='backend.cpu_isosurface'
    assert record['args']==['--model-save-format','glb']
