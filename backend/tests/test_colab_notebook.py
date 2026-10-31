"""Offline regression checks for the actual notebook's ZIP extraction cell."""

import ast
import io
import json
from pathlib import Path
import stat
import tempfile
import unittest
import zipfile


NOTEBOOK = Path(__file__).resolve().parents[2] / "notebooks/Sketch2Shape_TripoSR.ipynb"


@unittest.skipUnless(NOTEBOOK.is_file(), "Canonical notebook not included in this backend-only copy")
class ColabNotebookTests(unittest.TestCase):
    def setUp(self):
        self.notebook = json.loads(NOTEBOOK.read_text(encoding="utf-8"))
        extractor = next(cell for cell in self.notebook["cells"] if cell["id"] == "zip-extractor")
        namespace = {}
        # Only this side-effect-free helper cell is executed, never Colab setup/inference.
        exec(compile("".join(extractor["source"]), str(NOTEBOOK), "exec"), namespace)
        self.extract = namespace["extract_project_zip"]
        self.temp = tempfile.TemporaryDirectory()
        self.addCleanup(self.temp.cleanup)
        self.root = Path(self.temp.name)

    def archive(self, entries):
        buffer = io.BytesIO()
        with zipfile.ZipFile(buffer, "w") as archive:
            for name, content in entries:
                if isinstance(name, str):
                    original = name
                    name = zipfile.ZipInfo(name)
                    # Preserve actual backslashes; Windows ZipInfo normally normalizes them.
                    name.filename = original
                archive.writestr(name, content)
        buffer.seek(0)
        return buffer

    def test_windows_and_posix_zip_paths(self):
        for index, separator in enumerate(("\\", "/")):
            with self.subTest(separator=separator):
                archive = self.archive([
                    (separator.join(("project", "backend", "")), ""),
                    (separator.join(("project", "backend", "generator.py")), "# source"),
                    (separator.join(("project", "examples", "chair.png")), "example"),
                ])
                project = self.extract(archive, self.root / str(index))
                self.assertEqual((project / "backend/generator.py").read_text(), "# source")
                self.assertTrue((project / "examples/chair.png").is_file())

    def test_zip_rejects_traversal_absolute_and_drive_paths(self):
        for name in ("../escape", "folder\\..\\escape", "/absolute", "C:\\drive\\file", "\\\\host\\share"):
            with self.subTest(name=name):
                with self.assertRaises(ValueError):
                    self.extract(self.archive([(name, "bad")]), self.root / "extracted")
                self.assertFalse((self.root / "extracted").exists())

    def test_zip_rejects_symlinks_and_normalized_duplicates(self):
        symlink = zipfile.ZipInfo("link")
        symlink.create_system = 3
        symlink.external_attr = (stat.S_IFLNK | 0o777) << 16
        for entries in ([(symlink, "../escape")], [("backend/generator.py", "a"), ("backend\\generator.py", "b")]):
            with self.assertRaises(ValueError):
                self.extract(self.archive(entries), self.root / "extracted")
            self.assertFalse((self.root / "extracted").exists())

    def test_zip_never_overwrites_existing_directory(self):
        marker = self.root / "marker"
        marker.write_text("preserve")
        with self.assertRaises(FileExistsError):
            self.extract(self.archive([("backend/generator.py", "new")]), self.root)
        self.assertEqual(marker.read_text(), "preserve")

    def test_notebook_and_embedded_subprocess_scripts_have_valid_syntax(self):
        ids = [cell["id"] for cell in self.notebook["cells"]]
        self.assertEqual(len(ids), len(set(ids)))
        for cell in self.notebook["cells"]:
            if cell["cell_type"] != "code":
                continue
            self.assertEqual(cell["outputs"], [])
            tree = ast.parse("".join(cell["source"]))
            for node in ast.walk(tree):
                if (isinstance(node, ast.Assign) and isinstance(node.value, ast.Constant)
                        and isinstance(node.value.value, str)
                        and any(isinstance(t, ast.Name) and t.id in {"inference_code", "check_code"}
                                for t in node.targets)):
                    ast.parse(node.value.value)


if __name__ == "__main__":
    unittest.main()
