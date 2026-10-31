# Run the complete Sketch2Shape AI app on Google Colab

This is the simplest integration for a laptop without enough GPU/RAM: **the existing frontend and model workers run on the same Colab GPU machine**. Your laptop opens the frontend in a browser, uploads/draws the input, and downloads the generated files. It needs no local Python, CUDA, Gradio server or model weights.

Use [`notebooks/Sketch2Shape_App_Colab.ipynb`](../notebooks/Sketch2Shape_App_Colab.ipynb), rather than the older single-stage experiment notebooks. Open it in [Google Colab](https://colab.research.google.com/): **File → Open notebook → GitHub**, select `Souravdevsworld/ml-project-techzephyr`, choose branch `codex/sketch2shape-app`, and open `notebooks/Sketch2Shape_App_Colab.ipynb`. A direct Open-in-Colab link is also supplied with the implementation handoff.

## Start it

1. Select **Runtime → Change runtime type → T4 GPU**, or another suitable NVIDIA GPU, and reconnect. Colab GPU availability/quotas vary; no paid inference service is required by this code.
2. Run cells **1–3 in order**, or choose **Runtime → Run all**. The optional download/stop switches default to false, so Run all leaves the frontend running.
3. In cell 3, click **Open Sketch2Shape AI**, or use the embedded private preview. Keep the Colab runtime connected.
4. In the familiar frontend, draw/upload a sketch, optionally describe it, and click **Generate 3D Model**. A clear object photo can use **Image to 3D** to bypass diffusion.
5. Inspect original/conditioning/refined images and the interactive model. Download the validated GLB and intermediates from the frontend. First real generation downloads the pretrained weights and can take longer.
6. Optionally enable cell 4 to download a matched job ZIP. Before ending the session, save the results you need. Colab files are temporary.

Do not keep running the old Windows app for this workflow. `127.0.0.1` on your laptop cannot refer to Colab's worker or files. The notebook gives the correct browser address using Colab's port proxy or an explicitly requested share link.

## How the frontend reaches the GPU

```text
Laptop browser
    │ HTTPS: Colab session port preview (default)
    │ or password-protected temporary Gradio link (optional)
    ▼
Colab: existing Gradio app.py
    │ frozen pixels/settings → single-job queue
    ▼
Colab: sketch worker → Scribble ControlNet + SD 1.5 → refined PNG
    │ worker exits and releases its allocations
    ▼
Colab: reconstruction worker → official TripoSR → validated GLB
    │
    └── same model → browser preview and GLB download
```

All file paths used by the backend belong to the **same Colab filesystem**. Uploads travel through the actual Gradio frontend, not through a fabricated remote path. There is no second custom API framework or local-to-remote polling bridge to configure. The original model functions, preprocessing, safety checker, queue, progress, failure handling and mesh validation remain in use.

## Runtime and dependency handling

`scripts/setup_colab.py`:

- Requires an NVIDIA runtime and runs a small CUDA operation before model setup.
- Uses Python 3.12 for the known NumPy/tokenizer stack. If the notebook kernel is newer, it finds or bootstraps an isolated 3.12 interpreter; it does not replace the kernel.
- Creates an isolated `.venv-colab-ui` for current Gradio. This avoids its newer Hugging Face Hub dependency colliding with the ML pins.
- Creates `.venv-colab-ml`, reusing Colab's working CUDA PyTorch via system-site access when available. The ML pins are installed into the child environment; the notebook kernel's packages are not replaced. If no reusable CUDA torch exists, a separate supported CUDA 12.8 wheel is installed only after checking driver support.
- Constrains the installed worker torch version during ML dependency installation. It does not silently upgrade an already-working runtime torch.
- Handles missing `ensurepip` with a local virtualenv bootstrap rather than changing system packages with apt.
- Pins the official TripoSR checkout and uses the existing real scikit-image density-to-mesh helper, avoiding CUDA-extension compilation.
- Runs targeted worker dependency/device checks and upstream import/CLI checks without model-weight downloads. Unrelated inherited Colab packages are not treated as model dependencies.
- Writes only non-secret paths, worker settings, source SHA and hardware details to ignored `work/colab/runtime.json`.

The normal T4 profile starts with 512px refinement, CFG 7, 20 steps and mesh resolution 128. Model workers still run sequentially. Set `LOW_MEMORY = True` in cell 3 to select the smaller 256px/CFG 1 profile if required. GPU availability and a passing tiny CUDA check do not prove the full model pipeline fits or produces good geometry.

The setup/source cells stop on errors and preserve local source edits. Existing incompatible checkouts/environments are not reset or deleted. Rerunning cell 3 stops only the previous server object it created, then starts one app. A port collision without that handle stops with an explanation instead of killing an unknown process.

## Access options

**Private preview (`ACCESS_MODE = "proxy"`)** is the default. The notebook uses Google's normal `proxyPort`/`serve_kernel_port_as_iframe` facilities. The browser needs your Colab session. If a new tab does not work, try the embedded view. No external Gradio share link is requested.

**Temporary link (`ACCESS_MODE = "share"`)** is optional. The notebook prompts for a password of at least 12 characters without echo; username is `sketch2shape`. The password is passed in the server environment, not command arguments, source, logs or the runtime manifest. `app.py --share` refuses to start without a password. The link uses Gradio's supported sharing mechanism and expires when the application/runtime stops or the provider's limit is reached. Use it only where Colab/provider policies permit it; if unavailable, choose proxy mode. Do not treat the link as permanent hosting.

The shared link is password protected but still depends on a temporary external service. Do not distribute its password or notebook runtime state. The code does not send messages or links to other people.

## Outputs and acceptance

The app retains actual artifacts under `outputs/jobs/<id>/`: input, preprocessing images, refined PNG in sketch mode, validated `model.glb`, metadata, and worker logs. The UI viewer and GLB download point to the same validated file. Failed generations clear the displayed result and downloads.

The optional ZIP export revalidates a completed GLB and includes its actual input/images/metadata. It skips logs, symlinks and files outside the selected job. It exports the most recent **successful** job, which can predate a failed attempt; inspect the saved input and job ID. It never creates fallback geometry or presents an unsuccessful run as complete.

A real acceptance run still needs to be recorded in Colab: fresh chair sketch → generated PNG → recognizable, validated GLB → download and reopen. Then try mug/table sketches and photo mode if resources permit. Job metadata records actual hardware and elapsed times. The new notebook, proxy and full pretrained GPU pipeline have **not** been executed in a live Colab session in this coding environment; offline/local HTTP checks are not a substitute.

## Troubleshooting

| Symptom | Next action |
|---|---|
| No NVIDIA runtime | Select T4 GPU and reconnect. Free GPU availability is not guaranteed. |
| Runtime Python advanced beyond 3.12 | Let setup create the isolated 3.12 interpreter. If its download is blocked, use a supported runtime with Python 3.12. |
| Setup cannot use a CUDA wheel | Read the first setup error. The existing runtime torch is preserved; do not upgrade packages blindly. |
| Frontend link/iframe blocked | Verify cell 3 is still running and the runtime is connected. Use the alternate supported access mode where permitted. |
| Share link not returned | Read `work/colab/server.log`; use proxy mode instead of bypassing provider restrictions. |
| Port already in use after kernel restart | Stop the prior app through its retained server handle if available. Otherwise restart/delete the Colab runtime and rerun setup; do not kill arbitrary processes. |
| Model download fails | Check model-host access, disk space and any license/authentication requirement. No pretrained model is substituted. |
| Inference fails | Enable `SHOW_LOGS` in the final cell and inspect the stage-specific traceback. Setup success alone is not inference success. |
| Results disappear after disconnect | Colab storage is ephemeral. Download the GLB/ZIP before ending the runtime. |

Google Drive is not automatically mounted or written to. If you want persistence, save completed exports to Drive yourself using Colab's normal consent flow.
