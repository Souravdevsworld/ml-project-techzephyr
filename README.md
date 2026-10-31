# Sketch2Shape AI

A dark Gradio 6 image-to-3D frontend. Upload a PNG/JPG photo of one object; drawing controls have been removed. Add an optional appearance prompt, generate a model, orbit it in the interactive viewer, and download its GLB.

## Run locally

Requires Python 3.10+ (validated with Python 3.12).

```bash
python -m venv .venv
source .venv/bin/activate
pip install -r requirements.txt
python app.py
```

Open the address printed by Gradio. The frontend starts without the generation backend; attempting generation then displays a clear unavailable-backend error. A previous successful model is retained when a later request fails. No placeholder model is produced. Gradio provides loading progress and queues one generation at a time.

## Backend contract

The teammate-owned `backend/generator.py` must expose:

```python
def generate_3d(image_path: str, prompt: str) -> str:
    # Return an existing local .glb path.
    ...
```

The import happens only when Generate is clicked. The backend receives an RGB PNG and a trimmed prompt (empty string when omitted). It must read the input synchronously before returning: the temporary input is removed afterward. Returned files are checked for the GLB signature and loaded with trimesh to confirm nonempty mesh geometry. A temporary copy is passed to Gradio for viewing and download. Temporary output copies use the OS temporary directory; deployments should configure periodic cleanup of old temporary files and Gradio's file cache.

Pillow applies EXIF orientation, flattens alpha onto white, and resizes within 1024 × 1024 without stretching or upscaling. Only the uploaded image is submitted; the frontend does not invoke the experimental sketch refiner.

## Validation

```bash
python -m unittest discover -s tests -v
```

Tests cover canvas transparency/aspect ratio, JPEG preprocessing, empty input, missing backend, invalid and empty GLBs, the backend argument contract using a test double, and Gradio construction. Test meshes are fixtures only; the application never fabricates generation output. Real end-to-end generation requires the teammate's backend and its model dependencies.

Frontend work is on `swagat-dev`. Backend code on `sourav-dev` is untouched; no branch merge is required for frontend startup. Dependency ranges target Gradio 6.x; there is no project lockfile yet.

## Animated React hero

The supplied `ShaderAnimation` React/Three.js component lives in `components/ui/shader-animation.tsx`. Gradio mounts its bundled React root inside the hero through `gr.HTML(js_on_load=...)`; drawing and generation remain Gradio components. No external CDN or image assets are needed.

The frontend has TypeScript, Tailwind 4 utilities, a `@/` import alias, and a shadcn `components.json` configuration. `components/ui` keeps reusable UI components at the configured shadcn alias. This is a Gradio embedding rather than a separate Next.js application, so running `shadcn init` is unnecessary. Styles live in `frontend/styles.css` and the mount entry is `frontend/main.tsx`.

To edit and rebuild the animation (Node.js 20+):

```bash
npm ci
npm run build
python app.py
```

Commit the generated `assets/shader-animation.js` and `.css` alongside source changes. They are included so Python-only startup does not require Node or an internet connection. `npm run typecheck` checks the TypeScript component independently. No props, state providers, icons, or stock images are required. The animation is decorative, resizes to the hero, caps pixel density at 2, and leaves the static gradient when reduced motion is requested or WebGL is unavailable. GPU resources and animation frames are cleaned up when unmounted.


## Optional prompt edits and regeneration

Generate works with an empty appearance prompt. The submitted prompt is trimmed and passed to `generate_3d(image_path, prompt)`; whether it conditions the output depends on backend support and has not been verified with the real backend.

Clicking Generate captures independent RGB image pixels and the prompt before inference enters the queue. Both generation actions are disabled while the request is pending or running. The prompt textbox remains editable: edits appear in the separate pending-edit field, never alter the active request, and never automatically trigger inference. Prompt edits do not clear generation errors.

After a successful generation, **Regenerate 3D** starts a new request from the saved original image and the current prompt. It does not edit an existing mesh. The current model/download stay available during a new attempt or after a failure. The expandable comparison area retains the saved image and the immediately previous successful model. A successful new Generate replaces the saved original with its own input; failed attempts leave the previous saved input intact. Session history is in memory and resets on a new browser session/server restart.

Both actions share one inference queue and a server-side inference lock. Admission rejects a second request for an active session, duplicate worker calls are ignored, and request IDs prevent superseded completions from publishing results. These controls cover a single application process; run one worker process per backend instance (a multi-process deployment would need a shared queue/lock).

The tests also cover click-time snapshots, optional prompts, edits during blocked inference, rejected overlap, sequential inference across sessions, original-image regeneration, comparison history, failure retention, and stale-result rejection. Browser checks use a temporary test backend only and do not establish real text-guided generation support.

The optional prompt remains part of the backend contract. SF3D ignores text prompts; the frontend states this explicitly. To use the existing SF3D adapter, configure its environment as described in `backend/README.md` and set `SKETCH2SHAPE_3D_BACKEND=sf3d`. Standalone backend configuration remains unchanged; the frontend uses the explicit SF3D binding documented below. Real model inference is not established by frontend tests.


## Image-upload frontend connected to SF3D

The frontend now calls `backend.frontend_sf3d.generate_3d`, which explicitly selects
SF3D and disables cross-engine fallback. The existing backend CLI selector and
TripoSR implementation remain unchanged. Uploaded images, loading/error states,
validated GLB preview/download, regeneration, and comparison use this binding.
SF3D does not condition on the optional text prompt.

From the repository root, activate your existing frontend environment and run:

```bash
export SF3D_PYTHON="$PWD/backend/.venv-sf3d/bin/python"
export SF3D_SOURCE="$PWD/backend/vendor/stable-fast-3d"
export SF3D_MODEL_DIR="$PWD/backend/weights/stable-fast-3d"
export SF3D_DEVICE=cpu
python app.py
```

Keep your working Mac source/checkpoint paths if they differ. If the conventional
`backend/.venv-sf3d/bin/python` exists, the frontend adapter finds it automatically;
otherwise `SF3D_PYTHON` is required. Missing environments, source, checkpoints, or
native extensions surface as generation errors, never placeholder models. See
`backend/README.md` for installation and authenticated model download steps.
The SF3D connection tests use fixture GLBs/mocks; real Mac inference is a separate
local check and was not executed by those tests.
