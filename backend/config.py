"""Backend settings shared by the lightweight adapter and isolated worker."""
from dataclasses import dataclass, field
import os
from pathlib import Path

from .preprocessing import PreprocessOptions

ROOT = Path(__file__).resolve().parent.parent


@dataclass(frozen=True)
class Settings:
    source: str
    model_dir: str
    device: str
    resolution: int
    chunk_size: int
    remove_background: bool
    preprocessing: PreprocessOptions = field(default_factory=PreprocessOptions)

    @classmethod
    def from_env(cls):
        def integer(name, default, low, high):
            value = int(os.environ.get(name, default))
            if not low <= value <= high:
                raise ValueError(f"{name} must be between {low} and {high}.")
            return value
        return cls(
            str(Path(os.environ.get('TRIPOSR_SOURCE', ROOT / 'backend/vendor/TripoSR')).expanduser().resolve()),
            str(Path(os.environ.get('TRIPOSR_MODEL_DIR', ROOT / 'backend/weights/TripoSR')).expanduser().resolve()),
            os.environ.get('TRIPOSR_DEVICE', 'cpu').lower(),
            integer('TRIPOSR_RESOLUTION', 128, 32, 256),
            integer('TRIPOSR_CHUNK_SIZE', 4096, 256, 65536),
            os.environ.get('TRIPOSR_REMOVE_BACKGROUND', '0') == '1',
            PreprocessOptions.from_env(),
        )


def select_device(torch, requested):
    """Never silently switch devices; CPU is the conservative default."""
    if requested == 'cpu':
        return 'cpu'
    if requested == 'mps':
        if not torch.backends.mps.is_available():
            raise RuntimeError('MPS is unavailable. Set TRIPOSR_DEVICE=cpu to use CPU explicitly.')
        return 'mps'
    if requested == 'cuda':
        if not torch.cuda.is_available():
            raise RuntimeError('CUDA is unavailable. Set TRIPOSR_DEVICE=cpu explicitly.')
        return 'cuda'
    raise ValueError('TRIPOSR_DEVICE must be cpu, mps, or cuda.')
