"""Run official TripoSR with the optional scikit-image CPU meshing helper."""
from pathlib import Path
import runpy
import sys


def main():
    if len(sys.argv) < 2:
        raise ValueError("Provide the trusted official TripoSR run.py path.")
    script = Path(sys.argv[1]).resolve()
    # This script can be invoked by absolute path from the upstream checkout.
    sys.path.insert(0, str(Path(__file__).resolve().parents[1]))
    from backend import cpu_isosurface
    sys.path.insert(0, str(script.parent))
    # Replace only the isosurface helper, before tsr.system imports it. No
    # generated geometry or pretrained model is substituted.
    sys.modules["tsr.models.isosurface"] = cpu_isosurface
    sys.argv = [str(script), *sys.argv[2:]]
    runpy.run_path(str(script), run_name="__main__")


if __name__ == "__main__":
    main()
