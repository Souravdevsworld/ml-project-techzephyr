"""Real, sequential Scribble → image → TripoSR orchestration; CPU-safe imports."""
from dataclasses import asdict, dataclass, field
import json
import logging
import math
import os
from pathlib import Path
import shutil
import sys
import threading
import time
import uuid

from PIL import Image

from .process import run_worker, WorkerError
from .device import ERROR_MESSAGES, low_memory, requested_device
from .ui_adapter import save_input
from .validate_mesh import validate_mesh

logger = logging.getLogger(__name__)
ROOT = Path(__file__).resolve().parents[1]
OUTPUT_DIR = ROOT / "outputs" / "jobs"
INFERENCE_LOCK = threading.Lock()
DEFAULT_PROMPT = ("a realistic studio photograph of a single object matching the sketch, "
                  "solid materials, centered, isolated on a plain white background, no text")


@dataclass(frozen=True)
class GenerationSettings:
    seed: int = 42
    steps: int = 20
    guidance_scale: float = 7.0
    conditioning_scale: float = 1.0
    mesh_resolution: int = 128
    remove_background: bool = True
    device: str = field(default_factory=requested_device)
    low_memory: bool = field(default_factory=low_memory)

    def validate(self):
        for name, value, low, high in (
            ("seed", self.seed, 0, 2**32 - 1), ("steps", self.steps, 1, 100),
            ("mesh_resolution", self.mesh_resolution, 16, 512),
        ):
            if isinstance(value, bool) or not isinstance(value, (int, float)) or not math.isfinite(value) or value != int(value) or not low <= value <= high:
                raise ValueError(f"{name} must be an integer between {low} and {high}.")
        for name, value, low, high in (
            ("guidance_scale", self.guidance_scale, 1, 20),
            ("conditioning_scale", self.conditioning_scale, 0.1, 2),
        ):
            if isinstance(value, bool) or not isinstance(value, (int, float)) or not math.isfinite(value) or not low <= value <= high:
                raise ValueError(f"{name} must be finite and between {low} and {high}.")
        if not isinstance(self.remove_background, bool):
            raise ValueError("Background removal must be enabled or disabled.")
        if self.device not in {"auto", "cpu", "cuda"}:
            raise ValueError("Choose auto, cpu, or cuda for the execution device.")
        if not isinstance(self.low_memory, bool):
            raise ValueError("Low-memory mode must be enabled or disabled.")


@dataclass(frozen=True)
class GenerationResult:
    directory: str
    original: str
    cleaned: str | None
    conditioning: str | None
    refined: str | None
    glb: str
    metadata: str


def _timeout(name, default):
    try:
        value = int(os.environ.get(name, default))
        if not 1 <= value <= 86400:
            raise ValueError()
    except ValueError:
        raise ValueError(f"{name} must be an integer between 1 and 86400.") from None
    return value


def _stage(stage, image, prompt, job, settings):
    response = job / f"{stage}-response.json"
    request_path = job / f"{stage}-request.json"
    request_path.write_text(json.dumps({
        "input": str(image), "prompt": prompt, "directory": str(job),
        "response": str(response),
    }), encoding="utf-8")
    env = os.environ.copy()
    # Per-worker settings never mutate global process environment.
    env.update({"SKETCH_SEED": str(int(settings.seed)), "SKETCH_STEPS": str(int(settings.steps)),
                "SKETCH_CFG": str(settings.guidance_scale),
                "SKETCH_CONTROL_STRENGTH": str(settings.conditioning_scale),
                "TRIPOSR_MC_RESOLUTION": str(int(settings.mesh_resolution)),
                "TRIPOSR_REMOVE_BG": str(settings.remove_background).lower(),
                "SKETCH2SHAPE_DEVICE": settings.device,
                "SKETCH2SHAPE_LOW_MEMORY": str(settings.low_memory).lower()})
    default_timeout = "7200" if settings.device == "cpu" or settings.low_memory else "1800"
    env.setdefault("TRIPOSR_TIMEOUT_SECONDS", default_timeout)
    if settings.low_memory:
        env.setdefault("TRIPOSR_CHUNK_SIZE", "256")
    python = os.environ.get("SKETCH_PYTHON" if stage == "refine" else "TRIPOSR_PYTHON", sys.executable)
    try:
        run_worker([python, "-u", "-m", "backend.sketch_worker", stage, str(request_path)],
                   cwd=ROOT, env=env, log_path=job / f"{stage}.log",
                   timeout=_timeout("SKETCH_TIMEOUT_SECONDS" if stage == "refine" else "PIPELINE_3D_TIMEOUT_SECONDS", default_timeout),
                   stage="Sketch refinement" if stage == "refine" else "TripoSR reconstruction")
    except WorkerError as exc:
        message = str(exc)
        if response.is_file():
            try:
                code = json.loads(response.read_text(encoding="utf-8")).get("error_code")
                message = ERROR_MESSAGES.get(code, message)
            except (ValueError, OSError, AttributeError):
                pass
        raise WorkerError(f"{stage}: {message} Log: outputs/jobs/{job.name}/{stage}.log") from exc
    if not response.is_file():
        raise RuntimeError(f"{stage}: worker exited without a result manifest.")
    result = json.loads(response.read_text(encoding="utf-8"))
    output = Path(result["output"])
    if not output.is_file() or output.is_symlink() or not output.resolve().is_relative_to(job):
        raise ValueError(f"{stage}: missing output or output outside this job.")
    return output, result


def _validate_refinement(path):
    with Image.open(path) as image:
        if image.format != "PNG" or image.size != (512, 512):
            raise ValueError("Refinement did not produce a valid 512×512 PNG.")
        image.verify()
    with Image.open(path) as image:
        if all(low == high for low, high in image.convert("RGB").getextrema()):
            raise ValueError("Refinement produced a blank image.")


def generate_result(image, prompt=None, *, mode="Sketch to 3D", settings=None, progress=None) -> GenerationResult:
    if mode not in {"Sketch to 3D", "Image to 3D"}:
        raise ValueError("Choose Sketch to 3D or Image to 3D.")
    settings = settings or GenerationSettings()
    settings.validate()
    if prompt is not None and not isinstance(prompt, str):
        raise ValueError("The object description must be text.")
    prompt = (prompt or "").strip()
    if len(prompt) > 1000:
        raise ValueError("Use a description of at most 1000 characters.")
    effective_prompt = (prompt or DEFAULT_PROMPT) if mode == "Sketch to 3D" else None
    progress = progress or (lambda stage: None)
    OUTPUT_DIR.mkdir(parents=True, exist_ok=True)
    job = (OUTPUT_DIR / uuid.uuid4().hex).resolve()
    job.mkdir()
    metadata = job / "metadata.json"
    record = {"job_id": job.name, "mode": mode, "status": "preparing", "prompt": prompt,
              "effective_prompt": effective_prompt, "settings": asdict(settings),
              "prompt_guides_triposr": False, "stages": {}}
    started = time.perf_counter()
    cleaned = conditioning = refined = None
    try:
        progress("Validating and saving input")
        original = save_input(image, job / "input.png", sketch=mode == "Sketch to 3D")
        record["status"] = "queued"
        progress("Waiting for inference slot")
        with INFERENCE_LOCK:
            record["status"] = "running"
            metadata.write_text(json.dumps(record, indent=2), encoding="utf-8")
            source = Path(original)
            if mode == "Sketch to 3D":
                progress("Preprocessing sketch and running ControlNet / Stable Diffusion")
                refined_path, info = _stage("refine", source, effective_prompt, job, settings)
                _validate_refinement(refined_path)
                # The worker only returns after exiting: refinement allocations are gone.
                cleaned = str(refined_path.parent / "cleaned.png")
                conditioning = str(refined_path.parent / "conditioning.png")
                for path in (cleaned, conditioning):
                    if not Path(path).is_file():
                        raise ValueError("Refinement omitted its preprocessing artifacts.")
                refined = str(refined_path)
                record["stages"]["refinement"] = info
                source = refined_path
            progress("Running TripoSR reconstruction")
            generated, info = _stage("reconstruct", source, None, job, settings)
            record["stages"]["reconstruction"] = info
            progress("Validating generated mesh")
            counts = validate_mesh(str(generated))
            target = job / "model.glb"
            if generated != target:
                shutil.copyfile(generated, target)
            validate_mesh(str(target))
        record.update(status="success", mesh=counts, total_seconds=time.perf_counter() - started,
                      artifacts={"original": original, "cleaned": cleaned, "conditioning": conditioning,
                                 "refined": refined, "glb": str(target)})
        metadata.write_text(json.dumps(record, indent=2), encoding="utf-8")
        progress("Generation completed")
        return GenerationResult(str(job), original, cleaned, conditioning, refined, str(target), str(metadata))
    except BaseException as exc:
        record.update(status="cancelled" if isinstance(exc, (KeyboardInterrupt, GeneratorExit)) else "failed",
                      error_type=type(exc).__name__, total_seconds=time.perf_counter() - started)
        (job / "model.glb").unlink(missing_ok=True)
        metadata.write_text(json.dumps(record, indent=2), encoding="utf-8")
        logger.exception("Generation failed; diagnostics: %s", job)
        raise


def generate_from_sketch(sketch_path: str, prompt: str | None = None) -> str:
    """Compatibility entry point returning the actual validated GLB."""
    return generate_result(sketch_path, prompt).glb
