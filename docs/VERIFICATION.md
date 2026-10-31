# Verification report

Date: 1 November 2026 (Asia/Kolkata). Branch: `codex/sketch2shape-app`.

## Completed checks

| Check | Actual result |
|---|---|
| Offline automated suite | **117 passed, 2 optional ML checks skipped, 19 subtests passed, 0 failed** |
| Python compilation (`app.py`, `backend`, `tests`) | Passed |
| UI environment `pip check` | No broken requirements |
| Gradio import and component initialization | Passed, Gradio **6.31.0**, 55 components |
| Actual application launch | Passed on `127.0.0.1:7860`; final smoke also passed on port 7861 |
| HTTP `/` | 200 |
| HTTP `/config` | 200, correct Sketch2Shape AI title and component configuration |
| HTTP `/gradio_api/info` | 200 |
| Live Gradio-client input submission | Existing chair sketch uploaded, pixels/settings captured and previous output slots cleared |
| Live worker failure path | Request reached actual isolated sketch worker; missing torch/runtime caused a stage-specific failure with all seven artifact slots empty |
| Runtime diagnostic | Passed for both workers in a separate Linux CPU environment with PyTorch 2.11.0+cpu and the pinned local ML stack; no model weights loaded |
| Model weight downloads | None attempted |
| Full pretrained CPU/GPU inference / fresh model-generated PNG / GLB | **Not executed; not verified** |
| Real CPU density-to-mesh extraction | Passed on an analytic ellipsoid tensor field; GLB validated and XYZ axis extents checked. This is a test fixture, not a model output. |
| Browser visual inspection | Not performed; browser tooling unavailable |

The HTTP check used the actual launched application. Constructing an unlaunched Gradio ASGI app with `TestClient` was not used as acceptance evidence. The coding sandbox initially blocked network/thread wakeups for that harness; the actual launch and requests succeeded with the tool's supported network permission. No network policy was bypassed.

## Test coverage

- Existing TripoSR generator regressions and strict GLB header/geometry validation.
- Existing notebook extraction/syntax regressions, without running notebook setup or inference.
- Canvas composite preference, background/layer assembly, alpha compositing, cleared/erased/blank/transparent canvases, corrupt and unsupported images, JPEG/PNG/WebP, file-size and pixel limits.
- PNG export, aspect ratio, immutable input/settings snapshots and prompt editing while an inference request is active.
- Real callback wiring to both queued actions, shared concurrency ID/limit, uploaded image mode using the visible upload rather than the hidden drawing.
- Sketch preprocessing and refinement before reconstruction; photo mode skipping refinement; neutral optional prompting; unique job directories and metadata.
- Per-worker environment copies without mutating process settings; failure halting downstream stages; invalid/missing/blank outputs; output containment; invalid GLB rejection; no stale model returned after a failed run.
- Pipeline-wide single-job concurrency across sessions, independent of Gradio queue admission.
- Actual harmless CPU subprocess execution, nonzero exits, missing interpreter, process-group timeout/child cleanup and shutdown of an active worker.

Model operations are mocked in offline integration tests. Mesh fixtures are synthetic boxes used strictly to exercise validation. **They are never app results or an inference fallback.**

## Commands run

The temporary test environment was placed in the ignored `work/venv/` directory:

```bash
work/venv/bin/python -m pytest -q
work/venv/bin/python -m compileall -q app.py backend tests
work/venv/bin/python -m pip check
work/venv/bin/python -m backend.doctor
work/venv/bin/python app.py --host 127.0.0.1 --port 7860
```

The UI-only environment still reports missing torch if used as an ML worker. Both diagnostic probes now pass using the separately installed CPU ML environment. This verifies package/device setup, not weight access or complete inference. The owned smoke-test server was stopped after verification. Generated failure diagnostics are ignored under `outputs/jobs/` and excluded from the source download.

## Outstanding model acceptance

1. Install/verify the documented Python 3.12 CUDA ML environment and official TripoSR checkout on the same host as the UI. Set `SKETCH_PYTHON`, `TRIPOSR_PYTHON`, and `TRIPOSR_DIR`.
2. Run `python -m backend.doctor` from the UI environment; ensure both selected-device probes pass. Confirm model-download access and adequate disk/RAM.
3. Run `python -m backend.acceptance /path/fresh-chair.png --prompt 'A wooden chair with four legs and a rectangular backrest'`.
4. Inspect the saved conditioning and refined PNG and reopen the real downloaded GLB in the application or Blender. Record whether it is recognizable and faithful. The command records hardware/timings and checks downloaded GLB bytes and geometry; it cannot judge visual fidelity.
5. Repeat with fresh mug/table sketches and an object photo if resources permit. Retain matched input, intermediate PNGs, GLB, `metadata.json`, and `acceptance.json` for judges.

No fresh output example or inference timing has been invented. The existing `examples/chair.png` is an input fixture only. Full reproduction and troubleshooting commands are in the root README.

## CPU and low-memory follow-up checks

- User-supplied Windows log: `ModuleNotFoundError: No module named torch` before model/GPU work. NVIDIA diagnostic shows RTX 2050, 4096 MiB VRAM, driver 581.57.
- UI/offline environment: **91 tests passed**, **12 subtests passed**; two optional ML checks intentionally skipped because the lightweight UI environment has no torch/skimage/Diffusers.
- Separate actual Linux CPU ML environment: **74 backend tests passed**, **12 subtests passed**, including both actual CPU meshing/runner tests; these overlap the primary suite and must not be added as a combined total.
- Installed `torch==2.11.0+cpu` plus `backend/requirements-local.txt` in the isolated CPU environment. `pip check` passes there and in the unchanged UI environment. Diffusers classes import and both doctor CPU probes pass with no CUDA and no weights.
- Tests check FP32 CPU versus FP16 CUDA configuration, automatic/explicit devices, no CUDA allocation/offload calls in the CPU path, sequential offload on low-memory CUDA, per-worker device settings, extended timeouts, dependency/error routing, and actual scikit-image extraction of synthetic density.
- The pinned official TripoSR `run.py --help` is exercised through the new runner to verify imports without downloading neural model weights.
- Windows PowerShell scripts have been reviewed but cannot be executed in this Linux environment. Actual RTX 2050 memory fit, Windows acceptance, and complete pretrained CPU/GPU inference remain unverified. CPU mode may not fit in 8 GB system RAM.

## Refinement CUDA allocation follow-up

The user supplied an actual GPU log: all seven pipeline components loaded, then the first of 12 diffusion steps failed in ControlNet self-attention (`SlicedAttnProcessor` → `torch.baddbmm`) with a 32 MiB CUDA allocation error on the RTX 2050. This is evidence of successful weight loading followed by a failed inference, not successful model generation.

The update preserves default PyTorch SDPA on CUDA, adds validated 256/384/512 refinement-size selection, and starts low-memory UI at 256px/CFG 1. Standard defaults remain 512px/CFG 7. Tests verify conditioning resize, requested size/CFG forwarding, PNG size and metadata validation, and separate CUDA versus host-memory error classification. An actual tiny random-weight ControlNet instance verifies the installed Diffusers defaults use `AttnProcessor2_0`; no pretrained weights are downloaded by this test.

Current results: **91 primary tests passed, 2 optional ML checks skipped, 12 subtests passed**; **74 backend tests and 12 subtests passed** in the separate CPU ML environment. The suites overlap. Live HTTP checks confirm low-memory UI defaults of 256px and CFG 1, and the dependency failure path still clears every artifact slot. Compilation passes. The attention change has not been acceptance-tested on a CUDA GPU here, so the reported laptop OOM is not claimed resolved until a fresh user run succeeds.

## Complete Colab frontend integration

Added a full-app Colab notebook with 14 cells, isolated UI/ML setup, guarded Python 3.12/bootstrap paths, preserved runtime CUDA torch, private proxy access by default, optional authenticated native sharing, matched-job ZIP download, logs and owned-server shutdown. The existing generation callbacks still call the original model workers on the same machine. The notebook has no local-Windows inference dependency.

Validation:

- **117 primary tests passed, 2 optional ML checks skipped, 19 subtests passed**. This includes **26 Colab orchestration and ZIP/syntax tests** without downloads or GPU allocation.
- The unchanged separate CPU backend suite previously passed **74 tests and 12 subtests**; counts overlap and are not a combined total.
- Notebook code cells parse as Python, have unique IDs and empty saved outputs. Proxy access is the default; automatic ZIP download and shutdown are disabled during Run all.
- Tests cover missing GPU, interpreter/bootstrap behavior, venv policy mismatches, preservation of installed CUDA torch, nested-kernel-venv handling, pinned upstream checkout preservation, secret-free runtime manifests, authenticated sharing arguments/guard, port collisions, own-process reuse/termination, and validation/containment of exported job artifacts. GPU/runtime behavior is mocked in these orchestration tests; they are not model acceptance tests.
- Live Linux HTTP smoke checks through `AppServer` passed for `/`, `/config`, and `/gradio_api/info`; forwarded HTTPS host handling produced the correct frontend/file root. No external share link was requested. The owned server stopped successfully.
- Python compilation and whitespace checks pass. No pretrained model weights were downloaded by these checks.

**Not executed here:** a live Google Colab GPU setup, Google's private port proxy, an external Gradio share tunnel, or full pretrained sketch→PNG→GLB inference. These require the user's actual Colab session. Setup/package checks and local HTTP behavior do not establish GPU model fit, semantic reconstruction quality or Colab quota/network availability.

Private-repository handling was verified after inspecting the connected GitHub repository metadata: the notebook defaults to ZIP upload and never assumes Colab inherits Git credentials. The existing safe ZIP extraction/syntax regressions are also run against the new notebook (including traversal, drive-path, symlink, duplicate and overwrite checks). Setup accepts an uploaded source tree without `.git`, validates its SHA-256 identity, and records ZIP identity instead of fabricating a source commit. Optional Git mode remains available only when the VM can access the repo. No GitHub token is requested by ZIP mode and repository visibility is unchanged.
