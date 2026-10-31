"""Conservative sketch cleanup; no learned models or inferred geometry.

ControlNet Scribble expects white strokes on black, unlike a usual paper sketch.
References: the checkpoint's images/control.png and official gradio_scribble2image.py
(black input strokes are assigned 255 in its zero-initialized control map).
"""

from dataclasses import dataclass
import json
import logging
from pathlib import Path
import shutil
import uuid

import cv2
import numpy as np
from PIL import Image, ImageOps, UnidentifiedImageError

logger = logging.getLogger(__name__)
DEFAULT_OUTPUT_DIR = Path(__file__).resolve().parents[1] / "outputs" / "sketch_refinements"
CANVAS_SIZE = 512
MAX_IMAGE_BYTES = 20 * 1024 * 1024
MAX_PIXELS = 16_000_000


@dataclass(frozen=True)
class SketchArtifacts:
    directory: str
    original_path: str
    cleaned_path: str
    conditioning_path: str
    metadata_path: str


def preprocess_sketch(sketch_path: str, output_dir: str | None = None) -> SketchArtifacts:
    """Save original bytes, cleaned paper sketch and RGB Scribble conditioning.

    Fit the full image into a padded 512 square without stretching or cropping.
    Composite transparency, infer canvas polarity from its border, stretch tonal
    contrast, and apply a mild bilateral filter. Remove only isolated one-pixel
    components after thresholding. No morphology, skeletonization, edge detector,
    gap filling or invented object lines. Inspect the saved comparisons manually.
    """
    source = Path(sketch_path).expanduser().resolve()
    if not source.is_file():
        raise FileNotFoundError("Sketch is not a regular file")
    if not 0 < source.stat().st_size <= MAX_IMAGE_BYTES:
        raise ValueError("Sketch must be non-empty and at most 20 MiB")
    try:
        with Image.open(source) as opened:
            image_format = opened.format
            if image_format not in {"PNG", "JPEG"}:
                raise ValueError("Sketch must be a PNG or JPEG image")
            if opened.width * opened.height > MAX_PIXELS:
                raise ValueError("Sketch must contain at most 16 million pixels")
            opened.load()
            rgba = ImageOps.exif_transpose(opened).convert("RGBA")
    except (UnidentifiedImageError, OSError, Image.DecompressionBombError) as exc:
        raise ValueError("Sketch is not a readable PNG/JPEG image") from exc

    array = np.asarray(rgba)
    alpha = array[:, :, 3]
    visible = alpha > 0
    if not visible.any():
        raise ValueError("Sketch is fully transparent")
    # White strokes on transparent canvas need a dark composite; black strokes
    # need white. This also avoids hidden RGB in transparent pixels leaking in.
    translucent = bool(np.any(alpha < 255))
    visible_gray = cv2.cvtColor(array[:, :, :3], cv2.COLOR_RGB2GRAY)[visible]
    background = 0 if translucent and np.median(visible_gray) > 127 else 255
    composite = Image.alpha_composite(Image.new("RGBA", rgba.size, (background,) * 3 + (255,)), rgba).convert("RGB")
    gray = cv2.cvtColor(np.asarray(composite), cv2.COLOR_RGB2GRAY)
    border = np.concatenate((gray[0], gray[-1], gray[:, 0], gray[:, -1]))
    inverted = bool(np.median(border) < 127)
    if inverted:
        gray = 255 - gray
    if int(gray.max()) - int(gray.min()) < 12:
        raise ValueError("Sketch is blank or has insufficient visible contrast")

    scale = min(CANVAS_SIZE / gray.shape[1], CANVAS_SIZE / gray.shape[0])
    width = max(1, min(CANVAS_SIZE, round(gray.shape[1] * scale)))
    height = max(1, min(CANVAS_SIZE, round(gray.shape[0] * scale)))
    interpolation = cv2.INTER_AREA if scale < 1 else cv2.INTER_LINEAR
    resized = cv2.resize(gray, (width, height), interpolation=interpolation)
    cleaned = cv2.normalize(resized, None, 0, 255, cv2.NORM_MINMAX)
    cleaned = cv2.bilateralFilter(cleaned, 3, 15, 1.5)
    threshold, _ = cv2.threshold(cleaned, 0, 255, cv2.THRESH_BINARY_INV | cv2.THRESH_OTSU)
    # Never threshold near-white JPEG/background variation into a stroke.
    threshold = min(float(threshold), 220.0)
    strokes = (cleaned <= threshold).astype(np.uint8)
    count, labels, stats, _ = cv2.connectedComponentsWithStats(strokes, connectivity=8)
    removed_pixels = 0
    for label in range(1, count):
        if stats[label, cv2.CC_STAT_AREA] == 1:
            isolated = labels == label
            strokes[isolated] = 0
            cleaned[isolated] = 255
            removed_pixels += 1
    coverage = float(strokes.mean())
    if not 0 < coverage < 0.65:
        raise ValueError("No usable sparse sketch strokes found; check canvas polarity/content")
    left, top = (CANVAS_SIZE - width) // 2, (CANVAS_SIZE - height) // 2
    paper_canvas = np.full((CANVAS_SIZE, CANVAS_SIZE), 255, dtype=np.uint8)
    control_canvas = np.zeros((CANVAS_SIZE, CANVAS_SIZE), dtype=np.uint8)
    paper_canvas[top:top + height, left:left + width] = cleaned
    control_canvas[top:top + height, left:left + width] = strokes * 255

    root = Path(output_dir).expanduser().resolve() if output_dir is not None else DEFAULT_OUTPUT_DIR
    root.mkdir(parents=True, exist_ok=True)
    directory = root / f"sketch_{uuid.uuid4().hex}"
    directory.mkdir()
    original = directory / ("original.jpg" if image_format == "JPEG" else "original.png")
    cleaned_path, control_path = directory / "cleaned.png", directory / "conditioning.png"
    metadata_path = directory / "preprocessing.json"
    shutil.copyfile(source, original)
    Image.fromarray(paper_canvas).save(cleaned_path)
    Image.fromarray(control_canvas).convert("RGB").save(control_path)
    metadata_path.write_text(json.dumps({
        "source": str(source), "original_size": list(rgba.size), "canvas_size": [512, 512],
        "fitted_size": [width, height], "padding_left_top": [left, top],
        "composite_background": background, "input_inverted": inverted,
        "threshold": threshold, "removed_isolated_pixels": removed_pixels,
        "conditioning_polarity": "white_strokes_on_black", "stroke_fraction_before_padding": coverage,
    }, indent=2), encoding="utf-8")
    logger.info("Saved sketch comparison artifacts in %s", directory)
    return SketchArtifacts(*(str(path.resolve()) for path in
                             (directory, original, cleaned_path, control_path, metadata_path)))
