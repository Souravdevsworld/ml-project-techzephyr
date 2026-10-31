param(
    [ValidateSet('auto', 'cuda', 'cpu')]
    [string]$Device = 'cuda'
)
$ErrorActionPreference = 'Stop'
$ProjectRoot = Split-Path $PSScriptRoot -Parent
$UiPython = Join-Path $ProjectRoot '.venv-ui\Scripts\python.exe'
$MlPython = Join-Path $ProjectRoot '.venv-ml\Scripts\python.exe'
$TripoDirectory = Join-Path $ProjectRoot 'work\TripoSR'
foreach ($RequiredPath in @($UiPython, $MlPython, (Join-Path $TripoDirectory 'run.py'))) {
    if (-not (Test-Path $RequiredPath)) {
        throw "Missing $RequiredPath. Run scripts\setup-local-windows.ps1 first."
    }
}
$env:SKETCH_PYTHON = $MlPython
$env:TRIPOSR_PYTHON = $MlPython
$env:TRIPOSR_DIR = $TripoDirectory
$env:SKETCH2SHAPE_DEVICE = $Device
$env:SKETCH2SHAPE_LOW_MEMORY = 'true'
$env:SKETCH2SHAPE_MESH_BACKEND = 'skimage'
$env:TRIPOSR_CHUNK_SIZE = '256'
$env:SKETCH_TIMEOUT_SECONDS = '7200'
$env:PIPELINE_3D_TIMEOUT_SECONDS = '7200'
$env:TRIPOSR_TIMEOUT_SECONDS = '7200'
Push-Location $ProjectRoot
try {
    & $UiPython app.py --device $Device --low-memory
    if ($LASTEXITCODE -ne 0) { throw "Application exited with code $LASTEXITCODE." }
} finally {
    Pop-Location
}
