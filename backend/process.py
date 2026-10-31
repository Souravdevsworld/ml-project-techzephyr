"""Run an isolated model worker and stop its complete process group on failure."""
import atexit
import os
from pathlib import Path
import signal
import subprocess
import threading

_ACTIVE = set()
_ACTIVE_LOCK = threading.Lock()


class WorkerError(RuntimeError):
    pass


def run_worker(command: list[str], *, cwd: Path, env: dict, log_path: Path,
               timeout: int, stage: str):
    with log_path.open("w", encoding="utf-8") as log:
        try:
            process = subprocess.Popen(command, cwd=cwd, env=env, stdout=log,
                                       stderr=subprocess.STDOUT, shell=False,
                                       start_new_session=(os.name == "posix"))
        except OSError as exc:
            raise WorkerError(f"{stage}: worker could not start. Check the configured Python interpreter.") from exc
        with _ACTIVE_LOCK:
            _ACTIVE.add(process)
        try:
            try:
                code = process.wait(timeout=timeout)
            except BaseException as exc:
                _stop(process)
                if isinstance(exc, subprocess.TimeoutExpired):
                    raise WorkerError(f"{stage} exceeded {timeout}s; its worker was stopped. Check the job log.") from exc
                raise
            if code:
                _stop(process)
        finally:
            with _ACTIVE_LOCK:
                _ACTIVE.discard(process)
    if code:
        raise WorkerError(
            f"{stage} failed (exit {code}). Check the job log for missing GPU, weights, "
            "dependencies or GPU memory errors. No model is available for this run.")


def stop_workers():
    """Called when the app exits, including when Gradio handles Ctrl-C."""
    with _ACTIVE_LOCK:
        processes = list(_ACTIVE)
    for process in processes:
        _stop(process)


def _stop(process):
    if os.name == "posix":
        try:
            os.killpg(process.pid, signal.SIGTERM)
        except ProcessLookupError:
            pass
    elif process.poll() is None:
        process.terminate()
    try:
        process.wait(timeout=5)
    except subprocess.TimeoutExpired:
        pass
    finally:
        # The leader may exit before a child handles SIGTERM. Kill the group too.
        if os.name == "posix":
            try:
                os.killpg(process.pid, signal.SIGKILL)
            except ProcessLookupError:
                pass
        elif process.poll() is None:
            process.kill()
        process.wait()


atexit.register(stop_workers)
