"""Configuration for the isolated, optional Stable Fast 3D worker."""
from dataclasses import dataclass
import math
import os
from pathlib import Path

BACKEND = Path(__file__).resolve().parents[1]


@dataclass(frozen=True)
class SF3DSettings:
    source: str
    model_dir: str
    device: str = 'cpu'
    texture_resolution: int = 1024
    foreground_ratio: float = 0.85
    timeout: float = 1800.0
    segmentation_model: str = 'u2net'

    def __post_init__(self):
        if self.device not in {'cpu', 'mps', 'cuda'}:
            raise ValueError('SF3D_DEVICE must be cpu, mps, or cuda.')
        if type(self.texture_resolution) is not int or self.texture_resolution not in {256, 512, 1024, 2048, 4096}:
            raise ValueError('SF3D_TEXTURE_RESOLUTION must be 256, 512, 1024, 2048, or 4096.')
        if not math.isfinite(self.foreground_ratio) or not .1 <= self.foreground_ratio <= .95:
            raise ValueError('SF3D_FOREGROUND_RATIO must be finite and between 0.10 and 0.95.')
        if not math.isfinite(self.timeout) or self.timeout <= 0:
            raise ValueError('SF3D_TIMEOUT must be finite and positive.')
        if self.segmentation_model not in {'u2net', 'u2netp'}:
            raise ValueError('SF3D_SEGMENTATION_MODEL must be u2net or u2netp.')

    @classmethod
    def from_env(cls):
        try:
            resolution = int(os.environ.get('SF3D_TEXTURE_RESOLUTION', '1024'))
            ratio = float(os.environ.get('SF3D_FOREGROUND_RATIO', '.85'))
            timeout = float(os.environ.get('SF3D_TIMEOUT', '1800'))
        except ValueError as exc:
            raise ValueError('SF3D_TEXTURE_RESOLUTION, SF3D_FOREGROUND_RATIO and SF3D_TIMEOUT must be numeric.') from exc
        return cls(
            source=str(Path(os.environ.get('SF3D_SOURCE', BACKEND / 'vendor/stable-fast-3d')).expanduser().resolve()),
            model_dir=str(Path(os.environ.get('SF3D_MODEL_DIR', BACKEND / 'weights/stable-fast-3d')).expanduser().resolve()),
            device=os.environ.get('SF3D_DEVICE', 'cpu').strip().lower(),
            texture_resolution=resolution, foreground_ratio=ratio, timeout=timeout,
            segmentation_model=os.environ.get('SF3D_SEGMENTATION_MODEL', 'u2net'),
        )

    def model_key(self):
        # Material baking resolution and foreground framing are per-request.
        return self.source, self.model_dir, self.device, self.segmentation_model


def configure_device_environment(settings):
    """Upstream internally uses get_device(), so its CPU guard must agree."""
    if settings.device == 'mps' and os.environ.get('PYTORCH_ENABLE_MPS_FALLBACK') != '1':
        raise RuntimeError('Experimental SF3D MPS requires PYTORCH_ENABLE_MPS_FALLBACK=1 before starting the worker, as documented upstream. This allows explicit CPU operator fallback.')
    os.environ['SF3D_USE_CPU'] = '1' if settings.device == 'cpu' else '0'


def select_device(torch, requested):
    if requested == 'cpu':
        return 'cpu'
    if requested == 'mps' and torch.backends.mps.is_available():
        return 'mps'
    if requested == 'cuda' and torch.cuda.is_available():
        return 'cuda'
    raise RuntimeError(f'SF3D device {requested!r} is unavailable. Select SF3D_DEVICE=cpu explicitly; no silent device switch is performed.')
