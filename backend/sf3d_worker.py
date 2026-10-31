"""Isolated persistent SF3D JSON worker; stdout is a protocol channel only."""
from contextlib import redirect_stdout
import json
import logging
import os
import sys
import time


def main():
    logging.basicConfig(level=logging.INFO, stream=sys.stderr)
    with redirect_stdout(sys.stderr):
        from .backends.sf3d_config import SF3DSettings
        from .backends.sf3d_runtime import SF3DRuntime
        runtime = SF3DRuntime(SF3DSettings.from_env())
    if '--ready-signal' in sys.argv:
        sys.stdout.write(json.dumps({'ready': True, 'pid': os.getpid()}) + '\n')
        sys.stdout.flush()
    for line in sys.stdin:
        request = {}
        runtime.last_report = {}
        started = time.perf_counter()
        try:
            parsed = json.loads(line)
            if not isinstance(parsed, dict):
                raise ValueError('Worker requests must be JSON objects.')
            request = parsed
            with redirect_stdout(sys.stderr):
                path = runtime.infer(request['image'], request['output'], request.get('options'))
            result = {'id': request['id'], 'path': path, 'report': runtime.last_report}
        except Exception as exc:
            logging.exception('SF3D request failed')
            result = {'id': request.get('id'), 'report': runtime.last_report,
                      'error': f'SF3D inference failed: {exc}. See backend logs. TripoSR remains available via SKETCH2SHAPE_3D_BACKEND=triposr.'}
        result['worker_request_seconds'] = time.perf_counter() - started
        sys.stdout.write(json.dumps(result, allow_nan=False) + '\n')
        sys.stdout.flush()


if __name__ == '__main__':
    main()
