"""Heavy model code; imported exclusively in the isolated worker."""
import logging
from pathlib import Path
import sys
import time
import json
import platform
import subprocess

from .config import select_device
from .preprocessing import Preprocessor

log = logging.getLogger(__name__)


class Runtime:
    def __init__(self, settings):
        self.settings = settings
        self.model = None
        self.preprocessor = Preprocessor()
        self.last_report = {}
        self.load_timings = {}
        self.provenance = {}

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
        import_start = time.perf_counter()
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
        self.load_timings['model_import_seconds'] = time.perf_counter() - import_start
        start = time.monotonic()
        model = TSR.from_pretrained(settings.model_dir, config_name='config.yaml', weight_name='model.ckpt')
        model.renderer.set_chunk_size(settings.chunk_size)
        model.eval().to(self.device)
        self.model = model
        self.load_timings['model_loading_seconds'] = time.monotonic() - start
        self.provenance = {'python': platform.python_version(), 'torch': torch.__version__,
                           'model_dir': settings.model_dir, 'source': settings.source}
        if (source / '.git').exists():
            try:
                git = subprocess.run(['git', '-C', str(source), 'rev-parse', 'HEAD'],
                                     capture_output=True, text=True, timeout=5)
                self.provenance['source_commit'] = git.stdout.strip() or None
            except (OSError, subprocess.SubprocessError):
                log.warning('Source Git provenance is unavailable; keeping the successfully loaded model.')
        provenance = Path(settings.model_dir) / 'provenance.json'
        if provenance.is_file():
            try:
                self.provenance['weights'] = json.loads(provenance.read_text())
            except (ValueError, OSError):
                log.warning('Weight provenance metadata is unreadable; checkpoint revision is unverified.')
        log.info('Loaded pretrained TripoSR in %.2fs', time.monotonic()-start)
        return model

    def prepare(self, path):
        # Keep the existing helper's return type for standalone callers/tests.
        return self.preprocessor.process(
            path, self.settings.preprocessing,
            legacy_remove_background=self.settings.remove_background).image

    def infer(self, image, output, preprocessing=None):
        started = time.perf_counter()
        self.last_report = {'device': self.settings.device, 'valid_glb': False,
                            'stage': 'model_loading', 'timings': {}}
        try:
            return self._infer(image, output, preprocessing)
        finally:
            self.last_report['timings']['worker_request_seconds'] = time.perf_counter() - started
            log.info('TripoSR request report: %s', self.last_report)

    def _infer(self, image, output, preprocessing=None):
        cold_model = self.model is None
        load_started = time.perf_counter()
        try:
            model = self.load()
        finally:
            self.last_report['timings']['model_setup_attempt_seconds'] = time.perf_counter() - load_started
        self.last_report.update(stage='preprocessing', model_reused=not cold_model, provenance=self.provenance)
        import torch
        from .generator import validate_glb
        options = preprocessing or self.settings.preprocessing
        size = getattr(getattr(model, 'cfg', None), 'cond_image_size', 512)
        size = size if isinstance(size, int) and size > 0 else 512
        prepared = self.preprocessor.process(image, options,
                     legacy_remove_background=self.settings.remove_background, target_size=size)

        def sync():
            if self.device == 'mps':
                torch.mps.synchronize()
            elif self.device == 'cuda':
                torch.cuda.synchronize()

        self.last_report['preprocessing'] = prepared.metadata
        timings = self.last_report['timings']
        timings.update(prepared.metadata['timings'])
        timings.update(self.load_timings if cold_model else {'model_import_seconds': 0.0, 'model_loading_seconds': 0.0})
        with torch.inference_mode():
            sync()
            started = time.perf_counter()
            # Official TSR performs its RGB /255, configured resize, and tensor
            # transfer internally. No duplicate normalization or model rewrite.
            self.last_report['stage'] = 'inference'
            try:
                scene_codes = model([prepared.image], device=self.device)
                sync()
            finally:
                timings['inference_seconds'] = time.perf_counter() - started
            started = time.perf_counter()
            self.last_report['stage'] = 'mesh_extraction'
            try:
                meshes = model.extract_mesh(scene_codes, has_vertex_color=True, resolution=self.settings.resolution)
                sync()
            finally:
                timings['mesh_extraction_seconds'] = time.perf_counter() - started
        if len(meshes) != 1 or not len(meshes[0].vertices) or not len(meshes[0].faces):
            raise RuntimeError('TripoSR produced no mesh geometry.')
        mesh = meshes[0]
        output = Path(output).resolve()
        started = time.perf_counter()
        self.last_report['stage'] = 'glb_export'
        try:
            mesh.export(str(output), file_type='glb')
            validate_glb(output)
        except Exception:
            output.unlink(missing_ok=True)
            raise
        timings['glb_export_validation_seconds'] = time.perf_counter() - started
        self.last_report.update(stage='complete', vertex_count=len(mesh.vertices), face_count=len(mesh.faces),
                                path=str(output), valid_glb=True)
        return str(output)
