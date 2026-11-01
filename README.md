# Sketch2Shape AI

A dark Gradio 6 frontend for image-to-3D generation with SF3D. Upload a PNG/JPG photo of one object, click **Generate 3D**, explore the model, and download its GLB. The download button appears after a successful generation.

SF3D does not use text prompts. Prompt editing, regeneration controls, and the extra comparison panel have been removed from this simplified interface. To generate another model, upload an image and click Generate again. Uploading alone never starts inference.

## Run locally

Use a frontend environment separate from the working SF3D environment. Requires Python 3.10+ (frontend validated with Python 3.12).

```bash
python -m venv .venv
source .venv/bin/activate
python -m pip install -r requirements.txt

export SF3D_PYTHON="$PWD/backend/.venv-sf3d/bin/python"
export SF3D_SOURCE="$PWD/backend/vendor/stable-fast-3d"
export SF3D_MODEL_DIR="$PWD/backend/weights/stable-fast-3d"
export SF3D_DEVICE=cpu
python app.py
```

Open the address printed by Gradio. Keep your existing Mac source/checkpoint paths if they differ. The frontend adapter detects `backend/.venv-sf3d/bin/python` automatically when present; otherwise set `SF3D_PYTHON`. See [backend setup](backend/README.md) for SF3D installation, model downloads and troubleshooting.

## Public link for judges

With the frontend environment active and the SF3D variables above configured, run:

```bash
python app.py --share
```

Gradio prints a public `https://....gradio.live` URL with no password prompt or
login screen. Anyone with the link can use the app and trigger generation on your
Mac. `DEMO_PASSWORD` is no longer used. Without `--share`, startup remains local.

The link is temporary and requires this process, an awake Mac and an internet
connection. Run `caffeinate -i` in another Mac terminal during judging. Test the
link from a phone on mobile data, including one real generation. Creating a tunnel
requires access to Gradio's sharing service; if it fails, check the terminal error,
VPN/firewall settings and internet connection. Stop the app with Ctrl+C to end sharing.

## Generation behavior

The frontend lazily calls `backend.frontend_sf3d.generate_3d(image_path, prompt=None)`, explicitly selecting SF3D without cross-engine fallback. It supplies an empty prompt. Standalone backend selection and TripoSR behavior remain unchanged.

Pillow applies EXIF orientation, flattens transparency onto white, and resizes within 1024 × 1024 without stretching or upscaling. Clicking Generate captures independent image pixels before queueing. One status area reports loading, success or failure; per-output Gradio loading overlays are hidden. The Generate button is disabled during the request.

The inference queue and server-side lock serialize generation in a single application process. Session admission rejects overlapping requests, and request IDs prevent stale completions from overwriting results. Run one application process per backend instance; multiple processes require a shared lock/queue.

Returned files are checked for the GLB signature and nonempty mesh geometry using trimesh. A temporary copy is used for preview/download. The current successful model stays available during another attempt and after a failure. Missing dependencies or inference failures produce clear errors, never fabricated output. Configure periodic cleanup for old temporary output copies and Gradio cache files in long-running deployments.

## Tests

```bash
python -m unittest discover -s tests -v
```

Tests cover preprocessing, missing backend errors, GLB validation, SF3D binding, snapshots, concurrency, stale results, failure retention and the simplified UI. Fixture meshes and mocked generators test frontend behavior; they do not establish real SF3D inference or Mac compatibility. Legacy prompt/session helpers remain tested internally but are not exposed by the interface.

## Animated hero

The decorative React/Three.js shader remains embedded in Gradio. Prebuilt assets support Python-only startup. To edit and rebuild it with Node.js 20+:

```bash
npm ci
npm run typecheck
npm run build
```

Source lives in `components/ui/shader-animation.tsx`, `frontend/main.tsx` and `frontend/styles.css`. Commit generated `assets/shader-animation.js` and `.css` with source changes. Reduced motion or unavailable WebGL uses a static background.
