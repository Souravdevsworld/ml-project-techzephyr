"""Deterministic line-art conditioning. No segmentation or learned models.

The alpha represents one rectangular reference panel, never individual strokes
or a claimed object silhouette. Reconstruction quality requires real SF3D tests.
"""
import argparse
import hashlib
import json
import math
import os
from pathlib import Path
import time

import numpy as np
from PIL import Image, ImageOps, UnidentifiedImageError


def input_mode(value=None):
    value = os.environ.get('SKETCH2SHAPE_INPUT_MODE', 'photo') if value is None else value
    if value not in {'photo', 'sketch', 'auto'}:
        raise ValueError('SKETCH2SHAPE_INPUT_MODE must be photo, sketch, or auto.')
    return value


def read_sketch(path):
    try:
        with Image.open(path) as source:
            if source.format not in {'PNG', 'JPEG'}:
                raise ValueError('Sketch input must be PNG or JPEG.')
            source.load()
            return ImageOps.exif_transpose(source).convert('RGBA')
    except (OSError, UnidentifiedImageError, Image.DecompressionBombError) as exc:
        raise ValueError('Invalid or unreadable sketch image.') from exc


def analyze(image):
    rgba = np.asarray(image, dtype=np.float32)
    alpha = rgba[:, :, 3] / 255
    rgb = rgba[:, :, :3]
    # Invisible RGB must never contribute to contrast or auto classification.
    visible = alpha > .03
    if not visible.any():
        raise ValueError('Blank sketch: no visible strokes.')
    lum = rgb @ np.array([.299, .587, .114])
    border = np.concatenate((lum[0], lum[-1], lum[:, 0], lum[:, -1]))
    border_alpha = np.concatenate((alpha[0], alpha[-1], alpha[:, 0], alpha[:, -1]))
    transparent = float((alpha < .03).mean()) > .5
    if transparent:
        # Sparse transparent strokes can be either light or dark.
        light_strokes = float(np.median(lum[visible])) > 127
        ink = (lum if light_strokes else 255-lum) * alpha
        polarity = 'light_on_transparent' if light_strokes else 'dark_on_transparent'
    else:
        background = float(np.median(border[border_alpha > .5])) if (border_alpha > .5).any() else 255.
        light_strokes = background < 127
        composite = lum * alpha + background * (1-alpha)
        ink = np.maximum(0, composite-background if light_strokes else background-composite)
        polarity = 'light_on_dark' if light_strokes else 'dark_on_light'
    support = ink >= 12
    ys, xs = np.nonzero(support)
    count = len(xs)
    if count < max(24, ink.size * .0002):
        raise ValueError('Blank or effectively empty sketch: insufficient visible strokes.')
    bbox = [int(xs.min()), int(ys.min()), int(xs.max())+1, int(ys.max())+1]
    width, height = bbox[2]-bbox[0], bbox[3]-bbox[1]
    if min(width, height) < 8 or width * height < 144:
        raise ValueError('Sketch is too tiny or incomplete to frame reliably.')
    chroma = np.max(rgb, axis=2)-np.min(rgb, axis=2)
    # Deliberately narrow heuristic: near-neutral sparse ink, flat background,
    # very few midtones. Ambiguous images stay on the original photo route.
    obvious = bool((chroma[visible] < 15).mean() > .99
                   and .002 < support.mean() < .18
                   and ((ink > 20) & (ink < 220)).mean() < .035
                   and (transparent or np.std(border) < 8))
    return ink, bbox, {'polarity': polarity, 'stroke_pixels': count,
                       'stroke_fraction': float(support.mean()), 'obvious_line_art': obvious}


def resolve_mode(path, requested=None):
    requested = input_mode(requested)
    if requested != 'auto':
        return requested
    try:
        return 'sketch' if analyze(read_sketch(path))[2]['obvious_line_art'] else 'photo'
    except ValueError:
        return 'photo'


def prepare_sketch(path, foreground_ratio=.85, size=512):
    started = time.perf_counter()
    if type(size) is not int or size < 16 or not math.isfinite(foreground_ratio) or not .1 <= foreground_ratio <= .95:
        raise ValueError('Invalid sketch framing size or foreground ratio.')
    original = read_sketch(path)
    ink, bbox, diagnostics = analyze(original)
    # Threshold only locates content; retain continuous antialiasing in pixels.
    normalized = Image.fromarray(np.clip(255-ink, 0, 255).astype('uint8'), 'L').convert('RGBA')
    # Small paper margin retains faint contours adjacent to detected support.
    pad = max(2, round(max(bbox[2]-bbox[0], bbox[3]-bbox[1])*.025))
    crop = [max(0, bbox[0]-pad), max(0, bbox[1]-pad),
            min(original.width, bbox[2]+pad), min(original.height, bbox[3]+pad)]
    panel = normalized.crop(crop)
    scale = size*foreground_ratio/max(panel.size)
    dimensions = tuple(max(1, round(v*scale)) for v in panel.size)
    panel = panel.resize(dimensions, Image.Resampling.LANCZOS)
    result = Image.new('RGBA', (size, size), (0, 0, 0, 0))
    result.alpha_composite(panel, ((size-dimensions[0])//2, (size-dimensions[1])//2))
    warnings = ['Reference-panel alpha is not an object silhouette; sketch reconstruction quality is unvalidated.']
    if 0 in bbox[:2] or bbox[2] == original.width or bbox[3] == original.height:
        warnings.append('Strokes touch the source edge; the drawing may be clipped.')
    metadata = dict(diagnostics, mode='sketch', effective_mode='sketch',
                    input_path=str(Path(path).resolve()), input_sha256=hashlib.sha256(Path(path).read_bytes()).hexdigest(),
                    input_size=list(original.size), bbox=bbox, crop_bbox=crop,
                    output_size=list(result.size), panel_size=list(dimensions), foreground_ratio=foreground_ratio,
                    segmentation_outcome='skipped_sketch_reference_panel', warnings=warnings,
                    timings={'preprocessing_seconds': time.perf_counter()-started})
    return result, metadata


def main():
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument('image')
    parser.add_argument('--output-dir', required=True, help='New directory; existing directories are refused.')
    args = parser.parse_args()
    image, metadata = prepare_sketch(args.image)
    # Exclusive directory prevents accidentally overwriting a source image.
    directory = Path(args.output_dir).expanduser().resolve()
    directory.mkdir(parents=True, exist_ok=False)
    read_sketch(args.image).save(directory/'original.png')
    image.save(directory/'prepared.png')
    background = Image.new('RGBA', image.size, (127, 127, 127, 255))
    background.alpha_composite(image)
    background.convert('RGB').save(directory/'preview.png')
    image.getchannel('A').save(directory/'alpha.png')
    (directory/'metadata.json').write_text(json.dumps(metadata, indent=2))
    print(directory)


if __name__ == '__main__':
    main()
