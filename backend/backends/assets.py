"""Validate/inspect exported geometry and connected embedded texture resources."""
import json
import base64
import io
from urllib.parse import unquote_to_bytes
from pathlib import Path
import struct


def inspect_glb_asset(path):
    import numpy as np
    import trimesh
    from ..generator import validate_glb
    path = Path(validate_glb(path))
    raw = path.read_bytes()
    if len(raw) < 20:
        raise ValueError('GLB header is truncated.')
    magic, version, length = struct.unpack_from('<4sII', raw)
    if magic != b'glTF' or version != 2 or length != len(raw):
        raise ValueError('Invalid GLB 2.0 header/length.')
    json_length, chunk_type = struct.unpack_from('<II', raw, 12)
    if chunk_type != 0x4E4F534A or 20 + json_length > len(raw):
        raise ValueError('Missing/truncated GLB JSON chunk.')
    manifest = json.loads(raw[20:20+json_length])
    # Locate the real binary payload; JSON references alone do not prove a
    # usable texture (trimesh can silently drop undecodable image resources).
    binary = b''
    offset = 20 + json_length
    while offset < len(raw):
        if offset + 8 > len(raw):
            raise ValueError('Truncated GLB chunk header.')
        chunk_length, kind = struct.unpack_from('<II', raw, offset)
        offset += 8
        if offset + chunk_length > len(raw):
            raise ValueError('Truncated GLB binary chunk.')
        if kind == 0x004E4942:
            binary = raw[offset:offset+chunk_length]
        offset += chunk_length
    scene = trimesh.load(str(path), file_type='glb', force='scene', process=False)
    geometry = list(scene.geometry.values())
    if any(not np.isfinite(mesh.vertices).all() for mesh in geometry):
        raise ValueError('GLB contains non-finite vertices.')
    primitives = [p for mesh in manifest.get('meshes', []) for p in mesh.get('primitives', [])]
    materials = manifest.get('materials', [])
    textures = manifest.get('textures', [])
    images = manifest.get('images', [])
    views = manifest.get('bufferViews', [])
    decoded_images = set()
    for mesh in geometry:
        uv = getattr(mesh.visual, 'uv', None)
        if uv is not None and (np.asarray(uv).shape != (len(mesh.vertices), 2) or not np.isfinite(uv).all()):
            raise ValueError('GLB contains invalid or non-finite UV coordinates.')

    def validate_image(index):
        if index in decoded_images:
            return
        image = images[index]
        if 'bufferView' in image:
            view_index = image['bufferView']
            if type(view_index) is not int or not 0 <= view_index < len(views):
                raise ValueError('Invalid embedded texture bufferView.')
            view = views[view_index]
            start, size = view.get('byteOffset', 0), view.get('byteLength', 0)
            if view.get('buffer', 0) != 0 or type(start) is not int or type(size) is not int or start < 0 or size <= 0 or start+size > len(binary):
                raise ValueError('Embedded texture exceeds GLB binary bounds.')
            data = binary[start:start+size]
        else:
            uri = image.get('uri', '')
            if not isinstance(uri, str) or not uri.startswith('data:image/'):
                raise ValueError('Texture must be embedded; external image references are not self-contained GLB assets.')
            header, encoded = uri.split(',', 1)
            data = base64.b64decode(encoded, validate=True) if ';base64' in header else unquote_to_bytes(encoded)
        try:
            from PIL import Image
            with Image.open(io.BytesIO(data)) as decoded:
                decoded.verify()
        except Exception as exc:
            raise ValueError('Embedded GLB texture cannot be decoded.') from exc
        decoded_images.add(index)

    def texture_image(info):
        texture_index = info.get('index', -1)
        if type(texture_index) is not int or not 0 <= texture_index < len(textures):
            raise ValueError('Invalid GLB texture index.')
        image_index = textures[texture_index].get('source', -1)
        if type(image_index) is not int or not 0 <= image_index < len(images):
            raise ValueError('Invalid GLB texture image index.')
        validate_image(image_index)
        return True

    # Validate all resources used by material texture slots, including normals.
    for material in materials:
        pbr = material.get('pbrMetallicRoughness', {})
        for info in (pbr.get('baseColorTexture'), pbr.get('metallicRoughnessTexture'),
                     material.get('normalTexture'), material.get('occlusionTexture'), material.get('emissiveTexture')):
            if info is not None:
                texture_image(info)

    def connected_texture(primitive):
        if 'TEXCOORD_0' not in primitive.get('attributes', {}):
            return False
        index = primitive.get('material', -1)
        if not isinstance(index, int) or not 0 <= index < len(materials):
            return False
        material = materials[index]
        info = material.get('pbrMetallicRoughness', {}).get('baseColorTexture', {})
        if not info:
            return False
        return texture_image(info)


    return {'path': str(path), 'output_format': 'glb', 'valid_glb': True,
            'vertex_count': sum(len(mesh.vertices) for mesh in geometry),
            'face_count': sum(len(mesh.faces) for mesh in geometry),
            'has_uv': (any('TEXCOORD_0' in p.get('attributes', {}) for p in primitives) and
                       any(getattr(mesh.visual, 'uv', None) is not None for mesh in geometry)),
            'has_materials': any(isinstance(p.get('material'), int) and 0 <= p['material'] < len(materials) for p in primitives),
            'has_textures': (any(getattr(mesh.visual, 'uv', None) is not None for mesh in geometry) and
                             any(connected_texture(p) for p in primitives)),
            'material_count': len(materials), 'texture_count': len(textures),
            'image_count': len(images)}
