"""Portable replacement for upstream's native marching-cubes helper.

Uses the genuine predicted density volume. scikit-image reports coordinates in
array-axis order, unlike torchmcubes, so no upstream XYZ/ZYX swap is needed.
"""
import numpy as np
import torch
from skimage.measure import marching_cubes


class MarchingCubeHelper(torch.nn.Module):
    points_range = (0, 1)

    def __init__(self, resolution):
        super().__init__()
        self.resolution = resolution
        self._grid_vertices = None

    @property
    def grid_vertices(self):
        if self._grid_vertices is None:
            axis = torch.linspace(0, 1, self.resolution)
            self._grid_vertices = torch.stack(torch.meshgrid(axis, axis, axis, indexing='ij'), -1).reshape(-1, 3)
        return self._grid_vertices

    def forward(self, level):
        # Upstream supplies -(density - threshold); extract its zero crossing.
        volume = (-level).reshape((self.resolution,) * 3).detach().float().cpu().numpy()
        if not np.isfinite(volume).all() or not volume.min() < 0 < volume.max():
            raise ValueError('TripoSR density has no finite zero crossing; no mesh can be extracted.')
        vertices, faces, _, _ = marching_cubes(volume, level=0, allow_degenerate=False)
        return (torch.from_numpy(vertices.copy()).to(level.device) / (self.resolution - 1),
                torch.from_numpy(faces.astype(np.int64).copy()).to(level.device))
