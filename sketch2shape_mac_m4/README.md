# Sketch2Shape — Mac M4 experiment (not yet GPU-tested)

This is a **non-destructive, experimental** Apple Silicon port of the uploaded `backend/sketch_refiner.py` and `backend/sketch_preprocess.py`. It uses the **same SD 1.5 + ControlNet Scribble weights** and preserves optional prompts. It removes CUDA-only package pin checks and CUDA offload, using PyTorch MPS instead. It has passed syntax compilation only; model downloads, speed, quality and end-to-end behavior have **not** been tested on a Mac M4.

## Install, in a new isolated environment

From your **existing working repository root**, copy these two Python files into `backend/` **only after backing up any existing versions**. Do not replace your SF3D files. You can instead first run them in this extracted folder to verify sketch-to-PNG independently.

```bash
python3.12 -m venv backend/.venv-sketch-mps
source backend/.venv-sketch-mps/bin/activate
python -m pip install -U pip
python -m pip install 'torch>=2.3' 'diffusers==0.30.3' 'transformers==4.40.2' 'accelerate==0.34.2' 'huggingface-hub==0.25.2' 'safetensors==0.4.5' 'peft==0.11.1' 'Pillow==10.4.0' 'numpy<2' opencv-python-headless
python -c 'import torch; print("MPS available:",torch.backends.mps.is_available())'
```

These versions are **proposed** and may require compatibility adjustments on current macOS/Python. Do not install into the working SF3D environment.

## Test sketch-to-image separately

From the folder containing `backend/` and your `examples/chair.png`:

```bash
backend/.venv-sketch-mps/bin/python -c 'from backend.sketch_refiner import refine_sketch; print(refine_sketch("examples/chair.png"))'
```

The first run downloads multiple GB of model weights and can be slow. If you hit an MPS dtype/operator/memory error, **stop and share the exact traceback**. Do not modify your working SF3D environment.

## Connect to existing SF3D

After sketch-to-PNG succeeds, use `local_sketch_to_3d.py` from your repository root with:

```bash
python local_sketch_to_3d.py examples/chair.png --sketch-python backend/.venv-sketch-mps/bin/python --sf3d-python backend/.venv-sf3d/bin/python --sf3d-device cpu
```

The bridge expects your existing `backend.cli` and `backend.sketch_refiner` in the same repository. Ensure SF3D_SOURCE, SF3D_MODEL_DIR, HF_HOME, TORCH_HOME and U2NET_HOME are configured as in your working photo-to-3D setup.

**Do not commit, push or merge until the isolated test passes.** This package does not include model weights or your SF3D implementation.

## Integrated isolated pipeline

Run from the repository root on `mac-sketch-integration`. The runner imports
`sketch2shape_mac_m4.backend.sketch_refiner` in the sketch interpreter, then calls
the existing `backend.cli` in the separate 3D interpreter. SF3D remains CPU by
default; `--engine triposr` selects the existing fallback explicitly. Photo-only
`backend.cli` and backend selection are unchanged. No frontend modifications.

### Mac setup (Python 3.11)

```bash
python3.11 -m venv sketch2shape_mac_m4/.venv
sketch2shape_mac_m4/.venv/bin/python -m pip install -r sketch2shape_mac_m4/requirements-sketch.txt
export SKETCH_PYTHON="$PWD/sketch2shape_mac_m4/.venv/bin/python"
export SF3D_PYTHON="$PWD/backend/.venv-sf3d/bin/python"
export HF_HOME="$PWD/sketch2shape_mac_m4/.cache/huggingface"
```

Keep the existing working SF3D source/model settings from `backend/README.md`.
Do not install these sketch dependencies in that environment. Torch 2.5.1 is a
proposed Apple Silicon version, not the old CUDA-only 2.11+cu128 pin. Actual Mac
MPS inference still requires testing; unsupported operators are errors, with no
fake PNG/GLB fallback. CPU generators provide seeded noise; inference uses MPS.

Download official weights explicitly after reviewing their model cards/licenses
and configuring any required Hugging Face access locally:

```bash
sketch2shape_mac_m4/.venv/bin/huggingface-cli download lllyasviel/control_v11p_sd15_scribble
sketch2shape_mac_m4/.venv/bin/huggingface-cli download stable-diffusion-v1-5/stable-diffusion-v1-5
```

The ControlNet loader uses the regular safetensors checkpoint cast to float16;
it does not assume that ControlNet supplies an `fp16` variant. The SD1.5 pipeline
uses its fp16 variant and retains the pretrained safety checker. First inference
may need further cached components; only claim offline readiness after a real
successful local run. No weights are downloaded by tests.

### One command: sketch → realistic PNG → textured GLB

```bash
python sketch2shape_mac_m4/local_sketch_to_3d.py /absolute/path/to/sketch.png --prompt "a white ceramic mug"
```

Omit `--prompt` to use the refiner's existing generic object prompt. A supplied
prompt is used by SD1.5/ControlNet; it is not falsely claimed as SF3D text
conditioning. The runner retains the generated PNG and diagnostic artifacts,
checks the returned PNG path is inside its output directory, stops if refinement
fails, then invokes genuine SF3D reconstruction. Outputs use unique directories.
`--dry-run` prints commands without loading models; it does not verify inference.

```bash
python -m unittest discover -s sketch2shape_mac_m4/tests -v
```

Current offline tests mock subprocess execution: isolation/command construction
and failed-refinement short-circuiting pass. They do not prove model inference.
Still required on Mac M4: install/wheel compatibility, MPS availability, actual
ControlNet and SD1.5 weight loading, unsupported-operation/float16 behavior,
nonuniform 512×512 PNG generation, prompt adherence/silhouette preservation,
SF3D checkpoint loading, final GLB/material inspection, memory/runtime, and a
full end-to-end run. Test photo-only reconstruction separately as a regression.
For model-access errors fix cache/network/authentication; for MPS errors inspect
the exception cause rather than disabling checks or substituting an image.
