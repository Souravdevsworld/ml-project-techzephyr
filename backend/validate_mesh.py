"""Validate downloaded GLB geometry without requiring a watertight surface."""

import logging
from pathlib import Path
import struct

import numpy as np
import trimesh

logger = logging.getLogger(__name__)


def validate_mesh(glb_path: str) -> dict[str, int]:
    """Raise ValueError for invalid geometry; return mesh/vertex/face counts.

    Positive volume means positive bounding extents in all three dimensions,
    not signed enclosed volume, which is unreliable for open surfaces.
    """
    path = Path(glb_path)
    if not path.is_file():
        raise ValueError("GLB file does not exist")
    with path.open("rb") as source:
        header = source.read(12)
    if len(header) != 12:
        raise ValueError("Truncated GLB header")
    magic, version, length = struct.unpack("<4sII", header)
    if magic != b"glTF" or version != 2 or length != path.stat().st_size:
        raise ValueError("Invalid GLB 2.0 header or file length")
    try:
        scene = trimesh.load(path, file_type="glb", force="scene", process=False)
    except Exception:
        raise ValueError("Could not parse GLB scene") from None
    if not isinstance(scene, trimesh.Scene):
        raise ValueError("GLB did not load as a scene")
    counts = {"meshes": 0, "vertices": 0, "faces": 0}
    for geometry in scene.geometry.values():
        if not isinstance(geometry, trimesh.Trimesh):
            raise ValueError("Scene contains non-mesh geometry")
        vertices, faces = geometry.vertices, geometry.faces
        if len(vertices) == 0 or len(faces) == 0:
            raise ValueError("Scene contains empty mesh geometry")
        if not np.isfinite(vertices).all():
            raise ValueError("Mesh contains non-finite vertices")
        if faces.min() < 0 or faces.max() >= len(vertices):
            raise ValueError("Mesh contains invalid face indices")
        if not np.any(geometry.area_faces > 0):
            raise ValueError("Mesh contains no non-degenerate triangles")
        counts["meshes"] += 1
        counts["vertices"] += len(vertices)
        counts["faces"] += len(faces)
    if not counts["meshes"] or not scene.graph.nodes_geometry:
        raise ValueError("GLB scene contains no instantiated mesh geometry")
    # Scene bounds include node transforms; collapsed transforms must fail too.
    bounds = scene.bounds
    if bounds is None or not np.isfinite(bounds).all():
        raise ValueError("Scene has invalid bounds")
    extents = bounds[1] - bounds[0]
    if not np.all(extents > 0):
        raise ValueError("Mesh must have positive width, height and depth")
    logger.info("Validated GLB: %d meshes, %d vertices, %d faces; extents=%s",
                counts["meshes"], counts["vertices"], counts["faces"], extents)
    return counts
