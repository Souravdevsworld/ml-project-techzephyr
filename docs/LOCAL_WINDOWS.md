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

## Use D: when C: has no space

The CUDA PyTorch wheel is roughly 2.8 GB before installation. Its extracted files, temporary downloads and neural model weights require additional space. Allow roughly 20 GB or more free space on the destination drive; actual use varies.

Clone the branch directly onto D: without moving existing checkouts or copying virtual environments:

```powershell
git clone --single-branch --branch codex/sketch2shape-app https://github.com/Souravdevsworld/ml-project-techzephyr.git D:\Sketch2Shape
cd D:\Sketch2Shape
powershell -ExecutionPolicy Bypass -File .\scripts\setup-local-windows.ps1 -Device cuda -Launch
```

Use a new empty destination path if `D:\Sketch2Shape` already exists. This clone has its own Git metadata on D: and does not depend on the original C: repository.

The setup and start scripts automatically configure process-local storage before Python starts:

| Content | Directory within the selected checkout |
|---|---|
| Python virtual environments | `.venv-ui`, `.venv-ml` |
| Temporary downloads and inference files | `work/tmp` |
| Hugging Face / Transformers model weights | `work/cache/huggingface` |
| Torch, rembg, Numba and Gradio caches | `work/cache/` subdirectories |
| Generated images and meshes | `outputs/jobs` |

Scripted pip installations use `--no-cache-dir` to avoid retaining an extra wheel copy. The same cache/temp configuration is applied on later starts, so a new PowerShell session does not send these downloads back to C:. This is process-local configuration, not a permanent change to your Windows user settings.

Later starts on D: use:

```powershell
cd D:\Sketch2Shape
powershell -ExecutionPolicy Bypass -File .\scripts\start-local-windows.ps1 -Device cuda
```

The scripts do not remove any existing C: caches, downloaded files, virtual environments or personal data. If C: still needs space for normal Windows operation, use Windows Storage/Temporary files cleanup separately.

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

The local profile starts at **256×256 refinement**, **CFG 1**, **12 diffusion steps**, **mesh resolution 64**, **TripoSR chunk size 256**, and **sequential CPU offload** for diffusion on CUDA. PyTorch SDPA attention is preserved on CUDA instead of replacing it with legacy sliced attention. CFG 1 avoids classifier-free guidance's doubled latent batch. Smaller refinement images reduce attention memory but may reduce fidelity; model weights still occupy the same memory. All stages run sequentially. Eight GB of system RAM remains tight: these are lower-memory settings, not a tested guarantee on this laptop.

### If refinement runs out of CUDA memory

The reported job successfully loaded all model components, then failed at the first ControlNet self-attention call in legacy `SlicedAttnProcessor` / `torch.baddbmm`. The log reported a 32 MiB CUDA allocation failure. The current update keeps memory-efficient SDPA on CUDA and adds 256/384/512 refinement-size selection with matching PNG validation and recorded settings.

Stop the app, update the D: clone, and restart (no dependency reinstall or model redownload is required):

```powershell
cd D:\Sketch2Shape
git pull --ff-only
powershell -ExecutionPolicy Bypass -File .\scripts\start-local-windows.ps1 -Device cuda
```

In Advanced settings, check **refinement image size 256**, **CFG 1**, and **Use less GPU memory**. Lowering mesh resolution only affects the later TripoSR reconstruction; it cannot fix a ControlNet/refinement OOM. Fewer diffusion steps primarily reduce runtime, not per-step attention memory. If the CUDA allocation still fails, inspect the new log before changing more settings. Do not assume CPU mode fits in 8 GB system RAM. Higher resolution or CFG can be retried after a successful run, with additional memory use.

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
