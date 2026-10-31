"""Actual SF3D model/inference code; imports ML dependencies only in its worker.

Implemented against official stable-fast-3d ff21fc491b4dc5314bf6734c7c0dabd86b5f5bb2.
No code here fabricates a model, UV atlas, texture, or material.
"""
import hashlib
import logging
from pathlib import Path
import sys
import time

from PIL import Image, ImageOps

from .sf3d_config import configure_device_environment, select_device
from ..preprocessing import RembgSegmenter, validate_mask

log = logging.getLogger(__name__)


class SF3DRuntime:
    def __init__(self, settings):
        self.settings = settings
        self.model = None
        self.segmenter = RembgSegmenter()
        self.last_report = {}
        self.load_timings = {}
        self.device = settings.device

    def load(self):
        if self.model is not None:
            return self.model
        source = Path(self.settings.source)
        if not (source / 'sf3d/system.py').is_file():
            raise RuntimeError('SF3D source is missing. Set SF3D_SOURCE to the official stable-fast-3d checkout; see backend/README.md.')
        if not (source / 'load/tets/160_tets.npz').is_file():
            raise RuntimeError('SF3D tetrahedral grid load/tets/160_tets.npz is missing. Use the complete official source checkout, including its load assets.')
        for filename in ('config.yaml', 'model.safetensors'):
            if not (Path(self.settings.model_dir) / filename).is_file():
                raise RuntimeError(f'Missing SF3D checkpoint/config: {filename}. Request access to stabilityai/stable-fast-3d and obtain its official gated weights under the applicable license; no gated weights are downloaded automatically.')
        configure_device_environment(self.settings)
        started = time.perf_counter()
        try:
            import torch
            self.device = select_device(torch, self.settings.device)
            sys.path.insert(0, str(source))
            from sf3d.system import SF3D
        except (ImportError, OSError) as exc:
            raise RuntimeError('SF3D dependencies/native extensions could not be imported. Use its separate Python 3.11 environment and build texture_baker and uv_unwrapper; see backend/README.md. Original error: ' + str(exc)) from exc
        self.load_timings['model_import_seconds'] = time.perf_counter() - started
        log.info('SF3D selected device=%s; experimental MPS allows explicit PyTorch CPU operator fallback=%s', self.device, self.device == 'mps')
        started = time.perf_counter()
        try:
            model = SF3D.from_pretrained(self.settings.model_dir, config_name='config.yaml', weight_name='model.safetensors')
            model.to(self.device).eval()
        except Exception as exc:
            raise RuntimeError('SF3D model loading failed. In addition to the local SF3D checkpoint, upstream may require cached facebook/dinov2-large and configured OpenCLIP pretrained assets. Check native extensions, available memory, network/cache access, and backend logs. Original error: ' + str(exc)) from exc
        self.model = model
        self.load_timings['model_loading_seconds'] = time.perf_counter() - started
        return self.model

    def prepare(self, image_path, foreground_ratio, size=512):
        """Preserve RGBA conditioning; SF3D composites gray inside prepare_image."""
        started = time.perf_counter()
        with Image.open(image_path) as image:
            original = ImageOps.exif_transpose(image).convert('RGBA')
        if original.getextrema()[3][1] == 0:
            raise ValueError('SF3D input is fully transparent.')
        metadata = {'mode': 'sf3d_rgba', 'effective_mode': 'sf3d_rgba',
                    'foreground_ratio': foreground_ratio, 'input_size': list(original.size),
                    'input_sha256': hashlib.sha256(Path(image_path).read_bytes()).hexdigest(),
                    'warnings': [], 'timings': {}}
        if original.getextrema()[3][0] < 255:
            mask = original.getchannel('A')
            metadata['segmentation_outcome'] = 'existing_alpha'
        else:
            try:
                mask, metrics = self.segmenter.segment(original, self.settings.segmentation_model)
            except Exception as exc:
                raise RuntimeError('SF3D requires a meaningful foreground alpha mask, but segmentation failed. Supply a manually isolated RGBA image or select TripoSR. Original error: ' + str(exc)) from exc
            metadata.update(segmentation_outcome='predicted_mask', mask_cached=metrics.get('mask_cached', False))
            metadata['timings'].update({k: v for k, v in metrics.items() if k.endswith('_seconds')})
        diagnostics = validate_mask(mask, original.size)
        metadata['mask'] = diagnostics
        if not diagnostics['valid']:
            raise ValueError('SF3D foreground mask is suspicious: ' + ', '.join(diagnostics['reasons']) + '. Supply an isolated RGBA image with margins or select TripoSR; no opaque RGB fallback is fed to SF3D.')
        cutout = original.copy()
        cutout.putalpha(mask.convert('L'))
        cutout = cutout.crop(tuple(diagnostics['bbox']))
        scale = foreground_ratio * size / max(cutout.size)
        dimensions = tuple(max(1, min(size, round(edge * scale))) for edge in cutout.size)
        cutout = cutout.convert('RGBa').resize(dimensions, Image.Resampling.LANCZOS).convert('RGBA')
        canvas = Image.new('RGBA', (size, size), (0, 0, 0, 0))
        canvas.alpha_composite(cutout, ((size-dimensions[0])//2, (size-dimensions[1])//2))
        metadata['output_size'] = [size, size]
        metadata['timings']['preprocessing_seconds'] = time.perf_counter() - started
        return canvas, metadata

    def infer(self, image_path, output, options=None):
        started = time.perf_counter()
        self.last_report = {'actual_engine': 'sf3d', 'engine': 'sf3d', 'backend': 'sf3d', 'device': self.settings.device,
                            'valid_glb': False, 'stage': 'model_loading', 'timings': {}}
        try:
            return self._infer(image_path, output, options or {})
        finally:
            self.last_report['timings']['worker_request_seconds'] = time.perf_counter() - started
            log.info('SF3D request report: %s', self.last_report)

    def _infer(self, image_path, output, options):
        # Validate the small per-request settings using the same bounded config.
        from dataclasses import replace
        settings = replace(self.settings,
                           foreground_ratio=options.get('foreground_ratio', self.settings.foreground_ratio),
                           texture_resolution=options.get('texture_resolution', self.settings.texture_resolution))
        reused = self.model is not None
        model = self.load()
        self.last_report.update(stage='preprocessing', model_reused=reused, device=self.device)
        import torch
        size = getattr(getattr(model, 'cfg', None), 'cond_image_size', 512)
        size = size if type(size) is int and size > 0 else 512
        image, metadata = self.prepare(image_path, settings.foreground_ratio, size=size)
        self.last_report.update(stage='inference_and_texture_baking', model_reused=reused, device=self.device,
                                preprocessing=metadata, texture_resolution=settings.texture_resolution,
                                mixed_device_mps_fallback=self.device == 'mps')
        timings = self.last_report['timings']
        timings.update(metadata['timings'])
        timings.update(self.load_timings if not reused else {'model_import_seconds': 0.0, 'model_loading_seconds': 0.0})
        def synchronize():
            if self.device == 'mps':
                torch.mps.synchronize()
            elif self.device == 'cuda':
                torch.cuda.synchronize()
        with torch.no_grad():
            synchronize()
            started = time.perf_counter()
            try:
                mesh, _ = model.run_image(image, bake_resolution=settings.texture_resolution,
                                          remesh='none', vertex_count=-1)
                synchronize()
            finally:
                timings['sf3d_run_image_seconds'] = time.perf_counter() - started
        if not len(getattr(mesh, 'vertices', [])) or not len(getattr(mesh, 'faces', [])):
            raise RuntimeError('SF3D produced no mesh geometry.')
        from ..generator import validate_glb
        from .assets import inspect_glb_asset
        output = Path(output).resolve()
        started = time.perf_counter()
        self.last_report['stage'] = 'textured_glb_export'
        try:
            # Native upstream GLB export preserves TextureVisuals/PBR material.
            mesh.export(str(output), file_type='glb', include_normals=True)
            validate_glb(output)
            assets = inspect_glb_asset(output)
            if not all(assets.get(key) for key in ('has_uv', 'has_materials', 'has_textures')):
                raise RuntimeError('SF3D GLB is missing expected UVs/materials/embedded textures; refusing degraded plain-mesh output.')
        except Exception:
            output.unlink(missing_ok=True)
            raise
        timings['glb_export_validation_seconds'] = time.perf_counter() - started
        self.last_report.update(assets, stage='complete', path=str(output), valid_glb=True,
                                vertex_count=len(mesh.vertices), face_count=len(mesh.faces), output_format='glb')
        return str(output)
