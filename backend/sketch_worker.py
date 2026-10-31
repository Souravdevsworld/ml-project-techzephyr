"""Model subprocess entry point. Never imports Gradio or loads models on import."""
import argparse
import json
import logging
from pathlib import Path
import platform
import time


def hardware():
    import torch
    if not torch.cuda.is_available():
        raise RuntimeError("CUDA GPU unavailable. Run the workers on a CUDA GPU host.")
    return {"python": platform.python_version(), "torch": torch.__version__,
            "cuda": torch.version.cuda, "gpu": torch.cuda.get_device_name(0),
            "vram_bytes": torch.cuda.get_device_properties(0).total_memory}


def main():
    parser = argparse.ArgumentParser()
    parser.add_argument("stage", choices=["refine", "reconstruct", "check"])
    parser.add_argument("request")
    args = parser.parse_args()
    logging.basicConfig(level=logging.INFO, format="%(asctime)s %(levelname)s %(message)s")
    request = json.loads(Path(args.request).read_text(encoding="utf-8"))
    started = time.perf_counter()
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
        generator.OUTPUT_DIR = Path(request["directory"])
        output = generator.generate_3d(request["input"])
    Path(request["response"]).write_text(json.dumps({
        "output": str(Path(output).resolve()), "hardware": info,
        "seconds": time.perf_counter() - started,
    }, indent=2), encoding="utf-8")


if __name__ == "__main__":
    main()
