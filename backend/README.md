# Local TripoSR backend

This backend implements exactly `backend.generator.generate_3d(image_path: str, prompt: str | None = None) -> str`. It returns an absolute path to a unique, validated GLB, synchronously. No frontend changes are required. **TripoSR is image-only: nonempty prompts are logged as unused.** Regeneration reconstructs from the image again; it is not text-conditioned inference or mesh editing. A future image-refinement stage could use text before TripoSR, but none is implemented here.

## Architecture and upstream research

- `generator.py` is a lightweight frontend adapter. It validates inputs, serializes calls, launches a persistent subprocess using `TRIPOSR_PYTHON`, checks reply IDs and GLB geometry, and returns the path. ML packages are never imported into the frontend interpreter. Timeout, protocol, inference, or validation failures terminate the worker and remove partial output; the next request creates a fresh worker.
- `worker.py` speaks JSON lines over stdin/stdout; model logs go to stderr. It caches one `Runtime` and loaded model until shutdown. The caller holds the input file until the synchronous call returns, matching the frontend's temporary-file lifetime.
- `runtime.py` loads official source and pretrained weights with `TSR.from_pretrained`, calls the actual model on the image, then `extract_mesh(..., has_vertex_color=True)`. Trimesh exports the learned mesh with vertex colors to GLB. There are no procedural/default meshes in production code.
- `surface.py` provides a portable `MarchingCubeHelper`. Upstream imports a compiled `torchmcubes` extension at module import. That project supports CPU/CUDA, but its native extension is an installation hurdle and does not handle MPS tensors directly. Our worker substitutes only `tsr.models.isosurface` in its own import table, before importing TSR. It runs scikit-image marching cubes on the **predicted density**, preserving array-axis coordinates and upstream normalization. No upstream files or frontend modules are patched. This is a different extraction implementation; exact triangulation may differ from torchmcubes.
- Official source inspected: [VAST-AI-Research/TripoSR](https://github.com/VAST-AI-Research/TripoSR), commit `107cefdc244c39106fa830359024f6a2f1c78871`. Upstream documents Python >=3.8 and CPU fallback in `run.py`; GLB export is a supported output. Its CLI also eagerly imports xatlas and texture-baking dependencies. This backend calls `TSR` directly and does not require CUDA, xatlas, ModernGL, texture baking, or video rendering.
- The tokenizer uses a DINO ViT configuration (`facebook/dino-vitb16/config.json`); the learned image-tokenizer weights are in the full TripoSR checkpoint. The official renderer uses PyTorch `grid_sample` and attention. There is no upstream MPS guarantee; this task has not established full MPS operator compatibility.

## Mac M4 installation

Run from the existing repository checkout on `swagat-backend`. Do not merge branches or create another worktree. Keep the current frontend environment intact (including Python 3.14 if that is what your Mac uses). Use **Python 3.11** for the ML worker and **PyTorch 2.5.1**, with pinned backend dependencies. This combination was installed/import-tested on Linux CPU with Python 3.11.17; Mac M4 execution still needs validation.

```bash
cd /absolute/path/to/ml-project-techzephyr
python3.11 -m venv backend/.venv
backend/.venv/bin/python -m pip install --upgrade pip
backend/.venv/bin/python -m pip install -r backend/requirements.txt
mkdir -p backend/vendor
git clone https://github.com/VAST-AI-Research/TripoSR.git backend/vendor/TripoSR
git -C backend/vendor/TripoSR checkout 107cefdc244c39106fa830359024f6a2f1c78871

export TRIPOSR_PYTHON="$PWD/backend/.venv/bin/python"
export TRIPOSR_SOURCE="$PWD/backend/vendor/TripoSR"
export TRIPOSR_MODEL_DIR="$PWD/backend/weights/TripoSR"
export HF_HOME="$PWD/backend/.cache/huggingface"
export U2NET_HOME="$PWD/backend/.cache/rembg"
export TRIPOSR_DEVICE=cpu

"$TRIPOSR_PYTHON" -m backend.download_weights
```

If the source directory already exists, inspect/preserve it rather than overwriting it. Do **not** install upstream's entire requirements file: our pinned file replaces the native marching-cubes dependency and excludes unused UI/texture-baking packages. Dependencies are pinned directly, but transitive packages are not fully locked.

For Linux CPU testing, avoid downloading CUDA libraries by installing the CPU wheel **before** the requirements file:

```bash
python3.11 -m venv backend/.venv
backend/.venv/bin/python -m pip install torch==2.5.1 --index-url https://download.pytorch.org/whl/cpu
backend/.venv/bin/python -m pip install -r backend/requirements.txt
```

The explicit download command obtains official `stabilityai/TripoSR` `config.yaml` and `model.ckpt`, plus the DINO config. It records resolved model/config revisions in `provenance.json`. Use `--revision <official-model-commit>` to pin the TripoSR download to a known revision. Only use trusted official source/config/checkpoints; upstream's PyTorch checkpoint loader uses pickle. Inference requires these local files and does not silently replace missing weights. Hugging Face's cache must also contain the DINO config. After downloads, `HF_HUB_OFFLINE=1` can be used to test offline loading.

## Run actual inference and validate the GLB

Use a **new, clear photograph/render of one isolated object** for initial validation, then test hand-drawn inputs. TripoSR is not a sketch-specialized model; outlines, ambiguous shapes, or white backgrounds may reconstruct poorly. Quality is not guaranteed.

```bash
# Environment exports above must still be active.
export TRIPOSR_RESOLUTION=128
export TRIPOSR_CHUNK_SIZE=4096
"$TRIPOSR_PYTHON" -m backend.cli /absolute/path/to/new-object.png
```

The final stdout line is the GLB path; stderr reports device, loading/inference time, vertex count, and face count. Outputs default to `backend/outputs/<uuid>.glb`. They are retained for frontend regeneration/comparison. Clean old outputs only after sessions no longer need them; no automatic deletion policy is applied.

Validate the returned path (replace the example with the actual path):

```bash
"$TRIPOSR_PYTHON" - <<'PY'
from backend.generator import validate_glb
import trimesh
path = validate_glb('/absolute/path/to/backend/outputs/ACTUAL_ID.glb')
scene = trimesh.load(path, force='scene')
print(path, 'vertices=', sum(len(m.vertices) for m in scene.geometry.values()),
      'faces=', sum(len(m.faces) for m in scene.geometry.values()))
PY
```

Then launch the **existing frontend Python**, with the same exported backend settings:

```bash
/absolute/path/to/your/existing/frontend-venv/bin/python app.py
```

The frontend imports only the adapter; it does not import packages from the ML environment. Changing settings requires restarting the frontend process. The loaded model is reused across successful requests in that process. Model loading or inference errors are surfaced through the existing frontend error UI. No backend startup command or separate network service is necessary.

## Devices and resources

CPU is the default and the safest initial Mac M4 test. Neural inference and triplane queries stay on the configured device. Marching cubes explicitly transfers density to CPU, then returns extracted vertices to the configured device for color querying. This CPU extraction is logged and is not a silent neural-model fallback.

Try MPS only after CPU succeeds:

```bash
TRIPOSR_DEVICE=mps "$TRIPOSR_PYTHON" -m backend.cli /absolute/path/to/new-object.png
# If MPS is unavailable, raises unsupported-op errors, or runs out of memory:
TRIPOSR_DEVICE=cpu "$TRIPOSR_PYTHON" -m backend.cli /absolute/path/to/new-object.png
```

MPS is **experimental and untested on M4 here**. No automatic switch or `PYTORCH_ENABLE_MPS_FALLBACK` is enabled. Some operators, memory layouts, or extraction/color operations may fail. Set the device explicitly to CPU after a failure. `TRIPOSR_DEVICE=cuda` is available only if a CUDA-compatible PyTorch installation/device is actually present; these cloud tests used a CPU wheel.

Upstream quotes about **6 GB VRAM** for its default single-image workflow on CUDA; that is not a Mac unified-memory guarantee. CPU/MPS need memory for model loading, checkpoint copies, features, density grids, and frontend caches. Budget several GB beyond the checkpoint; 16 GB machines may be constrained, and 24–32 GB provides more headroom. No Mac runtime or memory measurements are available from this task. CPU can take minutes; the upstream A100 sub-second inference claim does not apply to this setup.

| Setting | Default | Purpose |
| --- | --- | --- |
| `TRIPOSR_DEVICE` | `cpu` | Explicit `cpu`, `mps`, or `cuda`; never silently changed |
| `TRIPOSR_RESOLUTION` | `128` | Grid size, 32–256; larger values increase cubic extraction memory |
| `TRIPOSR_CHUNK_SIZE` | `4096` | 256–65536 query batch size; lower uses less working memory |
| `TRIPOSR_TIMEOUT` | `1800` | Positive wall-clock limit per worker reply in seconds, including model loading |
| `TRIPOSR_REMOVE_BACKGROUND` | `0` | Opt-in rembg processing; may destroy sketch lines and downloads additional weights |
| `TRIPOSR_OUTPUT_DIR` | `backend/outputs` | Retained generated GLBs |

Additional preprocessing defaults to square padding/resizing to 512px, with transparency flattened to neutral gray; thin lines are preserved without segmentation. Upstream applies its configured image resize as well. Optional rembg processing isolates/centers foreground at 0.85 ratio and composites onto gray, matching upstream's approach. Avoid it for line sketches until tested. Default RGB white backgrounds are retained rather than guessed away. Original frontend preprocessing is untouched.

## Testing and observed limitations

```bash
"$TRIPOSR_PYTHON" -m unittest discover -s backend/tests -v
/absolute/path/to/your/existing/frontend-venv/bin/python -m unittest discover -s tests -v
```

Backend tests use explicit mocks/fixture meshes for unit cases. The analytic density test exercises real CPU marching cubes and axis scaling but is **not learned reconstruction**. Test-created boxes exist only in tests. Never describe these tests as successful TripoSR inference.

Cloud validation: isolated Python 3.11/PyTorch 2.5.1 CPU dependencies installed; official `tsr.system.TSR` imported successfully with the portable helper; backend tests and 15 unchanged frontend tests executed. An actual Python 3.12 frontend process called the real Python 3.11 worker and received its missing-weights error, without importing torch into the frontend. The user's Mac Python 3.14 environment was not available for testing.

**No pretrained TripoSR inference or learned GLB generation was executed here.** The cloud network policy denies `huggingface.co` (HTTP CONNECT 403), and no pretrained checkpoint was supplied. Model construction with weights, learned output quality, full CPU execution, and Mac M4/MPS execution remain unverified. No fabricated GLB is returned when weights are absent. To test here, environment settings would need Hugging Face access and any actual model-download redirect hosts, or trusted local cached weights/configs supplied securely. No network policy was changed.

Troubleshooting:

- `TRIPOSR_PYTHON` missing: point it at the backend venv's **Python executable**, not the venv directory or the frontend Python.
- Missing source/config/weights: run the source and download steps; verify both `config.yaml` and `model.ckpt` exist. DINO config cache must be accessible too.
- Hub/network errors: preserve TLS verification; check allowed destinations/cache and retry downloads explicitly. Offline cache misses are not missing API credentials.
- Dependency errors: use Python 3.11 and the pinned file, then `python -m pip check`; do not alter the frontend venv.
- MPS failure: retry explicitly on CPU. There is no CUDA-extension requirement to solve on Apple Silicon.
- No density crossing/empty GLB: the model did not produce a valid surface. Try a clearer object image. No placeholder mesh is substituted.
- Out of memory/timeout: use resolution 64 or 128 and chunk size 1024; close other memory-heavy applications. Increase timeout only after diagnosing logs.

## Attribution and licenses

[TripoSR code and weights](https://github.com/VAST-AI-Research/TripoSR) are released under MIT by Tripo AI and Stability AI according to the official README/LICENSE. Weights: [stabilityai/TripoSR](https://huggingface.co/stabilityai/TripoSR). Keep the official license with downloaded source/redistributions. The upstream transformer implementation retains Hugging Face Apache-2.0 notices. [DINO](https://huggingface.co/facebook/dino-vitb16) provides the architecture configuration; no separate DINO weight download is required. PyTorch uses a BSD-style license, scikit-image BSD-3-Clause, and trimesh MIT. Review dependency licenses and the downloaded model card for your distribution/use. No paid inference API is used.

Work began from `swagat-backend` commit `67ae342b863775dbce1ee399452306f669cbb1d5`. Protected frontend files, existing tests, root requirements, and root README are unchanged. Changes are limited to `backend/` and appended backend `.gitignore` exclusions. Nothing was pushed, merged, or published.
