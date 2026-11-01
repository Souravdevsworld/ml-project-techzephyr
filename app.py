"""Sketch2Shape AI frontend. Run with: python app.py."""
from __future__ import annotations

import argparse
import importlib
import logging
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
:root { color-scheme: dark; }
body, .gradio-container { background: #0b100f !important; color: #e8eee9 !important; }
.gradio-container { width:100% !important; max-width: 1280px !important; margin: auto !important; padding: 0 36px 28px !important;
    font-family: 'Inter', ui-sans-serif, system-ui, sans-serif !important;
    --body-text-color: #e8eee9; --body-text-color-subdued: #93a69b;
    --block-background-fill: #121a16; --background-fill-primary: #121a16;
    --background-fill-secondary: #18221c; --border-color-primary: #2a382e;
    --block-label-background-fill: #18221c; --block-label-text-color: #b9c9be; }
.gradio-container .main { padding:0 !important; }
.gradio-container .html-container .prose { padding:0 !important; max-width:none !important; }
.gradio-container .prose, .gradio-container .prose p { color: #93a69b; }
.studio-nav { display:flex; align-items:center; justify-content:space-between; padding:26px 0; border-bottom:1px solid #253128; gap:20px; }
.brand { display:flex; align-items:center; gap:12px; color:#f0f5ed; font-size:20px; font-weight:650; letter-spacing:-.7px; }
.brand svg { color:#c3ef8e; width:30px; height:30px; }
.brand small { color:#8d9c91; font-weight:400; }
.nav-right { display:flex; gap:24px; align-items:center; font-size:12px; color:#8e9e92; }
.nav-right a { color:#d2ddcf; text-decoration:none; }
.nav-right a:hover { color:#c3ef8e; }
.nav-tag { display:flex; align-items:center; gap:7px; border:1px solid #344332; padding:7px 11px; border-radius:30px; }
.nav-tag i { width:5px; height:5px; border-radius:50%; background:#c3ef8e; }
#hero.shader-hero { padding:48px 36px 44px; margin:20px 0 4px; border-radius:20px; border:1px solid #2b3c2e;
    background:radial-gradient(ellipse at 90% 70%,#263e2b,#101a15 65%); }
#hero [data-shader-root] { opacity:.24; }
#hero::after { background:linear-gradient(90deg,#101a15f5,#101a1566); }
.hero-kicker { display:flex; align-items:center; gap:10px; color:#bdd2aa; font:500 10px/1.5 ui-monospace,monospace; letter-spacing:2px; }
.hero-kicker span { height:1px; width:24px; background:#a5c981; }
#hero h1 { margin:20px 0 18px; color:#edf4e9; font-size:clamp(38px,5.4vw,66px); font-weight:500; line-height:1.04; letter-spacing:-3.5px; }
#hero h1 em { font-family:Georgia,serif; font-weight:400; color:#c3ef8e; }
#hero p { max-width:430px; color:#a3b6a6; font-size:14px; line-height:1.7; margin:0; }
.hero-meta { display:flex; flex-wrap:wrap; gap:18px; margin-top:26px; color:#b1c1ae; font:10px/1.5 ui-monospace,monospace; letter-spacing:.6px; }
.hero-meta span::before { content:'+'; color:#c3ef8e; margin-right:6px; }
.workspace-heading { display:flex; align-items:center; justify-content:space-between; margin:24px 0 12px; gap:12px; }
.workspace-heading h2 { margin:0; color:#e9f0e5; font-size:17px; font-weight:500; letter-spacing:-.4px; }
.workspace-heading p { margin:0; color:#809184; font:10px/1.5 ui-monospace,monospace; }
#workspace { gap:18px !important; }
#source-panel, #viewer-panel { background:#121a16 !important; border:1px solid #2a382e !important; border-radius:16px !important; padding:20px !important; gap:14px !important; }
.panel-top { display:flex; justify-content:space-between; align-items:center; margin-bottom:10px; }
.panel-top h3 { color:#e6eee1; font-size:14px; font-weight:500; margin:0; display:flex; align-items:center; gap:10px; }
.step-index { color:#9eaf98; font:10px ui-monospace,monospace; padding:5px 6px; border:1px solid #394733; border-radius:5px; }
.panel-top small { color:#9eaf98; font:9px ui-monospace,monospace; letter-spacing:1px; }
.panel-copy { color:#889e8d; font-size:12px; line-height:1.6; margin:0; }
#image-upload { background:#0e1611 !important; border:1px dashed #42513c !important; border-radius:12px !important; overflow:hidden; }
#image-upload button { color:#b1c4aa; }
#image-upload .upload-text { color:#bdcdb6 !important; font-size:13px; }
#image-upload .wrap { background:transparent !important; }
#image-upload img { object-fit:contain; }
#generate { background:#c3ef8e !important; color:#17250e !important; font-size:13px !important; font-weight:650 !important; border:1px solid #c3ef8e !important; border-radius:10px !important; min-height:50px; box-shadow:0 4px 20px #a2d57b0c; transition:background .2s,transform .2s; }
#generate:hover:not(:disabled) { background:#d5ffa3 !important; transform:translateY(-1px); }
#generate:disabled { opacity:.55; cursor:wait; }
.input-note { display:flex; justify-content:space-between; flex-wrap:wrap; gap:6px; color:#80937e; font-size:10px; line-height:1.6; }
.input-note a { color:#bed89f; text-decoration:none; border-bottom:1px solid #46563b; }
#model-viewer { border:1px solid #2a382e !important; border-radius:12px !important; background-color:#0b120e !important;
    background-image:radial-gradient(#32433570 .7px,transparent .7px); background-size:18px 18px; overflow:hidden; }
#status { border:1px solid #34432f; padding:12px 14px !important; background:#172114; border-radius:9px; min-height:44px; }
#status p { color:#c1d3b2 !important; font-size:11px; line-height:1.6; margin:0; }
#download { background:#22351c !important; color:#d0eabc !important; border:1px solid #49633a !important; border-radius:9px !important; min-height:44px; font-size:12px; }
.studio-footer { border-top:1px solid #253128; padding:22px 0 8px; margin-top:26px; display:flex; justify-content:space-between; flex-wrap:wrap; gap:10px; color:#81917f; font:10px/1.6 ui-monospace,monospace; }
.studio-footer strong { color:#b4c4a9; font-weight:400; }
a:focus-visible, button:focus-visible { outline:2px solid #c3ef8e !important; outline-offset:4px; }
footer { display:none !important; }
@media (max-width:700px) {
 .gradio-container { padding:0 16px 20px !important; }
 .studio-nav { padding:20px 0; } .brand { font-size:17px; } .brand small,.nav-tag { display:none; }
 #hero.shader-hero { padding:32px 22px; } #hero h1 { letter-spacing:-2px; }
 #source-panel, #viewer-panel { padding:16px !important; min-width:0 !important; }
 #workspace { flex-direction:column !important; }
 #source-panel, #viewer-panel { width:100% !important; box-sizing:border-box; }
 .workspace-heading p { display:none; } .hero-meta { gap:10px; font-size:9px; }
}
@media (prefers-reduced-motion:reduce) { #generate { transition:none; } #generate:hover { transform:none; } }
"""


def studio_html(markup):
    """Style decorative HTML inside Gradio's isolated HTML component."""
    return gr.HTML(markup, css_template=CSS, padding=False)


def build_app():
    with gr.Blocks(title="Sketch2Shape AI") as demo:
        session = gr.State(new_session)
        studio_html('<nav class="studio-nav" aria-label="Studio"><div class="brand">'
            '<svg viewBox="0 0 32 32" fill="none" stroke="currentColor" stroke-width="1.4" aria-hidden="true">'
            '<path d="M16 2 29 9.5v13L16 30 3 22.5v-13L16 2Z M3 9.5l13 7.5 13-7.5 M16 17v13 M9.5 5.75l13 7.5v13"/></svg>'
            'Sketch2Shape <small>/ studio</small></div><div class="nav-right">'
            '<span class="nav-tag"><i></i> IMAGE TO 3D</span>'
            '<a href="https://github.com/Souravdevsworld/ml-project-techzephyr" target="_blank" rel="noopener noreferrer">GitHub</a></div></nav>')
        gr.HTML('''<section id="hero" class="shader-hero"><div data-shader-root aria-hidden="true"></div>
        <div class="hero-kicker"><span></span> A NEW PERSPECTIVE ON YOUR IDEAS</div>
        <h1>One image.<br>Infinite <em>possibility.</em></h1>
        <p>Give your ideas another dimension. Turn an object image into a textured 3D model, ready to explore and make your own.</p>
        <div class="hero-meta"><span>IMAGE-TO-3D RECONSTRUCTION</span><span>TEXTURED GLB EXPORT</span></div></section>''',
            css_template=(ASSETS / "shader-animation.css").read_text() + CSS,
            js_on_load=(ASSETS / "shader-animation.js").read_text(), padding=False)
        studio_html('<div class="workspace-heading"><h2>Your creative workspace</h2>'
                    '<p>01 / UPLOAD &nbsp; → &nbsp; 02 / GENERATE &nbsp; → &nbsp; 03 / EXPLORE</p></div>')
        with gr.Row(equal_height=True, elem_id="workspace"):
            with gr.Column(scale=4, min_width=290, elem_classes="panel", elem_id="source-panel"):
                studio_html('<div class="panel-top"><h3><span class="step-index">01</span> Source image</h3><small>PNG / JPG</small></div>'
                            '<p class="panel-copy">Start with a clear photo of one object.<br>A simple background gives your idea room to shine.</p>')
                upload = gr.Image(label="Upload PNG or JPG", show_label=False, type="pil", sources=["upload"], height=310, elem_id="image-upload")
                generate_button = gr.Button("Generate 3D", variant="primary", elem_id="generate")
                studio_html('<div class="input-note"><span>Have a sketch instead?</span>'
                    '<a href="https://colab.research.google.com/github/Souravdevsworld/ml-project-techzephyr/blob/main/notebooks/Sketch2Shape_Basic_Colab.ipynb" '
                    'target="_blank" rel="noopener noreferrer">Create an image in Colab</a></div>')
            with gr.Column(scale=6, min_width=290, elem_classes="panel", elem_id="viewer-panel"):
                studio_html('<div class="panel-top"><h3><span class="step-index">02</span> The next dimension</h3><small>3D VIEWPORT</small></div>'
                            '<p class="panel-copy">Your model will appear here. Drag to orbit · Scroll to zoom.</p>')
                viewer = gr.Model3D(label="Interactive 3D model", show_label=False, height=370, clear_color=(0.043, 0.071, 0.055, 0), elem_id="model-viewer")
                status = gr.Markdown("Ready to create. Upload an image, then generate your model.", elem_id="status")
                download = gr.DownloadButton("Download model · GLB", visible=False, elem_id="download")
        studio_html('<div class="studio-footer"><span><strong>SKETCH2SHAPE AI</strong> &nbsp; / &nbsp; TECHZEPHYR 4.0</span>'
                    '<span>Reconstructed with SF3D · Powered by Stability AI</span></div>')
        submission = generate_button.click(
            submit_photo, [upload, session], [session, status, generate_button],
            queue=False, trigger_mode="once", show_progress="hidden")
        submission.success(
            finish_photo, session, [viewer, download, status, generate_button],
            concurrency_id="inference", concurrency_limit=1, show_progress="hidden")
    return demo.queue(default_concurrency_limit=1)


def sharing_options(share=False):
    """Public sharing is opt-in and does not require authentication."""
    return {"share": share}


if __name__ == "__main__":
    parser = argparse.ArgumentParser(description="Sketch2Shape AI Gradio frontend")
    parser.add_argument("--share", action="store_true",
                        help="Create a public Gradio link without a login")
    args = parser.parse_args()
    options = sharing_options(args.share)
    build_app().launch(**options, theme=gr.themes.Base(primary_hue="emerald", neutral_hue="slate"), css=CSS, js="() => { document.documentElement.classList.add('dark'); }")
