"""Conservative photo preparation; no TripoSR or frontend imports.

Segmentation is evidence about an image, not ground truth. Invalid/suspicious
masks fall back to the untouched baseline image, never a fabricated cutout.
"""
from collections import OrderedDict
from dataclasses import asdict, dataclass
import hashlib
import json
import logging
import math
import os
from pathlib import Path
import time
import uuid

import numpy as np
from PIL import Image, ImageDraw, ImageOps

log = logging.getLogger(__name__)
BACKEND = Path(__file__).resolve().parent


@dataclass(frozen=True)
class PreprocessOptions:
    mode: str = 'baseline'
    foreground_ratio: float = 0.85
    background: tuple[int, int, int] = (127, 127, 127)
    center_foreground: bool = True
    segmentation_model: str = 'u2net'
    debug: bool = False
    debug_dir: str = str(BACKEND / 'debug')

    def __post_init__(self):
        if self.mode not in {'baseline', 'photo', 'auto', 'none'}:
            raise ValueError('TRIPOSR_PREPROCESS_MODE must be baseline, photo, auto, or none.')
        if not isinstance(self.foreground_ratio, (float, int)) or isinstance(self.foreground_ratio, bool) or not math.isfinite(self.foreground_ratio) or not 0.1 <= self.foreground_ratio <= 0.95:
            raise ValueError('TRIPOSR_FOREGROUND_RATIO must be finite and between 0.10 and 0.95.')
        if len(self.background) != 3 or any(type(x) is not int or not 0 <= x <= 255 for x in self.background):
            raise ValueError('TRIPOSR_BACKGROUND must contain three integer RGB values in 0..255.')
        if self.segmentation_model not in {'u2net', 'u2netp'}:
            raise ValueError('TRIPOSR_SEGMENTATION_MODEL must be u2net or u2netp.')
        if type(self.center_foreground) is not bool or type(self.debug) is not bool:
            raise ValueError('Preprocessing debug/center settings must be booleans.')
        if not isinstance(self.debug_dir, str) or not self.debug_dir.strip():
            raise ValueError('TRIPOSR_DEBUG_DIR must be a nonempty path.')

    @classmethod
    def from_env(cls):
        def flag(name, default):
            value = os.environ.get(name, default)
            if value not in {'0', '1'}:
                raise ValueError(f'{name} must be 0 or 1.')
            return value == '1'
        try:
            background = tuple(int(x.strip()) for x in os.environ.get('TRIPOSR_BACKGROUND', '127,127,127').split(','))
        except ValueError as exc:
            raise ValueError('TRIPOSR_BACKGROUND must be comma-separated RGB integers.') from exc
        try:
            ratio = float(os.environ.get('TRIPOSR_FOREGROUND_RATIO', '0.85'))
        except ValueError as exc:
            raise ValueError('TRIPOSR_FOREGROUND_RATIO must be a finite number in 0.10..0.95.') from exc
        return cls(
            mode=os.environ.get('TRIPOSR_PREPROCESS_MODE', 'baseline'),
            foreground_ratio=ratio,
            background=background,
            center_foreground=flag('TRIPOSR_CENTER_FOREGROUND', '1'),
            segmentation_model=os.environ.get('TRIPOSR_SEGMENTATION_MODEL', 'u2net'),
            debug=flag('TRIPOSR_PREPROCESS_DEBUG', '0'),
            debug_dir=os.environ.get('TRIPOSR_DEBUG_DIR', str(BACKEND / 'debug')),
        )

    @classmethod
    def from_dict(cls, values):
        values = dict(values)
        if 'background' in values:
            values['background'] = tuple(values['background'])
        return cls(**values)


@dataclass
class PreparedImage:
    image: Image.Image
    metadata: dict


class RembgSegmenter:
    """CPU ONNX sessions and a small, bounded mask cache, loaded on demand."""
    def __init__(self):
        self.sessions = {}
        self.masks = OrderedDict()
        self.failures = {}
        self.last_legacy_metrics = {}

    def _session(self, model):
        started = time.perf_counter()
        if model in self.sessions:
            return self.sessions[model], 0.0
        if model in self.failures and time.monotonic() < self.failures[model]:
            raise RuntimeError('Segmentation session initialization recently failed; retry after 60 seconds or restart the worker.')
        try:
            import rembg
            session = rembg.new_session(model, providers=['CPUExecutionProvider'])
        except Exception:
            # Bounded by the two permitted model names; avoid repeated failed
            # downloads/session initialization for every ratio in an evaluation.
            self.failures[model] = time.monotonic() + 60
            raise
        self.sessions[model] = session
        self.failures.pop(model, None)
        return session, time.perf_counter() - started

    def segment(self, image, model):
        key = (model, image.size, hashlib.sha256(image.tobytes()).hexdigest())
        if key in self.masks:
            self.masks.move_to_end(key)
            return self.masks[key].copy(), {'segmentation_model_loading_seconds': 0.0, 'segmentation_seconds': 0.0, 'mask_cached': True}
        # Loading timing includes rembg import and ONNX session initialization.
        started = time.perf_counter()
        session, loaded = self._session(model)
        loading_seconds = time.perf_counter() - started if loaded else 0.0
        import rembg
        started = time.perf_counter()
        mask = rembg.remove(image.convert('RGB'), session=session, only_mask=True,
                            alpha_matting=False, post_process_mask=False).convert('L')
        segmentation_seconds = time.perf_counter() - started
        self.masks[key] = mask.copy()
        while len(self.masks) > 2:
            self.masks.popitem(last=False)
        return mask, {'segmentation_model_loading_seconds': loading_seconds,
                      'segmentation_seconds': segmentation_seconds, 'mask_cached': False}

    def legacy_remove(self, image):
        session, loading_seconds = self._session('u2net')
        import rembg
        started = time.perf_counter()
        result = rembg.remove(image, session=session)
        self.last_legacy_metrics = {'segmentation_model_loading_seconds': loading_seconds,
                                    'segmentation_seconds': time.perf_counter() - started}
        return result


def baseline(image, remove_background=False, segmenter=None):
    """Pixel-compatible previous runtime.prepare, including its legacy opt-in."""
    if remove_background:
        from tsr.utils import resize_foreground
        image = resize_foreground(segmenter.legacy_remove(image), 0.85)
        rgba = np.asarray(image).astype(np.float32) / 255
        image = Image.fromarray((255 * (rgba[:, :, :3] * rgba[:, :, 3:] + .5 * (1-rgba[:, :, 3:]))).astype(np.uint8))
    else:
        bg = Image.new('RGBA', image.size, (128, 128, 128, 255))
        bg.alpha_composite(image)
        image = bg.convert('RGB')
    return ImageOps.pad(image, (512, 512), color=(128, 128, 128))


def validate_mask(mask, size):
    """Conservative diagnostics, no erosion/closing or hole filling."""
    from skimage.measure import label
    values = np.asarray(mask)
    reasons = []
    metrics = {}
    if values.ndim != 2 or values.shape != (size[1], size[0]):
        return {'valid': False, 'reasons': ['mask_shape_mismatch'], 'metrics': metrics, 'bbox': None}
    if not np.isfinite(values).all() or values.min() < 0 or values.max() > 255:
        return {'valid': False, 'reasons': ['mask_values_invalid'], 'metrics': metrics, 'bbox': None}
    core = values >= 128
    support = values >= 8
    count = int(core.sum())
    area = count / values.size
    metrics['foreground_area_fraction'] = area
    metrics['uncertain_area_fraction'] = float(np.mean((values >= 8) & (values < 128)))
    if metrics['uncertain_area_fraction'] > 0.25:
        reasons.append('excessive_uncertain_background')
    if count == 0:
        reasons.append('mask_empty_or_no_confident_foreground')
    elif area < 0.005:
        reasons.append('foreground_too_small')
    elif area > 0.95:
        reasons.append('excessive_foreground_or_background_leakage')
    border = np.concatenate((values[0], values[-1], values[:, 0], values[:, -1]))
    metrics['border_foreground_fraction'] = float(np.mean(border >= 32))
    if (border >= 32).any():
        reasons.append('foreground_touches_image_edge')
    labels, components = label(values >= 32, connectivity=2, return_num=True)
    areas = np.bincount(labels.ravel())[1:]
    metrics['component_count'] = int(components)
    metrics['largest_component_fraction'] = float(areas.max() / areas.sum()) if areas.size else 0.0
    tiny = areas[areas < max(4, values.size * 0.0001)]
    metrics['tiny_component_fraction'] = float(tiny.sum() / areas.sum()) if areas.size else 0.0
    if areas.size and (metrics['largest_component_fraction'] < 0.9 or
                       (components > 32 and metrics['tiny_component_fraction'] > 0.01)):
        reasons.append('fragmented_or_noisy_mask')
    bbox = None
    if support.any():
        y, x = np.nonzero(support)
        # Inclusive support -> exclusive right/bottom: retain final row/column.
        bbox = [int(x.min()), int(y.min()), int(x.max())+1, int(y.max())+1]
    return {'valid': not reasons, 'reasons': reasons, 'metrics': metrics, 'bbox': bbox}


def looks_like_line_drawing(image):
    """Unvalidated routing heuristic, never an object/background threshold."""
    sample = image.convert('RGB').copy()
    sample.thumbnail((256, 256))
    rgb = np.asarray(sample)
    white = np.all(rgb >= 245, axis=2)
    black = np.all(rgb <= 55, axis=2)
    return bool(white.mean() > 0.75 and 0.001 < black.mean() < 0.18 and
                (~(white | black)).mean() < 0.08)


def composite(image, color):
    background = Image.new('RGBA', image.size, (*color, 255))
    background.alpha_composite(image)
    return background.convert('RGB')


def frame_foreground(image, bbox, options, size):
    foreground = image.crop(tuple(bbox))
    scale = options.foreground_ratio * size / max(foreground.size)
    dimensions = tuple(max(1, min(size, round(edge * scale))) for edge in foreground.size)
    # Resize premultiplied RGBA to avoid introducing color from transparent pixels.
    foreground = foreground.convert('RGBa').resize(dimensions, Image.Resampling.LANCZOS).convert('RGBA')
    canvas = Image.new('RGBA', (size, size), (0, 0, 0, 0))
    canvas.alpha_composite(foreground, ((size-dimensions[0])//2, (size-dimensions[1])//2))
    return composite(canvas, options.background)


class Preprocessor:
    def __init__(self, segmenter=None):
        self.segmenter = segmenter if segmenter is not None else RembgSegmenter()

    def process(self, path, options=None, *, legacy_remove_background=False, target_size=512):
        options = options or PreprocessOptions()
        started = time.perf_counter()
        with Image.open(path) as source:
            original = ImageOps.exif_transpose(source).convert('RGBA')
        image_io_seconds = time.perf_counter() - started
        if original.getextrema()[3][1] == 0:
            raise ValueError('Input is fully transparent; no visible object is available.')
        metadata = {
            'input_path': str(Path(path).resolve()), 'input_sha256': hashlib.sha256(Path(path).read_bytes()).hexdigest(),
            'input_size': list(original.size), 'options': asdict(options), 'effective_mode': options.mode,
            'segmentation_outcome': 'not_requested', 'warnings': [], 'mask': None,
            'timings': {'image_io_seconds': image_io_seconds, 'segmentation_model_loading_seconds': 0.0, 'segmentation_seconds': 0.0},
        }
        mask = isolated = None
        mode = options.mode
        if mode == 'auto' and original.getextrema()[3][0] == 255 and looks_like_line_drawing(original):
            mode = 'baseline'
            metadata['warnings'].append('Auto heuristic routed a possible line drawing to baseline; classification is unverified.')
        if mode in {'photo', 'auto'}:
            attempt_started = time.perf_counter()
            try:
                if original.getextrema()[3][0] < 255:
                    mask = original.getchannel('A')
                    metadata['segmentation_outcome'] = 'existing_alpha'
                else:
                    mask, metrics = self.segmenter.segment(original, options.segmentation_model)
                    metadata['timings'].update({k: v for k, v in metrics.items() if k.endswith('_seconds')})
                    if not isinstance(mask, Image.Image):
                        mask = None
                        raise ValueError('Segmenter must return a Pillow alpha mask.')
                    metadata['mask_cached'] = metrics.get('mask_cached', False)
                    metadata['segmentation_outcome'] = 'predicted_mask'
                diagnostics = validate_mask(mask, original.size)
                metadata['mask'] = diagnostics
                if not diagnostics['valid']:
                    raise ValueError('Suspicious segmentation: ' + ', '.join(diagnostics['reasons']))
                mask = mask.convert('L')
                isolated = original.copy()
                isolated.putalpha(mask)
                if options.center_foreground:
                    final = frame_foreground(isolated, diagnostics['bbox'], options, target_size)
                else:
                    final = ImageOps.pad(composite(isolated, options.background), (target_size, target_size),
                                         method=Image.Resampling.LANCZOS, color=options.background)
                metadata['effective_mode'] = 'photo'
            except Exception as exc:
                # A failed mask never replaces the source. In particular do not
                # retry legacy removal on this fallback, or the same error repeats.
                reason = f'{type(exc).__name__}: {exc}'
                log.warning('Photo preprocessing fallback to baseline: %s', reason)
                metadata['warnings'].append(reason)
                metadata['segmentation_outcome'] = 'fallback'
                metadata['effective_mode'] = 'baseline'
                final = baseline(original)
            metadata['timings']['photo_route_seconds'] = time.perf_counter() - attempt_started
        elif mode == 'none':
            final = composite(original, options.background)
            metadata['effective_mode'] = 'none'
        else:
            final = baseline(original, legacy_remove_background, self.segmenter)
            metadata['effective_mode'] = 'baseline'
            if legacy_remove_background:
                metadata['segmentation_outcome'] = 'legacy_rembg'
                metadata['timings'].update(getattr(self.segmenter, 'last_legacy_metrics', {}))
        metadata['output_size'] = list(final.size)
        metadata['timings']['preprocessing_seconds'] = time.perf_counter() - started
        metadata['debug_dir'] = None
        if options.debug:
            debug = Path(options.debug_dir).expanduser().resolve() / uuid.uuid4().hex
            debug.mkdir(parents=True, exist_ok=False)
            original.save(debug / 'original.png')
            if mask is not None:
                # Convert invalid F/I masks only for inspection; validation has
                # already rejected them and the model gets the baseline image.
                display_mask = mask.convert('L')
                display_mask.save(debug / 'alpha.png')
                cutout = original.copy()
                if mask.size == original.size:
                    cutout.putalpha(display_mask)
                    cutout.save(debug / 'foreground.png')
            annotated = original.convert('RGB')
            if metadata['mask'] and metadata['mask']['bbox']:
                ImageDraw.Draw(annotated).rectangle(tuple(metadata['mask']['bbox']), outline='lime' if metadata['mask']['valid'] else 'red', width=max(1, original.width//200))
            annotated.save(debug / 'bbox.png')
            final.save(debug / 'final.png')
            metadata['debug_dir'] = str(debug)
            metadata['timings']['debug_io_seconds'] = time.perf_counter() - started - metadata['timings']['preprocessing_seconds']
            (debug / 'metadata.json').write_text(json.dumps(metadata, indent=2, allow_nan=False))
        log.info('Preprocessing requested=%s effective=%s segmentation=%s seconds=%.3f warnings=%s',
                 options.mode, metadata['effective_mode'], metadata['segmentation_outcome'], metadata['timings']['preprocessing_seconds'], metadata['warnings'])
        return PreparedImage(final, metadata)
