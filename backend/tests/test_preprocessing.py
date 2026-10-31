"""Synthetic fixtures verify mechanics; these are not learned quality evidence."""
from dataclasses import asdict, replace
import json
import os
from pathlib import Path
import tempfile
import types
import unittest
from unittest.mock import Mock, patch

import numpy as np
from PIL import Image, ImageDraw, ImageOps

from backend.config import Settings
from backend.preprocessing import (PreprocessOptions, Preprocessor, RembgSegmenter,
                                   baseline, frame_foreground, validate_mask)


class MaskSegmenter:
    def __init__(self, mask):
        self.mask = mask
        self.calls = 0

    def segment(self, image, model):
        self.calls += 1
        return self.mask.copy(), {'segmentation_model_loading_seconds': 0.1, 'segmentation_seconds': 0.2}


class PreprocessingTests(unittest.TestCase):
    def setUp(self):
        self.directory = tempfile.TemporaryDirectory()
        self.root = Path(self.directory.name)
        self.path = self.root / 'object.png'
        self.rgb = Image.new('RGB', (160, 100), '#eeeeee')
        self.rgb.save(self.path)
        self.mask = Image.new('L', self.rgb.size)
        ImageDraw.Draw(self.mask).rectangle((40, 20, 119, 79), fill=255)
        self.segmenter = MaskSegmenter(self.mask)
        self.processor = Preprocessor(self.segmenter)
        self.photo = PreprocessOptions(mode='photo')

    def tearDown(self):
        self.directory.cleanup()

    def test_baseline_pixels_match_previous_default_path(self):
        # Reproduce original successful runtime preparation, not another new helper.
        with Image.open(self.path) as image:
            image = ImageOps.exif_transpose(image).convert('RGBA')
        old = Image.new('RGBA', image.size, (128, 128, 128, 255))
        old.alpha_composite(image)
        old = ImageOps.pad(old.convert('RGB'), (512, 512), color=(128, 128, 128))
        result = self.processor.process(self.path)
        self.assertEqual(old.tobytes(), result.image.tobytes())
        self.assertEqual(self.segmenter.calls, 0)

    def test_photo_white_on_light_background_uses_mask_not_brightness(self):
        Image.new('RGB', self.rgb.size, 'white').save(self.path)
        result = self.processor.process(self.path, self.photo)
        self.assertEqual(self.segmenter.calls, 1)
        self.assertEqual(result.metadata['effective_mode'], 'photo')
        self.assertEqual(result.image.mode, 'RGB')
        self.assertEqual(result.image.getpixel((0, 0)), (127, 127, 127))
        self.assertEqual(result.image.getpixel((256, 256)), (255, 255, 255))

    def test_rgba_existing_transparency_skips_segmentation(self):
        rgba = self.rgb.convert('RGBA')
        rgba.putalpha(self.mask)
        rgba.save(self.path)
        result = self.processor.process(self.path, self.photo)
        self.assertEqual(result.metadata['segmentation_outcome'], 'existing_alpha')
        self.assertEqual(self.segmenter.calls, 0)
        self.assertEqual(result.image.getpixel((0, 0)), (127, 127, 127))

    def test_fully_transparent_image_is_rejected(self):
        Image.new('RGBA', (30, 30), (0, 0, 0, 0)).save(self.path)
        with self.assertRaisesRegex(ValueError, 'fully transparent'):
            self.processor.process(self.path, self.photo)

    def test_empty_oversized_tiny_edge_and_fragmented_masks_fall_back(self):
        tiny = Image.new('L', self.rgb.size)
        tiny.putpixel((50, 50), 255)
        edge = Image.new('L', self.rgb.size)
        ImageDraw.Draw(edge).rectangle((0, 20, 80, 70), fill=255)
        noisy = Image.new('L', self.rgb.size)
        ImageDraw.Draw(noisy).rectangle((10, 10, 40, 50), fill=255)
        ImageDraw.Draw(noisy).rectangle((80, 10, 110, 50), fill=255)
        for mask, reason in [(Image.new('L', self.rgb.size), 'empty'),
                             (Image.new('L', self.rgb.size, 255), 'excessive'),
                             (tiny, 'small'), (edge, 'edge'), (noisy, 'fragmented')]:
            with self.subTest(reason=reason):
                processor = Preprocessor(MaskSegmenter(mask))
                result = processor.process(self.path, self.photo)
                self.assertEqual(result.metadata['effective_mode'], 'baseline')
                self.assertEqual(result.metadata['segmentation_outcome'], 'fallback')
                self.assertIn(reason, ' '.join(result.metadata['mask']['reasons']))
                self.assertEqual(result.image.tobytes(), self.processor.process(self.path).image.tobytes())

    def test_malformed_mask_is_rejected(self):
        for mask in [np.zeros((10, 10)), np.full((100, 160), np.nan), np.full((100, 160), 300)]:
            self.assertFalse(validate_mask(mask, self.rgb.size)['valid'])

    def test_thin_handle_and_internal_hole_survive(self):
        mask = Image.new('L', (160, 100))
        draw = ImageDraw.Draw(mask)
        draw.rectangle((35, 20, 85, 80), fill=255)
        draw.rectangle((85, 32, 120, 62), outline=255, width=1)
        original = Image.new('RGBA', mask.size, 'white')
        original.putalpha(mask)
        original.save(self.path)
        options = replace(self.photo, debug=True, debug_dir=str(self.root / 'debug'))
        result = self.processor.process(self.path, options)
        self.assertEqual(result.metadata['effective_mode'], 'photo')
        with Image.open(Path(result.metadata['debug_dir']) / 'alpha.png') as actual:
            self.assertEqual(actual.getpixel((120, 40)), 255)
            self.assertEqual(actual.getpixel((100, 40)), 0)
        # Project an interior point of the handle opening into the final canvas.
        bbox = result.metadata['mask']['bbox']
        scale = 0.85 * 512 / max(bbox[2]-bbox[0], bbox[3]-bbox[1])
        x = round((512-round((bbox[2]-bbox[0])*scale))/2 + (100-bbox[0])*scale)
        y = round((512-round((bbox[3]-bbox[1])*scale))/2 + (40-bbox[1])*scale)
        self.assertEqual(result.image.getpixel((x, y)), (127, 127, 127))

    def test_centering_aspect_and_inclusive_bounds(self):
        rgba = Image.new('RGBA', (200, 100), (0, 0, 0, 0))
        draw = ImageDraw.Draw(rgba)
        draw.rectangle((10, 20, 89, 59), fill=(255, 0, 0, 255))
        rgba.save(self.path)
        result = self.processor.process(self.path, self.photo)
        self.assertEqual(result.metadata['mask']['bbox'], [10, 20, 90, 60])
        rgb = np.asarray(result.image)
        red = (rgb[:, :, 0] > 200) & (rgb[:, :, 1] < 40)
        y, x = np.nonzero(red)
        self.assertAlmostEqual((x.min()+x.max())/2, 255.5, delta=1)
        self.assertAlmostEqual((y.min()+y.max())/2, 255.5, delta=1)
        self.assertAlmostEqual((x.max()-x.min()+1)/(y.max()-y.min()+1), 2, delta=.03)
        self.assertAlmostEqual((x.max()-x.min()+1)/512, .85, delta=.01)

    def test_foreground_ratios_and_configurable_background(self):
        for ratio in (.75, .85, .9):
            options = replace(self.photo, foreground_ratio=ratio, background=(60, 70, 80))
            rgba = self.rgb.convert('RGBA')
            rgba.putalpha(self.mask)
            image = frame_foreground(rgba, [40, 20, 120, 80], options, 512)
            pixels = np.asarray(image)
            foreground = np.any(pixels != [60, 70, 80], axis=-1)
            y, x = np.nonzero(foreground)
            self.assertAlmostEqual((x.max()-x.min()+1)/512, ratio, delta=.01)
            self.assertEqual(image.getpixel((0, 0)), (60, 70, 80))

    def test_auto_spares_possible_line_drawings(self):
        image = Image.new('RGB', (100, 100), 'white')
        ImageDraw.Draw(image).rectangle((30, 30, 60, 60), outline='black', width=2)
        image.save(self.path)
        result = self.processor.process(self.path, replace(self.photo, mode='auto'))
        self.assertEqual(result.metadata['effective_mode'], 'baseline')
        self.assertEqual(self.segmenter.calls, 0)
        self.assertIn('unverified', result.metadata['warnings'][0])

    def test_none_is_minimal_and_distinct_from_baseline(self):
        result = self.processor.process(self.path, replace(self.photo, mode='none'))
        self.assertEqual(result.image.size, (160, 100))
        self.assertEqual(self.segmenter.calls, 0)
        self.assertEqual(self.processor.process(self.path).image.size, (512, 512))

    def test_no_centering_retains_full_image_framing(self):
        result = self.processor.process(self.path, replace(self.photo, center_foreground=False))
        self.assertEqual(result.image.size, (512, 512))
        self.assertEqual(result.metadata['options']['center_foreground'], False)
        self.assertEqual(self.segmenter.calls, 1)

    def test_segmentation_exception_preserves_source_and_recovers(self):
        self.segmenter.segment = Mock(side_effect=[RuntimeError('unavailable'), (self.mask, {})])
        original_bytes = self.path.read_bytes()
        first = self.processor.process(self.path, self.photo)
        second = self.processor.process(self.path, self.photo)
        self.assertEqual(first.metadata['segmentation_outcome'], 'fallback')
        self.assertEqual(second.metadata['effective_mode'], 'photo')
        self.assertEqual(self.path.read_bytes(), original_bytes)

    def test_debug_is_optional_unique_and_contains_intermediates(self):
        self.processor.process(self.path, self.photo)
        self.assertEqual(sorted(p.name for p in self.root.iterdir()), ['object.png'])
        options = replace(self.photo, debug=True, debug_dir=str(self.root / 'debug'))
        a = self.processor.process(self.path, options)
        b = self.processor.process(self.path, options)
        self.assertNotEqual(a.metadata['debug_dir'], b.metadata['debug_dir'])
        for metadata in (a.metadata, b.metadata):
            directory = Path(metadata['debug_dir'])
            self.assertEqual({p.name for p in directory.iterdir()}, {'original.png', 'alpha.png', 'foreground.png', 'bbox.png', 'final.png', 'metadata.json'})
            saved = json.loads((directory / 'metadata.json').read_text())
            self.assertEqual(saved['mask']['bbox'], [40, 20, 120, 80])

    def test_options_validation_and_json_roundtrip(self):
        for kwargs in [dict(mode='bad'), dict(foreground_ratio=float('nan')), dict(foreground_ratio=0),
                       dict(foreground_ratio=1), dict(background=(256, 1, 1)), dict(background=(1, 2)),
                       dict(segmentation_model='unrecognized'), dict(debug='yes'), dict(center_foreground=1)]:
            with self.subTest(kwargs=kwargs), self.assertRaises(ValueError):
                PreprocessOptions(**kwargs)
        for env in [{'TRIPOSR_PREPROCESS_MODE': 'bad'}, {'TRIPOSR_FOREGROUND_RATIO': 'inf'},
                    {'TRIPOSR_BACKGROUND': 'white'}, {'TRIPOSR_CENTER_FOREGROUND': 'yes'},
                    {'TRIPOSR_PREPROCESS_DEBUG': 'true'}]:
            with patch.dict(os.environ, env), self.assertRaises(ValueError):
                Settings.from_env()
        self.assertEqual(PreprocessOptions.from_dict(json.loads(json.dumps(asdict(self.photo)))), self.photo)

    def test_segmentation_sessions_and_bounded_mask_cache(self):
        fake = types.SimpleNamespace(new_session=Mock(return_value=object()),
                                     remove=Mock(return_value=self.mask))
        with patch.dict('sys.modules', {'rembg': fake}):
            segmenter = RembgSegmenter()
            _, first = segmenter.segment(self.rgb, 'u2net')
            _, second = segmenter.segment(self.rgb, 'u2net')
            self.assertTrue(second['mask_cached'])
            for color in ('red', 'green', 'blue'):
                segmenter.segment(Image.new('RGB', self.rgb.size, color), 'u2net')
            fake.new_session.assert_called_once_with('u2net', providers=['CPUExecutionProvider'])
            self.assertEqual(len(segmenter.masks), 2)
            self.assertEqual(fake.remove.call_args.kwargs['post_process_mask'], False)
            self.assertEqual(fake.remove.call_args.kwargs['alpha_matting'], False)

    def test_failed_session_initialization_is_not_repeated_per_ratio(self):
        fake = types.SimpleNamespace(new_session=Mock(side_effect=RuntimeError('weights missing')))
        with patch.dict('sys.modules', {'rembg': fake}):
            processor = Preprocessor()
            for ratio in (.75, .85, .9):
                result = processor.process(self.path, replace(self.photo, foreground_ratio=ratio))
                self.assertEqual(result.metadata['segmentation_outcome'], 'fallback')
            fake.new_session.assert_called_once()

    def test_invalid_float_mask_debugging_does_not_break_baseline_fallback(self):
        mask = Image.fromarray(np.full((100, 160), np.nan, dtype=np.float32))
        processor = Preprocessor(MaskSegmenter(mask))
        result = processor.process(self.path, replace(self.photo, debug=True, debug_dir=str(self.root / 'debug')))
        self.assertEqual(result.metadata['effective_mode'], 'baseline')
        self.assertIn('mask_values_invalid', result.metadata['mask']['reasons'])
        self.assertTrue((Path(result.metadata['debug_dir']) / 'alpha.png').is_file())

    def test_low_confidence_background_haze_is_not_used_as_foreground(self):
        haze = Image.new('L', self.rgb.size, 40)
        ImageDraw.Draw(haze).rectangle((40, 20, 119, 79), fill=255)
        diagnostic = validate_mask(haze, self.rgb.size)
        self.assertIn('excessive_uncertain_background', diagnostic['reasons'])

    def test_legacy_rembg_baseline_path_stays_available(self):
        rgba = self.rgb.convert('RGBA')
        rgba.putalpha(self.mask)
        segmenter = types.SimpleNamespace(legacy_remove=Mock(return_value=rgba))
        resize = Mock(side_effect=lambda image, ratio: image)
        with patch.dict('sys.modules', {'tsr.utils': types.SimpleNamespace(resize_foreground=resize)}):
            result = baseline(self.rgb.convert('RGBA'), True, segmenter)
        resize.assert_called_once_with(rgba, .85)
        array = np.asarray(rgba).astype(np.float32) / 255
        expected = Image.fromarray((255 * (array[:, :, :3] * array[:, :, 3:] + .5 * (1-array[:, :, 3:]))).astype(np.uint8))
        expected = ImageOps.pad(expected, (512, 512), color=(128, 128, 128))
        self.assertEqual(result.tobytes(), expected.tobytes())
