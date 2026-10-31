# Repository audit and implementation notes

Work branch: `codex/sketch2shape-app`, created from the clean initial checkout (`e33f105aa4fe552a05fd4f9bb54d1672c24f84bd`). No pre-existing uncommitted changes were present. Implementation was initially left uncommitted as requested. The user subsequently explicitly authorized committing the application files and pushing this branch to GitHub. No merge into `main` is included.

## Inspected sources

- `main` / initial `work`: only the initial README.
- `sourav-dev` (`27e9ba1c5608a0acec0cff060f7c986f80255218`): actual preprocessing, Scribble refiner, subprocess TripoSR generator, strict trimesh mesh validator, tests, notebooks and chair input. These were copied into the working tree, not rewritten.
- `swagat-dev` (`67ae342b863775dbce1ee399452306f669cbb1d5`): Gradio frontend, shader assets and associated frontend source/build files/tests. These were copied into the working tree and the Python UI was extended.
- `mac-sketch-integration` (`537d7499ed52282f98b739b5c45523e45235f6c6`) and `sketch-milestone-b` (`9ae079b7adc8983b341b0e5db3275358b60f455b`): alternate SF3D/Mac and silhouette experiments, not the requested CUDA Scribble→TripoSR pipeline. Inspected without replacing the tested Sourav backend.
- No `backend/pipeline.py` or `backend/sketch_worker.py` existed in the requested development branch snapshots. No Kaggle-specific Python 3.13 runtime adaptation was found in them.

The existing app routed drawings directly to `generate_3d`, consumed only editor composites, lacked refinement artifacts/settings, and retained prior successful geometry after failure. The refiner required nonempty text and checked exact ML dependency metadata. The TripoSR generator and validator already supported real GLB export and conservative validation and were preserved unchanged.

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
