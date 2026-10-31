"""Frontend contract: ML stays in a reusable, separate Python interpreter."""
import atexit
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


class Worker:
    def __init__(self, python):
        self.process = subprocess.Popen(
            [python, '-u', '-m', 'backend.worker'], cwd=ROOT,
            stdin=subprocess.PIPE, stdout=subprocess.PIPE,
            text=True, bufsize=1,
            # stderr inherits server logs; never shares the JSON stdout channel.
        )
        self.responses = queue.Queue()
        def read():
            try:
                for line in self.process.stdout:
                    self.responses.put(line)
            finally:
                self.responses.put(None)
        threading.Thread(target=read, daemon=True).start()

    def request(self, payload, timeout):
        self.process.stdin.write(json.dumps(payload) + '\n')
        self.process.stdin.flush()
        try:
            line = self.responses.get(timeout=timeout)
        except queue.Empty as exc:
            raise TimeoutError('TripoSR inference timed out; the worker will be restarted on the next request.') from exc
        if line is None:
            raise RuntimeError('TripoSR worker exited. Check backend dependencies and server logs.')
        result = json.loads(line)
        if result.get('id') != payload['id']:
            raise RuntimeError('TripoSR worker returned a mismatched request ID.')
        if result.get('error'):
            raise RuntimeError(result['error'])
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


def shutdown_worker():
    global _CLIENT
    with _LOCK:
        if _CLIENT is not None:
            _CLIENT[1].close()
            _CLIENT = None


atexit.register(shutdown_worker)


def generate_3d(image_path: str, prompt: str | None = None) -> str:
    """Reconstruct a GLB synchronously. TripoSR does not condition on text."""
    global _CLIENT
    image = validate_input(image_path)
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
    if timeout <= 0:
        raise ValueError('TRIPOSR_TIMEOUT must be positive.')
    output_dir = Path(os.environ.get('TRIPOSR_OUTPUT_DIR', ROOT / 'backend/outputs')).expanduser().resolve()
    output_dir.mkdir(parents=True, exist_ok=True)
    output = output_dir / f'{uuid.uuid4().hex}.glb'
    started = time.monotonic()
    with _LOCK:
        key = (python, settings)
        if _CLIENT and (_CLIENT[0] != key or _CLIENT[1].process.poll() is not None):
            _CLIENT[1].close()
            _CLIENT = None
        if _CLIENT is None:
            _CLIENT = (key, Worker(python))
        try:
            returned = _CLIENT[1].request(
                {'id': uuid.uuid4().hex, 'image': str(image), 'output': str(output)}, timeout)
            if Path(returned).resolve() != output:
                raise RuntimeError('Worker output path did not match the requested output.')
            result = validate_glb(output)
        except Exception:
            _CLIENT[1].close()
            _CLIENT = None
            output.unlink(missing_ok=True)
            raise
    log.info('TripoSR device=%s total_seconds=%.2f output=%s', settings.device, time.monotonic()-started, result)
    return result
