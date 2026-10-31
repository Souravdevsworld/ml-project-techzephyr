"""Explicit download step; never invoked automatically by the frontend."""
import argparse
import json
from pathlib import Path

from .config import Settings


def main():
    from huggingface_hub import HfApi, hf_hub_download, snapshot_download
    parser = argparse.ArgumentParser()
    parser.add_argument('--revision', default='main', help='Optional official TripoSR weight commit to pin.')
    args = parser.parse_args()
    directory = Path(Settings.from_env().model_dir)
    revision = HfApi().model_info('stabilityai/TripoSR', revision=args.revision).sha
    snapshot_download('stabilityai/TripoSR', revision=revision,
                      allow_patterns=['config.yaml', 'model.ckpt', 'README.md', 'LICENSE*'],
                      local_dir=str(directory), local_dir_use_symlinks=False)
    # Upstream constructs DINO from config; its learned weights are in model.ckpt.
    dino_revision = HfApi().model_info('facebook/dino-vitb16').sha
    hf_hub_download('facebook/dino-vitb16', 'config.json', revision=dino_revision)
    # Also cache the main ref used by upstream's unversioned config request.
    hf_hub_download('facebook/dino-vitb16', 'config.json')
    (directory / 'provenance.json').write_text(json.dumps({'model': 'stabilityai/TripoSR', 'revision': revision,
                                                        'dino_config_revision': dino_revision}, indent=2))
    print(directory.resolve())


if __name__ == '__main__':
    main()
