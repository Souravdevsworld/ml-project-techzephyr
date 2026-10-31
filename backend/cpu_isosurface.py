"""Real CPU marching cubes for TripoSR density grids, without a CUDA extension.

Implements the small helper interface used by the pinned upstream tsr.system.
The neural network and its predicted density/vertex colors remain upstream.
"""
import numpy as np
from skimage.measure import marching_cubes
import torch
from torch import nn


class MarchingCubeHelper(nn.Module):
    points_range = (0, 1)

    def __init__(self, resolution):
        super().__init__()
        self.resolution = resolution
        self._grid_vertices = None

    @property
    def grid_vertices(self):
        if self._grid_vertices is None:
            axes = [torch.linspace(0, 1, self.resolution) for _ in range(3)]
            self._grid_vertices = torch.stack(torch.meshgrid(*axes, indexing="ij"), dim=-1).reshape(-1, 3)
        return self._grid_vertices

    def forward(self, level):
        volume = -level.detach().reshape((self.resolution,) * 3).float().cpu().numpy()
        vertices, faces, _, _ = marching_cubes(volume, level=0.0)
        # skimage returns indices in volume-axis order, which already matches
        # our ij-indexed xyz grid. The upstream torchmcubes xyz swap is unneeded.
        vertices = np.ascontiguousarray(vertices / (self.resolution - 1), dtype=np.float32)
        faces = np.ascontiguousarray(faces, dtype=np.int64)
        return torch.from_numpy(vertices).to(level.device), torch.from_numpy(faces).to(level.device)
