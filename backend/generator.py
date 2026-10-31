"""Frontend contract: ML stays in a reusable, separate Python interpreter."""
import atexit
from dataclasses import asdict
import math
import json
import logging
import os
from pathlib import Path
import queue
import subprocess
import threading
import time
import uuid

from .config import ROOT, Settings

log = logging.getLogger(__name__)
_LOCK = threading.Lock()
_DISPATCH_LOCK = threading.RLock()
_CLIENT = None


def validate_input(image_path):
    from PIL import Image
    path = Path(image_path).expanduser().resolve(strict=True)
    if not path.is_file():
        raise ValueError('Input must be a local image file.')
    with Image.open(path) as image:
        image.verify()
    return path


def validate_glb(path):
    import trimesh
    path = Path(path).resolve()
    if not path.is_file() or path.suffix.lower() != '.glb':
        raise ValueError('Inference did not produce an existing GLB.')
    with path.open('rb') as handle:
        if handle.read(4) != b'glTF':
            raise ValueError('Output is not a binary GLB.')
    scene = trimesh.load(str(path), file_type='glb', force='scene')
    if not any(len(getattr(mesh, 'vertices', [])) and len(getattr(mesh, 'faces', []))
               for mesh in scene.geometry.values()):
        raise ValueError('Output GLB has no mesh geometry.')
    return str(path)


class WorkerError(RuntimeError):
    def __init__(self, message, report):
        super().__init__(message)
        self.report = report


class Worker:
    def __init__(self, python, worker_module='backend.worker', label='TripoSR'):
        self.label = label
        self.started = time.perf_counter()
        self.last_response = {}
        self.process = subprocess.Popen(
            [python, '-u', '-m', worker_module, '--ready-signal'], cwd=ROOT,
            stdin=subprocess.PIPE, stdout=subprocess.PIPE,
            text=True, bufsize=1,
            # stderr inherits server logs; never shares the JSON stdout channel.
        )
        self.spawn_seconds = time.perf_counter() - self.started
        self.responses = queue.Queue()
        def read():
            try:
                for line in self.process.stdout:
                    self.responses.put(line)
            finally:
                self.responses.put(None)
        threading.Thread(target=read, daemon=True).start()

    def request(self, payload, timeout):
        started = time.perf_counter()
        self.process.stdin.write(json.dumps(payload) + '\n')
        self.process.stdin.flush()
        serialization = time.perf_counter() - started
        deadline = time.perf_counter() + timeout
        startup_seconds = 0.0
        while True:
            try:
                line = self.responses.get(timeout=max(0, deadline-time.perf_counter()))
            except queue.Empty as exc:
                raise TimeoutError(f"{getattr(self, 'label', '3D')} inference timed out; the worker will be restarted on the next request.") from exc
            if line is None:
                raise RuntimeError(f"{getattr(self, 'label', '3D')} worker exited. Check backend dependencies and server logs.")
            result = json.loads(line)
            if result.get('ready'):
                startup_seconds = time.perf_counter() - getattr(self, 'started', started)
                continue
            if result.get('id') != payload['id']:
                raise RuntimeError(f"{getattr(self, 'label', '3D')} worker returned a mismatched request ID.")
            self.last_response = result.get('report', {})
            timings = self.last_response.setdefault('timings', {})
            rpc_seconds = time.perf_counter() - started
            timings.update(worker_startup_seconds=startup_seconds,
                           worker_spawn_seconds=getattr(self, 'spawn_seconds', 0.0),
                           path_serialization_seconds=serialization,
                           worker_rpc_seconds=rpc_seconds,
                           communication_overhead_seconds=max(0.0, rpc_seconds-result.get('worker_request_seconds', 0)-startup_seconds-serialization))
            if result.get('error'):
                raise WorkerError(result['error'], self.last_response)
            return result['path']

    def close(self):
        if self.process.poll() is None:
            self.process.terminate()
            try:
                self.process.wait(timeout=5)
            except subprocess.TimeoutExpired:
                self.process.kill()
                self.process.wait()
        self.process.stdin.close()
        self.process.stdout.close()


def _shutdown_triposr_worker():
    global _CLIENT
    with _LOCK:
        if _CLIENT is not None:
            _CLIENT[1].close()
            _CLIENT = None


def shutdown_worker():
    with _DISPATCH_LOCK:
        from .backends.factory import close_backends
        close_backends()
        _shutdown_triposr_worker()


atexit.register(shutdown_worker)


def generate_3d(image_path: str, prompt: str | None = None) -> str:
    """Reconstruct a genuine GLB synchronously using the configured engine."""
    return generate_with_report(image_path, prompt)['path']


def _generate_triposr_report(image_path, prompt=None, *, preprocessing=None, output_dir=None):
    """Backend evaluation entry; same inference worker, optional per-run prep."""
    global _CLIENT
    total_started = time.perf_counter()
    image = validate_input(image_path)
    input_validation_seconds = time.perf_counter() - total_started
    if prompt is not None and not isinstance(prompt, str):
        raise ValueError('prompt must be a string or None.')
    if prompt and prompt.strip():
        log.warning('TripoSR is image-only; the supplied appearance prompt is unused.')
    python = os.environ.get('TRIPOSR_PYTHON')
    if not python or not Path(python).expanduser().is_file():
        raise RuntimeError('Set TRIPOSR_PYTHON to the absolute Python executable in the backend Python 3.11 environment. See backend/README.md.')
    python = str(Path(python).expanduser().absolute())
    settings = Settings.from_env()
    timeout = float(os.environ.get('TRIPOSR_TIMEOUT', '1800'))
    if not math.isfinite(timeout) or timeout <= 0:
        raise ValueError('TRIPOSR_TIMEOUT must be positive.')
    output_dir = Path(output_dir or os.environ.get('TRIPOSR_OUTPUT_DIR', ROOT / 'backend/outputs')).expanduser().resolve()
    output_dir.mkdir(parents=True, exist_ok=True)
    output = output_dir / f'{uuid.uuid4().hex}.glb'
    started = time.monotonic()
    with _LOCK:
        # Per-request preprocessing changes must not reload pretrained weights.
        queue_wait_seconds = time.monotonic() - started
        key = (python, settings.source, settings.model_dir, settings.device,
               settings.resolution, settings.chunk_size, settings.remove_background)
        if _CLIENT and (_CLIENT[0] != key or _CLIENT[1].process.poll() is not None):
            _CLIENT[1].close()
            _CLIENT = None
        if _CLIENT is None:
            _CLIENT = (key, Worker(python))
        try:
            returned = _CLIENT[1].request(
                {'id': uuid.uuid4().hex, 'image': str(image), 'output': str(output),
                 'preprocessing': asdict(preprocessing or settings.preprocessing)}, timeout)
            if Path(returned).resolve() != output:
                raise RuntimeError('Worker output path did not match the requested output.')
            validation_start = time.perf_counter()
            result = validate_glb(output)
            raw_report = getattr(_CLIENT[1], 'last_response', {})
            report = dict(raw_report) if isinstance(raw_report, dict) else {}
            report.setdefault('timings', {})['adapter_glb_validation_seconds'] = time.perf_counter() - validation_start
        except Exception:
            _CLIENT[1].close()
            _CLIENT = None
            output.unlink(missing_ok=True)
            raise
    log.info('TripoSR device=%s total_seconds=%.2f output=%s', settings.device, time.monotonic()-started, result)
    report.update(path=result, valid_glb=True)
    report['timings'].update(total_seconds=time.perf_counter()-total_started,
                             adapter_input_validation_seconds=input_validation_seconds,
                             adapter_queue_wait_seconds=queue_wait_seconds)
    return report


def generate_with_report(image_path, prompt=None, *, preprocessing=None, output_dir=None, engine=None, fallback=None):
    """Backend-only report API; frontend generate_3d still returns only a path.

    Default is TripoSR. SF3D fallback is opt-in and is always labeled as TripoSR.
    Evaluation can pass fallback=False so unavailable SF3D remains a failed run.
    """
    from .backends.factory import selected_engine, fallback_enabled, get_backend, release_inactive
    name = selected_engine(engine)
    can_fallback = fallback_enabled(name, fallback)
    image = validate_input(image_path)
    if prompt is not None and not isinstance(prompt, str):
        raise ValueError('prompt must be a string or None.')
    with _DISPATCH_LOCK:
        release_inactive(name)
        backend = get_backend(name)
        try:
            report = backend.generate_report(str(image), prompt, preprocessing=preprocessing, output_dir=output_dir)
        except RuntimeError as exc:
            if not can_fallback:
                raise
            log.warning('SF3D failed; explicitly configured TripoSR fallback will be used: %s', exc)
            release_inactive('triposr')
            report = get_backend('triposr').generate_report(str(image), prompt, preprocessing=preprocessing, output_dir=output_dir)
            report['fallback'] = {'requested_engine': name, 'actual_engine': 'triposr', 'reason': str(exc)}
        report['requested_engine'] = name
        return report
