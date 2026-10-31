"""Explicit pretrained Scribble ControlNet + SD 1.5 experiment, separate from TripoSR."""

from dataclasses import asdict, dataclass
import importlib.metadata as metadata
import json
import logging
import math
import os
from pathlib import Path
import time

from PIL import Image

from .sketch_preprocess import preprocess_sketch
from .device import low_memory, select_device

logger = logging.getLogger(__name__)
CONTROLNET_MODEL = "lllyasviel/control_v11p_sd15_scribble"
BASE_MODEL = "stable-diffusion-v1-5/stable-diffusion-v1-5"
EXPECTED_PACKAGES = {
    "torch": "2.11.0+cu128", "numpy": "1.26.4", "transformers": "4.40.2",
    "tokenizers": "0.19.1", "huggingface-hub": "0.25.2", "diffusers": "0.30.3",
    "accelerate": "0.34.2", "safetensors": "0.4.5", "opencv-python-headless": "4.11.0.86",
    "peft": "0.11.1",
}


class RefinementError(RuntimeError):
    """No successfully generated refined image is available."""


def check_refinement_environment() -> dict[str, str]:
    """Check package metadata only; never import torch, download or load weights."""
    versions = {}
    problems = []
    for package, expected in EXPECTED_PACKAGES.items():
        try:
            actual = metadata.version(package)
        except metadata.PackageNotFoundError:
            actual = "missing"
        versions[package] = actual
        if package == "torch":
            # CPU and other CUDA wheels must not be rejected for lacking +cu128.
            try:
                major, minor = (int(part) for part in actual.split("+")[0].split(".")[:2])
                compatible = major == 2 and minor >= 1
            except ValueError:
                compatible = False
            if not compatible:
                problems.append(f"torch: need a PyTorch 2.x build >=2.1, found {actual}")
            elif actual != expected:
                logger.info("Using torch %s; original GPU experiment used %s", actual, expected)
        elif actual != expected:
            problems.append(f"{package}: expected {expected}, found {actual}")
    if problems:
        raise RefinementError("Incompatible sketch environment; install the worker requirements and run backend.doctor. "
                              "No automatic upgrades were attempted. " + "; ".join(problems))
    return versions


@dataclass(frozen=True)
class RefinementSettings:
    seed: int = 42
    steps: int = 20
    guidance_scale: float = 7.0
    conditioning_scale: float = 1.0
    negative_prompt: str = "duplicate objects, text, watermark, blurry, distorted geometry"
    image_size: int = 512

    @classmethod
    def from_environment(cls):
        try:
            settings = cls(
                seed=int(os.environ.get("SKETCH_SEED", "42")),
                steps=int(os.environ.get("SKETCH_STEPS", "20")),
                guidance_scale=float(os.environ.get("SKETCH_CFG", "7.0")),
                conditioning_scale=float(os.environ.get("SKETCH_CONTROL_STRENGTH", "1.0")),
                negative_prompt=os.environ.get("SKETCH_NEGATIVE_PROMPT", cls.negative_prompt),
                image_size=int(os.environ.get("SKETCH_IMAGE_SIZE", "512")),
            )
        except ValueError:
            raise ValueError("Sketch seed/steps must be integers and guidance/strength numeric") from None
        if not 0 <= settings.seed <= 2**32 - 1 or not 1 <= settings.steps <= 100:
            raise ValueError("SKETCH_SEED must be 0..2^32-1 and SKETCH_STEPS 1..100")
        if not math.isfinite(settings.guidance_scale) or not 1 <= settings.guidance_scale <= 20:
            raise ValueError("SKETCH_CFG must be finite and between 1 and 20")
        if not math.isfinite(settings.conditioning_scale) or not 0.1 <= settings.conditioning_scale <= 2:
            raise ValueError("SKETCH_CONTROL_STRENGTH must be finite and between 0.1 and 2")
        if settings.image_size not in {256, 384, 512}:
            raise ValueError("SKETCH_IMAGE_SIZE must be 256, 384, or 512")
        return settings


def _generate_image(conditioning: Image.Image, prompt: str, settings: RefinementSettings):
    """Only this explicitly invoked function imports/loads the inference stack."""
    check_refinement_environment()
    import torch
    from diffusers import ControlNetModel, StableDiffusionControlNetPipeline, UniPCMultistepScheduler

    device = select_device(torch)
    dtype = torch.float16 if device == "cuda" else torch.float32
    small = low_memory()
    pipe = None
    try:
        logger.info("Loading Scribble ControlNet and SD 1.5 on %s (low_memory=%s, image=%d, CFG=%s); first use downloads weights", device, small, settings.image_size, settings.guidance_scale)
        if device == "cpu":
            logger.warning("CPU uses FP32 and substantial system RAM; an 8 GB host may not fit these models.")
        # FP16 checkpoint files reduce download size; CPU converts them to FP32.
        controlnet = ControlNetModel.from_pretrained(
            CONTROLNET_MODEL, torch_dtype=dtype, variant="fp16", use_safetensors=True, low_cpu_mem_usage=True)
        pipe = StableDiffusionControlNetPipeline.from_pretrained(
            BASE_MODEL, controlnet=controlnet, torch_dtype=dtype,
            variant="fp16", use_safetensors=True, low_cpu_mem_usage=True)
        pipe.scheduler = UniPCMultistepScheduler.from_config(pipe.scheduler.config)
        # Keep the pretrained safety checker. No .to('cuda') with CPU offload.
        if device == "cuda":
            if small:
                pipe.enable_sequential_cpu_offload(gpu_id=0)
            else:
                pipe.enable_model_cpu_offload(gpu_id=0)
        else:
            pipe.to("cpu")
        # Diffusers uses AttnProcessor2_0 by default on this PyTorch stack.
        # Enabling slicing replaces SDPA with SlicedAttnProcessor, which
        # materializes attention-score matrices (the reported CUDA OOM site).
        functional = getattr(getattr(torch, "nn", None), "functional", None)
        cuda_sdpa = device == "cuda" and callable(getattr(functional, "scaled_dot_product_attention", None))
        if (small or device == "cpu") and not cuda_sdpa:
            pipe.enable_attention_slicing("max")
        if cuda_sdpa:
            logger.info("Keeping PyTorch SDPA attention on CUDA")
        pipe.enable_vae_tiling()
        pipe.enable_vae_slicing()
        generator = torch.Generator(device="cpu").manual_seed(settings.seed)
        conditioning = conditioning.resize((settings.image_size, settings.image_size), Image.Resampling.LANCZOS)
        logger.info("Starting diffusion image generation")
        with torch.inference_mode():
            result = pipe(prompt=prompt, negative_prompt=settings.negative_prompt,
                          image=conditioning, width=settings.image_size, height=settings.image_size,
                          num_inference_steps=settings.steps, guidance_scale=settings.guidance_scale,
                          controlnet_conditioning_scale=settings.conditioning_scale,
                          generator=generator, num_images_per_prompt=1, guess_mode=False)
        if result.nsfw_content_detected is not None and any(result.nsfw_content_detected):
            raise RefinementError("Safety checker flagged the result; no refined image saved")
        if not result.images or not isinstance(result.images[0], Image.Image):
            raise RefinementError("Inference returned no PIL image")
        return result.images[0].copy()
    finally:
        if pipe is not None:
            pipe.maybe_free_model_hooks()
        del pipe
        if device == "cuda":
            torch.cuda.empty_cache()


def refine_sketch(sketch_path: str, prompt: str, output_dir: str | None = None) -> str:
    """Return a genuine generated PNG's absolute path, or raise on any failure.

    Each call has a unique artifact folder. Diagnostics remain on failure; partial
    generated files are removed. This function never invokes TripoSR.
    """
    if not isinstance(prompt, str) or not prompt.strip():
        raise ValueError("Provide an object/material prompt or the pipeline's neutral default")
    prompt = prompt.strip()
    settings = RefinementSettings.from_environment()
    started = time.perf_counter()
    artifacts = preprocess_sketch(sketch_path, output_dir)
    directory = Path(artifacts.directory)
    target, partial = directory / "refined.png", directory / "refined.part"
    try:
        with Image.open(artifacts.conditioning_path) as image:
            conditioning = image.convert("RGB")
        inference_started = time.perf_counter()
        result = _generate_image(conditioning, prompt, settings)
        inference_seconds = time.perf_counter() - inference_started
        expected_size = (settings.image_size, settings.image_size)
        if not isinstance(result, Image.Image) or result.size != expected_size:
            raise RefinementError(f"Inference did not return a {settings.image_size}x{settings.image_size} image")
        result = result.convert("RGB")
        if all(low == high for low, high in result.getextrema()):
            raise RefinementError("Inference returned a uniform image; no usable refinement")
        result.save(partial, format="PNG")
        with Image.open(partial) as saved:
            if saved.format != "PNG" or saved.size != expected_size:
                raise RefinementError(f"Saved output is not a valid {settings.image_size}x{settings.image_size} PNG")
            saved.verify()
        partial.replace(target)
        versions = {}
        for package in EXPECTED_PACKAGES:
            try:
                versions[package] = metadata.version(package)
            except metadata.PackageNotFoundError:
                versions[package] = "missing"
        import torch
        actual_device = select_device(torch)
        (directory / "generation.json").write_text(json.dumps({
            "status": "success", "prompt": prompt, **asdict(settings),
            "base_model": BASE_MODEL, "controlnet_model": CONTROLNET_MODEL,
            "scheduler": "UniPCMultistepScheduler", "size": list(expected_size),
            "device": actual_device, "dtype": "float16" if actual_device == "cuda" else "float32",
            "cpu_offload": actual_device == "cuda", "low_memory": low_memory(), "inference_seconds": inference_seconds,
            "total_seconds": time.perf_counter() - started, "packages": versions,
            "preprocessing": artifacts.metadata_path, "output": str(target.resolve()),
        }, indent=2), encoding="utf-8")
        logger.info("Generated refined PNG: %s (%.1fs inference)", target, inference_seconds)
        return str(target.resolve())
    except Exception as exc:
        target.unlink(missing_ok=True)
        (directory / "generation.json").unlink(missing_ok=True)
        logger.error("Sketch refinement failed (%s); no refined image returned", type(exc).__name__)
        if isinstance(exc, RefinementError):
            raise
        raise RefinementError("Sketch refinement failed during model loading/inference or output saving. "
                              "Check the exception cause for dependency, model access, network or CUDA errors") from exc
    finally:
        partial.unlink(missing_ok=True)
