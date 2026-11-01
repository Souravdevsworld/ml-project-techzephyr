"""Sketch2Shape AI frontend. Run with: python app.py."""
from __future__ import annotations

import argparse
import getpass
import importlib
import logging
import os
from pathlib import Path
import tempfile
import threading
import uuid

import gradio as gr
from PIL import Image, ImageOps
import trimesh

logger = logging.getLogger(__name__)
MAX_EDGE = 1024
ASSETS = Path(__file__).resolve().parent / "assets"


def preprocess_sketch(value, output_path: str | Path) -> str:
    """Extract an editor composite and save an aspect-preserving RGB PNG."""
    if isinstance(value, dict):
        value = value.get("composite")
    if value is None:
        raise ValueError("Upload a PNG or JPG image first.")
    if isinstance(value, (str, Path)):
        with Image.open(value) as opened:
            image = ImageOps.exif_transpose(opened).convert("RGBA")
    elif isinstance(value, Image.Image):
        image = ImageOps.exif_transpose(value).convert("RGBA")
    else:
        raise ValueError("Please supply a valid PNG/JPG image.")
    image.thumbnail((MAX_EDGE, MAX_EDGE), Image.Resampling.LANCZOS)
    white = Image.new("RGBA", image.size, "white")
    white.alpha_composite(image)
    white.convert("RGB").save(output_path, format="PNG")
    return str(output_path)


def validate_glb(value) -> str:
    """Reject missing, malformed, or empty GLB output before exposing it."""
    if not isinstance(value, (str, Path)):
        raise ValueError("The backend must return a local GLB file path.")
    path = Path(value).resolve()
    if path.suffix.lower() != ".glb" or not path.is_file():
        raise ValueError("The backend did not return an existing .glb file.")
    with path.open("rb") as handle:
        if handle.read(4) != b"glTF":
            raise ValueError("The generated file is not a binary GLB.")
    scene = trimesh.load(path, file_type="glb", force="scene")
    if not scene.geometry or not any(
        len(getattr(mesh, "vertices", [])) and len(getattr(mesh, "faces", []))
        for mesh in scene.geometry.values()
    ):
        raise ValueError("The generated GLB contains no renderable mesh.")
    return str(path)


def generate(sketch, upload, source, prompt, progress=gr.Progress()):
    # Clear previous artifacts immediately, including on a failed subsequent run.
    yield None, None, "⏳ Preparing your image…"
    try:
        progress(0.1, desc="Preparing image")
        with tempfile.TemporaryDirectory(prefix="sketch2shape-") as directory:
            image_path = preprocess_sketch(
                sketch if source == "Draw" else upload,
                Path(directory) / "sketch.png",
            )
            try:
                module = importlib.import_module("backend.frontend_sf3d")
            except ModuleNotFoundError as exc:
                if exc.name in {"backend", "backend.generator", "backend.frontend_sf3d"}:
                    raise RuntimeError(
                        "SF3D generation is unavailable: its frontend adapter or backend/generator.py is not installed. "
                        "Install the SF3D backend and configure SF3D_PYTHON to continue."
                    ) from exc
                raise RuntimeError("A backend dependency is missing. Check the server logs.") from exc
            generator = getattr(module, "generate_3d", None)
            if not callable(generator):
                raise RuntimeError("The backend must expose generate_3d(image_path, prompt).")
            progress(0.3, desc="Generating 3D model")
            yield None, None, "⏳ SF3D is reconstructing your image…"
            generated = validate_glb(generator(image_path, (prompt or "").strip()))
            # Copy before temporary input cleanup; Gradio caches returned files.
            import shutil
            with tempfile.NamedTemporaryFile(prefix="sketch2shape-", suffix=".glb", delete=False) as result:
                shutil.copyfile(generated, result.name)
                output = result.name
        progress(1, desc="Complete")
        yield output, output, "✓ Your model is ready. Orbit, inspect, and download below."
    except Exception as exc:
        logger.exception("Generation failed")
        message = str(exc) if isinstance(exc, (ValueError, RuntimeError)) else "Generation failed. Check the server logs and try again."
        yield None, None, f"⚠ {message}"


# One inference at a time across both actions and all browser sessions.
INFERENCE_LOCK = threading.Lock()
SESSION_LOCK = threading.RLock()


def new_session():
    return {"active": None, "running": False, "original": None,
            "model": None, "previous": None, "submitted_prompt": "",
            "latest_prompt": "", "error": None}


def pending_prompt(prompt, session):
    """Textbox edits never mutate the immutable request or the status/error."""
    with SESSION_LOCK:
        session["latest_prompt"] = (prompt or "").strip()
        if session["latest_prompt"] == session["submitted_prompt"]:
            return "No pending prompt edit."
        label = "(empty prompt)" if not session["latest_prompt"] else session["latest_prompt"]
        return f"Pending prompt: {label}\nApply it with Regenerate 3D after the current run finishes."


def submit_request(sketch, upload, source, prompt, session, regenerate=False):
    with SESSION_LOCK:
        if session["active"] is not None:
            raise gr.Error("A generation is already pending or running. Your prompt edit can wait; no new job was started.")
        value = session["original"] if regenerate else (sketch if source == "Draw" else upload)
        if regenerate and value is None:
            raise gr.Error("Generate a successful model before regenerating.")
        # Freeze pixels before any queued inference; never retain editor references.
        with tempfile.TemporaryDirectory(prefix="sketch2shape-snapshot-") as directory:
            try:
                path = preprocess_sketch(value, Path(directory) / "snapshot.png")
                with Image.open(path) as image:
                    snapshot = image.copy()
            except Exception as exc:
                raise gr.Error(str(exc)) from exc
        text = (prompt or "").strip()
        session["active"] = {"id": uuid.uuid4().hex, "image": snapshot,
                             "prompt": text, "regenerate": regenerate}
        session["submitted_prompt"] = text
        session["latest_prompt"] = text
        session["error"] = None
        return (session, "⏳ Request captured. Waiting to generate…",
                gr.update(interactive=False), gr.update(interactive=False),
                "No pending prompt edit.")


def submit_upload(upload, prompt, session):
    """Image-only frontend admission; retain the existing snapshot/locking logic."""
    with SESSION_LOCK:
        if upload is None and session["active"] is None:
            message = "⚠ Upload a PNG or JPG image first."
            session["error"] = message
            return (session, message, gr.update(interactive=True),
                    gr.update(interactive=session["original"] is not None), gr.skip())
    return submit_request(None, upload, "Upload", prompt, session)


def submit_regeneration(prompt, session):
    return submit_request(None, None, None, prompt, session, regenerate=True)


def run_request(session, progress=gr.Progress()):
    with SESSION_LOCK:
        request = session["active"]
        if request is None or session["running"]:
            return (gr.skip(),) * 7
        session["running"] = True
    try:
        with INFERENCE_LOCK:
            result = None
            for result in generate(request["image"], None, "Draw", request["prompt"], progress):
                pass
        if result is None:
            raise RuntimeError("Generation returned no result.")
        model, _, message = result
    except Exception:
        logger.exception("Request failed")
        model, message = None, "⚠ Generation failed. Check the server logs and try again."
    with SESSION_LOCK:
        # A superseded job must never publish artifacts or reset a newer job.
        if session["active"] is None or session["active"]["id"] != request["id"]:
            return (gr.skip(),) * 7
        if model:
            session["previous"] = session["model"]
            session["model"] = model
            session["original"] = request["image"]
            session["error"] = None
            message = "✓ SF3D model ready."
        else:
            session["error"] = message
            if session["model"]:
                message += " Previous successful model retained."
        session["active"] = None
        session["running"] = False
        return (session["model"], session["model"], session["previous"],
                session["original"], message, gr.update(interactive=True),
                gr.update(interactive=session["original"] is not None))


def submit_photo(upload, session):
    """Single visible action: SF3D has no text prompt or mesh-edit operation."""
    state, status, button, _, _ = submit_upload(upload, "", session)
    if session["active"] is not None:
        status = "⏳ Creating your 3D model. Please wait; CPU reconstruction can take a few minutes."
    return state, status, button


def finish_photo(session):
    viewer, path, _, _, status, button, _ = run_request(session)
    if isinstance(path, str):
        download = gr.update(value=path, visible=True)
    elif path is None:
        download = gr.update(value=None, visible=False)
    else:
        download = gr.skip()
    return viewer, download, status, button


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
    with gr.Blocks(title="Sketch2Shape AI") as demo:
        session = gr.State(new_session)
        gr.HTML('''<section id="hero" class="shader-hero"><div data-shader-root aria-hidden="true"></div><span class="eyebrow">SKETCH2SHAPE AI / CREATIVE LAB</span>
        <h1>A single image.<br>A whole new dimension.</h1>
        <p>Upload a clear photo of your object and turn it into a 3D model you can explore.</p></section>''',
            css_template=(ASSETS / "shader-animation.css").read_text(),
            js_on_load=(ASSETS / "shader-animation.js").read_text(),
        )
        with gr.Row(equal_height=True):
            with gr.Column(scale=1, min_width=320, elem_classes="panel"):
                gr.Markdown("### 01 / Upload your image\nUse a clear photo of one object, with the full object visible.")
                upload = gr.Image(label="Upload PNG or JPG", type="pil", sources=["upload"], height=370)
                generate_button = gr.Button("Generate 3D  →", variant="primary", elem_id="generate")
            with gr.Column(scale=1, min_width=320, elem_classes="panel"):
                gr.Markdown("### 02 / Explore your creation\nDrag to orbit · Scroll to zoom")
                viewer = gr.Model3D(label="3D workspace", height=460, clear_color=(0.04, 0.06, 0.1, 1))
                status = gr.Markdown("Ready when you are. Upload an image to begin.", elem_id="status")
                download = gr.DownloadButton("Download GLB", visible=False)
        submission = generate_button.click(
            submit_photo, [upload, session], [session, status, generate_button],
            queue=False, trigger_mode="once", show_progress="hidden")
        submission.success(
            finish_photo, session, [viewer, download, status, generate_button],
            concurrency_id="inference", concurrency_limit=1, show_progress="hidden")
    return demo.queue(default_concurrency_limit=1)


def sharing_options(share=False):
    """Public sharing is opt-in and always requires a password."""
    if not share:
        return {"share": False}
    password = os.environ.get("DEMO_PASSWORD") or getpass.getpass(
        "Choose a password for judges (input is hidden): ")
    if not password.strip():
        raise ValueError("A nonempty password is required for public sharing.")
    return {"share": True, "auth": ("judges", password)}


if __name__ == "__main__":
    parser = argparse.ArgumentParser(description="Sketch2Shape AI Gradio frontend")
    parser.add_argument("--share", action="store_true",
                        help="Create a password-protected public Gradio link")
    args = parser.parse_args()
    options = sharing_options(args.share)
    build_app().launch(**options, theme=gr.themes.Base(primary_hue="emerald", neutral_hue="slate"), css=CSS, js="() => { document.documentElement.classList.add('dark'); }")
