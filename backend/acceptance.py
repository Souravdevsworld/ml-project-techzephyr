"""Explicit GPU acceptance run using a fresh user-supplied input; never a fixture."""
import argparse
import hashlib
import json
from pathlib import Path
import shutil

from .pipeline import GenerationSettings, generate_result
from .validate_mesh import validate_mesh


def main():
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("image")
    parser.add_argument("--mode", choices=["sketch", "image"], default="sketch")
    parser.add_argument("--prompt")
    parser.add_argument("--resolution", type=int, default=128)
    args = parser.parse_args()
    result = generate_result(args.image, args.prompt,
        mode="Sketch to 3D" if args.mode == "sketch" else "Image to 3D",
        settings=GenerationSettings(mesh_resolution=args.resolution), progress=print)
    # Simulate saving the downloadable bytes, then independently reopen them.
    downloaded = Path(result.directory) / "download-reopened.glb"
    shutil.copyfile(result.glb, downloaded)
    counts = validate_mesh(str(downloaded))
    digest = lambda p: hashlib.sha256(Path(p).read_bytes()).hexdigest()
    if digest(result.glb) != digest(downloaded):
        raise RuntimeError("Downloaded GLB differs from preview GLB")
    report = {"inference_executed": True, "download_reopened": True,
              "sha256": digest(downloaded), "mesh": counts,
              "metadata": result.metadata,
              "visual_inspection": "pending: inspect refined PNG and GLB in the application"}
    target = Path(result.directory) / "acceptance.json"
    target.write_text(json.dumps(report, indent=2), encoding="utf-8")
    print(f"Acceptance artifacts: {result.directory}")
    print("Inspect the refined image and actual GLB before marking visual quality accepted.")


if __name__ == "__main__":
    main()
