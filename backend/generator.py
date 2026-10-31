"""Generate real GLBs through an installed upstream TripoSR checkout."""

import argparse
import logging
import os
from pathlib import Path
import shutil
import subprocess
import sys
import tempfile
import uuid

from PIL import Image

from .validate_mesh import validate_mesh
from .device import mesh_backend, requested_device

logger = logging.getLogger(__name__)
OUTPUT_DIR = Path(__file__).resolve().parents[1] / "outputs"
MAX_IMAGE_BYTES = 20 * 1024 * 1024
INFERENCE_TIMEOUT = 1800


class GenerationError(RuntimeError):
    """Inference failed; no validated output is available."""


def _integer_setting(name: str, default: int, minimum: int, maximum: int) -> int:
    try:
        value = int(os.environ.get(name, str(default)))
    except ValueError:
        raise GenerationError(f"{name} must be an integer") from None
    if not minimum <= value <= maximum:
        raise GenerationError(f"{name} must be between {minimum} and {maximum}")
    return value


def _remove_background() -> bool:
    value = os.environ.get("TRIPOSR_REMOVE_BG", "true").strip().lower()
    if value not in {"true", "false", "1", "0"}:
        raise GenerationError("TRIPOSR_REMOVE_BG must be true/false or 1/0")
    return value in {"true", "1"}


def generate_3d(image_path: str, prompt: str | None = None) -> str:
    """Run upstream inference explicitly and return an absolute validated GLB path.

    TRIPOSR_DIR must point to a trusted upstream checkout with dependencies
    installed in this Python environment. Weights are downloaded by run.py on
    first inference, never at import. prompt is compatibility-only and unused.
    """
    image = Path(image_path).expanduser().resolve()
    if not image.is_file():
        raise FileNotFoundError("Input image is not a regular file")
    if not 0 < image.stat().st_size <= MAX_IMAGE_BYTES:
        raise ValueError("Input image must be non-empty and at most 20 MiB")
    try:
        with Image.open(image) as candidate:
            if candidate.format not in {"PNG", "JPEG", "WEBP"}:
                raise ValueError("Use a PNG, JPEG, or WebP image")
            candidate.verify()
    except (OSError, Image.DecompressionBombError):
        raise ValueError("Input is not a valid supported image") from None
    if prompt is not None:
        logger.warning("prompt is unused: TripoSR inference is image-conditioned only")
    installation = os.environ.get("TRIPOSR_DIR", "").strip()
    if not installation:
        raise GenerationError("Set TRIPOSR_DIR to the official TripoSR checkout")
    triposr = Path(installation).expanduser().resolve()
    script = triposr / "run.py"
    if not script.is_file():
        raise GenerationError(f"TripoSR run.py not found in {triposr}")
    resolution = _integer_setting("TRIPOSR_MC_RESOLUTION", 128, 16, 512)
    chunk_size = _integer_setting("TRIPOSR_CHUNK_SIZE", 1024, 1, 65536)
    timeout = _integer_setting("TRIPOSR_TIMEOUT_SECONDS", INFERENCE_TIMEOUT, 1, 86400)
    remove_bg = _remove_background()
    selected = requested_device()
    # The upstream CLI resolves unavailable CUDA to CPU in auto mode. Workers
    # resolve and verify an explicit device before calling this public function.
    device = "cpu" if selected == "cpu" else "cuda:0"
    temporary = None
    stage = "inference"
    try:
        OUTPUT_DIR.mkdir(parents=True, exist_ok=True)
        with tempfile.TemporaryDirectory(prefix="sketch2shape-triposr-") as work:
            # Upstream creates this directory during background removal only.
            # Pre-create it for both modes so --no-remove-bg can export safely.
            (Path(work) / "0").mkdir()
            command = [sys.executable, "-u", str(script), str(image),
                       "--model-save-format", "glb", "--output-dir", work,
                       "--pretrained-model-name-or-path", "stabilityai/TripoSR",
                       "--device", device, "--mc-resolution", str(resolution),
                       "--chunk-size", str(chunk_size)]
            if mesh_backend() == "skimage":
                command.insert(2, str(Path(__file__).with_name("triposr_runner.py")))
            if not remove_bg:
                command.append("--no-remove-bg")
            logger.info("Running TripoSR: resolution=%d, chunk=%d, remove_bg=%s, timeout=%ds; "
                        "first run may download weights", resolution, chunk_size, remove_bg, timeout)
            # Inherit console output for upstream progress and actionable dependency
            # errors. No shell, automatic retries, or alternative generation engines.
            subprocess.run(command, cwd=str(triposr), check=True,
                           timeout=timeout, shell=False)
            stage = "output discovery"
            generated = Path(work) / "0" / "mesh.glb"
            if not generated.is_file() or generated.stat().st_size == 0:
                raise GenerationError("TripoSR finished without a non-empty 0/mesh.glb")
            if generated.is_symlink() or not generated.resolve().is_relative_to(Path(work).resolve()):
                raise GenerationError("TripoSR output is outside the inference directory")
            with tempfile.NamedTemporaryFile(dir=OUTPUT_DIR, suffix=".part", delete=False) as file:
                temporary = Path(file.name)
            stage = "output copy"
            shutil.copyfile(generated, temporary)
            stage = "mesh validation"
            validate_mesh(str(temporary))
            destination = OUTPUT_DIR / f"sketch2shape_{uuid.uuid4().hex}.glb"
            temporary.replace(destination)
            logger.info("Generated and validated %s", destination.name)
            return str(destination.resolve())
    except subprocess.TimeoutExpired:
        raise GenerationError(f"TripoSR exceeded {timeout}s; no model returned") from None
    except subprocess.CalledProcessError as exc:
        if exc.returncode == -9:
            raise GenerationError(
                "TripoSR was killed (exit code -9), possibly by the runtime memory limit. "
                "Check Colab RAM/VRAM usage; lower mesh resolution/chunk size before retrying") from None
        raise GenerationError(
            f"TripoSR exited with code {exc.returncode}; see upstream console logs for dependency, "
            "CUDA, weight-download or inference errors") from None
    except GenerationError:
        raise
    except Exception as exc:
        logger.error("3D generation failed during %s (%s)", stage, type(exc).__name__)
        raise GenerationError(f"3D generation failed during {stage}: {exc}") from exc
    finally:
        if temporary is not None:
            temporary.unlink(missing_ok=True)


def main() -> None:
    parser = argparse.ArgumentParser(description="Explicit upstream TripoSR inference")
    parser.add_argument("image", help="Input image, e.g. examples/chair.png")
    parser.add_argument("--prompt", help="Accepted for compatibility; unused")
    args = parser.parse_args()
    logging.basicConfig(level=logging.INFO, format="%(levelname)s: %(message)s")
    try:
        print(generate_3d(args.image, args.prompt))
    except (ValueError, OSError, GenerationError) as exc:
        parser.exit(1, f"Error: {exc}\n")


if __name__ == "__main__":
    main()
