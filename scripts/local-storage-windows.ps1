# Dot-source before starting Python so downloads and model caches use the
# project drive, including when launched from a fresh PowerShell session.
$LocalCacheRoot = Join-Path $ProjectRoot 'work\cache'
$LocalTemporaryRoot = Join-Path $ProjectRoot 'work\tmp'
$LocalHuggingFaceRoot = Join-Path $LocalCacheRoot 'huggingface'
$LocalHubRoot = Join-Path $LocalHuggingFaceRoot 'hub'
foreach ($StoragePath in @($LocalCacheRoot, $LocalTemporaryRoot, $LocalHubRoot)) {
    New-Item -ItemType Directory -Force -Path $StoragePath | Out-Null
}
$env:TEMP = $LocalTemporaryRoot
$env:TMP = $LocalTemporaryRoot
$env:PIP_CACHE_DIR = Join-Path $LocalCacheRoot 'pip'
$env:HF_HOME = $LocalHuggingFaceRoot
$env:HF_HUB_CACHE = $LocalHubRoot
$env:HUGGINGFACE_HUB_CACHE = $LocalHubRoot
$env:TRANSFORMERS_CACHE = $LocalHubRoot
$env:TORCH_HOME = Join-Path $LocalCacheRoot 'torch'
$env:U2NET_HOME = Join-Path $LocalCacheRoot 'rembg'
$env:NUMBA_CACHE_DIR = Join-Path $LocalCacheRoot 'numba'
$env:GRADIO_TEMP_DIR = Join-Path $LocalCacheRoot 'gradio'
$env:XDG_CACHE_HOME = $LocalCacheRoot
Write-Host "Model/cache storage: $LocalCacheRoot"
Write-Host "Temporary downloads: $LocalTemporaryRoot"
