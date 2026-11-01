import os
import unittest
from unittest.mock import patch

import app


class SharingTests(unittest.TestCase):
    def test_local_mode_never_prompts_or_shares(self):
        with patch.object(app.getpass, "getpass") as prompt:
            self.assertEqual(app.sharing_options(), {"share": False})
            prompt.assert_not_called()

    def test_share_uses_environment_password(self):
        with patch.dict(os.environ, {"DEMO_PASSWORD": "test-secret"}):
            self.assertEqual(app.sharing_options(True),
                             {"share": True, "auth": ("judges", "test-secret")})

    def test_share_prompts_when_password_missing(self):
        with patch.dict(os.environ, {}, clear=True), patch.object(
                app.getpass, "getpass", return_value="entered-secret"):
            self.assertEqual(app.sharing_options(True)["auth"],
                             ("judges", "entered-secret"))

    def test_share_rejects_empty_password(self):
        with patch.dict(os.environ, {}, clear=True), patch.object(
                app.getpass, "getpass", return_value="   "):
            with self.assertRaisesRegex(ValueError, "password"):
                app.sharing_options(True)
