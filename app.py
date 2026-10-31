"""Sketch2Shape AI frontend. Run with: python app.py."""
from __future__ import annotations

import importlib
import logging
from pathlib import Path
import tempfile

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
        raise ValueError("Draw a sketch or upload a PNG/JPG image first.")
    if isinstance(value, (str, Path)):
        with Image.open(value) as opened:
            image = ImageOps.exif_transpose(opened).convert("RGBA")
    elif isinstance(value, Image.Image):
        image = ImageOps.exif_transpose(value).convert("RGBA")
    else:
        raise ValueError("Please supply a valid sketch or PNG/JPG image.")
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
    yield None, None, "⏳ Preparing your sketch…"
    try:
        progress(0.1, desc="Preparing sketch")
        with tempfile.TemporaryDirectory(prefix="sketch2shape-") as directory:
            image_path = preprocess_sketch(
                sketch if source == "Draw" else upload,
                Path(directory) / "sketch.png",
            )
            try:
                module = importlib.import_module("backend.generator")
            except ModuleNotFoundError as exc:
                if exc.name in {"backend", "backend.generator"}:
                    raise RuntimeError(
                        "3D generation is unavailable: backend/generator.py is not installed. "
                        "Connect the backend's generate_3d(image_path, prompt) function to continue."
                    ) from exc
                raise RuntimeError("A backend dependency is missing. Check the server logs.") from exc
            generator = getattr(module, "generate_3d", None)
            if not callable(generator):
                raise RuntimeError("The backend must expose generate_3d(image_path, prompt).")
            progress(0.3, desc="Generating 3D model")
            yield None, None, "⏳ Generating your 3D model…"
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
        gr.Warning(message)
        yield None, None, f"⚠ {message}"


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
        gr.HTML('''<section id="hero" class="shader-hero"><div data-shader-root aria-hidden="true"></div><span class="eyebrow">SKETCH2SHAPE AI / CREATIVE LAB</span>
        <h1>A simple sketch.<br>A whole new dimension.</h1>
        <p>Draw your idea, add a little direction, and turn it into a 3D object you can explore.</p></section>''',
            css_template=(ASSETS / "shader-animation.css").read_text(),
            js_on_load=(ASSETS / "shader-animation.js").read_text(),
        )
        with gr.Row(equal_height=True):
            with gr.Column(scale=1, min_width=320, elem_classes="panel"):
                gr.Markdown("### 01 / Shape your idea\nStart with a clear silhouette on a white background.")
                source = gr.Radio(["Draw", "Upload"], value="Draw", label="Sketch source")
                sketch = gr.ImageEditor(
                    label="Sketch canvas", type="pil", image_mode="RGBA",
                    sources=(), brush=gr.Brush(colors=["#111111"], default_size=8),
                    eraser=gr.Eraser(default_size=20), canvas_size=(640, 480),
                    height=370, transforms=(),
                )
                reset = gr.Button("↺ Reset canvas", size="sm")
                upload = gr.Image(label="Upload PNG or JPG", type="pil", sources=["upload"], visible=False)
                prompt = gr.Textbox(label="Appearance · optional", placeholder="e.g. A matte ceramic vase with soft, rounded edges", lines=2, max_length=1000)
                generate_button = gr.Button("Generate 3D  →", variant="primary", elem_id="generate")
            with gr.Column(scale=1, min_width=320, elem_classes="panel"):
                gr.Markdown("### 02 / Explore your creation\nDrag to orbit · Scroll to zoom")
                viewer = gr.Model3D(label="3D workspace", height=460, clear_color=(0.04, 0.06, 0.1, 1))
                status = gr.Markdown("Ready when you are. Draw or upload a sketch to begin.", elem_id="status")
                download = gr.File(label="Download GLB", interactive=False)
        gr.Markdown("**Sketch → Shape → Explore** &nbsp; · &nbsp; Built for ideas in the making. GLB files work with Blender and other 3D tools.")
        source.change(lambda value: (gr.update(visible=value == "Draw"), gr.update(visible=value == "Upload")), source, [sketch, upload], queue=False)
        reset.click(lambda: None, outputs=sketch, queue=False)
        generate_button.click(generate, [sketch, upload, source, prompt], [viewer, download, status], concurrency_limit=1, show_progress="full")
    return demo.queue(default_concurrency_limit=1)


if __name__ == "__main__":
    build_app().launch(theme=gr.themes.Base(primary_hue="emerald", neutral_hue="slate"), css=CSS, js="() => { document.documentElement.classList.add('dark'); }")
