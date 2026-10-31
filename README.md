# Sketch2Shape AI

A dark Gradio 6 frontend for our 2D sketch-to-3D hackathon project. Draw with the brush and eraser, reset the canvas, or upload a PNG/JPG. Add an optional appearance prompt, generate a model, orbit it in the interactive viewer, and download its GLB.

## Run locally

Requires Python 3.10+ (validated with Python 3.12).

```bash
python -m venv .venv
source .venv/bin/activate
pip install -r requirements.txt
python app.py
```

Open the address printed by Gradio. The frontend starts without the generation backend; attempting generation then displays a clear unavailable-backend error and clears previous results. No placeholder model is produced. Gradio provides loading progress and queues one generation at a time.

## Backend contract

The teammate-owned `backend/generator.py` must expose:

```python
def generate_3d(image_path: str, prompt: str) -> str:
    # Return an existing local .glb path.
    ...
```

The import happens only when Generate is clicked. The backend receives an RGB PNG and a trimmed prompt (empty string when omitted). It must read the input synchronously before returning: the temporary input is removed afterward. Returned files are checked for the GLB signature and loaded with trimesh to confirm nonempty mesh geometry. A temporary copy is passed to Gradio for viewing and download. Temporary output copies use the OS temporary directory; deployments should configure periodic cleanup of old temporary files and Gradio's file cache.

Pillow extracts the editor's `composite`, applies EXIF orientation, flattens alpha onto white, and resizes within 1024 × 1024 without stretching or upscaling. The selected Draw/Upload source is explicit, so an old upload cannot accidentally override a new sketch.

## Validation

```bash
python -m unittest discover -s tests -v
```

Tests cover canvas transparency/aspect ratio, JPEG preprocessing, empty input, missing backend, invalid and empty GLBs, the backend argument contract using a test double, and Gradio construction. Test meshes are fixtures only; the application never fabricates generation output. Real end-to-end generation requires the teammate's backend and its model dependencies.

Frontend work is on `swagat-dev`. Backend code on `sourav-dev` is untouched; no branch merge is required for frontend startup. Dependency ranges target Gradio 6.x; there is no project lockfile yet.
