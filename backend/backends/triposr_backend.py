"""Adapter around the preserved TripoSR worker and preprocessing pipeline."""


class TripoSRBackend:
    def generate_report(self, image_path, prompt=None, *, preprocessing=None, output_dir=None):
        from ..generator import _generate_triposr_report
        report = _generate_triposr_report(image_path, prompt, preprocessing=preprocessing, output_dir=output_dir)
        report.update(engine='triposr', backend='triposr', actual_engine='triposr')
        return report

    def close(self):
        # The original client/lock remain in generator for backward compatibility.
        from ..generator import _shutdown_triposr_worker
        _shutdown_triposr_worker()
