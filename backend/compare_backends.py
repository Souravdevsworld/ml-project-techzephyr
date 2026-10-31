"""Compare real image-to-3D assets without inferring quality from mesh counts.

The default matrix covers the official teapot, chair and hamburger examples,
plus a user-supplied mug when available. Every engine receives the same source
file. Each retains its own documented preprocessing. Failed/missing runs remain
visible and engine fallback is deliberately disabled for a fair attribution.
Runs are grouped by engine so one warm model can handle all images before
switching, avoiding repeated initialization on memory-constrained machines.
"""
import argparse
import csv
from dataclasses import asdict, replace
import hashlib
import json
import logging
from pathlib import Path
import platform
import re
import struct
import subprocess
import time
import uuid

from .config import ROOT, Settings
from .generator import generate_with_report, shutdown_worker, validate_input

log = logging.getLogger(__name__)
ENGINES = ('triposr', 'sf3d')
EXAMPLES = (('teapot', 'teapot.png'), ('chair', 'chair.png'), ('hamburger', 'hamburger.png'))
RUBRIC = ('recognizability', 'silhouette_fidelity', 'fine_detail_preservation',
          'surface_quality', 'asset_usability', 'texture_material_quality', 'overall_quality')


def inspect_asset(path):
    """Validate a nonempty GLB and inspect exported UV/material/image metadata.

    Material/image presence is capability evidence, not an appearance-quality
    score. Counts describe unique mesh geometry, not instanced scene copies.
    """
    from .backends.assets import inspect_glb_asset

    details = inspect_glb_asset(path)
    path = Path(details['path'])
    with path.open('rb') as handle:
        header = handle.read(12)
        if len(header) != 12:
            raise ValueError('Truncated GLB header.')
        magic, version, length = struct.unpack('<4sII', header)
        if magic != b'glTF' or version != 2 or length != path.stat().st_size:
            raise ValueError('Invalid GLB version or declared length.')
        document = None
        while handle.tell() < length:
            chunk_header = handle.read(8)
            if len(chunk_header) != 8:
                raise ValueError('Truncated GLB chunk header.')
            chunk_size, chunk_type = struct.unpack('<II', chunk_header)
            if chunk_size > length - handle.tell():
                raise ValueError('Truncated GLB chunk.')
            if chunk_type == 0x4E4F534A:
                document = json.loads(handle.read(chunk_size).decode('utf-8').rstrip('\0 \t\r\n'))
            else:
                handle.seek(chunk_size, 1)
        if document is None:
            raise ValueError('GLB JSON chunk is missing.')
    materials = document.get('materials', [])
    textures = document.get('textures', [])
    images = document.get('images', [])
    references = []

    def find_texture_slots(value, prefix=''):
        if isinstance(value, dict):
            for name, item in value.items():
                slot = f'{prefix}.{name}' if prefix else name
                if name.endswith('Texture') and isinstance(item, dict):
                    index = item.get('index')
                    if type(index) is int and 0 <= index < len(textures):
                        references.append(slot)
                find_texture_slots(item, slot)
        elif isinstance(value, list):
            for i, item in enumerate(value):
                find_texture_slots(item, f'{prefix}[{i}]')

    find_texture_slots(materials, 'materials')
    external = [item['uri'] for item in images if 'uri' in item and not item['uri'].startswith('data:')]
    return {
        **details,
        'has_uvs': details['has_uv'], 'material_count': len(materials),
        'texture_count': len(textures),
        'image_count': len(images), 'texture_slots': references,
        'external_image_resources': external, 'images_embedded': bool(images) and not external,
        'file_size_bytes': path.stat().st_size,
    }


def comparison_inputs(examples_dir, mug=None, images=()):
    directory = Path(examples_dir).expanduser().resolve()
    result = [{'name': name, 'path': directory / filename, 'required': True}
              for name, filename in EXAMPLES]
    result.append({'name': 'user_mug', 'path': Path(mug).expanduser().resolve() if mug else None,
                   'required': mug is not None})
    for index, image in enumerate(images, 1):
        path = Path(image).expanduser().resolve()
        safe_name = re.sub(r'[^A-Za-z0-9_-]', '_', path.stem)[:60] or 'object'
        result.append({'name': f'extra_{index}_{safe_name}', 'path': path, 'required': True})
    return result


def _git_provenance():
    result = {}
    try:
        commit = subprocess.run(['git', '-C', str(ROOT), 'rev-parse', 'HEAD'],
                                capture_output=True, text=True, timeout=5)
        dirty = subprocess.run(['git', '-C', str(ROOT), 'status', '--porcelain'],
                               capture_output=True, text=True, timeout=5)
        result.update(backend_commit=commit.stdout.strip() or None,
                      backend_dirty=bool(dirty.stdout.strip()))
    except (OSError, subprocess.SubprocessError):
        result['provenance_warning'] = 'Git metadata unavailable.'
    result['comparison_source_sha256'] = hashlib.sha256(Path(__file__).read_bytes()).hexdigest()
    return result


def _actual_engine(report):
    for key in ('actual_engine', 'actual_backend', 'engine', 'backend'):
        value = report.get(key)
        if isinstance(value, str):
            return value
    return None


def run_comparison(examples_dir, output_dir, *, mug=None, images=(), engines=ENGINES,
                   triposr_preprocessing=None):
    """Write a unique comparison run; all successful assets are really validated.

    This helper never generates an example/placeholder mesh and never enables
    fallback. Unit tests may mock its generation call, independently of this CLI.
    """
    engines = tuple(dict.fromkeys(engines))
    if not engines or any(engine not in ENGINES for engine in engines):
        raise ValueError('Comparison engines must be triposr and/or sf3d.')
    settings = Settings.from_env()
    options = triposr_preprocessing or settings.preprocessing
    inputs = comparison_inputs(examples_dir, mug, images)
    run_dir = Path(output_dir).expanduser().resolve() / uuid.uuid4().hex
    run_dir.mkdir(parents=True, exist_ok=False)
    report = {
        'engines': list(engines), 'fallback_enabled': False, 'execution_order': 'grouped_by_engine',
        'quality_improvement_verified': False,
        'platform': platform.platform(), 'python': platform.python_version(),
        'triposr_preprocessing': asdict(options),
        'human_review': 'Score each item 1 (poor) to 5 (good), using matched views, camera, scale and lighting. Counts and texture presence are not quality scores.',
        'review_rubric': list(RUBRIC), 'runs': [],
        **_git_provenance(),
    }
    prepared_inputs = []
    for item in inputs:
        source = item['path']
        source_error = None
        source_hash = None
        if source is not None:
            try:
                source = validate_input(str(source))
                source_hash = hashlib.sha256(source.read_bytes()).hexdigest()
            except Exception as exc:
                source_error = f'{type(exc).__name__}: {exc}'
        prepared_inputs.append({**item, 'path': source, 'source_error': source_error, 'source_hash': source_hash})
    # Group runs by engine: a single warm backend can process the entire image
    # set before dispatch releases it and initializes the next engine. Pair
    # records by input_name/input_sha256, not adjacency in execution order.
    for engine in engines:
        for item in prepared_inputs:
            source, source_error, source_hash = item['path'], item['source_error'], item['source_hash']
            record = {
                'input_name': item['name'], 'input_path': str(source) if source else None,
                'input_sha256': source_hash, 'requested_engine': engine, 'actual_engine': None,
                'status': 'error', 'error': None, 'warnings': [], 'path': None,
                'output_format': None, 'valid_glb': None, 'vertex_count': None,
                'face_count': None, 'has_uvs': None, 'has_materials': None, 'has_textures': None,
                'preprocessing_mode': None, 'runtime_seconds': None,
            }
            if source is None:
                record.update(status='skipped', warnings=['Optional user mug image was not supplied; no mug reconstruction was attempted.'])
            elif source_error:
                record.update(error=source_error, valid_glb=False)
            else:
                started = time.perf_counter()
                try:
                    details = generate_with_report(
                        str(source), engine=engine, fallback=False,
                        preprocessing=options if engine == 'triposr' else None,
                        output_dir=run_dir / 'assets' / item['name'] / engine,
                    )
                    record['generation_report'] = details
                    record['actual_engine'] = _actual_engine(details)
                    prep = details.get('preprocessing', {})
                    record['preprocessing_mode'] = prep.get('effective_mode', prep.get('mode'))
                    record['warnings'].extend(prep.get('warnings', []))
                    record.update(inspect_asset(details['path']))
                    if record['actual_engine'] != engine:
                        raise RuntimeError(f"Requested {engine}; actual engine is {record['actual_engine']!r}. This run cannot be attributed to the requested engine.")
                    record['status'] = 'generated'
                except Exception as exc:
                    if isinstance(getattr(exc, 'report', None), dict):
                        record['generation_report'] = exc.report
                        record['actual_engine'] = _actual_engine(exc.report)
                    record['error'] = f'{type(exc).__name__}: {exc}'
                    if record['valid_glb'] is None:
                        record['valid_glb'] = False
                    log.error('%s / %s failed: %s', item['name'], engine, exc)
                finally:
                    record['runtime_seconds'] = time.perf_counter() - started
            report['runs'].append(record)
            (run_dir / 'report.json').write_text(json.dumps(report, indent=2, allow_nan=False))
    with (run_dir / 'review.csv').open('w', newline='') as handle:
        fields = ['input_name', 'requested_engine', 'actual_engine', 'glb_path', *RUBRIC, 'notes']
        writer = csv.DictWriter(handle, fieldnames=fields)
        writer.writeheader()
        for record in report['runs']:
            writer.writerow({
                'input_name': record['input_name'], 'requested_engine': record['requested_engine'],
                'actual_engine': record['actual_engine'] or '', 'glb_path': record['path'] or '',
            })
    return run_dir, report


def main(argv=None):
    parser = argparse.ArgumentParser(description=__doc__)
    default_source = Settings.from_env().source
    parser.add_argument('--examples-dir', default=str(Path(default_source) / 'examples'))
    parser.add_argument('--mug', help='Original mug photograph; omitted images remain explicitly skipped.')
    parser.add_argument('--image', action='append', default=[], help='Additional image path; repeat for more images.')
    parser.add_argument('--engines', choices=ENGINES, nargs='+', default=list(ENGINES))
    parser.add_argument('--triposr-mode', choices=('baseline', 'photo', 'auto', 'none'))
    parser.add_argument('--output-dir', default=str(Path(__file__).parent / 'evaluations/backends'))
    args = parser.parse_args(argv)
    logging.basicConfig(level=logging.INFO)
    options = Settings.from_env().preprocessing
    if args.triposr_mode:
        options = replace(options, mode=args.triposr_mode)
    try:
        directory, report = run_comparison(args.examples_dir, args.output_dir, mug=args.mug,
                                          images=args.image, engines=args.engines,
                                          triposr_preprocessing=options)
        print(directory)
        return 1 if any(run['status'] == 'error' for run in report['runs']) else 0
    finally:
        shutdown_worker()


if __name__ == '__main__':
    raise SystemExit(main())
