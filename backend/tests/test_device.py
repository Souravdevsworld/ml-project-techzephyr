"""Offline device, precision and offload tests; pretrained models are mocked."""
from contextlib import nullcontext
import json
from pathlib import Path
import sys
import types
from unittest.mock import MagicMock, patch

import pytest
from PIL import Image

from backend import device, sketch_refiner, sketch_worker


def fake_torch(cuda=False):
    return types.SimpleNamespace(
        cuda=types.SimpleNamespace(is_available=MagicMock(return_value=cuda),
                                   empty_cache=MagicMock(),
                                   get_device_name=MagicMock(return_value='offline GPU'),
                                   get_device_properties=MagicMock(return_value=types.SimpleNamespace(total_memory=4*1024**3))),
        float16='fp16',float32='fp32',Generator=MagicMock(),
        nn=types.SimpleNamespace(functional=types.SimpleNamespace(scaled_dot_product_attention=lambda: None)),
        inference_mode=lambda: nullcontext(), __version__='2.11.0+cpu',
        version=types.SimpleNamespace(cuda=None))


@pytest.mark.parametrize('requested,cuda,expected', [('auto',False,'cpu'),('auto',True,'cuda'),('cpu',True,'cpu'),('cuda',True,'cuda')])
def test_explicit_device_selection(requested,cuda,expected):
    torch=fake_torch(cuda)
    assert device.select_device(torch,requested)==expected
    if requested=='cpu':
        torch.cuda.is_available.assert_not_called()


def test_unavailable_explicit_cuda_is_actionable():
    with pytest.raises(RuntimeError,match='CUDA was selected'):
        device.select_device(fake_torch(False),'cuda')


@pytest.mark.parametrize('name,value', [('SKETCH2SHAPE_DEVICE','gpu'),('SKETCH2SHAPE_LOW_MEMORY','maybe'),('SKETCH2SHAPE_MESH_BACKEND','fake')])
def test_invalid_environment_values(monkeypatch,name,value):
    monkeypatch.setenv(name,value)
    fn={'SKETCH2SHAPE_DEVICE':device.requested_device,'SKETCH2SHAPE_LOW_MEMORY':device.low_memory,'SKETCH2SHAPE_MESH_BACKEND':device.mesh_backend}[name]
    with pytest.raises(ValueError):
        fn()


@pytest.mark.parametrize('version', ['2.11.0+cpu','2.11.0+cu128','2.7.1+cu126'])
def test_torch_wheel_does_not_have_to_be_original_cuda_build(version):
    versions=dict(sketch_refiner.EXPECTED_PACKAGES,torch=version)
    with patch.object(sketch_refiner.metadata,'version',side_effect=versions.__getitem__):
        assert sketch_refiner.check_refinement_environment()['torch']==version


def test_incompatible_other_packages_are_still_rejected():
    versions=dict(sketch_refiner.EXPECTED_PACKAGES,peft='0.99.0')
    with patch.object(sketch_refiner.metadata,'version',side_effect=versions.__getitem__):
        with pytest.raises(sketch_refiner.RefinementError,match='peft'):
            sketch_refiner.check_refinement_environment()


@pytest.mark.parametrize('requested,cuda,small,dtype', [('cpu',False,False,'fp32'),('auto',False,True,'fp32'),('cuda',True,False,'fp16'),('cuda',True,True,'fp16')])
def test_inference_precision_and_offload_match_device(monkeypatch,requested,cuda,small,dtype):
    monkeypatch.setenv('SKETCH2SHAPE_DEVICE',requested)
    monkeypatch.setenv('SKETCH2SHAPE_LOW_MEMORY',str(small).lower())
    torch=fake_torch(cuda)
    pipe=MagicMock()
    pipe.scheduler.config={}
    pipe.return_value=types.SimpleNamespace(nsfw_content_detected=[False],images=[Image.new('RGB',(512,512),'red')])
    control=MagicMock()
    pipeline=MagicMock()
    pipeline.from_pretrained.return_value=pipe
    diffusers=types.SimpleNamespace(ControlNetModel=control,StableDiffusionControlNetPipeline=pipeline,UniPCMultistepScheduler=MagicMock())
    with patch.dict(sys.modules,torch=torch,diffusers=diffusers),patch.object(sketch_refiner,'check_refinement_environment',return_value={}):
        image=sketch_refiner._generate_image(Image.new('RGB',(512,512)),'object',sketch_refiner.RefinementSettings())
    assert image.size==(512,512)
    assert control.from_pretrained.call_args.kwargs['torch_dtype']==dtype
    assert pipeline.from_pretrained.call_args.kwargs['torch_dtype']==dtype
    if dtype=='fp32':
        pipe.to.assert_called_once_with('cpu')
        pipe.enable_model_cpu_offload.assert_not_called()
        pipe.enable_sequential_cpu_offload.assert_not_called()
        torch.cuda.empty_cache.assert_not_called()
        pipe.enable_attention_slicing.assert_called_once_with('max')
    elif small:
        pipe.enable_sequential_cpu_offload.assert_called_once_with(gpu_id=0)
        pipe.enable_model_cpu_offload.assert_not_called()
    else:
        pipe.enable_model_cpu_offload.assert_called_once_with(gpu_id=0)
        pipe.enable_sequential_cpu_offload.assert_not_called()
    if dtype=='fp16':
        pipe.enable_attention_slicing.assert_not_called()
    pipe.enable_vae_tiling.assert_called_once()


def test_worker_hardware_cpu_does_not_query_gpu(monkeypatch):
    monkeypatch.setenv('SKETCH2SHAPE_DEVICE','cpu')
    torch=fake_torch()
    with patch.dict(sys.modules,torch=torch):
        info=sketch_worker.hardware()
    assert info['device']=='cpu' and info['gpu'] is None and info['vram_bytes']==0
    torch.cuda.get_device_name.assert_not_called()


def test_worker_failure_writes_safe_dependency_code(tmp_path,monkeypatch):
    response=tmp_path/'response.json'
    request=tmp_path/'request.json'
    request.write_text(json.dumps({'response':str(response)}))
    monkeypatch.setattr(sys,'argv',['worker','refine',str(request)])
    with patch.object(sketch_worker,'hardware',side_effect=ModuleNotFoundError('torch')):
        with pytest.raises(ModuleNotFoundError):
            sketch_worker.main()
    assert json.loads(response.read_text())=={'error_code':'dependency'}


def test_wrapped_oom_is_classified_without_exposing_log_contents():
    inner=RuntimeError('CUDA out of memory')
    outer=RuntimeError('wrapped')
    outer.__cause__=inner
    assert device.error_code(outer)=='cuda_memory'


def test_cpu_allocation_failure_is_distinct():
    assert device.error_code(MemoryError())=='host_memory'
    assert device.error_code(RuntimeError('DefaultCPUAllocator: not enough memory'))=='host_memory'


def test_small_refinement_resizes_conditioning_and_forwards_cfg_one(monkeypatch):
    monkeypatch.setenv('SKETCH2SHAPE_DEVICE','cuda')
    monkeypatch.setenv('SKETCH2SHAPE_LOW_MEMORY','true')
    torch=fake_torch(True)
    pipe=MagicMock()
    pipe.scheduler.config={}
    pipe.return_value=types.SimpleNamespace(nsfw_content_detected=[False],images=[Image.new('RGB',(256,256),'red')])
    model=MagicMock()
    model.from_pretrained.return_value=pipe
    diffusers=types.SimpleNamespace(ControlNetModel=MagicMock(),StableDiffusionControlNetPipeline=model,UniPCMultistepScheduler=MagicMock())
    settings=sketch_refiner.RefinementSettings(guidance_scale=1,image_size=256)
    with patch.dict(sys.modules,torch=torch,diffusers=diffusers),patch.object(sketch_refiner,'check_refinement_environment',return_value={}):
        result=sketch_refiner._generate_image(Image.new('RGB',(512,512)),'chair',settings)
    assert result.size==(256,256)
    kwargs=pipe.call_args.kwargs
    assert kwargs['width']==kwargs['height']==256
    assert kwargs['image'].size==(256,256)
    assert kwargs['guidance_scale']==1
    pipe.enable_attention_slicing.assert_not_called()


@pytest.mark.parametrize('size',[256,384,512])
def test_supported_refinement_sizes_from_environment(monkeypatch,size):
    monkeypatch.setenv('SKETCH_IMAGE_SIZE',str(size))
    assert sketch_refiner.RefinementSettings.from_environment().image_size==size


def test_unsupported_refinement_size_rejected(monkeypatch):
    monkeypatch.setenv('SKETCH_IMAGE_SIZE','128')
    with pytest.raises(ValueError,match='SKETCH_IMAGE_SIZE'):
        sketch_refiner.RefinementSettings.from_environment()


def test_actual_diffusers_controlnet_defaults_to_sdpa():
    # Random tiny architecture only: no pretrained weights or network access.
    diffusers=pytest.importorskip('diffusers')
    from diffusers.models.attention_processor import AttnProcessor2_0
    model=diffusers.ControlNetModel(
        in_channels=4,conditioning_channels=3,
        down_block_types=('CrossAttnDownBlock2D','DownBlock2D'),
        block_out_channels=(16,32),norm_num_groups=4,
        cross_attention_dim=32,attention_head_dim=2)
    assert model.attn_processors
    assert all(isinstance(processor,AttnProcessor2_0) for processor in model.attn_processors.values())
