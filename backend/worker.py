"""Persistent JSON-lines subprocess. Stdout is exclusively the reply channel."""
from contextlib import redirect_stdout
import json
import logging
import sys
import time
import os


def main():
    logging.basicConfig(level=logging.INFO, stream=sys.stderr)
    with redirect_stdout(sys.stderr):
        from .config import Settings
        from .runtime import Runtime
        from .preprocessing import PreprocessOptions
        runtime = Runtime(Settings.from_env())
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
                options = PreprocessOptions.from_dict(request['preprocessing']) if 'preprocessing' in request else None
                path = runtime.infer(request['image'], request['output'], options)
            result = {'id': request['id'], 'path': path, 'report': runtime.last_report}
        except Exception as exc:
            logging.exception('TripoSR request failed')
            result = {'id': request.get('id'), 'report': runtime.last_report, 'error': f'TripoSR inference failed: {exc}. See backend logs. For MPS failures retry explicitly on CPU.'}
        result['worker_request_seconds'] = time.perf_counter() - started
        sys.stdout.write(json.dumps(result) + '\n')
        sys.stdout.flush()


if __name__ == '__main__':
    main()
