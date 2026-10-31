"""Prepare isolated UI/ML interpreters on a Colab GPU host, without model weights."""
import argparse
import json
import os
from pathlib import Path
import re
import shutil
import subprocess
import sys

ROOT = Path(__file__).resolve().parents[1]
TRIPOSR_COMMIT = "107cefdc244c39106fa830359024f6a2f1c78871"
TORCH_PROBE = '''
import json, sys
try:
    import torch
    available = torch.cuda.is_available()
    if available:
        import torch.nn.functional as F
        F.group_norm(torch.zeros((1,32,8,8), device="cuda", dtype=torch.float16), 8)
        torch.cuda.synchronize()
    print(json.dumps({"available": available, "version": torch.__version__,
        "prefix": sys.prefix, "base_prefix": sys.base_prefix,
        "cuda": torch.version.cuda,
        "gpu": torch.cuda.get_device_name(0) if available else None,
        "vram_bytes": torch.cuda.get_device_properties(0).total_memory if available else 0}))
except Exception as exc:
    print(json.dumps({"available": False, "error_type": type(exc).__name__}))
'''


def run(command, *, env=None, cwd=ROOT, capture=False):
    return subprocess.run([str(part) for part in command], cwd=cwd, env=env,
                          check=True, text=True, capture_output=capture)


def cache_environment(root):
    root = Path(root).expanduser().resolve()
    root.mkdir(parents=True, exist_ok=True)
    temporary = root / "tmp"
    temporary.mkdir(exist_ok=True)
    hub = root / "huggingface" / "hub"
    return {"HF_HOME": str(root / "huggingface"), "HF_HUB_CACHE": str(hub),
            "HUGGINGFACE_HUB_CACHE": str(hub), "TRANSFORMERS_CACHE": str(hub),
            "TORCH_HOME": str(root / "torch"), "U2NET_HOME": str(root / "rembg"),
            "PIP_CACHE_DIR": str(root / "pip"), "GRADIO_TEMP_DIR": str(root / "gradio"),
            "UV_CACHE_DIR": str(root / "uv"), "UV_PYTHON_INSTALL_DIR": str(root / "python"),
            "NUMBA_CACHE_DIR": str(root / "numba"), "XDG_CACHE_HOME": str(root),
            "TMPDIR": str(temporary)}


def probe_torch(python, env):
    result = run([python, "-c", TORCH_PROBE], env=env, capture=True)
    return json.loads(result.stdout.strip().splitlines()[-1])


def select_python(work, env):
    if sys.version_info[:2] == (3, 12):
        return Path(sys.executable)
    existing = shutil.which("python3.12")
    if existing:
        return Path(existing)
    # The old NumPy/tokenizer recipe needs Python 3.12. Keep the notebook kernel
    # unchanged and install a separate interpreter if Colab advances to 3.13+.
    tools = work / "bootstrap-tools"
    run([sys.executable, "-m", "pip", "install", "--no-cache-dir", "--target", tools, "uv>=0.9,<1"], env=env)
    uv_env = dict(env)
    uv_env["PYTHONPATH"] = str(tools) + (os.pathsep + env["PYTHONPATH"] if env.get("PYTHONPATH") else "")
    run([sys.executable, "-m", "uv", "python", "install", "3.12"], env=uv_env)
    found = run([sys.executable, "-m", "uv", "python", "find", "3.12"], env=uv_env, capture=True)
    return Path(found.stdout.strip())


def create_venv(python, directory, env, *, inherit_torch=False):
    executable = directory / "bin" / "python"
    if executable.is_file():
        config = (directory / "pyvenv.cfg").read_text(encoding="utf-8").lower()
        inherited = "include-system-site-packages = true" in config
        if inherited != inherit_torch:
            raise RuntimeError(f"{directory} uses a different base-package policy. Use a fresh checkout/environment; nothing was removed.")
        run([executable, "-m", "pip", "--version"], env=env, capture=True)
        return executable
    command = [python, "-m", "venv"]
    if inherit_torch:
        command.append("--system-site-packages")
    try:
        run([*command, directory], env=env)
        run([executable, "-m", "pip", "--version"], env=env, capture=True)
    except subprocess.CalledProcessError:
        # Some Colab images omit Debian's ensurepip/venv package. Seed a local
        # environment with virtualenv rather than apt-changing the runtime.
        tools = ROOT / "work" / "colab" / "bootstrap-tools"
        run([sys.executable, "-m", "pip", "install", "--no-cache-dir", "--target", tools, "virtualenv>=20,<21"], env=env)
        bootstrap_env = dict(env)
        bootstrap_env["PYTHONPATH"] = str(tools) + (os.pathsep + env["PYTHONPATH"] if env.get("PYTHONPATH") else "")
        fallback = [sys.executable, "-m", "virtualenv", "--python", python]
        if inherit_torch:
            fallback.append("--system-site-packages")
        run([*fallback, directory], env=bootstrap_env)
        run([executable, "-m", "pip", "--version"], env=env, capture=True)
    return executable


def prepare_triposr(work, env):
    directory = work / "TripoSR"
    if not directory.exists():
        run(["git", "clone", "https://github.com/VAST-AI-Research/TripoSR.git", directory], env=env)
        run(["git", "-C", directory, "checkout", TRIPOSR_COMMIT], env=env)
    elif not (directory / "run.py").is_file():
        raise RuntimeError(f"Existing {directory} has no run.py; inspect it before continuing.")
    else:
        actual = run(["git", "-C", directory, "rev-parse", "HEAD"], env=env, capture=True).stdout.strip()
        if actual != TRIPOSR_COMMIT:
            raise RuntimeError(f"Existing TripoSR checkout differs from the supported {TRIPOSR_COMMIT}. Use a fresh project directory; no files were overwritten.")
        if run(["git", "-C", directory, "status", "--porcelain"], env=env, capture=True).stdout.strip():
            raise RuntimeError("Existing TripoSR checkout has local edits; preserve them before setup.")
    return directory


def setup(cache_root=None):
    smi = shutil.which("nvidia-smi")
    if not smi:
        raise RuntimeError("No NVIDIA runtime found. In Colab select Runtime > Change runtime type > T4 GPU, then reconnect.")
    gpu = run([smi], capture=True).stdout
    print(gpu, flush=True)
    work = ROOT / "work" / "colab"
    work.mkdir(parents=True, exist_ok=True)
    storage = cache_environment(cache_root or work / "cache")
    env = dict(os.environ, **storage)
    python = select_python(work, env)
    base = probe_torch(python, env)
    # A nested venv sees base-system packages, not its parent's venv packages.
    # Only inherit when Colab's working torch belongs to the base interpreter.
    inherit = bool(base.get("available")) and base.get("prefix") == base.get("base_prefix")
    if inherit:
        print(f"Reusing Colab CUDA PyTorch {base['version']} in the ML environment; kernel packages remain unchanged.", flush=True)
    ui = create_venv(python, ROOT / ".venv-colab-ui", env)
    ml = create_venv(python, ROOT / ".venv-colab-ml", env, inherit_torch=inherit)
    if not inherit:
        match = re.search(r"CUDA Version:\s*(\d+)\.(\d+)", gpu)
        if not match or tuple(map(int, match.groups())) < (12, 8):
            raise RuntimeError("No reusable CUDA PyTorch and the driver does not report CUDA >=12.8. Use a current Colab GPU runtime; no installed torch was replaced.")
        run([ml, "-m", "pip", "install", "--no-cache-dir", "torch==2.11.0", "--index-url", "https://download.pytorch.org/whl/cu128"], env=env)
    installed = probe_torch(ml, env)
    if not installed.get("available"):
        raise RuntimeError("Worker PyTorch could not complete a small CUDA operation. Check the GPU runtime/driver before installing models.")
    version = installed["version"]
    if not re.fullmatch(r"2\.\d+\.\d+[a-z0-9.]*(?:\+[a-z0-9.]+)?", version):
        raise RuntimeError(f"Unsupported PyTorch version format: {version}")
    constraint = work / "keep-torch.txt"
    constraint.write_text(f"torch=={version}\n", encoding="utf-8")
    run([ui, "-m", "pip", "install", "--no-cache-dir", "-r", ROOT / "requirements.txt"], env=env)
    run([ml, "-m", "pip", "install", "--no-cache-dir", "-c", constraint, "-r", ROOT / "backend" / "requirements-local.txt"], env=env)
    triposr = prepare_triposr(work, env)
    worker_env = {"SKETCH_PYTHON": str(ml), "TRIPOSR_PYTHON": str(ml), "TRIPOSR_DIR": str(triposr),
                  "SKETCH2SHAPE_DEVICE": "cuda", "SKETCH2SHAPE_MESH_BACKEND": "skimage",
                  "SKETCH2SHAPE_LOW_MEMORY": "false", "SKETCH_TIMEOUT_SECONDS": "3600",
                  "PIPELINE_3D_TIMEOUT_SECONDS": "3600", "TRIPOSR_TIMEOUT_SECONDS": "3500"}
    env.update(worker_env)
    run([ui, "-m", "pip", "check"], env=env)
    # The inherited base can contain unrelated Colab packages with different
    # pins. Check actual stage imports instead of treating all base extras as ML.
    run([ui, "-m", "backend.doctor", "--device", "cuda"], env=env)
    run([ml, ROOT / "backend" / "triposr_runner.py", triposr / "run.py", "--help"], env=env)
    source = run(["git", "rev-parse", "HEAD"], capture=True).stdout.strip()
    manifest = {"project": str(ROOT), "ui_python": str(ui), "ml_python": str(ml),
                "environment": {**storage, **worker_env}, "hardware": installed,
                "source_commit": source, "triposr_commit": TRIPOSR_COMMIT,
                "reuses_runtime_torch": inherit, "models_downloaded": False}
    target = work / "runtime.json"
    target.write_text(json.dumps(manifest, indent=2), encoding="utf-8")
    print(f"Setup checks passed. Runtime manifest: {target}", flush=True)
    print("Pretrained weights and complete inference have NOT been tested. Start the app and generate a fresh sketch next.", flush=True)
    return target


def main():
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--cache-root", type=Path)
    args = parser.parse_args()
    setup(args.cache_root)


if __name__ == "__main__":
    main()
