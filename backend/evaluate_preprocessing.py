"""Controlled, repeatable input/GLB comparisons using one persistent worker."""
import argparse
import csv
from dataclasses import asdict, replace
import hashlib
import importlib.metadata
import json
import logging
from pathlib import Path
import platform
import subprocess
import time
import uuid

from PIL import Image, ImageDraw, ImageFont, ImageOps

from .config import Settings
from .generator import generate_with_report, shutdown_worker
from .preprocessing import Preprocessor

log = logging.getLogger(__name__)
RUBRIC = ['recognizability', 'silhouette_fidelity', 'handles_and_openings',
          'absence_of_background_geometry', 'absence_of_surface_distortion', 'visual_completeness']


def configurations(base, ratios):
    cases = [('baseline', replace(base, mode='baseline')),
             ('segmented_gray', replace(base, mode='photo', center_foreground=False)),
             ('centered_085', replace(base, mode='photo', center_foreground=True, foreground_ratio=0.85))]
    for ratio in dict.fromkeys(ratios):
        options = replace(base, mode='photo', center_foreground=True, foreground_ratio=ratio)
        if ratio != 0.85:
            cases.append((f'centered_{ratio:.3f}'.replace('.', '_'), options))
    return cases


def comparison_image(records, output):
    columns = [('original.png', 'Original'), ('alpha.png', 'Alpha'),
               ('foreground.png', 'Foreground'), ('bbox.png', 'Bounds'), ('final.png', 'TripoSR input')]
    width, height = 240, 290
    canvas = Image.new('RGB', (width * len(columns), height * len(records)), '#171e2c')
    draw = ImageDraw.Draw(canvas)
    font = ImageFont.load_default(size=13)
    for row, record in enumerate(records):
        debug_dir = record.get('preprocessing', {}).get('debug_dir')
        for col, (filename, label) in enumerate(columns):
            x, y = col * width, row * height
            draw.text((x+8, y+8), f"{record['case']} / {label}", fill='white', font=font)
            if debug_dir and (Path(debug_dir) / filename).is_file():
                with Image.open(Path(debug_dir) / filename) as source:
                    image = source.convert('RGBA')
                image.thumbnail((width-16, height-60), Image.Resampling.LANCZOS)
                tile = Image.new('RGBA', image.size, '#7f7f7f')
                tile.alpha_composite(image)
                canvas.paste(tile.convert('RGB'), (x+(width-image.width)//2, y+32+(height-60-image.height)//2))
            else:
                draw.text((x+8, y+60), 'Not available / not used', fill='#9eaac2', font=font)
        summary = record.get('preprocessing', {}).get('segmentation_outcome', record['status'])
        draw.text((8, (row+1)*height-22), f"Outcome: {summary}", fill='#9ce7cf', font=font)
    canvas.save(output)


def run_evaluation(image, output_dir, *, ratios=(0.75, 0.9), preprocess_only=False, options=None):
    settings = Settings.from_env()
    base = options or settings.preprocessing
    # Validate every comparison before launching any expensive request.
    cases = configurations(base, ratios)
    source = Path(image).expanduser().resolve(strict=True)
    with Image.open(source) as opened:
        opened.verify()
    run_dir = Path(output_dir).expanduser().resolve() / uuid.uuid4().hex
    run_dir.mkdir(parents=True, exist_ok=False)
    preprocessor = Preprocessor() if preprocess_only else None
    report = {
        'input_path': str(source), 'input_sha256': hashlib.sha256(source.read_bytes()).hexdigest(),
        'preprocess_only': preprocess_only, 'quality_improvement_verified': False,
        'settings': asdict(settings), 'platform': platform.platform(), 'python': platform.python_version(),
        'versions': {name: importlib.metadata.version(name) for name in ('Pillow', 'numpy', 'rembg', 'onnxruntime', 'trimesh')},
        'runs': [], 'human_review': 'Score each rubric item 1 (poor) to 5 (good). Inspect every GLB from matching views; polygon count is not a quality score.',
    }
    git = subprocess.run(['git', 'rev-parse', 'HEAD'], capture_output=True, text=True)
    dirty = subprocess.run(['git', 'status', '--porcelain'], capture_output=True, text=True)
    report.update(backend_commit=git.stdout.strip() or None, backend_dirty=bool(dirty.stdout.strip()))
    report['backend_source_sha256'] = {name: hashlib.sha256(Path(__file__).with_name(name).read_bytes()).hexdigest()
        for name in ('preprocessing.py', 'runtime.py', 'generator.py', 'worker.py', 'config.py', 'evaluate_preprocessing.py')}
    for name, candidate in cases:
        candidate = replace(candidate, debug=True, debug_dir=str(run_dir / name))
        started = time.perf_counter()
        record = {'case': name, 'mode': candidate.mode, 'foreground_ratio': candidate.foreground_ratio,
                  'input_path': str(source), 'options': asdict(candidate), 'path': None,
                  'valid_glb': None, 'vertex_count': None, 'face_count': None,
                  'status': 'error', 'error': None,
                  'preprocessing': {'segmentation_outcome': 'not_executed', 'warnings': []},
                  'timings': {'preprocessing_seconds': None, 'inference_seconds': None, 'total_seconds': None}}
        try:
            if preprocess_only:
                prepared = preprocessor.process(source, candidate, legacy_remove_background=settings.remove_background)
                record.update(preprocessing=prepared.metadata, status='preprocess_only', timings=prepared.metadata['timings'])
            else:
                record.update(generate_with_report(str(source), preprocessing=candidate, output_dir=run_dir / 'glbs'))
                record['status'] = 'generated'
        except Exception as exc:
            if isinstance(getattr(exc, 'report', None), dict):
                record.update(exc.report)
            record.update(error=f'{type(exc).__name__}: {exc}', valid_glb=False)
            log.error('Evaluation case %s failed: %s', name, exc)
        elapsed = time.perf_counter() - started
        record['timings']['evaluation_case_seconds'] = elapsed
        for key in ('preprocessing_seconds', 'inference_seconds', 'mesh_extraction_seconds'):
            record['timings'].setdefault(key, None)
        if record['timings'].get('total_seconds') is None:
            record['timings']['total_seconds'] = elapsed
        report['runs'].append(record)
        # Preserve completed cases if a later request fails or the process stops.
        (run_dir / 'report.json').write_text(json.dumps(report, indent=2, allow_nan=False))
    comparison_image(report['runs'], run_dir / 'comparison.png')
    with (run_dir / 'review.csv').open('w', newline='') as handle:
        writer = csv.DictWriter(handle, fieldnames=['case', 'glb_path', *RUBRIC, 'notes'])
        writer.writeheader()
        for record in report['runs']:
            writer.writerow({'case': record['case'], 'glb_path': record['path'] or ''})
    log.info('Evaluation artifacts: %s', run_dir)
    return run_dir, report


def main():
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument('image')
    parser.add_argument('--output-dir', default=str(Path(__file__).parent / 'evaluations'))
    parser.add_argument('--ratios', nargs='+', type=float, default=[0.75, 0.9])
    parser.add_argument('--preprocess-only', action='store_true', help='Inspect inputs/masks without running or claiming TripoSR inference.')
    args = parser.parse_args()
    logging.basicConfig(level=logging.INFO)
    try:
        directory, report = run_evaluation(args.image, args.output_dir, ratios=args.ratios, preprocess_only=args.preprocess_only)
        print(directory)
        # Successful baseline fallback is recorded, but an inference error is not
        # a successful quality comparison. JSON records all distinct outcomes.
        return 1 if any(run['status'] == 'error' for run in report['runs']) else 0
    finally:
        shutdown_worker()


if __name__ == '__main__':
    raise SystemExit(main())
