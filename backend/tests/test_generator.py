import importlib
import os
from pathlib import Path
import subprocess
import tempfile
import unittest
from unittest.mock import patch

import numpy as np
from PIL import Image
import trimesh

from backend import generator
from backend.validate_mesh import validate_mesh


class BackendTests(unittest.TestCase):
    def setUp(self):
        self.temp = tempfile.TemporaryDirectory()
        self.addCleanup(self.temp.cleanup)
        self.root = Path(self.temp.name)
        self.image = self.root / "input with spaces.png"
        Image.new("RGB", (32, 32), "white").save(self.image)
        # Synthetic geometry is strictly an offline fixture, never a production fallback.
        self.glb = trimesh.creation.box().export(file_type="glb")
        self.triposr = self.root / "TripoSR checkout"
        self.triposr.mkdir()
        (self.triposr / "run.py").write_text("# offline fixture")
        self.run = patch.object(generator.subprocess, "run").start()
        patch.dict(os.environ, {"TRIPOSR_DIR": str(self.triposr),
                               "TRIPOSR_MC_RESOLUTION": "128", "TRIPOSR_CHUNK_SIZE": "1024",
                               "TRIPOSR_TIMEOUT_SECONDS": "1800", "TRIPOSR_REMOVE_BG": "true"}).start()
        patch.object(generator, "OUTPUT_DIR", self.root / "outputs").start()
        self.addCleanup(patch.stopall)

    def write_output(self, command, **kwargs):
        generated = Path(command[command.index("--output-dir") + 1]) / "0" / "mesh.glb"
        self.assertTrue(generated.parent.is_dir(), "Backend must pre-create 0/ before inference")
        generated.write_bytes(self.glb)

    def test_import_does_not_run_inference(self):
        importlib.reload(generator)
        self.run.assert_not_called()

    def test_invalid_input_and_missing_installation_never_execute(self):
        with self.assertRaises(FileNotFoundError):
            generator.generate_3d(str(self.root / "missing.png"))
        bad = self.root / "bad.png"
        bad.write_text("not an image")
        with self.assertRaises(ValueError):
            generator.generate_3d(str(bad))
        with patch.dict(os.environ, {"TRIPOSR_DIR": ""}):
            with self.assertRaises(generator.GenerationError):
                generator.generate_3d(str(self.image))
        (self.triposr / "run.py").unlink()
        with self.assertRaises(generator.GenerationError):
            generator.generate_3d(str(self.image))
        self.run.assert_not_called()

    def test_mocked_success_ignores_prompt_and_uses_unique_paths(self):
        self.run.side_effect = self.write_output
        with self.assertLogs(generator.logger, level="WARNING") as logs:
            first = generator.generate_3d(str(self.image), "unused")
        second = generator.generate_3d(str(self.image))
        self.assertIn("unused", logs.output[0])
        self.assertNotEqual(first, second)
        self.assertTrue(Path(first).is_absolute())
        self.assertEqual(Path(first).parent, self.root / "outputs")
        self.assertGreater(validate_mesh(first)["faces"], 0)
        command = self.run.call_args.args[0]
        self.assertIsInstance(command, list)
        self.assertIn(str(self.image), command)
        self.assertEqual(command[command.index("--model-save-format") + 1], "glb")
        self.assertNotIn("unused", command)
        self.assertEqual(command[command.index("--mc-resolution") + 1], "128")
        self.assertEqual(command[command.index("--chunk-size") + 1], "1024")
        self.assertNotIn("--no-remove-bg", command)
        self.assertFalse(self.run.call_args.kwargs["shell"])
        self.assertEqual(self.run.call_args.kwargs["cwd"], str(self.triposr))
        self.assertFalse(Path(command[command.index("--output-dir") + 1]).exists())

    def test_configurable_settings_and_disabled_background_removal(self):
        self.run.side_effect = self.write_output
        with patch.dict(os.environ, {"TRIPOSR_MC_RESOLUTION": "192", "TRIPOSR_CHUNK_SIZE": "512",
                                     "TRIPOSR_TIMEOUT_SECONDS": "600", "TRIPOSR_REMOVE_BG": "false"}):
            path = generator.generate_3d(str(self.image))
        self.assertGreater(validate_mesh(path)["faces"], 0)
        command = self.run.call_args.args[0]
        self.assertIn("--no-remove-bg", command)
        self.assertEqual(command[command.index("--mc-resolution") + 1], "192")
        self.assertEqual(command[command.index("--chunk-size") + 1], "512")
        self.assertEqual(self.run.call_args.kwargs["timeout"], 600)

    def test_default_settings_without_environment_overrides(self):
        self.run.side_effect = self.write_output
        with patch.dict(os.environ, {"TRIPOSR_DIR": str(self.triposr)}, clear=True):
            generator.generate_3d(str(self.image))
        command = self.run.call_args.args[0]
        self.assertEqual(command[command.index("--mc-resolution") + 1], "128")
        self.assertEqual(command[command.index("--chunk-size") + 1], "1024")
        self.assertNotIn("--no-remove-bg", command)
        self.assertEqual(self.run.call_args.kwargs["timeout"], 1800)

    def test_invalid_settings_fail_before_execution(self):
        for name, value in (("TRIPOSR_MC_RESOLUTION", "oops"), ("TRIPOSR_MC_RESOLUTION", "0"),
                            ("TRIPOSR_CHUNK_SIZE", "-1"), ("TRIPOSR_TIMEOUT_SECONDS", "0"),
                            ("TRIPOSR_REMOVE_BG", "maybe")):
            with self.subTest(name=name, value=value), patch.dict(os.environ, {name: value}):
                with self.assertRaisesRegex(generator.GenerationError, name):
                    generator.generate_3d(str(self.image))
        self.run.assert_not_called()

    def test_invalid_output_removed(self):
        self.glb = b"invalid"
        self.run.side_effect = self.write_output
        with self.assertRaises(generator.GenerationError):
            generator.generate_3d(str(self.image))
        self.assertEqual(list((self.root / "outputs").iterdir()), [])

    def test_missing_output_is_error(self):
        with self.assertRaisesRegex(generator.GenerationError, "mesh.glb"):
            generator.generate_3d(str(self.image))
        self.assertEqual(list((self.root / "outputs").iterdir()), [])

    def test_timeout_and_subprocess_failure(self):
        for error, message in ((subprocess.TimeoutExpired("run.py", 1800), "exceeded"),
                               (subprocess.CalledProcessError(1, "run.py"), "exited with code 1"),
                               (subprocess.CalledProcessError(-9, "run.py"), "memory limit")):
            self.run.side_effect = error
            with self.assertRaisesRegex(generator.GenerationError, message):
                generator.generate_3d(str(self.image))
            self.assertEqual(list((self.root / "outputs").iterdir()), [])

    def test_flat_empty_and_nonfinite_mesh_rejected(self):
        flat = trimesh.Trimesh(vertices=[[0, 0, 0], [1, 0, 0], [0, 1, 0]], faces=[[0, 1, 2]])
        path = self.root / "flat.glb"
        path.write_bytes(flat.export(file_type="glb"))
        with self.assertRaises(ValueError):
            validate_mesh(str(path))
        path.write_bytes(self.glb)
        with patch("backend.validate_mesh.trimesh.load", return_value=trimesh.Scene()):
            with self.assertRaises(ValueError):
                validate_mesh(str(path))
        bad = trimesh.creation.box()
        bad.vertices[0] = [np.nan, 0, 0]
        with patch("backend.validate_mesh.trimesh.load", return_value=trimesh.Scene(bad)):
            with self.assertRaises(ValueError):
                validate_mesh(str(path))

    def test_open_surface_is_accepted(self):
        mesh = trimesh.creation.box()
        mesh.update_faces(np.arange(len(mesh.faces) - 1))
        self.assertFalse(mesh.is_watertight)
        path = self.root / "open.glb"
        path.write_bytes(mesh.export(file_type="glb"))
        self.assertGreater(validate_mesh(str(path))["vertices"], 0)


if __name__ == "__main__":
    unittest.main()


class CpuCommandTests(unittest.TestCase):
    setUp = BackendTests.setUp
    write_output = BackendTests.write_output

    def test_explicit_cpu_and_compiler_free_meshing(self):
        self.run.side_effect=self.write_output
        with patch.dict(os.environ,{'SKETCH2SHAPE_DEVICE':'cpu','SKETCH2SHAPE_MESH_BACKEND':'skimage'}):
            generator.generate_3d(str(self.image))
        command=self.run.call_args.args[0]
        self.assertEqual(command[command.index('--device')+1],'cpu')
        self.assertEqual(Path(command[2]).name,'triposr_runner.py')

    def test_native_meshing_preserves_upstream_entrypoint(self):
        self.run.side_effect=self.write_output
        with patch.dict(os.environ,{'SKETCH2SHAPE_DEVICE':'cuda','SKETCH2SHAPE_MESH_BACKEND':'torchmcubes'}):
            generator.generate_3d(str(self.image))
        self.assertEqual(Path(self.run.call_args.args[0][2]),self.triposr/'run.py')
