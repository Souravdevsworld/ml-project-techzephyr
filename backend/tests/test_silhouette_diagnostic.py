"""B2A synthetic conditioning tests only; no pretrained reconstruction."""
import json
from pathlib import Path
import tempfile
import unittest

import numpy as np
from PIL import Image, ImageDraw

from backend.silhouette_diagnostic import create_reference


class SilhouetteDiagnosticTests(unittest.TestCase):
    def setUp(self):
        self.temp = tempfile.TemporaryDirectory()
        self.root = Path(self.temp.name)
        self.sketch = self.root/'mug.png'
        self.mask = self.root/'mask.png'
        self.output = self.root/'diagnostics'
        # Wide source with a connected solid body, handle and genuine hole.
        mask = Image.new('L',(400,240),0)
        draw = ImageDraw.Draw(mask)
        draw.ellipse((210,70,310,190),fill=255)
        draw.ellipse((230,90,290,170),fill=0)
        draw.rectangle((100,40,230,210),fill=255)
        mask.save(self.mask)
        sketch = Image.new('RGB', mask.size, 'white')
        draw = ImageDraw.Draw(sketch)
        draw.rectangle((100,40,230,210),outline='#111111',width=3)
        draw.arc((210,70,310,190),-90,90,fill='#111111',width=3)
        draw.line((120,85,210,85),fill=(20,40,80),width=6)
        sketch.save(self.sketch)

    def tearDown(self):
        self.temp.cleanup()

    def create(self):
        path = create_reference(self.sketch,self.mask,self.output)
        with Image.open(path) as image:
            result = image.copy()
        meta = json.loads((self.output/'metadata.json').read_text())
        return result,meta

    def point(self, meta, x,y):
        left,top,_,_ = meta['source_mask']['bbox']
        return (round((x-left)*meta['scale'])+meta['offset'][0],
                round((y-top)*meta['scale'])+meta['offset'][1])

    def test_valid_silhouette_and_outputs(self):
        image,meta = self.create()
        self.assertEqual(image.mode,'RGBA')
        self.assertEqual(image.size,(512,512))
        self.assertEqual(meta['source_mask']['foreground_components'],1)
        self.assertEqual(meta['final_mask']['hole_count'],1)
        self.assertEqual({p.name for p in self.output.iterdir()},
                         {'original_preview.png','silhouette_mask.png','reference.png','alpha.png','reference_preview.png','metadata.json'})
        self.assertEqual(image.getpixel(self.point(meta,160,150))[3],255)
        self.assertEqual(image.getpixel(self.point(meta,300,130))[3],255)
        # Preserve a colored internal line without grayscale/threshold conversion.
        # LANCZOS interpolation may shift colors slightly at resampled edges.
        actual = image.getpixel(self.point(meta,160,85))[:3]
        self.assertTrue(all(abs(a-b) <= 2 for a,b in zip(actual,(20,40,80))),actual)

    def test_handle_opening_transparency(self):
        image,meta = self.create()
        self.assertEqual(image.getpixel(self.point(meta,260,130))[3],0)

    def test_external_background_transparency(self):
        image,meta = self.create()
        self.assertEqual(image.getpixel((0,0))[3],0)
        self.assertEqual(image.getpixel(self.point(meta,280,50))[3],0)
        with Image.open(self.output/'alpha.png') as alpha:
            self.assertTrue(np.array_equal(np.array(alpha),np.array(image.getchannel('A'))))

    def test_aspect_ratio_and_centering(self):
        _,meta = self.create()
        left,top,right,bottom=meta['source_mask']['bbox']
        width,height=meta['resized_size']
        self.assertAlmostEqual(width/height,(right-left)/(bottom-top),delta=.01)
        for edge,offset in zip((width,height),meta['offset']):
            self.assertLessEqual(abs(offset+edge/2-256),.5)

    def test_source_preservation_and_existing_output_refused(self):
        before = (self.sketch.read_bytes(),self.mask.read_bytes())
        self.create()
        self.assertEqual(before,(self.sketch.read_bytes(),self.mask.read_bytes()))
        with self.assertRaisesRegex(ValueError,'must be new'): self.create()
        with self.assertRaises(ValueError): create_reference(self.sketch,self.mask,self.root)
        self.assertEqual(before,(self.sketch.read_bytes(),self.mask.read_bytes()))

    def test_invalid_masks(self):
        valid = Image.open(self.mask).copy()
        cases = {'empty':Image.new('L',valid.size,0),
                 'opaque':Image.new('L',valid.size,255),
                 'mismatch':Image.new('L',(20,20),0),
                 'color':Image.new('RGB',valid.size,'red'),
                 'ambiguous_alpha':Image.new('RGBA',valid.size,(255,255,255,0))}
        no_hole=valid.copy();ImageDraw.Draw(no_hole).ellipse((230,90,290,170),fill=255)
        cases['missing_handle_opening']=no_hole
        edge=valid.copy();ImageDraw.Draw(edge).line((0,100,100,100),fill=255,width=4)
        cases['edge']=edge
        separate=valid.copy();ImageDraw.Draw(separate).rectangle((340,100,350,110),fill=255)
        cases['disconnected']=separate
        for name,mask in cases.items():
            with self.subTest(name=name):
                mask.save(self.mask)
                with self.assertRaises(ValueError): self.create()
                self.assertFalse(self.output.exists())
        self.mask.write_bytes(b'not an image')
        with self.assertRaisesRegex(ValueError,'unreadable'): self.create()
        valid.convert('RGB').save(self.mask,format='JPEG')
        with self.assertRaisesRegex(ValueError,'lossless'): self.create()


if __name__ == '__main__': unittest.main()
