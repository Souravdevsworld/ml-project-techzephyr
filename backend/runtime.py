"""Heavy model code; imported exclusively in the isolated worker."""
import logging
from pathlib import Path
import sys
import time

from .config import select_device

log = logging.getLogger(__name__)


class Runtime:
    def __init__(self, settings):
        self.settings = settings
        self.model = None
        self.rembg_session = None

    def load(self):
        if self.model is not None:
            return self.model
        settings = self.settings
        source = Path(settings.source)
        if not (source / 'tsr/system.py').is_file():
            raise RuntimeError('TripoSR source missing. Set TRIPOSR_SOURCE to the official checkout (see backend/README.md).')
        for name in ('config.yaml', 'model.ckpt'):
            if not (Path(settings.model_dir) / name).is_file():
                raise RuntimeError(f'Missing TripoSR weights/config: {name}. Run python -m backend.download_weights in the backend environment.')
        import torch
        from . import surface
        self.device = select_device(torch, settings.device)
        log.info('Selected device=%s; marching cubes always runs on CPU.', self.device)
        if self.device == 'mps':
            log.warning('MPS is experimental and unverified on Mac M4. No automatic fallback: retry with TRIPOSR_DEVICE=cpu on failure.')
        # Replace only the helper import in this dedicated interpreter. No vendor
        # file is modified, and no fake torchmcubes module is installed.
        sys.path.insert(0, str(source))
        sys.modules['tsr.models.isosurface'] = surface
        from tsr.system import TSR
        start = time.monotonic()
        model = TSR.from_pretrained(settings.model_dir, config_name='config.yaml', weight_name='model.ckpt')
        model.renderer.set_chunk_size(settings.chunk_size)
        model.eval().to(self.device)
        self.model = model
        log.info('Loaded pretrained TripoSR in %.2fs', time.monotonic()-start)
        return model

    def prepare(self, path):
        from PIL import Image, ImageOps
        import numpy as np
        with Image.open(path) as image:
            image = ImageOps.exif_transpose(image).convert('RGBA')
        if self.settings.remove_background:
            import rembg
            from tsr.utils import resize_foreground
            if self.rembg_session is None:
                self.rembg_session = rembg.new_session()
            image = resize_foreground(rembg.remove(image, session=self.rembg_session), 0.85)
            rgba = np.asarray(image).astype(np.float32) / 255
            image = Image.fromarray((255 * (rgba[:, :, :3] * rgba[:, :, 3:] + .5 * (1-rgba[:, :, 3:]))).astype(np.uint8))
        else:
            # Preserve thin sketch lines; don't infer a destructive foreground mask.
            bg = Image.new('RGBA', image.size, (128, 128, 128, 255))
            bg.alpha_composite(image)
            image = bg.convert('RGB')
        return ImageOps.pad(image, (512, 512), color=(128, 128, 128))

    def infer(self, image, output):
        import torch
        from .generator import validate_glb
        model = self.load()
        image = self.prepare(image)
        start = time.monotonic()
        with torch.inference_mode():
            scene_codes = model([image], device=self.device)
            meshes = model.extract_mesh(scene_codes, has_vertex_color=True, resolution=self.settings.resolution)
        if len(meshes) != 1 or not len(meshes[0].vertices) or not len(meshes[0].faces):
            raise RuntimeError('TripoSR produced no mesh geometry.')
        mesh = meshes[0]
        output = Path(output).resolve()
        try:
            mesh.export(str(output), file_type='glb')
            validate_glb(output)
        except Exception:
            output.unlink(missing_ok=True)
            raise
        log.info('Inference/extraction device=%s seconds=%.2f vertices=%d faces=%d GLB=%s',
                 self.device, time.monotonic()-start, len(mesh.vertices), len(mesh.faces), output)
        return str(output)
