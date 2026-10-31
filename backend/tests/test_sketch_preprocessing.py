"""Synthetic preprocessing/dispatch tests; never pretrained reconstruction."""
import ast
import hashlib
import os
from pathlib import Path
import tempfile
import unittest
from unittest.mock import Mock, patch

import numpy as np
from PIL import Image, ImageDraw

from backend.sketch_preprocessing import prepare_sketch, resolve_mode, input_mode
from backend.backends.sf3d_runtime import SF3DRuntime
from backend.backends.sf3d_config import SF3DSettings


def fixture(kind='mug', background='white', color='#111111', size=(640, 480)):
    image = Image.new('RGBA', size, background)
    draw = ImageDraw.Draw(image)
    if kind == 'mug':
        draw.rounded_rectangle((170, 100, 370, 360), radius=30, outline=color, width=8)
        draw.arc((320, 150, 450, 310), -90, 90, fill=color, width=8)
        draw.line((190, 140, 345, 140), fill=color, width=4)
    elif kind == 'chair':
        draw.rectangle((180, 80, 350, 250), outline=color, width=8)
        draw.polygon((180, 250, 350, 250, 410, 310, 130, 310), outline=color, width=6)
        for x in (150, 380):
            draw.line((x, 310, x, 410), fill=color, width=8)
    else:
        draw.ellipse((180, 160, 390, 350), outline=color, width=8)
        draw.arc((350, 180, 460, 310), -90, 90, fill=color, width=8)
        draw.line((185, 220, 100, 150, 130, 280, 190, 310), fill=color, width=8)
        draw.line((220, 160, 240, 120, 325, 120, 350, 160), fill=color, width=6)
    return image


class SketchTests(unittest.TestCase):
    def setUp(self):
        self.temp = tempfile.TemporaryDirectory()
        self.root = Path(self.temp.name)
        self.path = self.root/'input.png'

    def tearDown(self):
        self.temp.cleanup()

    def test_representative_inputs_preserve_source_and_frame(self):
        for kind in ('mug', 'chair', 'teapot'):
            for background, color in [('white', '#111111'), ('black', 'white'), ((0,0,0,0), 'black'), ((0,0,0,0), 'white')]:
                with self.subTest(kind=kind, background=background, color=color):
                    fixture(kind, background, color).save(self.path)
                    before = self.path.read_bytes()
                    image, metadata = prepare_sketch(self.path)
                    self.assertEqual(before, self.path.read_bytes())
                    self.assertEqual(metadata['input_sha256'], hashlib.sha256(before).hexdigest())
                    self.assertEqual(image.mode, 'RGBA')
                    self.assertEqual(image.size, (512,512))
                    self.assertEqual(image.getpixel((0,0))[3], 0)
                    alpha = np.array(image.getchannel('A'))
                    ys,xs = np.nonzero(alpha)
                    self.assertLessEqual(abs((xs.min()+xs.max())/2-255.5), 1)
                    self.assertLessEqual(abs((ys.min()+ys.max())/2-255.5), 1)
                    crop = metadata['crop_bbox']
                    self.assertAlmostEqual(metadata['panel_size'][0]/metadata['panel_size'][1], (crop[2]-crop[0])/(crop[3]-crop[1]), delta=.015)
                    self.assertGreater(np.unique(np.array(image)[:,:,0]).size, 4)

    def test_canvas_function_actual_saved_rgb_and_upload_jpeg(self):
        # Execute only the real pure helper, avoiding Gradio initialization.
        source = ast.parse(Path('app.py').read_text())
        node = next(n for n in source.body if isinstance(n,ast.FunctionDef) and n.name=='preprocess_sketch')
        from PIL import ImageOps
        scope = dict(Image=Image, ImageOps=ImageOps, Path=Path, MAX_EDGE=1024)
        exec(compile(ast.Module(body=[node],type_ignores=[]), 'app.py', 'exec'), scope)
        scope['preprocess_sketch']({'composite':fixture(background=(0,0,0,0))}, self.path)
        with Image.open(self.path) as saved:
            self.assertEqual(saved.mode,'RGB')
            self.assertEqual(saved.getpixel((0,0)), (255,255,255))
        prepare_sketch(self.path)
        jpeg = self.root/'upload.jpg'
        fixture().convert('RGB').save(jpeg)
        prepare_sketch(jpeg)

    def test_rejections_and_incomplete_line(self):
        for background in ('white','black',(0,0,0,0)):
            Image.new('RGBA',(200,100),background).save(self.path)
            with self.assertRaises(ValueError): prepare_sketch(self.path)
        for box in ((30,30,32,32),(30,30,150,32)):
            image = Image.new('RGB',(200,100),'white')
            ImageDraw.Draw(image).rectangle(box,fill='black')
            image.save(self.path)
            with self.assertRaises(ValueError): prepare_sketch(self.path)
        self.path.write_bytes(b'not an image')
        with self.assertRaisesRegex(ValueError,'unreadable'): prepare_sketch(self.path)

    def test_modes_conservative_auto(self):
        fixture().save(self.path)
        with patch.dict(os.environ, {}, clear=True): self.assertEqual(input_mode(),'photo')
        for mode in ('photo','sketch'): self.assertEqual(resolve_mode(self.path,mode),mode)
        self.assertEqual(resolve_mode(self.path,'auto'),'sketch')
        rng=np.random.default_rng(42)
        Image.fromarray(rng.integers(0,256,(100,100,3),dtype=np.uint8)).save(self.path)
        self.assertEqual(resolve_mode(self.path,'auto'),'photo')
        with self.assertRaises(ValueError): input_mode('typo')

    def test_sf3d_sketch_bypasses_segmenter_photo_stays_existing(self):
        fixture().save(self.path)
        runtime=SF3DRuntime(SF3DSettings('unused','unused'))
        runtime.segmenter.segment=Mock(side_effect=RuntimeError('photo sentinel'))
        image, meta=runtime.prepare(self.path,.85,input_mode='sketch')
        self.assertEqual(meta['effective_mode'],'sketch')
        runtime.segmenter.segment.assert_not_called()
        with self.assertRaisesRegex(RuntimeError,'photo sentinel'):
            runtime.prepare(self.path,.85,input_mode='photo')
        with patch.dict(os.environ,{'SKETCH2SHAPE_INPUT_MODE':'photo'}), self.assertRaisesRegex(RuntimeError,'photo sentinel'):
            runtime.prepare(self.path,.85)

    def test_photo_rgba_pixels_match_existing_framing(self):
        image=Image.new('RGBA',(120,100),(0,0,0,0))
        ImageDraw.Draw(image).rectangle((20,20,89,79),fill=(20,80,140,255))
        image.save(self.path)
        runtime=SF3DRuntime(SF3DSettings('unused','unused'))
        diagnostics=dict(valid=True,bbox=[20,20,90,80],reasons=[])
        with patch('backend.backends.sf3d_runtime.validate_mask',return_value=diagnostics):
            prepared,meta=runtime.prepare(self.path,.85,input_mode='photo')
        expected=Image.new('RGBA',(512,512),(0,0,0,0))
        cutout=image.crop((20,20,90,80))
        scale=.85*512/70
        dimensions=tuple(round(edge*scale) for edge in cutout.size)
        cutout=cutout.convert('RGBa').resize(dimensions,Image.Resampling.LANCZOS).convert('RGBA')
        expected.alpha_composite(cutout,((512-dimensions[0])//2,(512-dimensions[1])//2))
        self.assertEqual(prepared.tobytes(),expected.tobytes())
        self.assertEqual(meta['segmentation_outcome'],'existing_alpha')

    def test_api_and_no_sketch_fallback(self):
        import inspect
        from backend.generator import generate_3d, generate_with_report
        signature=inspect.signature(generate_3d)
        self.assertEqual(list(signature.parameters),['image_path','prompt'])
        self.assertIsNone(signature.parameters['prompt'].default)
        self.assertIs(signature.return_annotation,str)
        fixture().save(self.path)
        backend=Mock()
        backend.generate_report.side_effect=RuntimeError('inference unavailable')
        with patch.dict(os.environ,{'SKETCH2SHAPE_INPUT_MODE':'sketch'}):
            with self.assertRaisesRegex(ValueError,'requires'):
                generate_with_report(self.path,engine='triposr')
            with patch('backend.backends.factory.get_backend',return_value=backend) as get:
                with self.assertRaisesRegex(RuntimeError,'inference unavailable'):
                    generate_with_report(self.path,engine='sf3d',fallback=True)
                get.assert_called_once_with('sf3d')


if __name__ == '__main__': unittest.main()
