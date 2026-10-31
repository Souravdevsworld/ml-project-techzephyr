"""Exercise actual harmless CPU subprocess exits and timeout cleanup."""
import os
import subprocess
import sys
import threading
import time
from pathlib import Path

import pytest
from backend.process import WorkerError, run_worker
from backend import process


def run(code,tmp_path,timeout=3):
    return run_worker([sys.executable,'-u','-c',code],cwd=tmp_path,env=os.environ.copy(),log_path=tmp_path/'worker.log',timeout=timeout,stage='Test worker')


def test_process_success_and_log(tmp_path):
    run("print('worker completed')",tmp_path)
    assert 'worker completed' in (tmp_path/'worker.log').read_text()


def test_nonzero_exit(tmp_path):
    with pytest.raises(WorkerError,match='exit 7'):
        run('raise SystemExit(7)',tmp_path)


def test_missing_interpreter(tmp_path):
    with pytest.raises(WorkerError,match='could not start'):
        run_worker(['/nonexistent/python'],cwd=tmp_path,env=os.environ.copy(),log_path=tmp_path/'worker.log',timeout=1,stage='Test')


def test_shutdown_stops_active_worker(tmp_path, monkeypatch):
    launched = threading.Event()
    original = process.subprocess.Popen
    def popen(*args, **kwargs):
        child = original(*args, **kwargs)
        with process._ACTIVE_LOCK:
            process._ACTIVE.add(child)
        launched.set()
        return child
    monkeypatch.setattr(process.subprocess, 'Popen', popen)
    failures = []
    def wait():
        try:
            run('import time; time.sleep(30)', tmp_path, timeout=40)
        except WorkerError as exc:
            failures.append(exc)
    thread = threading.Thread(target=wait)
    thread.start()
    assert launched.wait(5)
    process.stop_workers()
    thread.join(5)
    assert not thread.is_alive()
    assert len(failures) == 1
    assert not process._ACTIVE


@pytest.mark.skipif(os.name!='posix',reason='POSIX process-group cleanup')
def test_timeout_stops_child_processes(tmp_path):
    code = "import subprocess,sys,time; child=subprocess.Popen([sys.executable,'-c','import time; time.sleep(30)']); print(child.pid,flush=True); time.sleep(30)"
    with pytest.raises(WorkerError,match='exceeded'):
        run(code,tmp_path,timeout=1)
    pid = int((tmp_path/'worker.log').read_text().strip())
    status = Path(f'/proc/{pid}/stat')
    # A reparented zombie is terminated; it awaits the container init's reap.
    if status.exists():
        assert status.read_text().split()[2] in {'Z','X'}
