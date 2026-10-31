"""Evaluation/protocol fixtures exercise reporting, never learned mesh quality."""
from dataclasses import asdict, replace
import io
import json
import os
from pathlib import Path
import queue
import subprocess
import sys
import tempfile
import time
import types
import unittest
from unittest.mock import Mock, patch

from PIL import Image, ImageDraw
import trimesh

from backend import generator
from backend.config import Settings
from backend.evaluate_preprocessing import configurations, run_evaluation
from backend.preprocessing import PreprocessOptions, Preprocessor
from backend.runtime import Runtime


class SegmentationFixture:
    def __init__(self, size):
        self.mask = Image.new('L', size)
        ImageDraw.Draw(self.mask).rectangle((15, 15, size[0]-16, size[1]-16), fill=255)

    def segment(self, image, model):
        return self.mask, {}


class EvaluationTests(unittest.TestCase):
    def setUp(self):
        self.directory = tempfile.TemporaryDirectory()
        self.root = Path(self.directory.name)
        self.image = self.root / 'photo.png'
        Image.new('RGB', (80, 60), 'white').save(self.image)
        self.env = patch.dict(os.environ, {'TRIPOSR_PYTHON': sys.executable,
            'TRIPOSR_PREPROCESS_MODE': 'baseline', 'TRIPOSR_REMOVE_BACKGROUND': '0',
            'TRIPOSR_OUTPUT_DIR': str(self.root / 'outputs')})
        self.env.start()
        generator.shutdown_worker()

    def tearDown(self):
        generator.shutdown_worker()
        self.env.stop()
        self.directory.cleanup()

    def test_preprocessing_only_comparison_is_distinct_and_repeatable(self):
        processor = Preprocessor(SegmentationFixture((80, 60)))
        with patch('backend.evaluate_preprocessing.Preprocessor', return_value=processor), \
             patch('backend.evaluate_preprocessing.generate_with_report') as inference:
            a, report = run_evaluation(self.image, self.root / 'evaluation', preprocess_only=True)
            old = (a / 'report.json').read_bytes()
            b, _ = run_evaluation(self.image, self.root / 'evaluation', preprocess_only=True)
        inference.assert_not_called()
        self.assertNotEqual(a, b)
        self.assertEqual((a / 'report.json').read_bytes(), old)
        self.assertTrue((a / 'comparison.png').is_file() and (a / 'review.csv').is_file())
        self.assertEqual(len(report['runs']), 5)
        self.assertFalse(report['quality_improvement_verified'])
        self.assertTrue(all(r['status'] == 'preprocess_only' and r['valid_glb'] is None and r['path'] is None for r in report['runs']))
        self.assertEqual({r['foreground_ratio'] for r in report['runs']}, {.75, .85, .9})

    def test_comparison_records_errors_without_fabricating_quality(self):
        def fixture(image_path, preprocessing, output_dir):
            if preprocessing.mode == 'photo':
                raise generator.WorkerError('fixture failure', {'stage': 'inference',
                      'preprocessing': {'segmentation_outcome': 'fallback', 'warnings': ['bad mask']}})
            directory = Path(output_dir)
            directory.mkdir(parents=True, exist_ok=True)
            path = directory / 'test-fixture.glb'
            trimesh.creation.box().export(path)
            return {'path': str(path), 'valid_glb': True, 'vertex_count': 8, 'face_count': 12,
                    'timings': {'inference_seconds': .1}}
        with patch('backend.evaluate_preprocessing.generate_with_report', side_effect=fixture):
            directory, report = run_evaluation(self.image, self.root / 'comparison')
        self.assertEqual(report['runs'][0]['status'], 'generated')
        self.assertTrue(all(r['status'] == 'error' and r['path'] is None and r['valid_glb'] is False for r in report['runs'][1:]))
        self.assertIn('bad mask', report['runs'][1]['preprocessing']['warnings'])
        self.assertFalse(report['quality_improvement_verified'])
        self.assertTrue((directory / 'report.json').is_file())

    def test_invalid_ratio_is_rejected_before_any_inference(self):
        with patch('backend.evaluate_preprocessing.generate_with_report') as generate:
            with self.assertRaises(ValueError):
                run_evaluation(self.image, self.root / 'evaluation', ratios=[float('nan')])
        generate.assert_not_called()

    def test_preprocessing_options_do_not_restart_worker(self):
        class FixtureWorker:
            def __init__(self, python):
                self.process = types.SimpleNamespace(poll=lambda: None)
                self.options = []
                self.last_response = {}
            def request(self, payload, timeout):
                self.options.append(payload['preprocessing'])
                trimesh.creation.box().export(payload['output'])
                return payload['output']
            def close(self):
                pass
        with patch.object(generator, 'Worker', side_effect=FixtureWorker) as factory:
            generator.generate_3d(str(self.image))
            with patch.dict(os.environ, {'TRIPOSR_PREPROCESS_MODE': 'photo', 'TRIPOSR_FOREGROUND_RATIO': '.75'}):
                generator.generate_3d(str(self.image))
            generator.generate_with_report(str(self.image), preprocessing=PreprocessOptions(mode='none'))
            worker = generator._CLIENT[1]
            self.assertEqual([x['mode'] for x in worker.options], ['baseline', 'photo', 'none'])
            factory.assert_called_once()

    def test_ready_protocol_and_error_timing_report(self):
        worker = object.__new__(generator.Worker)
        worker.process = types.SimpleNamespace(stdin=io.StringIO())
        worker.responses = queue.Queue()
        worker.started = time.perf_counter()
        worker.responses.put(json.dumps({'ready': True}))
        worker.responses.put(json.dumps({'id': 'case', 'path': 'fixture.glb', 'report': {}, 'worker_request_seconds': .01}))
        self.assertEqual(worker.request({'id': 'case'}, 1), 'fixture.glb')
        self.assertGreaterEqual(worker.last_response['timings']['worker_startup_seconds'], 0)
        worker.responses.put(json.dumps({'id': 'bad', 'error': 'failed', 'report': {'stage': 'preprocessing'}}))
        with self.assertRaises(generator.WorkerError) as caught:
            worker.request({'id': 'bad'}, 1)
        self.assertEqual(caught.exception.report['stage'], 'preprocessing')
        self.assertIn('communication_overhead_seconds', caught.exception.report['timings'])

    def test_real_worker_protocol_retains_runtime_across_options(self):
        # Test-only runtime, not a model substitute in production.
        script = '''
import sys, types
class FixtureRuntime:
    def __init__(self, settings):
        self.calls = 0
        self.last_report = {}
    def infer(self, image, output, preprocessing):
        self.calls += 1
        self.last_report = {'calls': self.calls, 'mode': preprocessing.mode}
        return output
sys.modules['backend.runtime'] = types.SimpleNamespace(Runtime=FixtureRuntime)
sys.argv.append('--ready-signal')
from backend.worker import main
main()
'''
        requests = [{'id': str(i), 'image': str(self.image), 'output': str(self.root / f'{i}.glb'),
                     'preprocessing': asdict(PreprocessOptions(mode=mode))} for i, mode in enumerate(['baseline', 'photo'])]
        invalid_options = dict(requests[0], id='invalid', preprocessing={'mode': 'invalid'})
        final = dict(requests[0], id='final')
        requests.extend([invalid_options, [], final])
        process = subprocess.run([sys.executable, '-c', script], text=True, input=''.join(json.dumps(r)+'\n' for r in requests), capture_output=True, timeout=30)
        self.assertEqual(process.returncode, 0, process.stderr)
        replies = [json.loads(line) for line in process.stdout.splitlines()]
        self.assertTrue(replies[0]['ready'])
        self.assertEqual([r['report']['calls'] for r in replies[1:3]], [1, 2])
        self.assertEqual([r['report']['mode'] for r in replies[1:3]], ['baseline', 'photo'])
        self.assertTrue(replies[3]['error'] and replies[4]['error'])
        self.assertEqual(replies[3]['report'], {})
        self.assertEqual(replies[4]['report'], {})
        self.assertEqual(replies[5]['report']['calls'], 3)
        self.assertFalse(any(self.root.glob('*.glb')))

    def make_runtime(self, model):
        runtime = Runtime(Settings('unused', 'unused', 'cpu', 32, 256, False,
                                  PreprocessOptions(mode='photo')))
        runtime.model = model
        runtime.device = 'cpu'
        runtime.preprocessor = Preprocessor(SegmentationFixture((80, 60)))
        return runtime

    def test_bad_segmentation_falls_back_without_losing_loaded_model(self):
        model = Mock()
        model.cfg = types.SimpleNamespace(cond_image_size=512)
        model.extract_mesh.return_value = [trimesh.creation.box()]
        runtime = self.make_runtime(model)
        good_mask = runtime.preprocessor.segmenter.mask
        runtime.preprocessor.segmenter.segment = Mock(side_effect=[RuntimeError('mask failed'), (good_mask, {})])
        first = runtime.infer(str(self.image), self.root / 'one.glb')
        self.assertEqual(runtime.last_report['preprocessing']['segmentation_outcome'], 'fallback')
        second = runtime.infer(str(self.image), self.root / 'two.glb')
        self.assertIs(runtime.model, model)
        self.assertEqual(model.call_count, 2)
        self.assertTrue(runtime.last_report['model_reused'])
        self.assertEqual(runtime.last_report['preprocessing']['segmentation_outcome'], 'predicted_mask')
        self.assertNotEqual(first, second)
        for key in ['model_loading_seconds', 'preprocessing_seconds', 'inference_seconds',
                    'mesh_extraction_seconds', 'glb_export_validation_seconds', 'worker_request_seconds']:
            self.assertGreaterEqual(runtime.last_report['timings'][key], 0)

    def test_failed_model_run_keeps_preprocessing_diagnostics(self):
        model = Mock(side_effect=RuntimeError('inference failed'))
        model.cfg = types.SimpleNamespace(cond_image_size=512)
        runtime = self.make_runtime(model)
        with self.assertRaisesRegex(RuntimeError, 'inference failed'):
            runtime.infer(str(self.image), self.root / 'missing.glb')
        self.assertEqual(runtime.last_report['stage'], 'inference')
        self.assertFalse(runtime.last_report['valid_glb'])
        self.assertIn('inference_seconds', runtime.last_report['timings'])
        self.assertEqual(runtime.last_report['preprocessing']['effective_mode'], 'photo')

    def test_optional_provenance_failure_does_not_break_model_loading(self):
        source = self.root / 'source'
        (source / 'tsr').mkdir(parents=True)
        (source / '.git').mkdir()
        (source / 'tsr/system.py').touch()
        weights = self.root / 'weights'
        weights.mkdir()
        (weights / 'config.yaml').touch()
        (weights / 'model.ckpt').touch()
        factory = Mock()
        runtime = Runtime(Settings(str(source), str(weights), 'cpu', 32, 256, False))
        original_path = list(sys.path)
        try:
            with patch.dict(sys.modules, {'tsr.system': types.SimpleNamespace(TSR=factory)}), \
                 patch('backend.runtime.subprocess.run', side_effect=subprocess.TimeoutExpired('git', 5)):
                self.assertIs(runtime.load(), factory.from_pretrained.return_value)
                self.assertIs(runtime.load(), factory.from_pretrained.return_value)
        finally:
            sys.path[:] = original_path
        factory.from_pretrained.assert_called_once()
