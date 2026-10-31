# Sketch2Shape backend: TripoSR

The public contract remains `generate_3d(image_path: str, prompt: str | None = None) -> str`.
It invokes the official TripoSR `run.py` using this process's Python interpreter,
then copies `0/mesh.glb` into repository `outputs/sketch2shape_<uuid>.glb` and
returns its absolute path only after existing mesh validation passes. `prompt`
is accepted and logged as unused; it does not affect image-conditioned inference.
No fal client, key, paid API, training, or fallback geometry is used.

## Lightweight local setup and offline tests

Python 3.10+; do not overwrite an existing environment:

```powershell
py -3 -m venv backend/.venv
backend/.venv/Scripts/python.exe -m pip install -r backend/requirements.txt
backend/.venv/Scripts/python.exe -m compileall -q backend
backend/.venv/Scripts/python.exe -m unittest discover -s backend/tests -v
```

These dependencies are only Pillow, NumPy and trimesh. Tests mock subprocess
execution and use clearly identified synthetic fixtures. Imports/tests never
load or download model weights. GPU dependencies belong in Colab, not this local
lightweight environment. Previously installed fal/httpx packages can remain in an
existing environment but are no longer imported or required.

## Launch Colab and obtain the first real GLB

1. Open https://colab.research.google.com/ and choose **File > Upload notebook**.
   Select `notebooks/Sketch2Shape_TripoSR.ipynb` from this checkout.
2. Choose **Runtime > Change runtime type > T4 GPU** (or another CUDA GPU).
3. Make a **new** ZIP from this updated checkout containing `backend/`, `examples/`
   and the canonical notebook in `notebooks/`. Do not reuse the old
   `sketch2shape_colab.zip` unless regenerated with these updates. Exclude environments,
   `__pycache__`, `.git`, outputs and secrets. Run cells in order and upload the ZIP.
   Windows backslashes are normalized safely; extraction uses a fresh directory
   and rejects traversal, symlinks and duplicate normalized paths. Alternatively set
   `SOURCE_MODE = "drive"` and `DRIVE_PROJECT` to your project folder on Drive.
   Since these changes may be untracked, a Git archive alone may omit them.
4. The notebook checks Python/PyTorch/CUDA, clones official TripoSR, installs
   GPU inference dependencies without replacing Colab's torch, and checks imports
   and the CUDA marching-cubes extension. Any failure stops with diagnostic logs.
5. In the image cell, keep `USE_UPLOADED_IMAGE = True` and upload one fresh PNG,
   JPEG or WebP containing a single object. Set it to False to use `examples/chair.png`.
6. Keep `MC_RESOLUTION = 128`, `CHUNK_SIZE = 1024`, and `REMOVE_BACKGROUND = True`
   for the first run. Run the explicit inference cell. Upstream downloads public
   `stabilityai/TripoSR` weights and background-removal weights on first use.
   No token is embedded or required. Allow time for downloads and compilation.
7. The notebook calls the unchanged backend interface, validates the actual GLB,
   and prints its absolute path, mesh counts and elapsed time. Finally click
   **Download validated GLB**. Inspect the file in a GLB viewer for visual quality.

The notebook is a direct batch workflow: no tunnel, web UI, server or endpoint.
The user generated and downloaded a real GLB in `Sketch2Shape_TripoSR_new.ipynb`;
that experimental notebook is preserved unchanged. The consolidated revision
passed offline tests but has not been rerun on a GPU here. Export success does
not establish shape fidelity.

## Compatible Colab dependencies

The confirmed experiment used Python **3.12.13**, PyTorch built for CUDA **12.8**,
Transformers **4.40.2**, Tokenizers **0.19.1**, Hugging Face Hub **0.25.2**, and
compiled torchmcubes. The exact torch version was not supplied, so the notebook
keeps and prints the installed version rather than inventing a pin. It checks
CUDA availability and matching toolkit/PyTorch CUDA major versions, warns if the
environment differs, and never reinstalls torch or CUDA. The three Hugging Face
versions are pinned in `requirements-colab.txt`; the other packages form a
compatibility recipe, not a fully locked copy of the experimental environment.

The notebook runs these commands using its own Python interpreter:

```bash
python -m pip install setuptools wheel ninja cmake packaging scikit-build-core pybind11
python -m pip install -c /tmp/sketch2shape-torch-constraint.txt -r backend/requirements-colab.txt
python -m pip install --no-deps --no-build-isolation --no-cache-dir --force-reinstall git+https://github.com/tatsy/torchmcubes.git
```

The constraint file is generated with `torch==<installed version>`. The notebook
sets `CUDA_HOME`, `TORCH_CUDA_ARCH_LIST` and `MAX_JOBS=2` for the extension build.
`scikit-build-core` and `pybind11` address missing build tools from the failed
initial setup. Package version checks and a tiny CUDA marching-cubes smoke test
run before model inference. Do not install upstream's older requirements over
this setup. Fresh subprocesses avoid stale kernel imports after installation.

## Existing integration / other GPU environments

Install upstream dependencies in the same Python environment used by this
backend; set `TRIPOSR_DIR` to a trusted official checkout containing `run.py`:

```python
import os
os.environ["TRIPOSR_DIR"] = "/content/TripoSR"
from backend.generator import generate_3d
local_glb = generate_3d("examples/chair.png")
```

Or explicitly run `python -m backend.generator examples/chair.png` there.
No inference occurs during import. Each call starts a fresh model process;
there is a configurable 30-minute default timeout and no automatic retry. Upstream progress/errors
appear in the console. Failed runs remove temporary output, and no path is
returned for missing/invalid geometry. Existing validation checks finite vertices,
nonempty triangles and positive scene width/height/depth; watertightness is not
required. This checks geometry, not resemblance or production readiness.

The public signature is unchanged. Settings are read at call time:

| Environment variable | Default | Accepted values |
| --- | --- | --- |
| `TRIPOSR_DIR` | required | Trusted checkout with `run.py` |
| `TRIPOSR_MC_RESOLUTION` | `128` | Integer 16–512 |
| `TRIPOSR_CHUNK_SIZE` | `1024` | Integer 1–65536 |
| `TRIPOSR_REMOVE_BG` | `true` | `true`/`false` or `1`/`0` |
| `TRIPOSR_TIMEOUT_SECONDS` | `1800` | Integer 1–86400 |

To reproduce the successful low-memory diagnostic configuration:

```python
os.environ.update({
    "TRIPOSR_MC_RESOLUTION": "128",
    "TRIPOSR_CHUNK_SIZE": "1024",
    "TRIPOSR_REMOVE_BG": "false",  # diagnostic mode, not a fidelity recommendation
})
local_glb = generate_3d("examples/chair.png")
```

The backend pre-creates temporary output `0/` in both modes: upstream otherwise
skips that directory creation with `--no-remove-bg`. Each run uses an isolated
directory so a stale GLB cannot be returned as a new result.

The local frontend needs an accessible GPU-backed runtime to perform synchronous
generation. A local process cannot access Colab's Python interpreter or local
paths through `TRIPOSR_DIR`. This milestone supports manual notebook generation
and GLB download only; frontend transport, jobs and file transfer remain future
integration work. Run blocking generation in a worker if integrating an async app.

## Attribution and limitations

[TripoSR](https://github.com/VAST-AI-Research/TripoSR), developed by Tripo AI and
Stability AI, and the public [pretrained weights](https://huggingface.co/stabilityai/TripoSR)
are released under MIT. Preserve upstream license/attribution when distributing.
The model reconstructs from a single image, primarily object images; sparse line
sketches, occlusion and complex backgrounds can produce poor or ambiguous shapes.
The diagnostic chair had poor fidelity. No weights have been trained or modified
and no fidelity improvement has been demonstrated. Background removal defaults to
enabled, but segmentation can damage thin sketch lines too. Compare modes on the
same image; when removal is disabled, upstream expects a properly sized RGB
foreground on gray, not an unprocessed white canvas. Increasing mesh resolution
can add detail but cannot correct an incorrectly inferred shape and can exhaust
memory. Chunk size controls evaluation memory/speed, not model understanding.
Upstream defaults need about 6 GB VRAM. Colab free GPU availability and session
lifetime are limited; downloads/results disappear on reset unless saved. Upstream
may fall back to slow CPU execution without CUDA; the notebook rejects that
configuration before inference. Input limit is 20 MiB PNG/JPEG/WebP. Outputs use
vertex colors by default, not an explicitly baked texture atlas. No ControlNet
or training is included. Do not commit model weights, generated files or secrets.
