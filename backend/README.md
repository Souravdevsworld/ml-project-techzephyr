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

## Multiple engines: TripoSR default, SF3D experimental

The unchanged frontend still calls `generate_3d(image_path: str, prompt: str | None = None) -> str`. It receives only a unique absolute local GLB path after validation. `backend/backends/base.py` defines the report interface; `factory.py` lazily selects an engine; `triposr_backend.py` delegates to the existing worker, while `sf3d_backend.py` launches a separate persistent SF3D worker/interpreter. There are no frontend changes. TripoSR preprocessing, model loading, mesh extraction, comparison workflow, and dependency environment are retained.

```bash
export SKETCH2SHAPE_3D_BACKEND=triposr  # default; current working Mac fallback
# Opt in only after installing SF3D below:
export SKETCH2SHAPE_3D_BACKEND=sf3d
```

Both engines are image-only. Optional text prompts remain accepted and logged as unused; neither engine performs text-conditioned reconstruction or edits an existing mesh.

`SKETCH2SHAPE_3D_FALLBACK=error` is the default. A failed SF3D request remains an error. To deliberately allow a TripoSR result instead, set `SKETCH2SHAPE_3D_FALLBACK=triposr`. Fallback logs the original SF3D error and records `requested_engine=sf3d`, `actual_engine=triposr`, and the reason in the backend report. It must not be presented as an SF3D asset or SF3D benchmark. Invalid engine/configuration values or input files are errors, not automatic fallback triggers. Engine comparison always passes `fallback=False`, overriding the environment setting. The existing Milestone A `backend.evaluate_preprocessing` tool is pinned to TripoSR regardless of the frontend engine setting, so its baseline/photo input experiments remain comparable.

Requests share a process-wide dispatch lock and each worker retains its own safety lock. Switching engines closes the idle engine's worker to limit peak unified memory. Successive requests to the same engine reuse its model. The comparison tool groups inputs by engine to avoid reloading a model for every image. No concurrent two-model inference is introduced. Configuration is backend-only; restart the frontend after changing its environment. `shutdown_worker()` closes both engines.

### Why SF3D is an asset-quality candidate

Official source inspected: [Stability-AI/stable-fast-3d](https://github.com/Stability-AI/stable-fast-3d), commit `ff21fc491b4dc5314bf6734c7c0dabd86b5f5bb2`. See its `README.md`, `run.py`, `sf3d/system.py`, `sf3d/models/mesh.py`, `sf3d/utils.py`, and native-module setup files.

Unlike the existing TripoSR vertex-color export, SF3D reconstructs geometry, unwraps UVs, bakes a base-color texture, estimates metallic/roughness material factors, and can include a normal texture. Its upstream export is directly `mesh.export(..., include_normals=True)` to GLB. We preserve that textured `trimesh.Trimesh` without converting it through an untextured mesh or OBJ. Both worker and parent validate nonempty geometry and connected UV/material/embedded-base-color-texture resources. A plain untextured mesh is rejected by the SF3D adapter instead of being labeled a complete SF3D asset.

| Format/capability | What is supported |
| --- | --- |
| GLB | Native upstream CLI output; selected by this integration; embedded images, UVs, PBR material parameters and available normal texture retained |
| UVs/materials/textures | Native SF3D pipeline, with custom CPU/CUDA/Metal baking and UV extension |
| OBJ + MTL + images | Potential Trimesh export, not an upstream CLI output option and **not implemented here**; not equivalent preservation of PBR/normal/roughness/metallic semantics |
| Appearance quality | SF3D is designed for better mesh/texturing and illumination disentanglement; no claim of superior geometry or recognizability is made without actual paired GLB review |

A single image still cannot determine hidden geometry perfectly. Detailed textures can make a distorted shape look convincing from one angle. Inspect the full orbit, silhouette, openings and usable UV/material layout, not just polygon count or a textured screenshot. TripoSR remains the recommended default until your real SF3D runs validate this tradeoff.

### Compatibility findings and isolation

Current upstream documents **CPU support** and **experimental MPS support**; it is not CUDA-only. Its Mac tests described M1 Max 64 GB with a PyTorch nightly, and its README recommends CPU for Macs with less than 32 GB unified memory. This is not a Mac M4 test or a promise about M4 memory/runtime. Native `texture_baker` and `uv_unwrapper` C++ extensions are required even in CPU mode. MPS baking additionally uses custom Metal kernels. Mac compilation needs OpenMP support; see [upstream's OpenMP reference](https://mac.r-project.org/openmp/).

The proposed environment uses Python 3.11, PyTorch 2.5.1 and matching torchvision 0.20.1. SF3D uses transformers 4.42.3, open_clip_torch 2.24.0, huggingface-hub 0.23.4, trimesh 4.4.1, rembg 2.0.57 and other pins in `backend/requirements-sf3d.txt`. These conflict with some working TripoSR pins; **do not combine the requirements or install into the TripoSR/frontend venv**. CPU ONNX segmentation is selected rather than upstream's optional Linux GPU rembg extra. Direct dependencies are pinned; transitive dependencies are not fully locked.

The SF3D source's `load/tets/160_tets.npz` must remain in its checkout. It also imports `gpytoolbox` and `pynanoinstantmeshes` even when remeshing is disabled. This integration uses `remesh='none'` and `vertex_count=-1` to retain native detail and avoid an unverified remeshing/conversion stage.

### SF3D installation on Mac M4 — commands to test, not a verified Mac recipe

Leave your existing environments intact. From the project checkout:

```bash
brew install llvm libomp
python3.11 -m venv backend/.venv-sf3d
export SF3D_PYTHON="$PWD/backend/.venv-sf3d/bin/python"
"$SF3D_PYTHON" -m pip install setuptools==69.5.1 wheel ninja
"$SF3D_PYTHON" -m pip install -r backend/requirements-sf3d.txt
mkdir -p backend/vendor
git clone https://github.com/Stability-AI/stable-fast-3d.git backend/vendor/stable-fast-3d
git -C backend/vendor/stable-fast-3d checkout ff21fc491b4dc5314bf6734c7c0dabd86b5f5bb2
export SF3D_SOURCE="$PWD/backend/vendor/stable-fast-3d"
export SF3D_MODEL_DIR="$PWD/backend/weights/stable-fast-3d"
export HF_HOME="$PWD/backend/.cache/sf3d/huggingface"
export TORCH_HOME="$PWD/backend/.cache/sf3d/torch"
export U2NET_HOME="$PWD/backend/.cache/rembg"
export SF3D_DEVICE=cpu
export SF3D_USE_CPU=1

# Compile from each extension's actual source directory; preserve TLS/checksums.
SF3D_LLVM_PREFIX="$(brew --prefix llvm)"
SF3D_OMP_PREFIX="$(brew --prefix libomp)"
(
  cd "$SF3D_SOURCE"
  CC="$SF3D_LLVM_PREFIX/bin/clang" CXX="$SF3D_LLVM_PREFIX/bin/clang++" \
  CPPFLAGS="-I$SF3D_OMP_PREFIX/include" \
  LDFLAGS="-L$SF3D_OMP_PREFIX/lib -Wl,-rpath,$SF3D_OMP_PREFIX/lib" \
  USE_CUDA=0 USE_METAL=0 MAX_JOBS=2 \
  "$SF3D_PYTHON" -m pip install --no-build-isolation ./texture_baker ./uv_unwrapper
)
```

If the vendor checkout already exists, preserve/inspect it before changing it. The command-line toolchain/OpenMP combination and ARM64 dependency wheels must be tested on the actual Mac; do not disable verification or patch native code blindly to bypass a failure. Native modules must be rebuilt if the backend PyTorch build changes. CPU-only Linux users should install `torch==2.5.1 torchvision==0.20.1` from `https://download.pytorch.org/whl/cpu` first, then install this requirements file and compile extensions with the platform's C++/OpenMP toolchain. Linux CPU builds were verified here; this does not validate Apple Metal builds.

### Weights, auxiliary downloads, and license

SF3D weights are gated at [stabilityai/stable-fast-3d](https://huggingface.co/stabilityai/stable-fast-3d). First request access and review the official model agreement/`LICENSE.md`. The code/model is **source-available under the Stability AI Community License, not the TripoSR MIT license or unrestricted OSI open source**. Commercial eligibility/revenue conditions, attribution and redistribution terms apply. Consult the official agreement for your intended hackathon/demo/distribution use. This optional feature is **Powered by Stability AI**; retain upstream notices and required attribution when distributing. No license acceptance or gated download is automated by this implementation.

After access is granted, authenticate locally and download into the ignored weights directory:

```bash
backend/.venv-sf3d/bin/huggingface-cli login
backend/.venv-sf3d/bin/huggingface-cli download stabilityai/stable-fast-3d \
  config.yaml model.safetensors --local-dir "$SF3D_MODEL_DIR"
```

Do not put tokens in chat, scripts, Git, or shell command arguments. Existing working local authentication can be reused; an additional login is unnecessary if the download already works.

The official loader also constructs DINOv2 (`facebook/dinov2-large`) and a configuration-dependent OpenCLIP estimator (source defaults include ViT-B-32 / `laion2b_s34b_b79k`). Auxiliary model/config downloads may happen on first load even when the two SF3D checkpoint files are local. Keep the corresponding Hugging Face/Torch/OpenCLIP caches accessible. Two local SF3D files alone do **not** establish offline readiness. Only after a successful first run should you test offline restoration. Do not replace legitimate checkpoints with random initialized/fake networks on download errors.

### SF3D preprocessing and device settings

SF3D has its own preparation path: existing valid alpha is reused; opaque input is segmented using the shared cached rembg helper; the mask is validated; the object is framed with preserved aspect ratio and alpha. It remains **RGBA** until upstream `prepare_image()` uses alpha for mask conditioning and composites against its configured background internally. TripoSR's flattened RGB modes are not applied to SF3D. Invalid SF3D alpha/segmentation fails clearly; only the explicitly configured whole-engine TripoSR fallback may reconstruct the original input instead.

| Variable | Default | Meaning |
| --- | --- | --- |
| `SF3D_PYTHON` | required | Absolute executable in the separate SF3D venv |
| `SF3D_SOURCE` | `backend/vendor/stable-fast-3d` | Official pinned source with tetrahedral-grid asset |
| `SF3D_MODEL_DIR` | `backend/weights/stable-fast-3d` | Local `config.yaml` and `model.safetensors` |
| `SF3D_DEVICE` | `cpu` | Explicit `cpu`, `mps`, or `cuda`; no silent whole-model switch |
| `SF3D_TEXTURE_RESOLUTION` | `1024` | 256, 512, 1024, 2048 or 4096; texture size, not a mesh-quality guarantee |
| `SF3D_FOREGROUND_RATIO` | `0.85` | 0.10–0.95 foreground framing |
| `SF3D_SEGMENTATION_MODEL` | `u2net` | `u2net` or `u2netp` |
| `SF3D_TIMEOUT` | `1800` | Positive seconds, including first load and auxiliary downloads |
| `SF3D_OUTPUT_DIR` | `backend/outputs/sf3d` | Unique retained GLBs |

The child sets `SF3D_USE_CPU=1` for explicit CPU because upstream helpers can otherwise auto-select a GPU independently of `model.to()`. For experimental MPS you must explicitly set `PYTORCH_ENABLE_MPS_FALLBACK=1` **before** starting the worker, as upstream requires; this permits mixed CPU execution for unsupported operators. It is not the same as TripoSR's no-implicit-fallback MPS policy. The adapter reports the selection and does not silently claim pure MPS inference. Metal baking additionally requires rebuilding `texture_baker` with `USE_METAL=1` (same pinned PyTorch environment); CPU-only builds do not establish Metal readiness. See the upstream README for OpenMP/Metal troubleshooting.

### Local inference and paired comparison

Once the environments and model caches are configured, both calls use the same existing CLI and frontend contract:

```bash
# Keep TRIPOSR_PYTHON / TRIPOSR_SOURCE / TRIPOSR_MODEL_DIR from the working setup.
SKETCH2SHAPE_3D_BACKEND=triposr "$TRIPOSR_PYTHON" -m backend.cli /absolute/path/to/mug.png

# Experimental CPU SF3D: actual reconstruction + UVs/materials/textures required.
SKETCH2SHAPE_3D_BACKEND=sf3d SF3D_DEVICE=cpu \
  "$TRIPOSR_PYTHON" -m backend.cli /absolute/path/to/mug.png

# Compare teapot, chair, hamburger, and your real mug without automatic fallback:
"$TRIPOSR_PYTHON" -m backend.compare_backends \
  --examples-dir "$TRIPOSR_SOURCE/examples" \
  --mug /absolute/path/to/mug.png --triposr-mode photo
```

`--image /absolute/path/to/another-object.png` adds further inputs; repeat as needed. Omit `--mug` if unavailable: the report marks it skipped and never invents a mug result. Required official example files missing from `--examples-dir` are errors. `--engines triposr` or `--engines sf3d` supports focused runs. The tool never overwrites prior assets and never substitutes TripoSR output for a failed SF3D comparison.

New `backend/evaluations/backends/<uuid>/report.json` records source hashes, requested/actual engine, preprocessing, elapsed runtime, GLB validity/path/size, vertex/face counts, UVs, material/texture presence and generation diagnostics. A GLB without engine attribution or with mismatched attribution is an error. Runs are grouped by engine to reuse loaded weights and limit RAM; pair results by input name/hash, not row adjacency. `review.csv` provides blank 1–5 scores for recognizability, silhouette, fine detail, surface quality, asset usability, texture/material quality and overall quality. Review matching full orbits and actual GLBs in Blender/a GLB-capable viewer. Larger counts/textures alone are not quality improvements.

### Verification status

- **TripoSR:** the existing working Mac backend remains the default; its original worker/runtime/preprocessing tests are retained. No new pretrained TripoSR run was executed in this cloud task; local weights are unavailable.
- **SF3D implementation:** real upstream loading/inference/export wiring exists, in an isolated worker, with explicit configuration and validation. No successful pretrained SF3D asset is claimed.
- **Partially verified on Linux CPU:** Python 3.11.17, PyTorch 2.5.1+cpu, torchvision 0.20.1+cpu and upstream Python dependency pins installed in `/workspace/sf3d-venv`. Both official native modules compiled with GCC 14 and two build jobs. Actual CPU rasterization/interpolation and UV-unwrapping smoke tests passed on tiny geometric fixtures, and `sf3d.system.SF3D` imported. These are kernel/import tests, **not pretrained reconstruction or quality tests**.
- **Not verified:** gated SF3D checkpoint loading, DINOv2/OpenCLIP cache restoration, real SF3D/TripoSR paired outputs, your mug, Mac M4/ARM64 or Metal/MPS execution, runtime/memory and quality gains. Cloud egress does not currently allow Hugging Face; no gated token/access was requested or extracted. No checkpoint was downloaded to pretend otherwise.

Run tests separately without mixing dependency environments:

```bash
"$TRIPOSR_PYTHON" -m unittest discover -s backend/tests -v
/absolute/path/to/existing/frontend-venv/bin/python -m unittest discover -s tests -v
```

Fixture/mocked engine tests verify selection, error propagation, explicit fallback attribution, native GLB texture/resource validation and comparison bookkeeping. Existing tests are not weakened. Weights, environments, caches, generated assets and evaluation/debug files remain ignored; only backend-owned source/tests/docs and necessary ignore rules change. No commit, push, merge or publication occurs without approval.

## Milestone B1: deterministic sketch reference preparation

B1 adds no neural models. `generate_3d(image_path: str, prompt: str | None = None) -> str`
remains unchanged. Set `SKETCH2SHAPE_INPUT_MODE` in the parent process:

| Mode | Behavior |
| --- | --- |
| `photo` (default) | Existing SF3D RGBA/rembg preparation and TripoSR behavior |
| `sketch` | SF3D only; deterministic sketch reference panel, no rembg |
| `auto` | Only sparse, near-neutral, high-contrast line art on flat backgrounds routes to sketch; ambiguous inputs retain photo behavior |

Invalid mode values fail explicitly. A detected/explicit sketch requires SF3D;
it does not silently run TripoSR or use the configured TripoSR error fallback.
The requested mode travels in each SF3D worker request, so changing it between
requests does not require reloading weights. Restart a running frontend to change
its shell environment. The existing SF3D preparation is bypassed only for sketch
conditioning; model loading, mesh extraction, texture baking and GLB export are unchanged.

`backend/sketch_preprocessing.py` accepts PNG/JPEG, applies EXIF orientation,
ignores invisible RGB, detects background/stroke polarity, and normalizes to dark
continuous-tone strokes on white. Contrast thresholds locate bounds and reject
empty/tiny marks; they do not binarize the delivered linework. Content is cropped
with a small margin, scaled uniformly, centered, and placed on a square RGBA
canvas. Alpha is **one opaque rectangular reference panel with transparent outer
margins**, not stroke segmentation or an inferred object silhouette. Internal
lines and open contours survive; alpha is deliberately not passed to the photo
mask validator. The CLI saves original pixels, prepared RGBA, gray-background
preview, alpha and JSON with source hash, polarity, crop/frame sizes and warnings.
Runtime preprocessing diagnostics appear in the existing SF3D report/log.
Source files are only read. CLI diagnostic directories must be new, preventing
accidental overwriting of an input. Synthetic fixtures live as reproducible mug,
chair and teapot drawing definitions in `backend/tests/test_sketch_preprocessing.py`.

### Canvas and uploads

`app.py`'s unchanged `preprocess_sketch()` takes the editor `composite` or upload,
applies EXIF orientation, thumbnails to a maximum edge of 1024, composites alpha
onto white and writes an RGB PNG. Canvas defaults are 640×480 with `#111111`
strokes (brush size 8); imported images can have other sizes/colors. The editor
uses RGBA, but the backend receives no alpha through this frontend path. Backend
CLI inputs can retain original PNG alpha. White strokes on transparent input
can disappear when the frontend composites white; use dark strokes in the canvas
or pass that original PNG directly to the backend. This cannot be recovered after
flattening without changing the frontend. No frontend changes were made.

### Mac M4 validation (existing environments and caches)

Run from the repository root on `sketch-milestone-b`. These commands assume the
previously working environments, official source, weights and auxiliary caches;
they do not install anything or download weights. Keep existing source/model/cache
variables when customized. Defaults below match the repository layout.

```bash
export TRIPOSR_PYTHON="$PWD/backend/.venv/bin/python"
export SF3D_PYTHON="$PWD/backend/.venv-sf3d/bin/python"
export SF3D_SOURCE="${SF3D_SOURCE:-$PWD/backend/vendor/stable-fast-3d}"
export SF3D_MODEL_DIR="${SF3D_MODEL_DIR:-$PWD/backend/weights/stable-fast-3d}"
export SF3D_DEVICE=cpu
# Refuse network downloads during validation; missing caches should be fixed separately.
export HF_HUB_OFFLINE=1 TRANSFORMERS_OFFLINE=1
mkdir -p work

# Optional synthetic fixtures; these are drawings, not reconstruction results.
"$TRIPOSR_PYTHON" - <<'PY'
from pathlib import Path
from backend.tests.test_sketch_preprocessing import fixture
root = Path('work/sketch-fixtures')
root.mkdir(exist_ok=False)
for kind in ('mug', 'chair', 'teapot'):
    fixture(kind).convert('RGB').save(root / (kind + '.png'))
PY

# 1–2. Preprocessing only. Use a NEW output directory each run.
"$TRIPOSR_PYTHON" -m backend.sketch_preprocessing work/sketch-fixtures/teapot.png \
  --output-dir work/teapot-prepared
open work/teapot-prepared/preview.png work/teapot-prepared/prepared.png
cat work/teapot-prepared/metadata.json

# 3. Genuine pretrained SF3D sketch trial: pass the ORIGINAL, not prepared.png.
# Passing prepared.png with sketch mode would prepare it a second time.
SKETCH2SHAPE_INPUT_MODE=sketch SKETCH2SHAPE_3D_BACKEND=sf3d \
  SKETCH2SHAPE_3D_FALLBACK=error \
  "$TRIPOSR_PYTHON" -m backend.cli work/sketch-fixtures/teapot.png

# 4. Paste the returned GLB path into this variable, then validate geometry/textures.
export SKETCH_GLB='/absolute/path/to/returned.glb'
"$TRIPOSR_PYTHON" - <<'PY'
import os, json
from backend.generator import validate_glb
from backend.backends.assets import inspect_glb_asset
path = validate_glb(os.environ['SKETCH_GLB'])
report = inspect_glb_asset(path)
assert all(report[k] for k in ('valid_glb', 'has_uv', 'has_materials', 'has_textures')), report
print(json.dumps(report, indent=2))
PY
# Also inspect silhouette, handles, internal lines and texture in Blender/a GLB viewer.

# 5. Automated preprocessing/photo/adapter regression in the existing backend env.
SKETCH2SHAPE_INPUT_MODE=photo "$TRIPOSR_PYTHON" -m unittest discover -s backend/tests -v
# Real paired photo regression: substitute your known successful teapot photo.
export PHOTO_INPUT='/absolute/path/to/known-working-teapot-photo.png'
SKETCH2SHAPE_INPUT_MODE=photo SKETCH2SHAPE_3D_BACKEND=sf3d \
  SKETCH2SHAPE_3D_FALLBACK=error "$TRIPOSR_PYTHON" -m backend.cli "$PHOTO_INPUT"
SKETCH2SHAPE_INPUT_MODE=photo SKETCH2SHAPE_3D_BACKEND=triposr \
  "$TRIPOSR_PYTHON" -m backend.cli "$PHOTO_INPUT"
# Repeat the GLB checks above for the returned SF3D photo asset.
```

The preprocessing CLI needs only existing Pillow/NumPy. The parent uses
`backend/.venv`; actual SF3D imports/inference run only in `backend/.venv-sf3d`.
Offline flags guard Hugging Face/Transformers calls; other upstream dependencies
must already be cached too. No model or cache files are rewritten by this change.

### Limits, diagnostics and validation status

A line drawing remains out of distribution for an image-to-3D model. Rectangular
paper alpha may produce slabs, paper-like surfaces or poor geometry; it is a
reference framing policy, not recovered depth/segmentation. Auto detection is an
unvalidated heuristic and may mistake graphic-like photos for sketches. Colored,
faint, shaded or textured drawings should use explicit sketch mode for inspection;
complex backgrounds, edge-clipped drawings and semantically incomplete objects
are not repaired. Tiny/near-blank marks fail with `ValueError`, but sufficiently
large incomplete contours may still pass: semantic completeness is not inferred.
Check preview/alpha/metadata before inference. Invalid images fail explicitly.
The known nonfatal tangent-space warning is deferred.

Cloud validation: seven new synthetic/dispatch/photo-path tests pass. Full backend
discovery is blocked by absent `trimesh`/`skimage` (and the complete ML environment).
An untouched HEAD archive reproduces the same four failures and fifteen errors;
no dependencies were installed to disguise these limitations. The full Mac suite
and real photo regression remain required. No pretrained sketch reconstruction
was run here; **sketch-to-3D success is not claimed**. B2 readiness consists of the
inspection CLI, reproducible fixtures and commands above. Stop after B1 and run
the first actual sketch trial on the Mac before considering a sketch-to-image model.

## Milestone B2A: controlled manual mug silhouette experiment

This diagnostic is separate from production sketch preprocessing. It tests whether
correct foreground alpha improves the same sketch's SF3D reconstruction; it does
not infer depth/shading or promise a volumetric mug. No diffusion model is involved.

Prepare a **manually verified opaque grayscale PNG mask** aligned pixel-for-pixel
with the EXIF-oriented original sketch (same dimensions): white/255 for solid mug
body and handle material; black/0 for the external background and handle opening.
Do not provide a stroke mask, JPEG, inverse mask, or transparent-background RGBA
mask. Export the mask as black-and-white grayscale pixels, with narrow antialiased
edges permitted. The utility deliberately refuses ambiguous alpha conventions,
colored masks, dimension mismatches, empty/full masks, edge-touching foreground,
disconnected foreground and masks without an enclosed transparent opening. These
are structural checks: only manual inspection establishes that the hole is the
handle and that the mask actually follows the mug. Do not manufacture a hole to
satisfy validation. A mug view without a visible enclosed handle opening is outside
this controlled test's scope.

The utility retains source RGB colors and internal lines; original transparency
is composited over white before the supplied mask replaces alpha. It crops to mask
support, resizes uniformly with premultiplied alpha to fit 85% of a 512×512 canvas,
and centers the result. No hole filling, automatic segmentation, color inversion,
or line thresholding is applied. Output hole count is checked after resizing; very
small openings that disappear require a clearer mask, not automatic repair.
Resampling necessarily interpolates RGB/alpha at edges. Sources are never written.
An existing output directory is refused, protecting inputs and earlier experiments.

Files saved in a new output directory:

- `original_preview.png`: original oriented sketch composited on white, original dimensions.
- `silhouette_mask.png`: supplied oriented mask, original dimensions.
- `reference.png`: final 512×512 RGBA inference reference.
- `alpha.png`: exact final alpha as grayscale (white foreground, black transparency).
- `reference_preview.png`: final reference composited on gray for inspection.
- `metadata.json`: source paths/hashes, source/output dimensions, scale/offset,
  bounds, component/hole measurements, preparation policy and limitations.

### Exact Mac M4 commands

Run from the repository root on `sketch-milestone-b`, using the already working
environments, model paths and caches. Substitute the two input paths. The output
directory below must not already exist; choose another name for repeated trials.

```bash
export TRIPOSR_PYTHON="$PWD/backend/.venv/bin/python"
export SF3D_PYTHON="$PWD/backend/.venv-sf3d/bin/python"
export SKETCH_INPUT='/absolute/path/to/original-mug-sketch.jpg'
export SILHOUETTE_INPUT='/absolute/path/to/manually-verified-mug-mask.png'

# 1. Create the diagnostic reference (Pillow/NumPy only; no SF3D loading).
"$TRIPOSR_PYTHON" -m backend.silhouette_diagnostic \
  "$SKETCH_INPUT" "$SILHOUETTE_INPUT" --output-dir work/b2a-mug-01

# 2. Inspect alpha and RGB alignment BEFORE inference.
open work/b2a-mug-01/original_preview.png \
  work/b2a-mug-01/silhouette_mask.png \
  work/b2a-mug-01/alpha.png work/b2a-mug-01/reference_preview.png
cat work/b2a-mug-01/metadata.json
# Verify: white solid body/handle, BLACK handle opening and external background.

# 3. Genuine pretrained SF3D on CPU. Keep your existing source/weights settings.
# IMPORTANT: photo mode preserves supplied alpha and bypasses rembg.
# sketch/auto would route back through B1 and could replace the supplied alpha.
SKETCH2SHAPE_INPUT_MODE=photo SKETCH2SHAPE_3D_BACKEND=sf3d \
  SKETCH2SHAPE_3D_FALLBACK=error SF3D_DEVICE=cpu \
  "$TRIPOSR_PYTHON" -m backend.cli work/b2a-mug-01/reference.png

# 4. Paste the actual returned GLB path here; verify geometry and textures.
export B2A_GLB='/absolute/path/to/returned.glb'
"$TRIPOSR_PYTHON" - <<'PY'
import json, os
from backend.backends.assets import inspect_glb_asset
report = inspect_glb_asset(os.environ['B2A_GLB'])
assert all(report[k] for k in ('valid_glb','has_uv','has_materials','has_textures')), report
print(json.dumps(report, indent=2))
PY
# Open in Blender (if installed at the standard macOS location):
open -a Blender
# In Blender: File > Import > glTF 2.0, select the path printed by:
printf '%s\n' "$B2A_GLB"
# Orbit in Material Preview; compare front, side and oblique views with B1.

# 5. Focused synthetic tests, including the unchanged B1 tests.
"$TRIPOSR_PYTHON" -m unittest backend.tests.test_silhouette_diagnostic \
  backend.tests.test_sketch_preprocessing -v
```

The existing SF3D photo path checks the supplied alpha, then crops/reframes it
using `SF3D_FOREGROUND_RATIO` (default 0.85). This may resample the diagnostic
reference slightly again; it does not invoke rembg on this nonopaque RGBA input.
Leave that setting at its previous value for a fair comparison. Inspect the
runtime's existing preprocessing metadata for `segmentation_outcome=existing_alpha`.
The working SF3D runtime/export algorithms are unchanged.

Compare the same mug with the B1 panel baseline using identical SF3D settings.
Record both GLB paths, elapsed time, settings and screenshots. Judge whether the
body has depth and whether the handle opening survives from multiple angles.
Successful GLB validation alone is not a successful reconstruction. Even an
improved silhouette may yield a flat mug-shaped cutout because RGB remains line
art; that outcome supports testing shaded image conditioning next.
