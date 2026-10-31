"""Strict, lazy engine selection. Typos never silently select another model."""
import os
import logging

_ENGINES = {}
SUPPORTED_ENGINES = ('triposr', 'sf3d')


def selected_engine(override=None):
    name = override if override is not None else os.environ.get('SKETCH2SHAPE_3D_BACKEND', 'triposr')
    if not isinstance(name, str) or name.strip().lower() not in SUPPORTED_ENGINES:
        raise ValueError('SKETCH2SHAPE_3D_BACKEND must be triposr or sf3d.')
    return name.strip().lower()


def fallback_enabled(engine, override=None):
    value = os.environ.get('SKETCH2SHAPE_3D_FALLBACK', 'error')
    if value not in {'error', 'triposr'}:
        raise ValueError('SKETCH2SHAPE_3D_FALLBACK must be error or triposr.')
    if override is not None and type(override) is not bool:
        raise ValueError('fallback override must be a boolean or None.')
    return engine == 'sf3d' and (value == 'triposr' if override is None else override)


def get_backend(name):
    name = selected_engine(name)
    if name not in _ENGINES:
        if name == 'triposr':
            from .triposr_backend import TripoSRBackend
            _ENGINES[name] = TripoSRBackend()
        else:
            from .sf3d_backend import SF3DBackend
            _ENGINES[name] = SF3DBackend()
    return _ENGINES[name]


def release_inactive(active):
    """Keep only one loaded engine to limit peak unified-memory use on Macs."""
    for name, backend in list(_ENGINES.items()):
        if name != active:
            backend.close()


def close_backends():
    # Called while holding the dispatch lock, so no model runs overlap shutdown.
    try:
        for backend in list(_ENGINES.values()):
            try:
                backend.close()
            except Exception:
                logging.getLogger(__name__).exception('Failed to stop a backend worker')
    finally:
        _ENGINES.clear()
