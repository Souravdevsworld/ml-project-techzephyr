"""Check selected device and worker dependencies without downloading weights."""
import argparse
import json
import os
from pathlib import Path
import subprocess
import sys

from .pipeline import ROOT

PROBE = '''
import importlib.metadata as m, importlib.util, json, sys
packages = {name: m.version(name) for name in ["torch", "numpy", "Pillow", "trimesh"]}
from backend.sketch_worker import hardware
info = hardware()
info["packages"] = packages
if sys.argv[1] == "refine":
    from backend.sketch_refiner import check_refinement_environment
    info["refinement_packages"] = check_refinement_environment()
    from diffusers import ControlNetModel, StableDiffusionControlNetPipeline
else:
    from backend.device import mesh_backend
    meshing = mesh_backend()
    info["mesh_backend"] = meshing
    mesh_package = "skimage" if meshing == "skimage" else "torchmcubes"
    missing = [name for name in [mesh_package, "rembg", "omegaconf", "transformers", "einops", "xatlas", "moderngl", "imageio"] if importlib.util.find_spec(name) is None]
    if missing:
        raise RuntimeError("Missing TripoSR dependencies: " + ", ".join(missing))
print(json.dumps(info))
'''


def main():
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--device", choices=["auto", "cuda", "cpu"])
    args = parser.parse_args()
    if args.device:
        os.environ["SKETCH2SHAPE_DEVICE"] = args.device
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
