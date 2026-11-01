import os
import unittest
from unittest.mock import patch

import app


class SharingTests(unittest.TestCase):
    def test_local_mode_does_not_share(self):
        self.assertEqual(app.sharing_options(), {"share": False})

    def test_share_has_no_login_or_password_prompt(self):
        with patch.dict(os.environ, {}, clear=True), patch(
                "getpass.getpass", side_effect=AssertionError("Unexpected password prompt")):
            self.assertEqual(app.sharing_options(True), {"share": True})

    def test_legacy_password_does_not_enable_authentication(self):
        with patch.dict(os.environ, {"DEMO_PASSWORD": "old-test-secret"}):
            self.assertEqual(app.sharing_options(True), {"share": True})
