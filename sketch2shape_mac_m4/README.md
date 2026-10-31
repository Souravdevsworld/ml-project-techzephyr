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
