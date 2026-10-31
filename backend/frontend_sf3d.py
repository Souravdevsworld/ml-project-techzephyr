"""Explicit SF3D binding for the photo-upload frontend, without changing CLI defaults."""
from pathlib import Path
import os


def configure_local_environment():
    """Use the conventional isolated environment only if no binding was supplied."""
    python = Path(__file__).resolve().parent / '.venv-sf3d/bin/python'
    if not os.environ.get('SF3D_PYTHON') and python.is_file():
        os.environ['SF3D_PYTHON'] = str(python.absolute())
    os.environ.setdefault('SF3D_DEVICE', 'cpu')


def generate_3d(image_path: str, prompt: str | None = None) -> str:
    from .generator import generate_with_report
    configure_local_environment()
    # Never show a TripoSR result as if it came from SF3D, even if the shell has
    # different engine/fallback defaults for the standalone backend tools.
    report = generate_with_report(image_path, prompt, engine='sf3d', fallback=False)
    if report.get('actual_engine') != 'sf3d':
        raise RuntimeError('The frontend requested SF3D but received a different engine result.')
    return str(Path(report['path']).resolve())
