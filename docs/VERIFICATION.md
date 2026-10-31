# Verification report

Date: 1 November 2026 (Asia/Kolkata). Branch: `codex/sketch2shape-app`.

## Completed checks

| Check | Actual result |
|---|---|
| Offline automated suite | **60 passed, 12 subtests passed, 0 failed** |
| Python compilation (`app.py`, `backend`, `tests`) | Passed |
| UI environment `pip check` | No broken requirements |
| Gradio import and component initialization | Passed, Gradio **6.31.0**, 48 components |
| Actual application launch | Passed on `127.0.0.1:7860`; final smoke also passed on port 7861 |
| HTTP `/` | 200 |
| HTTP `/config` | 200, correct Sketch2Shape AI title and component configuration |
| HTTP `/gradio_api/info` | 200 |
| Live Gradio-client input submission | Existing chair sketch uploaded, pixels/settings captured and previous output slots cleared |
| Live worker failure path | Request reached actual isolated sketch worker; missing torch/runtime caused a stage-specific failure with all seven artifact slots empty |
| Runtime diagnostic | Correctly failed: no configured TripoSR installation or CUDA PyTorch in the selected worker interpreter |
| Model weight downloads | None attempted |
| Real GPU inference / fresh generated PNG / GLB | **Not executed; not verified** |
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

The diagnostic's nonzero result is expected on this CPU-only setup and is a blocker for real inference, not an automated-test failure. The owned smoke-test server was stopped after verification. Generated failure diagnostics are ignored under `outputs/jobs/` and excluded from the source download.

## Outstanding GPU acceptance

1. Install/verify the documented Python 3.12 CUDA ML environment and official TripoSR checkout on the same host as the UI. Set `SKETCH_PYTHON`, `TRIPOSR_PYTHON`, and `TRIPOSR_DIR`.
2. Run `python -m backend.doctor` from the UI environment; ensure both GPU probes pass. Confirm model-download access and adequate disk/RAM.
3. Run `python -m backend.acceptance /path/fresh-chair.png --prompt 'A wooden chair with four legs and a rectangular backrest'`.
4. Inspect the saved conditioning and refined PNG and reopen the real downloaded GLB in the application or Blender. Record whether it is recognizable and faithful. The command records hardware/timings and checks downloaded GLB bytes and geometry; it cannot judge visual fidelity.
5. Repeat with fresh mug/table sketches and an object photo if resources permit. Retain matched input, intermediate PNGs, GLB, `metadata.json`, and `acceptance.json` for judges.

No fresh output example or inference timing has been invented. The existing `examples/chair.png` is an input fixture only. Full reproduction and troubleshooting commands are in the root README.
