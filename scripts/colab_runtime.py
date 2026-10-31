"""Notebook helpers for the existing app server and validated job downloads."""
import json
import os
from pathlib import Path
import re
import signal
import socket
import subprocess
import time
import urllib.error
import urllib.request
import zipfile


class AppServer:
    def __init__(self, runtime, *, port=7860, access="proxy", password=None, low_memory=False):
        if access not in {"proxy", "share"}:
            raise ValueError("Access must be proxy or share.")
        if access == "share" and (not isinstance(password, str) or len(password) < 12):
            raise ValueError("Choose a password of at least 12 characters for a shared link.")
        self.runtime = runtime
        self.project = Path(runtime["project"])
        self.port = int(port)
        self.access = access
        self.process = None
        self.stream = None
        self.log = self.project / "work" / "colab" / "server.log"
        self.environment = dict(os.environ, **runtime["environment"])
        self.environment["SKETCH2SHAPE_LOW_MEMORY"] = str(bool(low_memory)).lower()
        # An inherited password must not change the selected private proxy mode.
        self.environment.pop("SKETCH2SHAPE_SHARE_PASSWORD", None)
        if access == "share":
            self.environment["SKETCH2SHAPE_SHARE_PASSWORD"] = password
        self.command = [runtime["ui_python"], "-u", str(self.project / "app.py"),
                        "--host", "127.0.0.1", "--port", str(self.port), "--device", "cuda"]
        if low_memory:
            self.command.append("--low-memory")
        if access == "share":
            self.command.append("--share")

    def start(self, timeout=120):
        if self.process is not None and self.process.poll() is None:
            return self
        with socket.socket() as check:
            try:
                check.bind(("127.0.0.1", self.port))
            except OSError as exc:
                raise RuntimeError(f"Port {self.port} is already in use. Stop the previous app before launching another.") from exc
        self.log.parent.mkdir(parents=True, exist_ok=True)
        self.stream = self.log.open("w", encoding="utf-8")
        try:
            self.process = subprocess.Popen(self.command, cwd=self.project, env=self.environment,
                                            stdout=self.stream, stderr=subprocess.STDOUT,
                                            start_new_session=True, shell=False)
        except BaseException:
            self.stream.close()
            self.stream = None
            raise
        deadline = time.monotonic() + timeout
        try:
            while time.monotonic() < deadline:
                if self.process.poll() is not None:
                    raise RuntimeError(f"App exited with code {self.process.returncode}. Read {self.log}.")
                try:
                    # / also serves the login page in password-protected mode.
                    with urllib.request.urlopen(f"http://127.0.0.1:{self.port}/", timeout=2) as response:
                        if response.status == 200:
                            return self
                except (OSError, urllib.error.URLError):
                    pass
                time.sleep(0.5)
            raise RuntimeError(f"App did not become ready in {timeout}s. Read {self.log}.")
        except BaseException:
            self.stop()
            raise

    def share_url(self, timeout=120):
        if self.access != "share":
            raise ValueError("This server uses the private Colab proxy; no Gradio share link was requested.")
        deadline = time.monotonic() + timeout
        while time.monotonic() < deadline:
            if self.process is None or self.process.poll() is not None:
                raise RuntimeError("The app stopped before its share link became available.")
            content = self.log.read_text(encoding="utf-8", errors="replace")
            found = re.search(r"https://[a-zA-Z0-9-]+\.gradio\.live", content)
            if found:
                return found.group(0)
            time.sleep(1)
        raise RuntimeError("No share link was returned. Inspect the server log or choose private proxy mode; Colab/network policies may restrict sharing.")

    def stop(self):
        process = self.process
        if process is not None and process.poll() is None:
            try:
                # app.py handles SIGTERM and stops its isolated GPU workers.
                os.killpg(process.pid, signal.SIGTERM)
            except ProcessLookupError:
                pass
            try:
                process.wait(timeout=15)
            except subprocess.TimeoutExpired:
                try:
                    os.killpg(process.pid, signal.SIGKILL)
                except ProcessLookupError:
                    pass
                process.wait()
        if self.stream is not None:
            self.stream.close()
            self.stream = None


def export_latest_job(project):
    """Package a real completed job only; invoke using the UI interpreter."""
    from backend.validate_mesh import validate_mesh
    project = Path(project).resolve()
    jobs = project / "outputs" / "jobs"
    candidates = sorted(jobs.glob("*/metadata.json"), key=lambda p: p.stat().st_mtime, reverse=True)
    for metadata in candidates:
        if metadata.is_symlink() or metadata.parent.is_symlink() or not metadata.resolve().is_relative_to(jobs.resolve()):
            continue
        record = json.loads(metadata.read_text(encoding="utf-8"))
        if record.get("status") != "success":
            continue
        job = metadata.parent
        glb = job / "model.glb"
        if glb.is_symlink():
            raise ValueError("The completed job GLB must be a regular file inside its job directory.")
        validate_mesh(str(glb))
        output = project / "work" / "colab" / "exports"
        output.mkdir(parents=True, exist_ok=True)
        archive = output / f"sketch2shape-{job.name}.zip"
        with zipfile.ZipFile(archive, "w", compression=zipfile.ZIP_DEFLATED) as package:
            for path in sorted(job.rglob("*")):
                # Include actual intermediate images/metadata and the validated
                # GLB, but no server passwords or potentially verbose logs.
                if (path.is_file() and not path.is_symlink()
                        and path.resolve().is_relative_to(job.resolve())
                        and path.suffix.lower() in {".png", ".jpg", ".jpeg", ".webp", ".json", ".glb"}):
                    package.write(path, arcname=str(Path(job.name) / path.relative_to(job)))
        return archive
    return None


if __name__ == "__main__":
    import argparse
    import sys
    sys.path.insert(0, str(Path(__file__).resolve().parents[1]))
    parser = argparse.ArgumentParser()
    parser.add_argument("--export-project", type=Path, required=True)
    arguments = parser.parse_args()
    archive = export_latest_job(arguments.export_project)
    print(json.dumps({"archive": str(archive) if archive else None}))
