"""Structural interface shared by engine adapters, not the frontend contract."""
from typing import Protocol


class GenerationBackend(Protocol):
    def generate_report(self, image_path, prompt=None, *, preprocessing=None, output_dir=None) -> dict:
        ...

    def close(self) -> None:
        ...
