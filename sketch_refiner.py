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

logger = logging.getLogger(__name__)
CONTROLNET_MODEL = "lllyasviel/control_v11p_sd15_scribble"
BASE_MODEL = "stable-diffusion-v1-5/stable-diffusion-v1-5"
AUTO_PROMPT_VERSION = "generic-object-v1"
AUTOMATIC_PROMPT = (
    "Studio product photograph of the single object in the sketch, preserve its silhouette, "
    "proportions, visible parts, spacing and viewpoint, centered full object, isolated on a "
    "plain neutral background, realistic materials, no scene"
)
DEFAULT_NEGATIVE_PROMPT = (
    "changed silhouette, distorted proportions, missing parts, extra parts, merged parts, "
    "extra objects, duplicate objects, cropped object, clutter, room, scenery, complex background, "
    "text, watermark"
)
EXPECTED_PACKAGES = {
    "torch": "2.11.0+cu128", "numpy": "1.26.4", "transformers": "4.40.2",
    "tokenizers": "0.19.1", "huggingface-hub": "0.25.2", "diffusers": "0.30.3",
    "accelerate": "0.34.2", "safetensors": "0.4.5", "opencv-python-headless": "4.11.0.86",
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
        if actual != expected:
            problems.append(f"{package}: expected {expected}, found {actual}")
    if problems:
        raise RefinementError("Incompatible sketch environment; use the separate experiment notebook. "
                              "No automatic upgrades were attempted. " + "; ".join(problems))
    return versions


@dataclass(frozen=True)
class RefinementSettings:
    seed: int = 42
    steps: int = 20
    guidance_scale: float = 7.0
    conditioning_scale: float = 1.0
    negative_prompt: str = DEFAULT_NEGATIVE_PROMPT

    @classmethod
    def from_environment(cls):
        try:
            settings = cls(
                seed=int(os.environ.get("SKETCH_SEED", "42")),
                steps=int(os.environ.get("SKETCH_STEPS", "20")),
                guidance_scale=float(os.environ.get("SKETCH_CFG", "7.0")),
                conditioning_scale=float(os.environ.get("SKETCH_CONTROL_STRENGTH", "1.0")),
                negative_prompt=os.environ.get("SKETCH_NEGATIVE_PROMPT", cls.negative_prompt),
            )
        except ValueError:
            raise ValueError("Sketch seed/steps must be integers and guidance/strength numeric") from None
        if not 0 <= settings.seed <= 2**32 - 1 or not 1 <= settings.steps <= 100:
            raise ValueError("SKETCH_SEED must be 0..2^32-1 and SKETCH_STEPS 1..100")
        if not math.isfinite(settings.guidance_scale) or not 1 <= settings.guidance_scale <= 20:
            raise ValueError("SKETCH_CFG must be finite and between 1 and 20")
        if not math.isfinite(settings.conditioning_scale) or not 0.1 <= settings.conditioning_scale <= 2:
            raise ValueError("SKETCH_CONTROL_STRENGTH must be finite and between 0.1 and 2")
        return settings


def _generate_image(conditioning: Image.Image, prompt: str, settings: RefinementSettings):
    """Only this explicitly invoked function imports/loads the inference stack."""
    import torch
    from diffusers import ControlNetModel, StableDiffusionControlNetPipeline, UniPCMultistepScheduler
    if not torch.backends.mps.is_available():
        raise RefinementError("Apple Metal (MPS) unavailable; use an Apple Silicon PyTorch environment")
    # Keep the same checkpoint IDs and image conditioning as the Kaggle version.
    # MPS uses locally installed compatible packages, not CUDA version pins.
    dtype = torch.float16
    pipe = None
    try:
        logger.info("Loading pretrained Scribble ControlNet and SD 1.5; first use downloads weights")
        controlnet = ControlNetModel.from_pretrained(
            CONTROLNET_MODEL, torch_dtype=dtype, variant="fp16", use_safetensors=True)
        pipe = StableDiffusionControlNetPipeline.from_pretrained(
            BASE_MODEL, controlnet=controlnet, torch_dtype=dtype,
            variant="fp16", use_safetensors=True)
        pipe.scheduler = UniPCMultistepScheduler.from_config(pipe.scheduler.config)
        # Keep the pretrained safety checker. No .to('cuda') with CPU offload.
        pipe.to("mps")
        pipe.enable_attention_slicing()
        pipe.enable_vae_slicing()
        generator = torch.Generator(device="cpu").manual_seed(settings.seed)
        with torch.inference_mode():
            result = pipe(prompt=prompt, negative_prompt=settings.negative_prompt,
                          image=conditioning, width=512, height=512,
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
        if torch.backends.mps.is_available():
            torch.mps.empty_cache()


def refine_sketch(sketch_path: str, prompt: str | None = None, output_dir: str | None = None) -> str:
    """Return a genuine generated PNG's absolute path, or raise on any failure.

    Each call has a unique artifact folder. Diagnostics remain on failure; partial
    generated files are removed. This function never invokes TripoSR.
    None/blank prompts select a fixed object-independent template, not a caption
    inferred from the image or filename. Supplied prompts retain their existing
    behavior. Generic text does not guarantee recognition or geometric fidelity.
    """
    if prompt is not None and not isinstance(prompt, str):
        raise ValueError("Prompt must be a string or None")
    requested_prompt = prompt
    automatic = prompt is None or not prompt.strip()
    prompt = AUTOMATIC_PROMPT if automatic else prompt.strip()
    if len(prompt) < 3:
        raise ValueError("Provide a meaningful optional prompt or leave it blank")
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
        if not isinstance(result, Image.Image) or result.size != (512, 512):
            raise RefinementError("Inference did not return a 512x512 image")
        result = result.convert("RGB")
        if all(low == high for low, high in result.getextrema()):
            raise RefinementError("Inference returned a uniform image; no usable refinement")
        result.save(partial, format="PNG")
        with Image.open(partial) as saved:
            if saved.format != "PNG" or saved.size != (512, 512):
                raise RefinementError("Saved output is not a valid 512x512 PNG")
            saved.verify()
        partial.replace(target)
        versions = {}
        for package in EXPECTED_PACKAGES:
            try:
                versions[package] = metadata.version(package)
            except metadata.PackageNotFoundError:
                versions[package] = "missing"
        (directory / "generation.json").write_text(json.dumps({
            "status": "success", "prompt": prompt, "requested_prompt": requested_prompt,
            "prompt_mode": "automatic" if automatic else "provided",
            "automatic_prompt_version": AUTO_PROMPT_VERSION if automatic else None,
            **asdict(settings),
            "base_model": BASE_MODEL, "controlnet_model": CONTROLNET_MODEL,
            "scheduler": "UniPCMultistepScheduler", "size": [512, 512], "dtype": "float16", "device": "mps",
            "cpu_offload": False, "inference_seconds": inference_seconds,
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
