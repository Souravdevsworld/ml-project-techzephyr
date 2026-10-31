"""Non-destructive bridge for existing Sketch2Shape backends.

Requires an MPS-compatible backend.sketch_refiner.refine_sketch() implementation
and the existing working backend.cli photo->SF3D path. Does not patch either.
"""
import argparse
import json
import os
from pathlib import Path
import subprocess
import sys

DEFAULT_PROMPT = (
    'A realistic studio product photograph of a single object matching the supplied '
    'line drawing, preserving its silhouette, proportions, visible structural elements '
    'and viewpoint, centered, isolated on a plain light background.'
)


def run(args):
    root = Path(args.repo).expanduser().resolve()
    sketch = Path(args.sketch).expanduser().resolve()
    if not sketch.is_file():
        raise FileNotFoundError(f'Sketch not found: {sketch}')
    if not (root / 'backend' / 'sketch_refiner.py').is_file():
        raise FileNotFoundError('Missing backend/sketch_refiner.py; upload or copy your teammate\'s working backend code')
    if not (root / 'backend' / 'cli.py').is_file():
        raise FileNotFoundError('Missing backend/cli.py; use your working SF3D repository')
    out = (root / 'backend' / 'outputs' / 'sketch_local').resolve()
    out.mkdir(parents=True, exist_ok=True)
    sketch_python = str(Path(args.sketch_python).expanduser().resolve()) if args.sketch_python else sys.executable
    sf3d_python = str(Path(args.sf3d_python).expanduser().resolve()) if args.sf3d_python else sketch_python
    prompt = args.prompt or DEFAULT_PROMPT
    code = '''import json,sys
from pathlib import Path
from backend.sketch_refiner import refine_sketch
path = Path(refine_sketch(sys.argv[1], sys.argv[2], sys.argv[3])).resolve()
if not path.is_file() or path.suffix.lower() != ".png":
    raise RuntimeError("Sketch refiner did not produce a PNG")
print("SKETCH2SHAPE_REFINED_PATH=" + str(path))
'''
    cmd1 = [sketch_python, '-c', code, str(sketch), prompt, str(out)]
    cmd2_preview = [sf3d_python, '-m', 'backend.cli', '<generated PNG>']
    if args.dry_run:
        print(json.dumps({'sketch_command': cmd1[:2] + ['<inline refinement code>', *cmd1[3:]], 'sf3d_command': cmd2_preview, 'repo': str(root)}, indent=2))
        return
    # Capture stdout to identify the generated path without assuming the output directory naming scheme.
    result = subprocess.run(cmd1, cwd=root, text=True, stdout=subprocess.PIPE, stderr=subprocess.STDOUT)
    print(result.stdout)
    if result.returncode:
        raise RuntimeError('Sketch inference failed. The notebook may still be CUDA-only; MPS adaptation is required.')
    markers = [line.removeprefix('SKETCH2SHAPE_REFINED_PATH=') for line in result.stdout.splitlines() if line.startswith('SKETCH2SHAPE_REFINED_PATH=')]
    if len(markers) != 1:
        raise RuntimeError('Could not identify one generated PNG')
    refined = Path(markers[0]).resolve()
    if not refined.is_file() or refined.suffix.lower() != '.png' or not refined.is_relative_to(out):
        raise RuntimeError('Refiner returned an invalid or unexpected PNG path')
    print('Generated PNG:', refined)
    env = os.environ.copy()
    env.update({'SKETCH2SHAPE_INPUT_MODE':'photo','SKETCH2SHAPE_3D_BACKEND':'sf3d','SKETCH2SHAPE_3D_FALLBACK':'error','SF3D_DEVICE':args.sf3d_device})
    if args.sf3d_device == 'cpu':
        env['SF3D_USE_CPU'] = '1'
    subprocess.run([sf3d_python, '-m', 'backend.cli', str(refined)], cwd=root, env=env, check=True)


if __name__ == '__main__':
    p = argparse.ArgumentParser(description='Run existing sketch-to-image then existing SF3D (no backend changes)')
    p.add_argument('sketch')
    p.add_argument('--repo', default='.')
    p.add_argument('--prompt', default=None)
    p.add_argument('--sketch-python', help='Interpreter containing local sketch dependencies')
    p.add_argument('--sf3d-python', help='Interpreter containing existing SF3D dependencies')
    p.add_argument('--sf3d-device', choices=['cpu','mps'], default='cpu')
    p.add_argument('--dry-run', action='store_true')
    run(p.parse_args())
