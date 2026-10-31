"""Lightweight SF3D frontend adapter; SF3D never imports into the Gradio process."""
import logging
import os
from pathlib import Path
import threading
import time
import uuid

from .sf3d_config import BACKEND, SF3DSettings

log = logging.getLogger(__name__)


class SF3DBackend:
    name = 'sf3d'

    def __init__(self):
        self._lock = threading.RLock()
        self._client = None
        self._key = None

    def close(self):
        with self._lock:
            if self._client is not None:
                self._client.close()
                self._client = None
                self._key = None

    def generate_report(self, image_path, prompt=None, *, preprocessing=None, output_dir=None):
        from ..generator import Worker, validate_glb, validate_input
        from .assets import inspect_glb_asset
        started = time.perf_counter()
        image = validate_input(image_path)
        if prompt is not None and not isinstance(prompt, str):
            raise ValueError('prompt must be a string or None.')
        if prompt and prompt.strip():
            log.warning('SF3D is image-only; the supplied appearance prompt is unused.')
        if preprocessing is not None:
            log.info('SF3D uses its own validated RGBA preparation; TripoSR preprocessing options are not applied.')
        settings = SF3DSettings.from_env()
        python = os.environ.get('SF3D_PYTHON')
        if not python or not Path(python).expanduser().is_file():
            raise RuntimeError('Set SF3D_PYTHON to the absolute Python executable in the separate SF3D environment. Do not install SF3D into the working TripoSR/frontend environment; see backend/README.md.')
        python = str(Path(python).expanduser().absolute())
        directory = Path(output_dir or os.environ.get('SF3D_OUTPUT_DIR', BACKEND / 'outputs/sf3d')).expanduser().resolve()
        try:
            directory.mkdir(parents=True, exist_ok=True)
        except OSError as exc:
            raise RuntimeError('SF3D output directory could not be prepared. Check SF3D_OUTPUT_DIR permissions: ' + str(exc)) from exc
        output = directory / f'{uuid.uuid4().hex}.glb'
        with self._lock:
            key = (python, settings.model_key())
            if self._client is not None and (key != self._key or self._client.process.poll() is not None):
                self.close()
            if self._client is None:
                try:
                    self._client = Worker(python, worker_module='backend.sf3d_worker', label='SF3D')
                except OSError as exc:
                    # Assignment never completed; Popen handles failed-spawn
                    # resources. No request/output was submitted to a worker.
                    self._client = None
                    self._key = None
                    raise RuntimeError('Could not start the SF3D worker. Check SF3D_PYTHON exists and is executable, interpreter permissions, and available process resources. Original error: ' + str(exc)) from exc
                self._key = key
            try:
                returned = self._client.request({'id': uuid.uuid4().hex, 'image': str(image), 'output': str(output),
                                                'options': {'foreground_ratio': settings.foreground_ratio,
                                                            'texture_resolution': settings.texture_resolution}}, settings.timeout)
                if Path(returned).resolve() != output:
                    raise RuntimeError('SF3D worker output path did not match the requested output.')
                result = validate_glb(output)
                assets = inspect_glb_asset(output)
                if not all(assets.get(key) for key in ('has_uv', 'has_materials', 'has_textures')):
                    raise RuntimeError('SF3D output lacks UVs/materials/textures. Refusing to label a plain mesh as a textured asset.')
                raw = getattr(self._client, 'last_response', {})
                report = dict(raw) if isinstance(raw, dict) else {}
            except Exception as exc:
                self.close()
                output.unlink(missing_ok=True)
                if isinstance(exc, (ValueError, OSError)):
                    raise RuntimeError('SF3D output/worker validation failed: ' + str(exc)) from exc
                raise
        report.update(assets, actual_engine='sf3d', engine='sf3d', backend='sf3d', path=result, output_format='glb', valid_glb=True)
        report.setdefault('timings', {})['total_seconds'] = time.perf_counter() - started
        return report
