"""Check GPU interpreters and dependencies without downloading model weights."""
import json
import os
from pathlib import Path
import subprocess
import sys

from .pipeline import ROOT

PROBE = '''
import importlib.metadata as m, importlib.util, json, sys
packages = {name: m.version(name) for name in ["torch", "numpy", "Pillow", "trimesh"]}
import torch
if not torch.cuda.is_available():
    raise RuntimeError("CUDA GPU unavailable")
info = {"python": sys.version.split()[0], "gpu": torch.cuda.get_device_name(0), "cuda": torch.version.cuda, "packages": packages}
if sys.argv[1] == "refine":
    from backend.sketch_refiner import check_refinement_environment
    info["refinement_packages"] = check_refinement_environment()
    from diffusers import ControlNetModel, StableDiffusionControlNetPipeline
else:
    missing = [name for name in ["torchmcubes", "rembg", "omegaconf", "transformers", "einops"] if importlib.util.find_spec(name) is None]
    if missing:
        raise RuntimeError("Missing TripoSR dependencies: " + ", ".join(missing))
print(json.dumps(info))
'''


def main():
    ok = True
    installation = Path(os.environ.get("TRIPOSR_DIR", "/missing-triposr-installation")).expanduser()
    if not (installation / "run.py").is_file():
        print("FAIL: set TRIPOSR_DIR to the installed official checkout containing run.py")
        ok = False
    for stage, variable in [("refine", "SKETCH_PYTHON"), ("reconstruct", "TRIPOSR_PYTHON")]:
        python = os.environ.get(variable, sys.executable)
        print(f"Checking {stage} interpreter: {python}")
        try:
            probe = subprocess.run([python, "-c", PROBE, stage], cwd=ROOT, text=True,
                                   stdout=subprocess.PIPE, stderr=subprocess.PIPE, timeout=120)
            if probe.returncode:
                # This probe handles no secrets or user files; report the actual error.
                print("FAIL:", probe.stderr.strip().splitlines()[-1] if probe.stderr else "probe exited")
                ok = False
            else:
                print(json.dumps(json.loads(probe.stdout.strip().splitlines()[-1]), indent=2))
        except (OSError, subprocess.TimeoutExpired) as exc:
            print(f"FAIL: interpreter probe could not complete ({type(exc).__name__})")
            ok = False
    print("Model weights and real inference have NOT been checked. Run the acceptance command next.")
    raise SystemExit(0 if ok else 1)


if __name__ == "__main__":
    main()
