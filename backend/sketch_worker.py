"""Model subprocess entry point. Never imports Gradio or loads models on import."""
import argparse
import json
import logging
import os
from pathlib import Path
import platform
import time

from .device import error_code, low_memory, mesh_backend, select_device


def hardware():
    import torch
    device = select_device(torch)
    os.environ["SKETCH2SHAPE_DEVICE"] = device
    return {"python": platform.python_version(), "torch": torch.__version__,
            "device": device, "low_memory": low_memory(), "cuda": torch.version.cuda,
            "gpu": torch.cuda.get_device_name(0) if device == "cuda" else None,
            "vram_bytes": torch.cuda.get_device_properties(0).total_memory if device == "cuda" else 0}


def main():
    parser = argparse.ArgumentParser()
    parser.add_argument("stage", choices=["refine", "reconstruct", "check"])
    parser.add_argument("request")
    args = parser.parse_args()
    logging.basicConfig(level=logging.INFO, format="%(asctime)s %(levelname)s %(message)s")
    request = json.loads(Path(args.request).read_text(encoding="utf-8"))
    started = time.perf_counter()
    try:
        info = hardware()
        if args.stage == "check":
            from .sketch_refiner import check_refinement_environment
            info["packages"] = check_refinement_environment()
            print(json.dumps(info, indent=2))
            return
        if args.stage == "refine":
            from .sketch_refiner import refine_sketch
            output = refine_sketch(request["input"], request["prompt"], request["directory"])
        else:
            from . import generator
            info["mesh_backend"] = mesh_backend()
            generator.OUTPUT_DIR = Path(request["directory"])
            output = generator.generate_3d(request["input"])
        Path(request["response"]).write_text(json.dumps({
            "output": str(Path(output).resolve()), "hardware": info,
            "seconds": time.perf_counter() - started,
        }, indent=2), encoding="utf-8")
    except Exception as exc:
        if request.get("response"):
            Path(request["response"]).write_text(json.dumps({"error_code": error_code(exc)}), encoding="utf-8")
        raise


if __name__ == "__main__":
    main()
