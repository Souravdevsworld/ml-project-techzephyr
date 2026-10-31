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

`TRIPOSR_PREPROCESS_MODE=baseline` remains the default and preserves the previous 512px padding path, including the legacy `TRIPOSR_REMOVE_BACKGROUND=1` opt-in. Milestone A adds explicit `photo`, `auto`, and `none` modes described below; photo mode composites accepted cutouts onto configurable gray. Original frontend preprocessing is untouched.

## Testing and observed limitations

```bash
"$TRIPOSR_PYTHON" -m unittest discover -s backend/tests -v
/absolute/path/to/your/existing/frontend-venv/bin/python -m unittest discover -s tests -v
```

Backend tests use explicit mocks/fixture meshes for unit cases. The analytic density test exercises real CPU marching cubes and axis scaling but is **not learned reconstruction**. Test-created boxes exist only in tests. Never describe these tests as successful TripoSR inference.

Initial backend validation: isolated Python 3.11/PyTorch 2.5.1 CPU dependencies installed; official `tsr.system.TSR` imported successfully with the portable helper; backend tests and 15 unchanged frontend tests executed. An actual Python 3.12 frontend process called the real Python 3.11 worker and received its missing-weights error, without importing torch into the frontend. The user's Mac Python 3.14 environment was not available for testing.

**No pretrained TripoSR inference or learned GLB generation was executed in this cloud task.** The cloud network policy denies `huggingface.co` (HTTP CONNECT 403), and no pretrained checkpoint was supplied. Model construction with weights, learned output quality, full CPU execution, and Mac M4/MPS execution remain unverified. No fabricated GLB is returned when weights are absent. To test here, environment settings would need Hugging Face access and any actual model-download redirect hosts, or trusted local cached weights/configs supplied securely. No network policy was changed.

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

The initial backend started from `67ae342b863775dbce1ee399452306f669cbb1d5`. Milestone A starts from backend commit `2e1e28614b52371c89b1e63482be0a9a042e960c` on `swagat-backend`. Protected frontend files, existing tests, root requirements, and root README remain unchanged. Milestone A changes are limited to `backend/` and appended backend `.gitignore` exclusions; no commit, push, merge, or publication is performed without approval.


## Milestone A: controlled photograph preprocessing

The reported Mac baseline (17,914 vertices, 35,820 faces, approximately 12.93s inference/extraction and 103.57s total) was supplied by the user. It was not independently reproduced in the cloud. The new instrumentation is intended to investigate that gap; it does not establish that preprocessing improves the learned geometry.

### What changed and why

The previous default loaded EXIF-oriented RGBA, composited transparency onto `(128,128,128)`, and used Pillow's default `ImageOps.pad` to 512×512. For ordinary RGB photographs, this retained the original background and the object's original relative size. Its separate legacy remove-background flag called rembg and upstream `resize_foreground(..., 0.85)`.

Official TripoSR `run.py` removes background (unless disabled), resizes the foreground at ratio 0.85, composites alpha onto gray `0.5`, and passes the result to `TSR`. Inside `tsr.utils.ImagePreprocessor`, Pillow input becomes float32 RGB divided by 255, then bilinear/antialiased interpolation resizes it to the checkpoint's `cond_image_size`. The new photo path follows that separation: it prepares RGB pixels, and **TSR retains sole responsibility for tensor normalization and its final configured resize**.

Unremoved backgrounds, excess margins, clipping, alpha-edge contamination, and ambiguous silhouettes are possible input problems. TripoSR's single-image prior and the original photo/view can also limit reconstruction. A correct mask cannot guarantee a cylindrical mug or an open 3D handle. Higher mesh resolution or polygon count does not prove better geometry.

`backend/preprocessing.py` now owns preparation. `Runtime` holds one persistent preprocessor, cached CPU ONNX sessions, and at most two cached masks; preprocessing settings travel per request through the same worker. Changing a foreground ratio/background does not reload TripoSR. Model/device/source or extraction settings still select the appropriate worker. The public `generate_3d(image_path, prompt=None) -> str` is unchanged.

### Modes and configuration

| Variable | Default | Meaning |
| --- | --- | --- |
| `TRIPOSR_PREPROCESS_MODE` | `baseline` | `baseline`, `photo`, `auto`, or `none` |
| `TRIPOSR_FOREGROUND_RATIO` | `0.85` | Longest foreground side / square side, finite 0.10–0.95; try 0.75/0.85/0.90 |
| `TRIPOSR_BACKGROUND` | `127,127,127` | Three RGB integers 0–255 for photo/none; baseline deliberately keeps its old 128 behavior |
| `TRIPOSR_CENTER_FOREGROUND` | `1` | Photo crop/center/scale; `0` isolates/composites while retaining full-image framing |
| `TRIPOSR_SEGMENTATION_MODEL` | `u2net` | Supported rembg models: `u2net` or smaller `u2netp` |
| `TRIPOSR_PREPROCESS_DEBUG` | `0` | `1` writes unique inspection artifacts |
| `TRIPOSR_DEBUG_DIR` | `backend/debug` | Root for per-request UUID directories |
| `U2NET_HOME` | rembg's own default | Set to `backend/.cache/rembg` to keep segmentation weights local/ignored |

Invalid new settings fail clearly. Keep `TRIPOSR_REMOVE_BACKGROUND=0` for the comparison commands below; it is a **legacy baseline-only** switch, not a prerequisite for photo mode.

- **baseline:** preserves previous preparation, byte-for-byte for the default path. Also retains the previous successful legacy rembg/resize path if its flag is enabled. Baseline intentionally ignores the new ratio/background/centering settings.
- **photo:** uses existing meaningful input alpha when available; otherwise predicts a mask with rembg. Validates it, crops around alpha support with inclusive bounds, scales without stretching, centers with margins, and composites on gray. Default target size is the model's configured input size (512 in the official checkpoint).
- **auto:** uses the same validated photo path, but routes an opaque, mostly-white/nearly-binary possible line drawing to baseline. This heuristic is **not an evaluated classifier**. It may misroute photographs or sketches. Explicit baseline is safest for sketches; sketch-specific segmentation is outside this milestone.
- **none:** EXIF orientation plus RGB/alpha compositing only. No optional crop, segmentation, pad, or backend resize. TSR still performs its mandatory square tensor resize, so non-square inputs can be stretched in this ablation mode. This is distinct from baseline's aspect-preserving 512px pad.

### Segmentation, validation, and fallback

The pinned `rembg[cpu]==2.0.60` / `onnxruntime==1.20.1` configuration uses **CPUExecutionProvider** even when TripoSR is experimental MPS. U²-Net weights come from rembg's documented GitHub releases and are downloaded lazily on the first photo request. `u2net.onnx` is approximately 176 MB; `u2netp` is smaller and not quality-equivalent. rembg/pooch verifies the package-declared checksum; do not disable it. No new packages are needed beyond the existing pinned backend requirements. Python 3.11/PyTorch 2.5.1/NumPy 1.26.4 remain isolated from the frontend. ARM64 wheel installation and real M4 runs still need local confirmation.

Mask checks reject empty/no-confident masks, area below 0.5% or above 95%, excessive uncertain background, foreground touching an image edge, and major fragmentation/noise. Area and connected-component statistics, an exclusive-right/bottom bounding box, and diagnostic reasons are recorded. These checks cannot prove semantic correctness: a plausible mask can still include background or miss a handle. They can also reject legitimate edge-touching or disconnected objects.

No brightness threshold is used to segment a white object from a light background. No erosion, dilation/closing, hole filling, alpha matting, or post-process sharpening is applied. Tiny/thin structures and holes are left as predicted; the pipeline cannot recover an opening the segmenter itself missed. Premultiplied-alpha Lanczos resizing avoids introducing arbitrary color from fully transparent pixels, though source-edge color contamination can remain.

Suspicious masks or segmentation exceptions log a reason and fall back to the **original** image's plain baseline path, without retrying the failing removal operation. Input files are never overwritten. A failed mask cannot poison the loaded TripoSR model; successful baseline-fallback inference keeps it alive for subsequent requests. Failed session initialization is cached for 60 seconds to avoid repeatedly trying downloads for every ratio. Wait 60 seconds or restart the app after fixing model access. Inference/protocol errors retain the existing worker-reset behavior. Fully transparent inputs are rejected because no visible source is available. If the mask is poor, use explicit baseline/none or supply a manually isolated RGBA image; never treat the fallback as successful segmentation.

### Exact Mac M4 commands

From the existing checkout with the working backend venv, source, and TripoSR weights already configured as above:

```bash
cd /absolute/path/to/ml-project-techzephyr
export TRIPOSR_PYTHON="$PWD/backend/.venv/bin/python"
export TRIPOSR_SOURCE="$PWD/backend/vendor/TripoSR"
export TRIPOSR_MODEL_DIR="$PWD/backend/weights/TripoSR"
export U2NET_HOME="$PWD/backend/.cache/rembg"
export TRIPOSR_DEVICE=cpu
export TRIPOSR_REMOVE_BACKGROUND=0
# Refresh only this backend environment if needed:
"$TRIPOSR_PYTHON" -m pip install -r backend/requirements.txt

# A new baseline file; does not overwrite your previous successful GLB:
TRIPOSR_PREPROCESS_MODE=baseline "$TRIPOSR_PYTHON" -m backend.cli /absolute/path/to/mug.png

# Opt-in segmented, centered, gray-background reconstruction:
TRIPOSR_PREPROCESS_MODE=photo TRIPOSR_FOREGROUND_RATIO=0.85 \
TRIPOSR_PREPROCESS_DEBUG=1 "$TRIPOSR_PYTHON" -m backend.cli /absolute/path/to/mug.png

# Inspect masks/inputs only, explicitly without TripoSR inference:
"$TRIPOSR_PYTHON" -m backend.evaluate_preprocessing /absolute/path/to/mug.png \
  --preprocess-only --ratios 0.75 0.90

# Generate a controlled set of REAL GLBs with one persistent model worker:
"$TRIPOSR_PYTHON" -m backend.evaluate_preprocessing /absolute/path/to/mug.png \
  --ratios 0.75 0.90
```

To use photo mode in the unchanged frontend, export `TRIPOSR_PREPROCESS_MODE=photo` and `TRIPOSR_FOREGROUND_RATIO=0.85`, then run `app.py` with the existing frontend Python. Restart the frontend after changing its process environment. Do not install backend ML packages into the frontend venv. Leave prompts optional; they remain unsupported by image-only TripoSR.

### Inspect and reproduce a comparison

Each evaluation prints a new `backend/evaluations/<uuid>` directory. Existing outputs are preserved. Its five default cases are baseline, segmentation/gray without centering, centered 0.85, centered 0.75, and centered 0.90. The latter four use the same cached mask where possible. All use the same image, checkpoint/device, extraction resolution, and chunk size. Ratios are validated before any inference.

- `comparison.png` shows originals, alpha masks, isolated foreground, bounds, and final input in a labeled grid. On macOS: `open /absolute/path/to/run/comparison.png`.
- Each case's UUID debug directory contains `original.png` (EXIF-oriented RGBA), `alpha.png`, `foreground.png`, `bbox.png`, `final.png`, and `metadata.json`. Masks/cutouts are absent when no mask was used/obtained. Failed masks are shown for diagnosis, not fed to the model. No intermediate files are written when debug is disabled.
- `report.json` records requested/effective modes, ratio/background, segmentation outcome, warnings/errors, detailed timings, GLB path/validity, vertex/face counts, input hash, backend Git commit/dirty status and source-file hashes, dependency versions, and available model-source/weight provenance. Failed cases remain errors and yield CLI exit 1; a valid baseline fallback is separately labeled `fallback`. `--preprocess-only` leaves GLB validity/counts unset; it never fabricates mesh outputs. Completed cases are saved even when later cases fail.
- `glbs/` contains new, unique real inference outputs. Import each into Blender through File → Import → glTF 2.0, or another GLB-capable viewer. Match view, scale, camera angle, and lighting before judging geometry. The old successful GLB is untouched.
- `review.csv` supplies blank human scores: recognizability, silhouette fidelity, handle/opening preservation, absence of background geometry, absence of surface distortion, and completeness. Score each 1 (poor) to 5 (good), note concrete defects, and retain the input/report/GLBs. Polygon count is diagnostic, not a quality score. The script never automatically claims improvement.

Debug images contain your input objects and absolute paths; they stay local and ignored by Git. Remove old evaluation/debug folders manually when no longer needed. No frontend assets or tests are changed.

### Timing interpretation

`report.json` separates worker spawn/readiness, dependency imports, pretrained-model loading, segmentation-model loading, segmentation inference, image I/O/preprocessing, TripoSR forward inference, mesh extraction, GLB export/validation, adapter validation, lock wait, and RPC/serialization overhead. A ready signal is requested only by the adapter; direct legacy JSON-lines worker calls remain compatible. Masks, model objects, and images are not serialized between interpreters: **only image/output paths and small JSON configuration/report data cross the pipe**. Path serialization is timed explicitly. TSR's own RGB-to-tensor preparation/device transfer remains included in forward inference, rather than being misleadingly reported as an independently measured transfer.

Timers are phase measurements and some overlap: preprocessing includes segmentation; model setup includes imports/loading; worker request includes all worker phases; total includes everything. Do not sum nested fields. Communication overhead is a nonnegative residual estimate after subtracting reported worker time and first-start readiness from RPC time. GPU phase timers synchronize MPS/CUDA explicitly; CPU is synchronous. A cold baseline includes model loading; later cases reuse it. Compare preprocessing and inference/extraction separately, not only cold-vs-warm totals. Segmentation loading may include the first verified weight download. Cache hits are recorded and report zero segmentation time. No timings here are Mac M4 benchmarks.

### Milestone A validation and remaining claims

Synthetic tests cover RGB/RGBA, existing transparency, fully empty inputs, white-on-light fixtures, empty/oversized/tiny/edge-touching/fragmented masks, thin connected handles and open holes, inclusive bounding boxes, centering/aspect/scaling, configurable backgrounds/ratios, conservative auto routing, fallback/recovery, unique debug outputs, bounded session/mask reuse, settings validation, worker compatibility, model persistence across preprocessing options, and evaluation error reporting. Existing backend/frontend tests are retained unchanged.

Real rembg U²-Net segmentation was executed on official TripoSR `examples/teapot.png` using checksum-verified weights in the cloud. The mask and five-case input comparison were visually inspected: the handle opening remains visible, and 0.75/0.85/0.90 framing differs as intended. This verifies that example's mask/framing only. It is not a white mug, a representative photo benchmark, or evidence of improved 3D geometry. The user's original mug image/GLB were not supplied to this task.

No new genuine pretrained TripoSR inference or baseline/enhanced GLB comparison was possible in this cloud task: TripoSR weights/DINO config are not available and Hugging Face remains denied by environment policy. The user's previously successful Mac inference is acknowledged, but this task does not independently reconfirm it. Baseline pixel equivalence, the unchanged model forward/extraction path, and mock/protocol tests were verified here. Actual Mac M4 reconstruction quality, baseline-versus-photo GLBs, memory/runtime, and experimental MPS execution remain unverified. Run the commands above on the Mac before claiming improved reconstruction fidelity.
