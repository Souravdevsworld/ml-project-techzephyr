param(
    [ValidateSet('cuda', 'cpu')]
    [string]$Device = 'cuda',
    [switch]$Launch
)
$ErrorActionPreference = 'Stop'
$ProjectRoot = Split-Path $PSScriptRoot -Parent
. (Join-Path $PSScriptRoot 'local-storage-windows.ps1')
function Invoke-Checked {
    param([string]$Program, [string[]]$CommandArguments)
    & $Program @CommandArguments
    if ($LASTEXITCODE -ne 0) {
        throw "$Program failed with exit code $LASTEXITCODE. Stop here and inspect the error above."
    }
}
Push-Location $ProjectRoot
try {
    if (-not (Test-Path '.venv-ui\Scripts\python.exe')) {
        Invoke-Checked -Program 'py' -CommandArguments @('-3.12', '-m', 'venv', '.venv-ui')
    }
    if (-not (Test-Path '.venv-ml\Scripts\python.exe')) {
        Invoke-Checked -Program 'py' -CommandArguments @('-3.12', '-m', 'venv', '.venv-ml')
    }
    $UiPython = (Resolve-Path '.venv-ui\Scripts\python.exe').Path
    $MlPython = (Resolve-Path '.venv-ml\Scripts\python.exe').Path
    Invoke-Checked -Program $UiPython -CommandArguments @('-m', 'pip', 'install', '--no-cache-dir', '-r', 'requirements.txt')
    & $MlPython -c "import importlib.util; raise SystemExit(0 if importlib.util.find_spec('torch') else 1)"
    if ($LASTEXITCODE -ne 0) {
        $TorchIndex = if ($Device -eq 'cuda') { 'https://download.pytorch.org/whl/cu128' } else { 'https://download.pytorch.org/whl/cpu' }
        Invoke-Checked -Program $MlPython -CommandArguments @('-m', 'pip', 'install', '--no-cache-dir', 'torch==2.11.0', '--index-url', $TorchIndex)
    } else {
        Write-Host 'Keeping the installed worker PyTorch; the device check below must pass.'
    }
    Invoke-Checked -Program $MlPython -CommandArguments @('-m', 'pip', 'install', '--no-cache-dir', '-r', 'backend/requirements-local.txt')
    New-Item -ItemType Directory -Force -Path 'work' | Out-Null
    if (-not (Test-Path 'work\TripoSR')) {
        Invoke-Checked -Program 'git' -CommandArguments @('clone', 'https://github.com/VAST-AI-Research/TripoSR.git', 'work/TripoSR')
        Invoke-Checked -Program 'git' -CommandArguments @('-C', 'work/TripoSR', 'checkout', '107cefdc244c39106fa830359024f6a2f1c78871')
    }
    if (-not (Test-Path 'work\TripoSR\run.py')) {
        throw 'work\TripoSR exists but has no run.py. Inspect that directory before proceeding.'
    }
    $env:SKETCH_PYTHON = $MlPython
    $env:TRIPOSR_PYTHON = $MlPython
    $env:TRIPOSR_DIR = (Resolve-Path 'work\TripoSR').Path
    $env:SKETCH2SHAPE_DEVICE = $Device
    $env:SKETCH2SHAPE_LOW_MEMORY = 'true'
    $env:SKETCH2SHAPE_MESH_BACKEND = 'skimage'
    Invoke-Checked -Program $MlPython -CommandArguments @('-m', 'pip', 'check')
    Invoke-Checked -Program $UiPython -CommandArguments @('-m', 'backend.doctor', '--device', $Device)
    Write-Host 'Dependency/device checks passed. Model weights will download on the first generation.'
    Write-Host 'These checks do not establish that a complete model run fits in your RAM/VRAM.'
    if ($Launch) {
        & (Join-Path $PSScriptRoot 'start-local-windows.ps1') -Device $Device
    } else {
        Write-Host "Start later: powershell -ExecutionPolicy Bypass -File .\scripts\start-local-windows.ps1 -Device $Device"
    }
} finally {
    Pop-Location
}
