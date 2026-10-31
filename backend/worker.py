"""Persistent JSON-lines subprocess. Stdout is exclusively the reply channel."""
from contextlib import redirect_stdout
import json
import logging
import sys


def main():
    logging.basicConfig(level=logging.INFO, stream=sys.stderr)
    with redirect_stdout(sys.stderr):
        from .config import Settings
        from .runtime import Runtime
        runtime = Runtime(Settings.from_env())
    for line in sys.stdin:
        request = {}
        try:
            request = json.loads(line)
            with redirect_stdout(sys.stderr):
                path = runtime.infer(request['image'], request['output'])
            result = {'id': request['id'], 'path': path}
        except Exception as exc:
            logging.exception('TripoSR request failed')
            result = {'id': request.get('id'), 'error': f'TripoSR inference failed: {exc}. See backend logs. For MPS failures retry explicitly on CPU.'}
        sys.stdout.write(json.dumps(result) + '\n')
        sys.stdout.flush()


if __name__ == '__main__':
    main()
