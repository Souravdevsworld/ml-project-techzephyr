"""Frontend boundary tests. All mesh outputs in this suite are offline fixtures."""
import tempfile
from pathlib import Path
from unittest.mock import patch

import pytest
from PIL import Image, ImageDraw
import trimesh

import app
from backend.ui_adapter import as_rgb, save_input


@pytest.fixture
def drawing():
    image = Image.new('RGB', (160, 120), 'white')
    ImageDraw.Draw(image).rectangle((30, 20, 100, 90), outline='black', width=5)
    return image


def test_preprocess_composite_white_rgb_aspect(tmp_path):
    image = Image.new('RGBA', (2000, 1000), (0, 0, 0, 0))
    image.putpixel((0, 0), (0, 0, 0, 255))
    path = app.preprocess_sketch({'composite': image}, tmp_path / 'input.png')
    with Image.open(path) as result:
        assert result.mode == 'RGB'
        assert result.size == (1024, 512)
        assert result.getpixel((500, 250)) == (255, 255, 255)


def test_editor_layers_composite_and_eraser(tmp_path, drawing):
    white = Image.new('RGBA', drawing.size, 'white')
    layer = drawing.convert('RGBA')
    expected = as_rgb({'background': white, 'layers': [layer], 'composite': None})
    assert expected.tobytes() == drawing.tobytes()
    # A supplied cleared composite is authoritative, even with stale layer data.
    with pytest.raises(ValueError, match='blank'):
        save_input({'background': white, 'layers': [layer], 'composite': white}, tmp_path / 'blank.png')
    with pytest.raises(ValueError, match='blank'):
        save_input({'background': white, 'layers': [Image.new('RGBA', drawing.size, (0, 0, 0, 0))]}, tmp_path / 'erased.png')
    with pytest.raises(ValueError, match='inconsistent'):
        as_rgb({'background': white, 'layers': [Image.new('RGBA', (12, 12))]})


@pytest.mark.parametrize('value', [None, {'composite': None}, Image.new('RGB', (32,32), 'white'), Image.new('RGBA',(32,32),(0,0,0,0))])
def test_empty_blank_and_transparent_rejected(tmp_path, value):
    with pytest.raises(ValueError):
        save_input(value, tmp_path / 'input.png')
    assert not (tmp_path / 'input.png').exists()


@pytest.mark.parametrize('fmt,suffix', [('JPEG','jpg'),('PNG','png'),('WEBP','webp')])
def test_supported_uploads(tmp_path, drawing, fmt, suffix):
    path = tmp_path / ('upload.' + suffix)
    drawing.save(path, format=fmt)
    result = save_input(path, tmp_path / 'result.png')
    with Image.open(result) as image:
        assert image.size == drawing.size and image.format == 'PNG'


def test_invalid_uploads_size_and_dimensions(tmp_path):
    bad = tmp_path / 'bad.png'
    bad.write_text('not an image')
    with pytest.raises(ValueError, match='corrupt'):
        as_rgb(bad)
    Image.new('RGB', (16,16)).save(bad, format='GIF')
    with pytest.raises(ValueError, match='Use a PNG'):
        as_rgb(bad)
    with patch('backend.ui_adapter.MAX_IMAGE_BYTES', 1), pytest.raises(ValueError, match='20 MiB'):
        as_rgb(bad)
    with pytest.raises(ValueError, match='16 million'):
        as_rgb(Image.new('RGB',(4001,4000)))
    with pytest.raises(ValueError, match='at least 8'):
        as_rgb(Image.new('RGB',(1,10)))


def test_invalid_glb_and_flat_mesh(tmp_path):
    path = tmp_path / 'invalid.glb'
    path.write_bytes(b'not a model')
    with pytest.raises(ValueError):
        app.validate_glb(path)
    flat = trimesh.Trimesh(vertices=[[0,0,0],[1,0,0],[0,1,0]],faces=[[0,1,2]])
    path.write_bytes(flat.export(file_type='glb'))
    with pytest.raises(ValueError, match='positive'):
        app.validate_glb(path)


def test_export_and_clear(tmp_path, drawing, monkeypatch):
    monkeypatch.setattr('backend.pipeline.OUTPUT_DIR', tmp_path / 'jobs')
    path = app.export_sketch({'composite':drawing})
    assert Image.open(path).format == 'PNG'
    with pytest.raises(ValueError, match='blank'):
        app.export_sketch(app.blank_canvas())


def test_app_builds_and_callbacks_use_real_output_paths():
    demo = app.build_app()
    assert demo.title == 'Sketch2Shape AI'
    kinds = [item['type'] for item in demo.config['components']]
    assert 'model3d' in kinds and 'imageeditor' in kinds
    jobs = [fn for fn in demo.fns.values() if fn.fn is app.run_request]
    assert len(jobs) == 2
    assert all(fn.concurrency_id == 'inference' and fn.concurrency_limit == 1 for fn in jobs)
    assert all(len(fn.outputs) == app.RESULT_COUNT for fn in jobs)
    assert app.blank_canvas().getextrema() == ((255,255),)*3


def test_availability_is_honest(monkeypatch):
    monkeypatch.delenv('TRIPOSR_DIR', raising=False)
    assert 'setup needed' in app.inference_status()
