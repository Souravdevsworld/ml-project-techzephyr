# Windows setup: RTX 2050 / 4 GB VRAM, or CPU

The reported error was caused by `ModuleNotFoundError: No module named 'torch'` inside the UI environment. It occurred before GPU detection or model loading. Installing `requirements.txt` opens the interface only; it intentionally does not install PyTorch. Set up a second ML environment and point both workers at it.

The user's NVIDIA output shows an RTX 2050 with **4096 MiB VRAM** and driver 581.57. This is separate from the reported **8 GB system RAM**. The driver recognizes the GPU; it does not prove that CUDA-enabled PyTorch or the models are installed. The CUDA version displayed by `nvidia-smi` is the maximum supported by the driver, not proof of an installed PyTorch CUDA runtime.

## Update the detached preview checkout

Stop the app with Ctrl+C first. In PowerShell:

```powershell
cd C:\Users\soura\sketch2shape-preview
git fetch origin
git switch --detach origin/codex/sketch2shape-app
```

If Git reports local modifications, stop and preserve them before switching. Do not reset or clean the directory. The original `ml-project-techzephyr` checkout and its saved development work are separate from this preview worktree.

## Recommended attempt: use the existing RTX 2050

From the updated preview directory:

```powershell
powershell -ExecutionPolicy Bypass -File .\scripts\setup-local-windows.ps1 -Device cuda -Launch
```

The script:

1. Creates `.venv-ui` and `.venv-ml` if needed.
2. Installs Gradio/UI requirements in `.venv-ui`.
3. Installs CUDA 12.8 PyTorch 2.11.0 in `.venv-ml` if PyTorch is missing. Existing worker PyTorch is preserved; the doctor must verify that it supports the requested device.
4. Installs the pinned model dependencies using `backend/requirements-local.txt`.
5. Clones the pinned official TripoSR code under `work/TripoSR` if absent. An existing checkout is not reset or overwritten.
6. Uses scikit-image's real CPU marching cubes for the model's predicted density field, so a `torchmcubes` CUDA/C++ build is unnecessary. The original TripoSR neural network and vertex colors still generate the model.
7. Checks dependencies and the chosen device, then launches with the correct worker interpreter paths.

Open `http://127.0.0.1:7860`. First generation downloads the actual model weights, which require several GB of disk space and model-host access.

The local profile starts at **12 diffusion steps**, **mesh resolution 64**, **TripoSR chunk size 256**, and **sequential CPU offload** for diffusion on CUDA. This reduces VRAM pressure and may lower detail/increase runtime. All stages still run sequentially. Eight GB of system RAM remains tight: this is an attempt to fit the models, not a tested guarantee on this laptop. Close other memory-heavy applications before trying.

For later starts, no installation is needed:

```powershell
powershell -ExecutionPolicy Bypass -File .\scripts\start-local-windows.ps1 -Device cuda
```

If an existing ML environment contains CPU-only PyTorch and you explicitly want to replace it with CUDA PyTorch, use:

```powershell
.\.venv-ml\Scripts\python.exe -m pip install --force-reinstall torch==2.11.0 --index-url https://download.pytorch.org/whl/cu128
```

This replacement is deliberate, not performed automatically on an already-installed PyTorch by the setup script.

## CPU mode: no GPU required, but not a cure for low system RAM

On a machine with enough RAM:

```powershell
powershell -ExecutionPolicy Bypass -File .\scripts\setup-local-windows.ps1 -Device cpu -Launch
```

Or, after setup:

```powershell
powershell -ExecutionPolicy Bypass -File .\scripts\start-local-windows.ps1 -Device cpu
```

CPU diffusion uses FP32 and no CUDA/offload calls; mesh extraction also works on CPU. A GPU is not required by this mode. However, the same large neural models still need substantial RAM and run much more slowly. **Do not assume the full sketch pipeline will fit in 8 GB system RAM.** A machine with more RAM, or running the UI and workers on a larger GPU host, may be necessary. Removing the CUDA check does not remove model memory requirements. There is no placeholder or canned geometry fallback.

`auto` selects CUDA if available and otherwise CPU. An explicit `cuda` selection fails clearly if CUDA-enabled PyTorch/driver support is unavailable; it does not silently retry on CPU after an OOM.

## Diagnose a failed request

Each error now identifies the stage and exact local job log. For the latest refinement log:

```powershell
Get-ChildItem .\outputs\jobs -Filter refine.log -Recurse | Sort-Object LastWriteTime -Descending | Select-Object -First 1 | Get-Content -Tail 50
```

For reconstruction failures, replace `refine.log` with `reconstruct.log`. Errors distinguish missing/incompatible ML packages, unavailable explicitly selected CUDA, and memory failures when they can be classified; the full traceback remains in the local log.

Run the runtime check separately if needed:

```powershell
$env:SKETCH_PYTHON = (Resolve-Path .\.venv-ml\Scripts\python.exe).Path
$env:TRIPOSR_PYTHON = $env:SKETCH_PYTHON
$env:TRIPOSR_DIR = (Resolve-Path .\work\TripoSR).Path
$env:SKETCH2SHAPE_MESH_BACKEND = 'skimage'
.\.venv-ui\Scripts\python.exe -m backend.doctor --device cuda
```

Successful diagnostics check packages/device, not weight access, full inference, semantic output quality, or whether the full job fits in laptop memory. This change has not been acceptance-tested on an RTX 2050 or Windows here.
