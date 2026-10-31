# Repository audit and implementation notes

Work branch: `codex/sketch2shape-app`, created from the clean initial checkout (`e33f105aa4fe552a05fd4f9bb54d1672c24f84bd`). No pre-existing uncommitted changes were present. Implementation was initially left uncommitted as requested. The user subsequently explicitly authorized committing the application files and pushing this branch to GitHub. No merge into `main` is included.

## Inspected sources

- `main` / initial `work`: only the initial README.
- `sourav-dev` (`27e9ba1c5608a0acec0cff060f7c986f80255218`): actual preprocessing, Scribble refiner, subprocess TripoSR generator, strict trimesh mesh validator, tests, notebooks and chair input. These were copied into the working tree, not rewritten.
- `swagat-dev` (`67ae342b863775dbce1ee399452306f669cbb1d5`): Gradio frontend, shader assets and associated frontend source/build files/tests. These were copied into the working tree and the Python UI was extended.
- `mac-sketch-integration` (`537d7499ed52282f98b739b5c45523e45235f6c6`) and `sketch-milestone-b` (`9ae079b7adc8983b341b0e5db3275358b60f455b`): alternate SF3D/Mac and silhouette experiments, not the requested CUDA Scribble→TripoSR pipeline. Inspected without replacing the tested Sourav backend.
- No `backend/pipeline.py` or `backend/sketch_worker.py` existed in the requested development branch snapshots. No Kaggle-specific Python 3.13 runtime adaptation was found in them.

The existing app routed drawings directly to `generate_3d`, consumed only editor composites, lacked refinement artifacts/settings, and retained prior successful geometry after failure. The refiner required nonempty text and checked exact ML dependency metadata. The TripoSR generator and validator already supported real GLB export and conservative validation were preserved in the initial integration. The later local-runtime update extends the generator command with device/meshing selection; its public signature and validation behavior remain intact.

## Changed existing files

- `app.py`: preserve Gradio layout/header assets, immutable per-session prompt snapshots, regeneration and shared inference queue; connect to the complete pipeline, add mode selection/settings/artifacts, handle layers and clear results on failures.
- `backend/sketch_refiner.py`: include the tested PEFT pin in environment checking, remove chair-specific negative prompting for a general object app, allow a short explicit object prompt. Existing preprocessing, diffusion settings, CPU offload, safety checker, metadata and inference implementation retained.
- `backend/requirements-sketch-colab.txt`: add PEFT 0.11.1 to avoid the known Transformers import conflict.
- Root `requirements.txt`: pin verified Gradio and keep UI packages separate from CUDA packages.
- `.gitignore`, root `README.md`, and frontend tests: update for the completed workflow and revised failure behavior.

## New files

- `backend/ui_adapter.py`: validate files and canvas data, compose transparency/layers, reject blank input, save aspect-preserving RGB PNG.
- `backend/pipeline.py`: public `generate_from_sketch(path, prompt=None) -> str`, richer `generate_result`, validated settings, unique directories, stages and metadata.
- `backend/sketch_worker.py`: launch existing refiner or generator in a chosen local Python environment, record real hardware/timing.
- `backend/process.py`: terminate and reap timed-out/interrupted worker process groups.
- `backend/doctor.py`: verify configured interpreters/GPU/dependencies without downloading models.
- `backend/acceptance.py`: explicit real inference/download/reopen workflow and recorded quality-inspection reminder.
- `backend/constraints-sketch-tested.txt`, `requirements-test.txt`, `pytest.ini`.
- `backend/tests/test_pipeline.py`, `backend/tests/test_process.py`: offline routing, artifacts, validation, failure, isolation, concurrency and actual CPU process-lifecycle tests.
- This audit and `docs/VERIFICATION.md`.

## Execution and safety boundaries

The UI and workers share one host and disk. Current Gradio's Hub dependency conflicts with the tested diffusion Hub version, so ML interpreters are configured separately. No environment variables are mutated globally to apply a user's settings. Each worker gets its own environment copy. Stage two begins only after stage one's process exits. The pipeline lock also serializes callers outside the Gradio queue in this process.

Worker logs remain local for debugging. Failed output is never returned to the UI, including after an earlier successful run. Intermediate images remain available on disk for diagnosis. Python imports and offline tests do not initialize or download model weights. The application has no mock/fallback model-generation path.

## Local-runtime follow-up

The user supplied an RTX 2050 diagnostic showing 4 GB VRAM and reported 8 GB system RAM. Their refinement traceback showed `ModuleNotFoundError: No module named torch` in the UI interpreter, before any GPU/model work.

- Added explicit CPU/CUDA/automatic device selection, FP32 CPU refinement and optional sequential CUDA offload. Compatible CPU/other CUDA torch wheels are no longer rejected for lacking the original `+cu128` suffix. Other pinned package checks remain.
- Added low-memory UI/CLI defaults, smaller reconstruction chunks and longer explicit CPU/low-memory timeouts. Worker errors now classify common failures and identify the job log.
- Added optional real scikit-image extraction of the TripoSR density field through an isolated runner. The upstream neural model and vertex-color reconstruction remain in use; installed native torchmcubes is still used by automatic selection when available. The replacement helper returns normalized XYZ positions from the same ij-indexed density grid.
- Added Windows setup/start scripts that keep ML packages separate from Gradio and preserve existing ML PyTorch/checkouts.
- Added device/offload/error-routing tests and actual CPU marching-cubes tests. These use synthetic fields only as explicit tests; no geometry fallback was added to production.
- Full pretrained inference and RTX 2050/Windows acceptance remain unverified. Eight GB system RAM may still be insufficient.

## Project-drive storage follow-up

After a Windows CUDA-wheel download failed with `ENOSPC` on C:, both Windows helpers now source `scripts/local-storage-windows.ps1` before invoking Python. Temporary files and pip/model/Gradio/rembg caches are directed to ignored `work/` folders beside the checkout. Scripted installs disable pip's retained wheel cache. A D: checkout therefore keeps these large files on D:, including on later launches; no original checkout, existing cache or user data is deleted. PowerShell execution remains unverified on Windows in this Linux environment.

## Refinement attention-memory follow-up

The next user log shows successful weight loading, then a CUDA allocation failure at the first ControlNet attention step inside `SlicedAttnProcessor` / `torch.baddbmm`. Low-memory CUDA now preserves PyTorch SDPA rather than calling `enable_attention_slicing`, which replaces the default SDPA processor with legacy sliced attention. The profile also starts at 256px refinement and CFG 1 to reduce activations/batch size; standard 512px/CFG 7 behavior remains selectable. PNG size checks and metadata match the requested resolution. CUDA and host allocation errors are classified separately. These changes reduce the reported attention allocation pressure but do not establish successful inference on the user's GPU.
