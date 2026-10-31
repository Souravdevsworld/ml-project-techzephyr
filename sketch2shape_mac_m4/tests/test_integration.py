import argparse
import tempfile
import unittest
from pathlib import Path
from unittest.mock import patch
import sys
from sketch2shape_mac_m4.local_sketch_to_3d import run

class IntegrationTests(unittest.TestCase):
    def test_dry_run_imports_experimental_refiner_and_requires_isolation(self):
        with tempfile.TemporaryDirectory() as folder:
            root = Path(folder)
            (root/'backend').mkdir()
            (root/'backend/cli.py').touch()
            (root/'sketch2shape_mac_m4/backend').mkdir(parents=True)
            (root/'sketch2shape_mac_m4/backend/sketch_refiner.py').touch()
            image = root/'sketch.png'
            image.touch()
            python = root/'python'
            python.touch()
            args = argparse.Namespace(repo=str(root), sketch=str(image), sketch_python=sys.executable,
                sf3d_python=str(python), prompt='ceramic mug', dry_run=True, sf3d_device='cpu', engine='sf3d')
            with patch('builtins.print') as output, patch('subprocess.run') as process:
                run(args)
            process.assert_not_called()
            self.assertIn('ceramic mug', output.call_args.args[0])
            args.sf3d_python = args.sketch_python
            with self.assertRaisesRegex(ValueError, 'separate'):
                run(args)

    def test_failed_refinement_never_calls_3d(self):
        with tempfile.TemporaryDirectory() as folder:
            root = Path(folder)
            (root/'backend').mkdir()
            (root/'backend/cli.py').touch()
            (root/'sketch2shape_mac_m4/backend').mkdir(parents=True)
            (root/'sketch2shape_mac_m4/backend/sketch_refiner.py').touch()
            image = root/'sketch.png'; image.touch()
            python = root/'python'; python.touch()
            args = argparse.Namespace(repo=str(root),sketch=str(image),sketch_python=sys.executable,
                sf3d_python=str(python),prompt=None,dry_run=False,sf3d_device='cpu',engine='sf3d')
            result = argparse.Namespace(returncode=1,stdout='MPS unsupported')
            with patch('subprocess.run',return_value=result) as process:
                with self.assertRaises(RuntimeError): run(args)
            self.assertEqual(process.call_count,1)
