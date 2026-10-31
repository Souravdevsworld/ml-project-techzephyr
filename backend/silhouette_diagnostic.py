"""B2A controlled mug silhouette experiment, separate from production routing.

Mask convention: opaque grayscale PNG; white=object, black=background/handle
opening. Match the EXIF-oriented sketch dimensions exactly. No inferred masks,
hole filling, stroke normalization, or learned models are used.
"""
import argparse
from collections import deque
import hashlib
import json
from pathlib import Path

import numpy as np
from PIL import Image, ImageOps


def components(binary):
    """8-connected regions; return size and whether each touches the image edge."""
    remaining = binary.copy()
    height, width = remaining.shape
    regions = []
    for y, x in zip(*np.nonzero(binary)):
        if not remaining[y, x]:
            continue
        remaining[y, x] = False
        queue = deque([(int(y), int(x))])
        count, edge = 0, False
        while queue:
            yy, xx = queue.popleft()
            count += 1
            edge |= yy in (0, height-1) or xx in (0, width-1)
            for dy, dx in ((-1,-1),(-1,0),(-1,1),(0,-1),(0,1),(1,-1),(1,0),(1,1)):
                ny, nx = yy+dy, xx+dx
                if 0 <= ny < height and 0 <= nx < width and remaining[ny,nx]:
                    remaining[ny,nx] = False
                    queue.append((ny,nx))
        regions.append((count, edge))
    return regions


def validate_silhouette(mask):
    values = np.asarray(mask)
    foreground = values >= 128
    fraction = float(foreground.mean())
    if not .005 <= fraction <= .95:
        raise ValueError('Mask is empty, tiny, or nearly fully opaque; white must represent the mug.')
    if np.any(values[0] >= 8) or np.any(values[-1] >= 8) or np.any(values[:,0] >= 8) or np.any(values[:,-1] >= 8):
        raise ValueError('Mask foreground touches an edge; provide transparent external margins.')
    if np.mean((values > 8) & (values < 247)) > .05:
        raise ValueError('Mask must be solid with only narrow antialiased edges, not a shaded image.')
    regions = components(foreground)
    if len(regions) != 1:
        raise ValueError('Mask must contain one connected mug body and handle, not separate strokes or objects.')
    holes = [area for area, edge in components(values < 8) if not edge and area >= 4]
    if not holes:
        raise ValueError('Mask needs a transparent enclosed handle opening (at least four pixels).')
    y, x = np.nonzero(values >= 8)
    return dict(foreground_fraction=fraction, foreground_components=len(regions),
                hole_count=len(holes), hole_areas=sorted(holes, reverse=True),
                bbox=[int(x.min()), int(y.min()), int(x.max())+1, int(y.max())+1])


def load_inputs(sketch_path, mask_path):
    try:
        with Image.open(sketch_path) as source:
            if source.format not in {'PNG', 'JPEG'}:
                raise ValueError('Sketch must be PNG or JPEG.')
            source.load()
            sketch = ImageOps.exif_transpose(source).convert('RGBA')
        with Image.open(mask_path) as source:
            if source.format != 'PNG':
                raise ValueError('Mask must be a lossless grayscale PNG, not JPEG.')
            source.load()
            rgba = ImageOps.exif_transpose(source).convert('RGBA')
            pixels = np.asarray(rgba)
            if not np.all(pixels[:,:,3] == 255):
                raise ValueError('Export mask as opaque grayscale PNG: white object, black background and handle opening; alpha masks are ambiguous.')
            if not (np.array_equal(pixels[:,:,0], pixels[:,:,1]) and np.array_equal(pixels[:,:,1], pixels[:,:,2])):
                raise ValueError('Mask must be grayscale, not colored.')
            if source.mode not in {'1', 'L', 'RGB', 'RGBA', 'P'}:
                raise ValueError('Mask must be an 8-bit grayscale PNG.')
            mask = rgba.convert('L')
    except (OSError, Image.DecompressionBombError) as exc:
        raise ValueError('Invalid or unreadable sketch/mask image.') from exc
    if sketch.size != mask.size:
        raise ValueError('Sketch and mask dimensions must match after EXIF orientation; masks are never stretched.')
    return sketch, mask


def create_reference(sketch_path, mask_path, output_dir):
    """Read sources only; write diagnostics exclusively to a new directory."""
    sketch_path, mask_path = Path(sketch_path).expanduser().resolve(), Path(mask_path).expanduser().resolve()
    directory = Path(output_dir).expanduser().resolve()
    if directory.exists():
        raise ValueError('Output directory must be new; existing files are never overwritten.')
    sketch, mask = load_inputs(sketch_path, mask_path)
    source_diagnostics = validate_silhouette(mask)
    white = Image.new('RGBA', sketch.size, 'white')
    white.alpha_composite(sketch)
    reference = white.convert('RGB').convert('RGBA')
    reference.putalpha(mask)
    bbox = source_diagnostics['bbox']
    cutout = reference.crop(tuple(bbox))
    scale = 512 * .85 / max(cutout.size)
    dimensions = tuple(max(1, round(edge * scale)) for edge in cutout.size)
    cutout = cutout.convert('RGBa').resize(dimensions, Image.Resampling.LANCZOS).convert('RGBA')
    final = Image.new('RGBA', (512,512), (0,0,0,0))
    offset = ((512-dimensions[0])//2, (512-dimensions[1])//2)
    final.alpha_composite(cutout, offset)
    final_diagnostics = validate_silhouette(final.getchannel('A'))
    if final_diagnostics['hole_count'] != source_diagnostics['hole_count']:
        raise ValueError('Framing changed the mask hole count; use a larger/clearer handle opening.')
    metadata = dict(experiment='B2A_manual_mug_silhouette',
                    sketch_path=str(sketch_path), mask_path=str(mask_path),
                    sketch_sha256=hashlib.sha256(sketch_path.read_bytes()).hexdigest(),
                    mask_sha256=hashlib.sha256(mask_path.read_bytes()).hexdigest(),
                    input_size=list(sketch.size), output_size=[512,512],
                    foreground_ratio=.85, scale=scale, resized_size=list(dimensions), offset=list(offset),
                    source_mask=source_diagnostics, final_mask=final_diagnostics,
                    rgb_policy='Original colors/linework; source transparency composited over white; supplied mask replaces alpha.',
                    warnings=['Topology checks cannot establish semantic correctness: manually verify body, handle material and handle opening.',
                              'No depth or shading is inferred; a valid textured GLB does not establish a recognizable volumetric mug.'],
                    inference_input_mode='photo')
    # Do all validation before reserving the output directory. Exclusive creation
    # protects both sources and existing diagnostics, including concurrent runs.
    directory.mkdir(parents=True, exist_ok=False)
    white.convert('RGB').save(directory/'original_preview.png')
    mask.save(directory/'silhouette_mask.png')
    final.save(directory/'reference.png')
    final.getchannel('A').save(directory/'alpha.png')
    preview = Image.new('RGBA', final.size, (127,127,127,255))
    preview.alpha_composite(final)
    preview.convert('RGB').save(directory/'reference_preview.png')
    (directory/'metadata.json').write_text(json.dumps(metadata, indent=2))
    return directory/'reference.png'


def main():
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument('sketch')
    parser.add_argument('mask')
    parser.add_argument('--output-dir', required=True)
    args = parser.parse_args()
    try:
        print(create_reference(args.sketch, args.mask, args.output_dir))
    except (ValueError, OSError) as exc:
        parser.exit(2, f'Silhouette diagnostic failed: {exc}\n')


if __name__ == '__main__':
    main()
