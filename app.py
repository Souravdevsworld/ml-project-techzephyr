"""Sketch2Shape AI Gradio interface; inference runs in isolated local workers."""
from __future__ import annotations

import argparse
import logging
import os
from pathlib import Path
import signal
import tempfile
import threading
import uuid

import gradio as gr
from PIL import Image

from backend.pipeline import GenerationSettings, generate_result
from backend.ui_adapter import as_rgb, save_input, validate_content
from backend.validate_mesh import validate_mesh
from backend.device import low_memory, requested_device

logger = logging.getLogger(__name__)
ASSETS = Path(__file__).resolve().parent / "assets"
SESSION_LOCK = threading.RLock()
ARTIFACT_COUNT = 7
RESULT_COUNT = ARTIFACT_COUNT + 3


def preprocess_sketch(value, output_path):
    """Retained frontend helper: white RGB conversion and aspect-preserving PNG."""
    return save_input(value, output_path, check_blank=False)


def validate_glb(value):
    path = Path(value).resolve()
    if path.suffix.lower() != ".glb":
        raise ValueError("The backend must return a GLB file.")
    validate_mesh(str(path))
    return str(path)


def new_session():
    return {"active": None, "running": False, "original": None,
            "model": None, "submitted_prompt": "", "latest_prompt": "", "error": None,
            "mode": "Sketch to 3D"}


def pending_prompt(prompt, session):
    with SESSION_LOCK:
        session["latest_prompt"] = (prompt or "").strip()
        if session["latest_prompt"] == session["submitted_prompt"]:
            return "No pending prompt edit."
        return "Description changed. Generate again to apply it; the running request stays unchanged."


def submit_request(sketch, upload, source, prompt, session, mode="Sketch to 3D",
                   seed=42, steps=20, cfg=7.0, strength=1.0, resolution=128,
                   remove_bg=True, device="auto", small_memory=False, refinement_size=512, regenerate=False):
    """Snapshot pixels and settings before queueing; clear all previous results."""
    with SESSION_LOCK:
        if session["active"] is not None:
            raise gr.Error("A generation is pending or running. Wait for it to finish.")
        session["model"] = None
        try:
            if mode not in {"Sketch to 3D", "Image to 3D"}:
                raise ValueError("Choose a generation mode.")
            settings = GenerationSettings(seed, steps, cfg, strength, resolution, remove_bg, device, small_memory, refinement_size)
            settings.validate()
            value = session["original"] if regenerate else (upload if mode == "Image to 3D" or source == "Upload" else sketch)
            if regenerate and value is None:
                raise ValueError("Generate a model before regenerating.")
            snapshot = as_rgb(value)
            validate_content(snapshot, sketch=mode == "Sketch to 3D")
            # Freeze a bounded, aspect-preserving copy, never editor references.
            with tempfile.TemporaryDirectory(prefix="sketch2shape-snapshot-") as directory:
                path = save_input(snapshot, Path(directory) / "snapshot.png", sketch=mode == "Sketch to 3D")
                with Image.open(path) as opened:
                    snapshot = opened.copy()
            text = (prompt or "").strip()
            if len(text) > 1000:
                raise ValueError("Use a description of at most 1000 characters.")
            session["active"] = {"id": uuid.uuid4().hex, "image": snapshot,
                                 "prompt": text, "mode": mode, "settings": settings}
            session["submitted_prompt"] = text
            session["latest_prompt"] = text
            session["error"] = None
            status = "Request captured. Waiting for an inference slot…"
            enabled = False
        except (ValueError, OSError) as exc:
            session["active"] = None
            session["error"] = str(exc)
            status = "⚠ " + str(exc)
            enabled = True
        return (session, status, gr.update(interactive=enabled),
                gr.update(interactive=enabled and session["original"] is not None),
                "No pending prompt edit.", *((None,) * ARTIFACT_COUNT))


def submit_regeneration(prompt, session, mode, seed, steps, cfg, strength, resolution, remove_bg,
                        device="auto", small_memory=False, refinement_size=512):
    return submit_request(None, None, None, prompt, session, mode, seed, steps, cfg,
                          strength, resolution, remove_bg, device, small_memory, refinement_size, regenerate=True)


def run_request(session, progress=gr.Progress()):
    with SESSION_LOCK:
        request = session["active"]
        if request is None or session["running"]:
            return (gr.skip(),) * RESULT_COUNT
        session["running"] = True
    try:
        result = generate_result(request["image"], request["prompt"], mode=request["mode"],
                                 settings=request["settings"], progress=lambda stage: progress(None, desc=stage))
        model = validate_glb(result.glb)
        files = [p for p in (result.original, result.cleaned, result.conditioning, result.refined, result.metadata) if p]
        artifacts = (model, model, result.original, result.cleaned, result.conditioning, result.refined, files)
        message = "✓ Your model is ready. Drag to rotate, scroll to zoom, and download the validated GLB."
        error = None
    except Exception as exc:
        logger.exception("Request %s failed", request["id"])
        message = str(exc) if isinstance(exc, (ValueError, RuntimeError)) else "Generation failed. Check the server logs."
        artifacts = (None,) * ARTIFACT_COUNT
        message = "⚠ " + message
        error = message
    with SESSION_LOCK:
        if session["active"] is None or session["active"]["id"] != request["id"]:
            return (gr.skip(),) * RESULT_COUNT
        if error is None:
            session["original"] = request["image"]
            session["mode"] = request["mode"]
            session["model"] = model
        else:
            session["model"] = None
        session["error"] = error
        session["active"] = None
        session["running"] = False
        return (*artifacts, message, gr.update(interactive=True),
                gr.update(interactive=session["original"] is not None))


def blank_canvas():
    return Image.new("RGB", (640, 480), "white")


def export_sketch(value):
    from backend.pipeline import OUTPUT_DIR
    directory = OUTPUT_DIR.parent / "sketch_exports"
    return save_input(value, directory / (uuid.uuid4().hex + ".png"))


def upload_preview(value):
    if value is None:
        return None
    try:
        return as_rgb(value)
    except ValueError as exc:
        raise gr.Error(str(exc)) from exc


def inference_status():
    triposr = os.environ.get("TRIPOSR_DIR", "")
    if not triposr or not (Path(triposr).expanduser() / "run.py").is_file():
        return "**Inference setup needed** · Install the ML worker environment and set TRIPOSR_DIR to an installed TripoSR checkout on this machine. The drawing interface is available."
    return "**TripoSR checkout configured** · Workers check the selected device, packages and models when you generate. CPU is slower and needs substantial system RAM."


CSS = """
body, .gradio-container { background: #090d17 !important; color: #e8edf7 !important; }
.gradio-container { max-width: 1320px !important; margin: auto; }
#hero { padding: 34px 12px 24px; }
#hero h1 { font-size: clamp(32px, 5vw, 52px); letter-spacing: -2px; color: #f3f6ff; }
#hero p { color: #a5b4cc; max-width: 680px; font-size: 16px; }
.eyebrow { color: #8cf4d0; font-size: 12px; letter-spacing: 3px; }
.panel { background: #111827 !important; border: 1px solid #28344b !important; border-radius: 18px !important; padding: 20px !important; }
#generate { background: linear-gradient(110deg, #60e3bc, #6cafff) !important; color: #071522 !important; font-weight: 700; border: 0; min-height: 52px; }
#status { border-left: 3px solid #60e3bc; padding: 12px; background: #101d2c; border-radius: 6px; }
footer { display: none !important; }
"""


def build_app():
    small = low_memory()
    with gr.Blocks(title="Sketch2Shape AI", analytics_enabled=False) as demo:
        session = gr.State(new_session)
        gr.HTML('''<section id="hero" class="shader-hero"><div data-shader-root aria-hidden="true"></div>
        <span class="eyebrow">SKETCH2SHAPE AI / CREATIVE LAB</span>
        <h1>Turn Your Sketches<br>Into 3D Reality</h1>
        <p>Draw an idea or upload an object photo. Generate a plausible 3D shape you can explore and download.</p></section>''',
                css_template=(ASSETS / "shader-animation.css").read_text(),
                js_on_load=(ASSETS / "shader-animation.js").read_text())
        availability = gr.Markdown(inference_status())
        refresh = gr.Button("Refresh inference configuration", size="sm")
        refresh.click(inference_status, outputs=availability, queue=False)
        with gr.Accordion("How it works", open=False):
            gr.Markdown("**Sketch to 3D:** drawing/upload → sketch cleanup → ControlNet Scribble + Stable Diffusion 1.5 → refined PNG → TripoSR → validated GLB.\n\n"
                        "**Image to 3D:** object photo → TripoSR → validated GLB. Descriptions guide sketch refinement only.\n\n"
                        "An empty description uses a neutral object-photo prompt; there is no automatic object recognition. Hidden geometry is inferred and may differ from your idea.")
        mode = gr.Radio(["Sketch to 3D", "Image to 3D"], value="Sketch to 3D", label="Generation mode")
        with gr.Row(equal_height=True):
            with gr.Column(scale=1, min_width=300, elem_classes="panel"):
                gr.Markdown("### 01 / Shape your idea")
                source = gr.Radio(["Draw", "Upload"], value="Draw", label="Input source")
                sketch = gr.ImageEditor(value=blank_canvas, label="Sketch canvas", type="pil", image_mode="RGBA",
                    sources=(), brush=gr.Brush(colors=["#000000"], default_color="#000000", default_size=8, color_mode="fixed"),
                    eraser=gr.Eraser(default_size=20), canvas_size=(640, 480), height=370,
                    transforms=(), format="png", buttons=["download", "fullscreen"])
                with gr.Row():
                    reset = gr.Button("Clear canvas", size="sm")
                    export = gr.Button("Export sketch PNG", size="sm")
                sketch_file = gr.File(label="Exported sketch", interactive=False)
                upload = gr.File(label="Upload PNG, JPG/JPEG, or WebP · up to 20 MiB", file_types=[".png", ".jpg", ".jpeg", ".webp"], visible=False)
                photo = gr.Image(label="Upload preview", interactive=False, visible=False, height=230)
                prompt = gr.Textbox(label="Describe your object (optional)",
                    placeholder="Example: A wooden chair with four legs and a rectangular backrest.", lines=2, max_length=1000)
                gr.Markdown("For sketches, describe the object to improve refinement. TripoSR uses the image alone.")
                with gr.Accordion("Advanced settings", open=False):
                    seed = gr.Number(value=42, precision=0, minimum=0, maximum=2**32-1, label="Random seed")
                    device = gr.Dropdown(["auto", "cuda", "cpu"], value=requested_device(), label="Execution device · auto prefers CUDA")
                    small_memory = gr.Checkbox(value=small, label="Use less GPU memory · slower")
                    refinement_size = gr.Dropdown([256, 384, 512], value=256 if small else 512, label="Refinement image size · sketch mode")
                    gr.Markdown("On a 4 GB GPU, enable this option and start with mesh resolution 64. CPU runs without a GPU but may not fit in 8 GB system RAM.")
                    steps = gr.Slider(1, 100, value=12 if small else 20, step=1, label="Diffusion steps · sketch mode")
                    cfg = gr.Slider(1, 20, value=1 if small else 7, step=0.5, label="CFG guidance · sketch mode")
                    gr.Markdown("CFG 1 disables classifier-free guidance's doubled batch. Smaller refinement images reduce generation memory and may reduce quality. These settings do not shrink the model weights.")
                    strength = gr.Slider(0.1, 2, value=1, step=0.1, label="ControlNet strength · sketch mode")
                    resolution = gr.Slider(16, 512, value=64 if small else 128, step=16, label="TripoSR mesh resolution")
                    remove_bg = gr.Checkbox(value=True, label="Remove image background before reconstruction")
                    gr.Markdown("Higher resolution uses more memory and may improve geometry detail. Both AI stages still require their model weights and ML packages.")
                pending = gr.Markdown("No pending prompt edit.")
                generate_button = gr.Button("Generate 3D Model", variant="primary", elem_id="generate")
                regenerate_button = gr.Button("Regenerate with current settings", interactive=False)
            with gr.Column(scale=1, min_width=300, elem_classes="panel"):
                gr.Markdown("### 02 / Explore your creation\nDrag to orbit · Scroll to zoom")
                viewer = gr.Model3D(label="Interactive 3D preview", height=460, clear_color=(0.04, 0.06, 0.1, 1))
                status = gr.Markdown("Draw or upload an input to begin.", elem_id="status")
                download = gr.File(label="Download validated GLB", interactive=False)
                with gr.Accordion("Inspect the generation", open=True):
                    original = gr.Image(label="Original input", interactive=False, height=200)
                    with gr.Row():
                        cleaned = gr.Image(label="Cleaned sketch", interactive=False, height=190)
                        conditioning = gr.Image(label="ControlNet conditioning", interactive=False, height=190)
                    refined = gr.Image(label="AI-refined image · sketch mode", interactive=False, height=260)
                    artifacts = gr.File(label="Download input, intermediate PNGs & metadata", file_count="multiple", interactive=False)
        gr.Markdown("Built for TechZephyr 4.0 · GLB works with Blender and other 3D tools. Reconstruction is plausible, not engineering-accurate.")
        def switch_source(value):
            return (gr.update(visible=value == "Draw"), gr.update(visible=value == "Upload"),
                    gr.update(visible=value == "Upload"))
        source.change(switch_source, source, [sketch, upload, photo], queue=False)
        def switch_mode(value, selected):
            image_mode = value == "Image to 3D"
            return (gr.update(value="Upload" if image_mode else selected, interactive=not image_mode),
                    gr.update(interactive=not image_mode), gr.update(interactive=not image_mode),
                    gr.update(interactive=not image_mode), gr.update(interactive=not image_mode))
        mode.change(switch_mode, [mode, source], [source, seed, steps, cfg, strength], queue=False)
        upload.change(upload_preview, upload, photo, queue=False)
        reset.click(lambda: (blank_canvas(), None), outputs=[sketch, sketch_file], queue=False)
        export.click(export_sketch, sketch, sketch_file, queue=False)
        prompt.change(pending_prompt, [prompt, session], pending, queue=False, trigger_mode="always_last")
        output_artifacts = [viewer, download, original, cleaned, conditioning, refined, artifacts]
        admission_outputs = [session, status, generate_button, regenerate_button, pending, *output_artifacts]
        result_outputs = [*output_artifacts, status, generate_button, regenerate_button]
        advanced = [mode, seed, steps, cfg, strength, resolution, remove_bg, device, small_memory, refinement_size]
        for event in (
            generate_button.click(submit_request, [sketch, upload, source, prompt, session, *advanced], admission_outputs, queue=False, trigger_mode="once"),
            regenerate_button.click(submit_regeneration, [prompt, session, *advanced], admission_outputs, queue=False, trigger_mode="once"),
        ):
            event.success(run_request, session, result_outputs, concurrency_id="inference", concurrency_limit=1, show_progress="full")
    return demo.queue(default_concurrency_limit=1, max_size=16)


def main():
    parser = argparse.ArgumentParser(description="Sketch2Shape AI web application")
    parser.add_argument("--host", default="127.0.0.1")
    parser.add_argument("--port", type=int, default=7860)
    parser.add_argument("--device", choices=["auto", "cuda", "cpu"], help="Initial device selection; auto prefers CUDA when available")
    parser.add_argument("--low-memory", action="store_true", help="Start with sequential offload, 256px refinement, CFG 1, 12 steps and mesh resolution 64")
    parser.add_argument("--share", action="store_true", help="Create a temporary Gradio link; requires SKETCH2SHAPE_SHARE_PASSWORD in the environment")
    args = parser.parse_args()
    auth = None
    if args.share:
        password = os.environ.get("SKETCH2SHAPE_SHARE_PASSWORD", "")
        if len(password) < 12:
            parser.error("--share requires SKETCH2SHAPE_SHARE_PASSWORD with at least 12 characters")
        auth = ("sketch2shape", password)
    if args.device:
        os.environ["SKETCH2SHAPE_DEVICE"] = args.device
    if args.low_memory:
        os.environ["SKETCH2SHAPE_LOW_MEMORY"] = "true"
    logging.basicConfig(level=logging.INFO, format="%(asctime)s %(levelname)s %(name)s: %(message)s")
    from backend.process import stop_workers
    def terminate(signum, frame):
        stop_workers()
        raise SystemExit(128 + signum)
    signal.signal(signal.SIGTERM, terminate)
    try:
        build_app().launch(server_name=args.host, server_port=args.port, share=args.share, auth=auth, max_file_size="20mb",
            theme=gr.themes.Base(primary_hue="violet", neutral_hue="slate"), css=CSS,
            js="() => { document.documentElement.classList.add('dark'); }")
    finally:
        stop_workers()


if __name__ == "__main__":
    main()
