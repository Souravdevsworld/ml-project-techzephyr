"""Small, CPU-only boundary between Gradio values and inference inputs."""
from pathlib import Path

import numpy as np
from PIL import Image, ImageOps, UnidentifiedImageError

MAX_IMAGE_BYTES = 20 * 1024 * 1024
MAX_PIXELS = 16_000_000
MAX_EDGE = 1024


def as_rgb(value) -> Image.Image:
    """Prefer the editor's composite; rebuild background/layers only if absent."""
    if isinstance(value, dict):
        if value.get("composite") is not None:
            return as_rgb(value["composite"])
        background, layers = value.get("background"), value.get("layers") or []
        if background is None and not layers:
            raise ValueError("Draw a sketch or upload an image first.")
        # Preserve alpha until every layer has been composited, including erasures.
        base = _rgba(background if background is not None else layers[0])
        if background is None:
            layers = layers[1:]
        for layer in layers:
            overlay = _rgba(layer)
            if overlay.size != base.size:
                raise ValueError("Canvas layers have inconsistent dimensions.")
            base.alpha_composite(overlay)
        return _white_composite(base)
    return _white_composite(_rgba(value))


def _rgba(value) -> Image.Image:
    try:
        if isinstance(value, (str, Path)):
            path = Path(value)
            if not path.is_file() or not 0 < path.stat().st_size <= MAX_IMAGE_BYTES:
                raise ValueError("Upload a nonempty image no larger than 20 MiB.")
            with Image.open(path) as opened:
                if opened.format not in {"PNG", "JPEG", "WEBP"}:
                    raise ValueError("Use a PNG, JPG/JPEG, or WebP image.")
                _dimensions(opened)
                opened.verify()
            with Image.open(path) as opened:
                return ImageOps.exif_transpose(opened).convert("RGBA")
        if isinstance(value, Image.Image):
            _dimensions(value)
            return ImageOps.exif_transpose(value).convert("RGBA")
    except (UnidentifiedImageError, OSError, Image.DecompressionBombError) as exc:
        raise ValueError("The image is corrupt or cannot be decoded.") from exc
    raise ValueError("Draw a sketch or upload a valid image first.")


def _dimensions(image):
    if min(image.size) < 8 or image.width * image.height > MAX_PIXELS:
        raise ValueError("Images need sides of at least 8 pixels and at most 16 million pixels.")


def _white_composite(rgba):
    white = Image.new("RGBA", rgba.size, "white")
    white.alpha_composite(rgba)
    return white.convert("RGB")


def validate_content(image: Image.Image, *, sketch: bool = True):
    gray = np.asarray(image.convert("L"))
    if int(gray.max()) - int(gray.min()) < 12:
        raise ValueError("The canvas/image is blank. Draw visible strokes or choose a clear object image.")
    if sketch:
        # Reject isolated accidental taps/noise while preserving small drawings.
        border = np.concatenate((gray[0], gray[-1], gray[:, 0], gray[:, -1]))
        foreground = np.abs(gray.astype(np.int16) - np.median(border)) > 25
        if int(foreground.sum()) < 8:
            raise ValueError("Draw a few visible strokes before generating.")


def save_input(value, output_path, *, sketch=True, check_blank=True) -> str:
    image = as_rgb(value)
    if check_blank:
        validate_content(image, sketch=sketch)
    image.thumbnail((MAX_EDGE, MAX_EDGE), Image.Resampling.LANCZOS)
    # Check after resizing too: very tiny marks may have disappeared.
    if check_blank:
        validate_content(image, sketch=sketch)
    target = Path(output_path)
    target.parent.mkdir(parents=True, exist_ok=True)
    image.save(target, format="PNG")
    return str(target.resolve())
