"""Explicit device policy shared by the UI and isolated model workers."""
import os
import importlib.util


def requested_device():
    value = os.environ.get("SKETCH2SHAPE_DEVICE", "auto").strip().lower()
    if value not in {"auto", "cpu", "cuda"}:
        raise ValueError("SKETCH2SHAPE_DEVICE must be auto, cpu, or cuda.")
    return value


def low_memory():
    value = os.environ.get("SKETCH2SHAPE_LOW_MEMORY", "false").strip().lower()
    if value not in {"true", "false", "1", "0"}:
        raise ValueError("SKETCH2SHAPE_LOW_MEMORY must be true or false.")
    return value in {"true", "1"}


def select_device(torch, requested=None):
    value = requested if requested is not None else requested_device()
    if value not in {"auto", "cpu", "cuda"}:
        raise ValueError("Choose auto, cpu, or cuda for the execution device.")
    if value == "cpu":
        return "cpu"
    available = torch.cuda.is_available()
    if value == "cuda" and not available:
        raise RuntimeError("CUDA was selected but is unavailable. Check the NVIDIA driver and CUDA-enabled PyTorch, or select CPU.")
    return "cuda" if available else "cpu"


def mesh_backend():
    value = os.environ.get("SKETCH2SHAPE_MESH_BACKEND", "auto").strip().lower()
    if value == "auto":
        return "torchmcubes" if importlib.util.find_spec("torchmcubes") is not None else "skimage"
    if value not in {"torchmcubes", "skimage"}:
        raise ValueError("SKETCH2SHAPE_MESH_BACKEND must be auto, torchmcubes, or skimage.")
    return value


ERROR_MESSAGES = {
    "dependency": "An ML dependency is missing or incompatible. Install the separate ML environment and run python -m backend.doctor.",
    "cuda": "CUDA was selected but PyTorch cannot use it. Check the NVIDIA driver and CUDA-enabled PyTorch, or choose CPU.",
    "memory": "Inference ran out of memory. Enable low-memory mode and lower mesh resolution; CPU mode also needs enough system RAM.",
    "files": "Model or file access failed. Check the job log for missing weights, network access, disk space, or file permissions.",
    "inference": "Model inference failed. Check this job's log for the underlying error.",
}


def error_code(exc):
    seen = set()
    while exc is not None and id(exc) not in seen:
        seen.add(id(exc))
        message = str(exc).lower()
        if isinstance(exc, (ImportError,)) or "incompatible sketch environment" in message:
            return "dependency"
        if "outofmemory" in type(exc).__name__.lower() or "out of memory" in message:
            return "memory"
        if "cuda was selected" in message:
            return "cuda"
        if isinstance(exc, OSError):
            return "files"
        exc = exc.__cause__ or exc.__context__
    return "inference"
