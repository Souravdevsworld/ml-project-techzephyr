# Sketch2Shape AI — TechZephyr 4.0

Sketch2Shape AI turns a single object image into a downloadable 3D asset. The current prototype uses a Gradio web interface and Stable Fast 3D (SF3D) to reconstruct a textured GLB locally. TripoSR remains available through the backend CLI. A separate experimental sketch-to-image pipeline uses Stable Diffusion 1.5 and ControlNet Scribble before reconstruction.

**Submission status:** the team reports real SF3D CPU inference on an Apple Silicon Mac M4, with textured GLB output. The reported generation time is approximately 97 seconds on a 16 GB machine. That local result has not been independently reproduced in the cloud. The current web interface supports **image upload only**; it has no drawing canvas or prompt editor. The optional sketch CLI is implemented and mock-tested, but real Mac MPS sketch inference is unverified. If both drawing and upload are mandatory for judging, the current interface does not meet the drawing requirement.

# Project Documentation + User Manual + Input-Output : 
https://drive.google.com/file/d/1NItNKfc1yquhOGevg3Nbyl4EGPPBFeha/view?usp=sharing

# Youtube Video :
https://youtu.be/2zDlo0yXW7M

## Sketch-to-image notebook (Google Colab)

[![Open in Colab](https://colab.research.google.com/assets/colab-badge.svg)](https://colab.research.google.com/github/Souravdevsworld/ml-project-techzephyr/blob/main/notebooks/Sketch2Shape_Basic_Colab.ipynb)

The supplied [Sketch2Shape Basic Colab notebook](notebooks/Sketch2Shape_Basic_Colab.ipynb)
is a separate sketch-to-image option, using SD 1.5 + ControlNet Scribble on a Colab
CUDA GPU. It does not run SF3D or add drawing controls to the web prototype.

1. Open the notebook in Colab and select **Runtime → Change runtime type → T4 GPU**.
2. Run the install and model-loading cells in a fresh runtime. Downloads require
   internet access and may need model access/license acceptance on Hugging Face.
3. Upload a sketch, optionally edit the general prompt, and run Generate.
4. Download `generated_image.png`, then upload that PNG into the running
   Sketch2Shape Gradio app. Click **Generate 3D** to reconstruct it using SF3D.
5. For another sketch in the same runtime, rerun Upload, Generate and Download;
   keep the loaded model instead of reinstalling/reloading it.

The notebook produces a 2D PNG; SF3D still runs in the separately configured local
backend. Prompts condition the image-generation stage, not SF3D. Colab GPU access
is quota-limited and a free T4 is not guaranteed. The notebook requires CUDA and
is not the Mac MPS runner. It retains Colab's installed PyTorch and pins its own
image-generation libraries; checkpoint variants and runtime dependencies may need
compatibility adjustments. Its JSON/code syntax and lack of saved outputs were
checked here, but Colab model loading/inference was **not executed**. No successful
sketch result or sketch-to-GLB runtime is claimed from those checks.

## Objective and expected inputs/outputs

The goal is a recognizable, reusable 3D asset from one image, with browser preview and GLB export, without paid inference APIs.

| Path | Input | Output | Status |
| --- | --- | --- | --- |
| Web prototype | PNG/JPG photo of one object | Interactive 3D preview and downloadable textured `.glb` | Connected to SF3D; Mac CPU generation reported by the team |
| Backend CLI | Local object image | Absolute path to a genuine generated `.glb` | SF3D or TripoSR selectable |
| Colab notebook + manual upload | Uploaded sketch and optional prompt | Refined PNG to download, then upload into Gradio for SF3D | Notebook included; Colab inference not verified here |
| Experimental sketch CLI | Saved sketch image and optional appearance prompt | Refined PNG, then generated `.glb` | Integration mock-tested; actual MPS inference pending |

Use a clear photo with the full object visible, a simple background and some margin. Hidden surfaces are inferred, not measured. Poor silhouettes, thin structures, occlusion and complex scenes can produce distorted results. The implemented export is GLB; OBJ export is not provided. SF3D includes UVs, textures and materials; the current TripoSR path exports vertex colors.

## Architecture and implementation choices

```text
PNG/JPG upload
  → Pillow orientation / RGB preprocessing
  → Gradio snapshot, single inference queue and session state
  → backend.frontend_sf3d (explicit SF3D, no cross-engine fallback)
  → isolated Python worker: SF3D foreground preparation + reconstruction
  → UV / texture / material baking and native GLB export
  → GLB checks → interactive preview + download

Optional CLI only:
saved sketch → sketch preprocessing → SD 1.5 + ControlNet Scribble
             → realistic PNG → existing SF3D worker → textured GLB
```

| Source | Responsibility |
| --- | --- |
| [`app.py`](app.py) | Upload interface, Pillow preprocessing, snapshots, queueing, preview/download and errors |
| [`backend/frontend_sf3d.py`](backend/frontend_sf3d.py) | Explicit frontend binding to SF3D |
| [`backend/generator.py`](backend/generator.py) | Stable synchronous API, dispatch, worker lifecycle and validation |
| [`backend/backends/`](backend/backends/) | Backend selection, SF3D runtime/configuration and asset checks |
| [`backend/preprocessing.py`](backend/preprocessing.py) | Foreground processing and TripoSR preprocessing modes |
| [`backend/runtime.py`](backend/runtime.py), [`backend/surface.py`](backend/surface.py) | TripoSR reconstruction and portable surface extraction |
| [`backend/compare_backends.py`](backend/compare_backends.py) | Paired runs, timing/asset reports and human-review rubric |
| [`sketch2shape_mac_m4/`](sketch2shape_mac_m4/) | Isolated experimental sketch preprocessing/refinement and pipeline runner |
| [`tests/`](tests/), [`backend/tests/`](backend/tests/) | Frontend and backend tests |

The backend contract remains:

```python
def generate_3d(image_path: str, prompt: str | None = None) -> str:
    ...
```

It returns an absolute local GLB path. Neither SF3D nor TripoSR uses text conditioning; the frontend sends an empty prompt. Only the experimental SD/ControlNet stage uses appearance prompts. Regeneration is reconstruction from an image, not mesh editing.

Pillow applies EXIF orientation, flattens transparency onto white and fits within 1024 × 1024 without stretching/upscaling. SF3D subsequently uses its own foreground segmentation and RGBA conditioning. The frontend therefore does not preserve uploaded alpha through to SF3D; the CLI can receive the original RGBA file directly.

One Generate action captures input pixels before queueing. A single status area reports progress/errors. A queue and process-wide lock serialize inference; request IDs reject stale results. The last successful model survives a later failure. Loaded models are reused where possible. Multi-process deployment would require a shared lock/queue. Failed inference never produces a placeholder mesh.

### Why these models?

- **SF3D:** chosen for the current demo because it produces asset-oriented UVs, baked textures and PBR materials. The team reports satisfactory local output; no controlled comparative quality win is claimed. Geometry and appearance still require full-orbit review.
- **TripoSR:** retains the earlier image-to-3D route and portable extraction, with separate dependencies. The standalone selector defaults to TripoSR; the frontend explicitly requests SF3D and will not silently substitute another engine.
- **SD 1.5 + ControlNet Scribble:** an experimental bridge from sparse drawings to an image suitable for reconstruction. It may alter proportions or invent details and has not been verified end-to-end on Mac MPS.

## Dependencies and installation

Clone the submitted repository and record the exact commit used for judging:

```bash
git clone https://github.com/Souravdevsworld/ml-project-techzephyr.git
cd ml-project-techzephyr
git switch main
git rev-parse HEAD
```

Use separate environments; installing sketch, TripoSR and SF3D requirements together can break the working dependency versions.

| Environment | Requirements |
| --- | --- |
| Frontend | Python 3.10+; tested with 3.12; Gradio 6.x, Pillow and trimesh in `requirements.txt` |
| SF3D | Python 3.11; PyTorch 2.5.1, torchvision 0.20.1 and pins in `backend/requirements-sf3d.txt`; native `texture_baker` and `uv_unwrapper` |
| TripoSR (optional) | Python 3.11; pins in `backend/requirements.txt`; official source and weights |
| Sketch refiner (optional) | Separate Python 3.11 environment; `sketch2shape_mac_m4/requirements-sketch.txt`; Apple MPS for the experimental path |
| Decorative hero development only | Node.js 20+; bundled assets already included for Python-only startup |

### Frontend

```bash
python3.12 -m venv .venv
source .venv/bin/activate
python -m pip install -r requirements.txt
```

Using `python app.py` in an unconfigured Conda/base interpreter can cause `ModuleNotFoundError: gradio`. Activate the frontend environment first.

### SF3D model environment

Follow the complete [SF3D installation and native-extension instructions](backend/README.md#sf3d-installation-on-mac-m4--commands-to-test-not-a-verified-mac-recipe). They cover Python 3.11, macOS LLVM/OpenMP, pinned dependencies, extension compilation and the source checkout. Preserve an already working Mac installation.

Reproducibility references:

- Official SF3D source: `Stability-AI/stable-fast-3d`, revision `ff21fc491b4dc5314bf6734c7c0dabd86b5f5bb2`.
- Weights: [stabilityai/stable-fast-3d](https://huggingface.co/stabilityai/stable-fast-3d), `config.yaml` and `model.safetensors`. Request gated access and review the license before downloading.
- Auxiliary DINOv2, OpenCLIP and rembg assets may download on first load. Local SF3D checkpoint files alone do not establish offline readiness.
- Record the resolved weight revision and source revision with submitted results. Direct dependencies are pinned; transitive dependencies are not fully locked.

After installing the separate environment and obtaining model access:

```bash
export SF3D_PYTHON="$PWD/backend/.venv-sf3d/bin/python"
export SF3D_SOURCE="$PWD/backend/vendor/stable-fast-3d"
export SF3D_MODEL_DIR="$PWD/backend/weights/stable-fast-3d"
export SF3D_DEVICE=cpu

backend/.venv-sf3d/bin/huggingface-cli login
backend/.venv-sf3d/bin/huggingface-cli download stabilityai/stable-fast-3d \
  config.yaml model.safetensors --local-dir "$SF3D_MODEL_DIR"
```

Keep tokens outside Git. Reuse working local authentication; login is unnecessary if downloads already work. The source checkout must retain its tetrahedral-grid asset. See [backend documentation](backend/README.md) for full TripoSR installation, caches, licensing and configuration.

## Run the prototype

With the frontend environment active and SF3D variables above set:

```bash
python app.py
```

Open the local address printed by Gradio. Upload an image, click **Generate 3D**, wait for the ready status, orbit/zoom the model and click **Download GLB**. Uploading alone never starts generation. The download appears only after success.

For a temporary public judge link:

```bash
python app.py --share
```

Gradio prints an `https://....gradio.live` URL without a password/login screen. Anyone with the link can trigger generation on your Mac. `DEMO_PASSWORD` is unused. The URL requires the running process, an awake Mac, internet access and Gradio's tunnel service; it is not permanent hosting. Run `caffeinate -i` in another Mac terminal during judging and test the link from a phone on mobile data. Ctrl+C stops the app.

For a direct SF3D CLI run, bypassing the web UI:

```bash
SKETCH2SHAPE_3D_BACKEND=sf3d SF3D_DEVICE=cpu \
  "$SF3D_PYTHON" -m backend.cli /absolute/path/to/object.png
```

The final stdout line is the generated GLB path. SF3D outputs normally live in `backend/outputs/sf3d/`. Keep working custom paths if different. The backend worker does not need a separately hosted API.

For TripoSR, first complete its separate setup and export `TRIPOSR_PYTHON`, `TRIPOSR_SOURCE` and `TRIPOSR_MODEL_DIR` as documented in `backend/README.md`, then run:

```bash
SKETCH2SHAPE_3D_BACKEND=triposr \
  "$TRIPOSR_PYTHON" -m backend.cli /absolute/path/to/object.png
```

### Optional experimental sketch pipeline

Use the **Integrated isolated pipeline / Mac setup (Python 3.11)** instructions in [the sketch guide](sketch2shape_mac_m4/README.md#integrated-isolated-pipeline). The older introductory copy/bridge commands in that guide are historical; do not copy experimental modules over the working backend.

Create `sketch2shape_mac_m4/.venv`, install `requirements-sketch.txt` there and set `SKETCH_PYTHON` to its executable. Download `lllyasviel/control_v11p_sd15_scribble` and `stable-diffusion-v1-5/stable-diffusion-v1-5` after reviewing their model cards/access terms. Then, with the SF3D configuration above retained:

```bash
python sketch2shape_mac_m4/local_sketch_to_3d.py \
  /absolute/path/to/sketch.png --prompt "a white ceramic mug"
```

The runner invokes separate sketch and 3D interpreters. It retains the refined PNG and stops on failure rather than fabricating PNG/GLB output. It is not a drawing page in the prototype. Defaults include seed 42, 20 steps and guidance 7.0; record any changes (`SKETCH_SEED`, `SKETCH_STEPS`, `SKETCH_CFG`). A dry run checks command construction, not model execution.

## Hardware, generation time and computational resources

| Run | Hardware/device | Recorded generation time | Evidence/limits |
| --- | --- | --- | --- |
| SF3D local demo | Apple Silicon Mac M4, **16 GB unified RAM**, CPU; macOS version not supplied | **Approximately 97 seconds** | Team-reported generation time; cold/warm status and stage breakdown not supplied; no peak-memory measurement |
| Earlier TripoSR baseline | Team's Mac baseline; exact machine/RAM/device configuration not fully recorded | Approximately **12.93 s inference/extraction; 103.57 s total** | Historical user-supplied result recorded in `backend/README.md`; not an SF3D benchmark or independently reproduced measurement |
| SD 1.5 + ControlNet → SF3D | Intended Mac M4 MPS refinement + CPU SF3D | **Not measured** | Actual Mac end-to-end inference is unverified |

The 97-second figure is an approximate team-reported generation time, not a controlled benchmark or a guarantee for other inputs. There is no measured SF3D peak-memory figure yet. Native extensions, model/checkpoint loading, segmentation, texture baking and caches require substantial memory/storage. Free hosting capacity has not been established. First-run downloads and cold loading can dominate runtime; do not use upstream GPU speed claims as Mac CPU timings. SF3D defaults here include 1024px texture baking, foreground ratio 0.85, no remeshing and a 1800-second worker timeout. Higher texture resolution is not proof of better geometry.

To record a real SF3D run without changing inference settings, run this **once when collecting the submission artifact**. It creates a unique result directory and measures end-to-end adapter time; it also saves internal stage timings and exported-asset metadata:

```bash
"$SF3D_PYTHON" - /absolute/path/to/object.png <<'PY'
import hashlib, json, platform, shutil, subprocess, sys, time
from pathlib import Path
from uuid import uuid4
from backend.generator import generate_with_report, shutdown_worker
from backend.compare_backends import inspect_asset

source = Path(sys.argv[1]).resolve()
folder = Path('backend/outputs/submission') / uuid4().hex
folder.mkdir(parents=True)
try:
    started = time.perf_counter()
    report = generate_with_report(str(source), engine='sf3d', fallback=False)
    elapsed = time.perf_counter() - started
    asset = Path(report['path'])
    shutil.copy2(source, folder / ('input' + source.suffix.lower()))
    shutil.copy2(asset, folder / 'model.glb')
    metadata = {
        'commit': subprocess.check_output(['git', 'rev-parse', 'HEAD'], text=True).strip(),
        'platform': platform.platform(), 'machine': platform.machine(),
        'python': sys.version, 'wall_seconds': elapsed,
        'input_sha256': hashlib.sha256(source.read_bytes()).hexdigest(),
        'report': report, 'asset': inspect_asset(asset),
    }
    (folder / 'report.json').write_text(json.dumps(metadata, indent=2))
    print('Submission files:', folder.resolve())
finally:
    shutdown_worker()
PY
```

Record Mac model/chip, RAM (`system_profiler SPHardwareDataType`), macOS version (`sw_vers`), environment package versions (`python -m pip freeze` in each environment), weight/source revisions and cold/warm status alongside that report. Retain private hardware identifiers locally. For warm timing, call the report API again within the same process; starting a new CLI process reloads the model. Record peak memory separately if measured; elapsed time is not a memory measurement.

## Example results and required submission artifact

The team will demonstrate actual generated results in a **video**, rather than using a teapot-specific showcase. The video/link has not yet been attached to this README. Use real input/output pairs in the recording; do not treat mocked test meshes as submission outputs.

Before final submission, attach at least one genuine generated `.glb` plus its matching input as a GitHub Release asset or in the hackathon submission portal. Include:

- `input.png` or the original JPG, and `model.glb` from the same run.
- A preview image or short orbit video showing the whole asset, not just its best view.
- `report.json`, measured runtime, hardware/RAM, settings and checkpoint/source revisions.
- A working artifact download link and, when available, the live Gradio link.

Generated files, weights, caches and environments remain excluded from Git. To package an **already generated** result shown in the video, copy its real GLB and matching input into a submission folder; no new inference is required. Open the GLB in the prototype or Blender to verify geometry, UVs and texture appearance.

Application checks validate GLB structure/resources and nonempty geometry; they are not a complete Khronos conformance audit. A previously reported SF3D export had `MESH_PRIMITIVE_GENERATED_TANGENT_SPACE` (normal map without explicit tangents) and `BUFFER_VIEW_TARGET_MISSING` hints. The unfinished tangent repair is not part of the submitted implementation; no zero-warning validator result is claimed. Report the actual validator output for the final artifact.

## Reproducibility, services and limitations

Inference is local: no paid API, remote reconstruction service or cloud GPU is required. Initial model acquisition uses Hugging Face and upstream repositories; first load may require auxiliary model downloads. Public sharing additionally depends on Gradio's tunnel service. After warming every required model/cache, test offline loading explicitly before claiming offline operation.

Use [backend comparison tooling](backend/README.md#local-inference-and-paired-comparison) for paired teapot/chair/hamburger inputs and an optional real mug. It records source hashes, requested/actual engine, preprocessing, runtime, mesh counts, UV/material/texture presence and validity. Human review should score recognizability, silhouette, fine detail, surface quality, texture quality and asset usability. Higher polygon count alone does not imply higher quality.

Known limits include single-view ambiguity, imperfect segmentation, hallucinated back surfaces, no SF3D text conditioning, no implemented OBJ export, unverified MPS sketch inference, no frontend drawing canvas and no permanent free deployment. SF3D CPU success is team-reported on Mac M4; Linux native-extension/import checks do not establish complete Linux pretrained inference. CPU operation is the current Mac demo configuration. Do not switch to MPS or enable fallbacks just to conceal an error.

If generation fails: verify the separate Python executable, source checkout, model files, native extensions and caches; inspect server logs; check memory/timeout; try a clearer object image. See [backend troubleshooting](backend/README.md) for device/model errors. A missing backend produces an error, not a fake asset. Output copies/caches need periodic cleanup for long-running deployments.

## Tests and verification

```bash
# Frontend environment
python -m unittest discover -s tests -v

# Separate TripoSR/backend environment
"$TRIPOSR_PYTHON" -m unittest discover -s backend/tests -v

# Lightweight experimental integration tests (no model downloads)
python -m unittest discover -s sketch2shape_mac_m4/tests -v

# Optional hero development
npm ci
npm run typecheck
npm run build
```

Latest recorded checks: **27 frontend tests**, **83 backend tests**, **2 lightweight sketch integration tests**, and TypeScript checking passed. Counts refer to code verification, not this documentation edit. Tests use mocks/fixture meshes for model behavior; portable CPU surface extraction and previously checked native kernels do not establish pretrained reconstruction. Real Mac SF3D success is separately reported by the team; sketch MPS inference, a detailed SF3D timing/peak-memory report and final artifact validation remain local verification tasks. The approximate 97-second runtime and 16 GB RAM are team-supplied figures.

The decorative React/Three.js hero is embedded in Gradio. Bundled `assets/` support Python-only startup. Source is in `components/ui/shader-animation.tsx` and `frontend/`; reduced motion or unavailable WebGL uses a static background.

## Final demonstration and submission checklist

1. Start the configured app and open its local/public URL. Explain the separate frontend and ML environments.
2. Upload a clear object image, click Generate once and show the active status. Explain that reconstruction uses image conditioning, not prompts.
3. Show a real completed model, orbit it to inspect geometry/materials and download the GLB. Open it in an independent viewer if available.
4. Present the matching input/output, recorded runtime, hardware and limitations. Keep a genuine saved result and screen recording as demo backups.
5. Submit the repository URL and exact commit, model setup/access instructions, a generated artifact link and the timing report. Describe the sketch route as experimental unless a real local end-to-end run has been completed.

**Outstanding submission evidence:** demonstration video/link, at least one matching input and real generated GLB, macOS/package/model revision details, actual validator report, and the temporary live URL if used during judging. The video demonstrates behavior but does not replace the explicitly required `.glb`/`.obj` artifact. The 97-second runtime is approximate; cold/warm status, stage timings and peak memory are not yet recorded.

## Attribution

**Powered by Stability AI.** SF3D code/weights are governed by the [Stability AI Community License and model agreement](https://huggingface.co/stabilityai/stable-fast-3d); they are not unrestricted MIT assets. TripoSR uses its upstream MIT license. Review SD 1.5/ControlNet model cards and all dependency licenses for use and redistribution. Preserve upstream notices and comply with gated model-access terms; weights and credentials are not distributed in this repository.
