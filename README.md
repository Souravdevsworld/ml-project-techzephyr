# Sketch2Shape AI

**Turn Your Sketches Into 3D Reality**

A Gradio creative tool for TechZephyr 4.0 at IIT Bhubaneswar. Draw or upload a rough sketch, optionally describe the object, refine it with ControlNet Scribble and Stable Diffusion 1.5, then reconstruct, validate, inspect, and download a real TripoSR GLB. A separate photo mode bypasses diffusion.

This branch connects the team's existing model implementations to the existing Gradio interface. It contains no fallback mesh, paid inference service, or fabricated remote GPU endpoint.

**Verification status:** offline tests and UI construction have been run in a CPU environment. Real GPU acceptance has **not** been run here; no fresh generated GLB or quality claim is supplied. See [verification](docs/VERIFICATION.md). Generation requires the separate ML setup below. CPU mode is available, but the full pretrained sketch pipeline has not been acceptance-tested here on CPU or GPU.

## Architecture

```text
Browser (Gradio ImageEditor / upload)
                  │
       validate → freeze pixels/settings → queue (one job)
                  │
          unique outputs/jobs/<job-id>/
                  │
     ┌────────────┴───────────────────────┐
     │ Sketch to 3D                      │ Image to 3D
     │ sketch_worker (SKETCH_PYTHON)      │
     │ existing sketch_preprocess.py     │
     │ Scribble ControlNet + SD 1.5      │
     │ → cleaned / conditioning / PNG    │
     │ worker exits, releases GPU        │
     └────────────┬───────────────────────┘
                  │
       sketch_worker (TRIPOSR_PYTHON)
       existing generator.generate_3d()
       official TripoSR run.py subprocess
                  │
       existing validate_mesh() → GLB 2.0
                  │
       same GLB → Model3D + downloadable file
```

The UI and workers run on the **same machine** and share its filesystem. Separate Python environments avoid dependency conflicts between current Gradio and the team's tested diffusion packages. No HTTP inference API or second custom web framework is introduced. A laptop UI cannot reach a Colab GPU merely by setting these variables; run the entire application on the machine that performs inference.

## Features

- White drawing canvas, black adjustable brush, eraser, ImageEditor undo/redo controls, clear, and explicit PNG export.
- PNG, JPEG and WebP uploads with a preview; actual format, corruption, size (20 MiB), dimensions (16 million pixels), and blank-content checks.
- Explicit **Sketch to 3D** and **Image to 3D** modes.
- Optional object description; a neutral studio-photo prompt is used when empty. There is **no automatic semantic recognition**. The effective prompt is recorded. Descriptions never guide TripoSR itself.
- Seed, diffusion steps, CFG, ControlNet strength, mesh resolution, background removal, execution device and low-memory controls, wired to actual worker settings.
- Original, cleaned sketch, conditioning map and refined PNG inspection; metadata and PNG downloads.
- Interactive GLB rotation/zoom and a download of the same validated file.
- Immutable queued requests, global single-worker inference, isolated processes, timeout cleanup, unique artifact directories, and clearing of stale results on every new request/failure.
- Regeneration from the saved original with the current settings. It generates a new mesh; it does not edit the previous one.

## Open-source stack and models

Python 3.12, Gradio 6.31.0, Pillow, NumPy, OpenCV, trimesh, PyTorch, Diffusers, Transformers, Accelerate, Safetensors and PEFT. Reconstruction uses official TripoSR with torchmcubes or scikit-image CPU marching cubes; optional background removal uses rembg/ONNX Runtime. Unit tests use pytest and standard-library unittest mocks. React/Three.js assets from Swagat's frontend are preserved as the existing decorative header; Node is unnecessary for running the app.

| Model | Purpose | License/source |
|---|---|---|
| `lllyasviel/control_v11p_sd15_scribble` | Scribble conditioning | [Model card / OpenRAIL](https://huggingface.co/lllyasviel/control_v11p_sd15_scribble) |
| `stable-diffusion-v1-5/stable-diffusion-v1-5` | Refined 512×512 object image | [CreativeML OpenRAIL-M / model card](https://huggingface.co/stable-diffusion-v1-5/stable-diffusion-v1-5) |
| `stabilityai/TripoSR` | Image to 3D geometry | [MIT / model card](https://huggingface.co/stabilityai/TripoSR) and [upstream code](https://github.com/VAST-AI-Research/TripoSR) |

Review model use restrictions and upstream licenses before redistributing weights or outputs. Pretrained weights are downloaded only during explicitly requested inference, never during imports or unit tests. Background removal can also download its U²-Net weights on first use.

## 1. Lightweight local UI setup

Run from the repository root with Python 3.12. No CUDA or model weights are needed to open or test the UI.

```bash
python3.12 -m venv .venv-ui
.venv-ui/bin/python -m pip install -r requirements.txt
.venv-ui/bin/python app.py --host 127.0.0.1 --port 7860
```

Open `http://127.0.0.1:7860`. Without configured ML workers the header reports setup is needed. Drawing, export, uploads and UI controls work; generation reports the missing setup rather than returning a placeholder. Shell examples use Linux; on Windows use the corresponding `Scripts/python.exe` paths. For Windows RTX 2050 / 4 GB VRAM or CPU setup, use the guide below. POSIX process-group cleanup is tested on Linux.

## 2. Local Windows setup and CPU mode

**If your log says `ModuleNotFoundError: No module named 'torch'`, the ML worker environment is missing.** The UI-only installation is not sufficient for inference. See [Windows local setup](docs/LOCAL_WINDOWS.md) for the detailed diagnosis and alternatives.

Update your preview checkout and then run from its root:

```powershell
powershell -ExecutionPolicy Bypass -File .\scripts\setup-local-windows.ps1 -Device cuda -Launch
```

The script configures separate UI/ML environments, installs CUDA PyTorch only if missing, configures the workers, and uses scikit-image density-to-mesh extraction without compiling a CUDA extension. Later starts use `scripts/start-local-windows.ps1 -Device cuda`.

The RTX 2050 reported by the user has **4 GB VRAM**, separate from **8 GB system RAM**. `--low-memory` starts the UI with sequential CPU offload on CUDA, 256×256 refinement, CFG 1, 12 diffusion steps, mesh resolution 64 and smaller reconstruction chunks. CUDA keeps PyTorch SDPA attention instead of replacing it with legacy sliced attention. These settings may reduce quality/increase time; they have not been acceptance-tested on that GPU. Refinement-size/CFG controls reduce generation activations, while mesh resolution only affects reconstruction and neither shrinks the model weights.

To request CPU execution instead, use the same scripts with `-Device cpu`, or `python app.py --device cpu --low-memory` after configuring the ML interpreter paths. CPU uses FP32 diffusion and no CUDA calls; it still needs the model weights and substantial system RAM. **The complete sketch pipeline may not fit in 8 GB RAM.** CPU mode is an option for a machine with sufficient memory, not a memory-free workaround.

`auto` prefers CUDA when available and otherwise selects CPU. Explicit `cuda` fails with an actionable error if the selected worker has no usable CUDA. It does not retry on CPU after GPU OOM. Environment equivalents are `SKETCH2SHAPE_DEVICE=auto|cuda|cpu` and `SKETCH2SHAPE_LOW_MEMORY=true|false`.

`SKETCH2SHAPE_MESH_BACKEND=auto|torchmcubes|skimage` selects mesh extraction. Auto retains native torchmcubes if installed; otherwise it uses scikit-image. The latter extracts real geometry from TripoSR's predicted density field. The pretrained neural model, vertex-color prediction and final GLB validation remain the same. No prefab geometry is used.

## 3. Original GPU/Colab worker setup on the same host

Use a CUDA NVIDIA GPU (the team's prior individual tests used a T4), Python 3.12, sufficient RAM, and disk space for several GB of models plus output meshes. T4-class 16 GB VRAM is a reasonable starting point with CPU offload and mesh resolution 128; it is not a guarantee for every input or host. A CUDA-capable compiler is needed for torchmcubes.

**Keep an already-working CUDA PyTorch installation.** The original tested refinement environment was: `torch==2.11.0+cu128`, NumPy 1.26.4, Transformers 4.40.2, Tokenizers 0.19.1, Hugging Face Hub 0.25.2, Diffusers 0.30.3, Accelerate 0.34.2, Safetensors 0.4.5, PEFT 0.11.1 and OpenCV 4.11.0.86. The refiner now accepts CPU/CUDA PyTorch 2.x builds >=2.1; changing the torch build still needs inference validation. Other pinned diffusion-package versions remain checked. The app does not silently upgrade PyTorch.

On a GPU machine whose Python 3.12 already has the tested CUDA torch build (for example the team's compatible Colab environment), create a worker environment that can use that installation:

```bash
python3.12 -m venv --system-site-packages .venv-ml
.venv-ml/bin/python -c 'import torch; print(torch.__version__, torch.version.cuda); assert torch.cuda.is_available()'
.venv-ml/bin/python -m pip install -c backend/constraints-sketch-tested.txt -r backend/requirements-colab.txt -r backend/requirements-sketch-colab.txt
.venv-ml/bin/python -m pip install setuptools wheel cmake ninja pybind11

git clone https://github.com/VAST-AI-Research/TripoSR.git work/TripoSR
git -C work/TripoSR checkout 107cefdc244c39106fa830359024f6a2f1c78871
.venv-ml/bin/python -m pip install --no-build-isolation --no-deps 'git+https://github.com/tatsy/torchmcubes.git@a9ac95aa329957ba646e7bb057f825f5dfa77f38'
.venv-ml/bin/python -m pip check
```

Create `work/` first if needed (`mkdir -p work`). Do **not** install the upstream `TripoSR/requirements.txt` wholesale: it pins older Transformers/Pillow/Gradio and can replace the tested stack. The existing `backend/requirements-colab.txt` provides the team's adaptation. On a clean host without CUDA torch, install the matching CUDA 12.8 PyTorch build first using the official [PyTorch instructions](https://pytorch.org/get-started/locally/); do not install CUDA into `.venv-ui`.

Configure absolute paths and check both workers without fetching weights:

```bash
export SKETCH_PYTHON="$PWD/.venv-ml/bin/python"
export TRIPOSR_PYTHON="$PWD/.venv-ml/bin/python"
export TRIPOSR_DIR="$PWD/work/TripoSR"
.venv-ui/bin/python -m backend.doctor
.venv-ui/bin/python app.py --host 127.0.0.1 --port 7860
```

Both variables may point to different *working* ML interpreters if required; each must have the project's worker dependencies (Pillow, NumPy, trimesh) and its own stage's ML stack. They run `python -m backend.sketch_worker` from this checkout. The model workers never import Gradio, so the old Hub requirement cannot break the UI environment.

For a remote GPU host, use supported port forwarding to its port 7860. For example, from your laptop: `ssh -L 7860:127.0.0.1:7860 user@gpu-host`, then open the local URL. Colab and Kaggle are temporary environments with usage, runtime and network policies; they are not permanent public hosting. Public tunneling is not enabled automatically. No Kaggle-specific Python 3.13 adaptation was found on the inspected development branches; use a verified Python 3.12 environment instead of forcing the tested stack into 3.13.

Allow model downloads from Hugging Face and its artifact hosts and, when enabled, rembg's model host. Use normal runtime credentials if a model requires authenticated access. The network policy of this coding environment does not currently include Hugging Face model downloads; no model download was attempted here.

## 4. Generate and download

1. Select **Sketch to 3D**. Draw a clear single object on white, or select **Upload** and choose a hand-drawn sketch. The native editor supports brush size, eraser and undo/redo. **Clear canvas** restores white; **Export sketch PNG** saves the visible composite.
2. Optionally describe the object and materials. For example: `A wooden chair with four legs and a rectangular backrest.` Leaving this empty uses a documented neutral prompt, which may have lower semantic fidelity.
3. Start with seed 42, 20 steps, CFG 7, conditioning strength 1, mesh resolution 128 and background removal on.
4. Click **Generate 3D Model**. The progress label follows the executing stages; no estimated percentages are fabricated. The first model load can take much longer than later downloads.
5. Inspect the original, cleaned sketch, white-stroke conditioning map, refined PNG and actual 3D preview. Drag to orbit and scroll to zoom.
6. Use **Download validated GLB** for the same file displayed in the viewer. Download intermediate PNGs and `metadata.json` from the inspection panel.
7. For a clear object photo, select **Image to 3D** and upload it. This bypasses ControlNet/Stable Diffusion. The description and diffusion settings do not affect this mode.

Failed runs clear the viewer and download values. Diagnostics and partial intermediate images remain under their job directory; they are not presented as a successful result. `metadata.json` contains the effective prompt, supported settings, timings, actual worker hardware and mesh counts on success. Detailed worker errors go to `refine.log` and `reconstruct.log` in the same directory.

## 5. Tests and fresh model acceptance

Offline tests never download weights:

```bash
.venv-ui/bin/python -m pip install -r requirements-test.txt
.venv-ui/bin/python -m pytest -q
.venv-ui/bin/python -m compileall -q app.py backend tests
```

A mock-generated box in tests is **only a geometry-validation fixture**. Passing these tests does not mean that ML inference or output quality has passed.

For an explicit real GPU acceptance run, use a **fresh** sketch and the configured worker variables:

```bash
.venv-ui/bin/python -m backend.acceptance /absolute/path/fresh-chair-sketch.png --prompt 'A wooden chair with four legs and a rectangular backrest'
.venv-ui/bin/python -m backend.acceptance /absolute/path/fresh-mug-sketch.png --prompt 'A ceramic mug with one handle'
.venv-ui/bin/python -m backend.acceptance /absolute/path/fresh-table-sketch.png --prompt 'A wooden table with four legs'
.venv-ui/bin/python -m backend.acceptance /absolute/path/object-photo.jpg --mode image
```

The command executes real workers, validates the GLB, copies and reopens its downloaded bytes, and writes `acceptance.json`. Open the refined image and GLB in the application/Blender and record visual quality separately. Timings, Python/torch/CUDA/GPU details and the matched input/intermediate/output artifacts are saved together in `outputs/jobs/<id>/`. Preserve that folder as the judges' reproducibility example. An acceptance report is not fabricated when GPU execution is unavailable.

`examples/chair.png` is the existing input drawing from Sourav's branch; it is **not** evidence of a new generated model. Existing experiment notebooks are retained unchanged under `notebooks/` for reference. There is no pre-generated output GLB in the inspected branches.

## Troubleshooting

| Symptom | Action |
|---|---|
| Header says setup needed | Set absolute `TRIPOSR_DIR` to the official checkout containing `run.py`. Configuration is not proof of GPU readiness; run `backend.doctor`. |
| `No package metadata was found for torch` / CUDA unavailable | Run the Windows setup script or set worker interpreter paths to an installed ML environment. Installing the UI alone intentionally does not install torch. Select CPU if CUDA is not intended. |
| `EncoderDecoderCache` import failure | Use the tested `peft==0.11.1` with `transformers==4.40.2` in the ML environment; do not upgrade the UI's environment to fix a worker. |
| Incompatible refinement environment | Compare the logged actual versions with `constraints-sketch-tested.txt`. Resolve them in a dedicated Python 3.12 ML environment. |
| Model weights unavailable / network failure | Inspect the stage log and download/access policy, available disk and model permissions. No generated file is substituted. |
| GPU out of memory or worker killed | Enable low-memory mode, lower mesh resolution to 64, reduce `TRIPOSR_CHUNK_SIZE` (1024 normally, 256 in low-memory mode), and stop other GPU workloads. CPU also needs enough system RAM. Stages already run sequentially. |
| torchmcubes build or ABI error | Build against the active worker torch/CUDA compiler using `--no-build-isolation`; rebuild after changing torch. |
| Timeout | Check the relevant job log. `SKETCH_TIMEOUT_SECONDS` and `PIPELINE_3D_TIMEOUT_SECONDS` default to 1800, or 7200 for explicit CPU/low-memory mode; accepted range 1–86400. Keep `TRIPOSR_TIMEOUT_SECONDS` below the outer 3D timeout if overriding it. |
| Model has poor fidelity | Inspect conditioning and refined PNG first, specify the object in the prompt, use one centered silhouette/photo and try a different seed. A single view does not uniquely determine hidden shape. |
| Background removal off looks wrong | Upstream expects a centered, correctly scaled RGB object on gray when removal is disabled. Enable removal for normal white-background input. |

## Limitations and attribution

A single sketch cannot uniquely determine hidden geometry. The output is a **plausible reconstruction**, not an engineering-accurate CAD model. Thin parts, complex occlusions, multiple objects, ambiguity in the sketch and diffusion changes can reduce fidelity. Mesh validation verifies structure, finite coordinates, faces and positive extents, not semantic quality or watertightness. Downloads and retained intermediates consume disk; archive or remove old `outputs/jobs/` directories between sessions. The current inference lock is per application process: run one Gradio process per GPU. Disconnecting a browser does not reliably cancel an already running synchronous GPU job; jobs finish or stop at the configured timeout. Server interruption/worker timeout terminates the active process group on Linux.

Credits: Sourav's tested backend and notebooks; Swagat's Gradio frontend and shader assets; [TripoSR authors](https://github.com/VAST-AI-Research/TripoSR), ControlNet, Stable Diffusion, Hugging Face Diffusers and the open-source libraries above. See [implementation audit](docs/IMPLEMENTATION.md) for source branch SHAs and the changes made here.
