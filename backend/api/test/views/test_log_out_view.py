from backend.api.models import User
from django.test import TestCase


class LogOutViewTestCase(TestCase):
    def setUp(self):
        self.user = User.objects.create_user(
            username="@johndoe",
            first_name="John",
            last_name="Doe",
            email="johndoe@example.org",
            bio="The quick brown fox jumps over the lazy dog.",
            preferences="Action, Drama, Horror, Comedy, Science fiction",
            password="Password123",
            is_active=True,
        )

    def test_get_of_log_out_endpoint_as_logged_in_user_is_200_ok(self):
        self.client.force_login(self.user)
        url = "/log_out/"
        response = self.client.get(url)
        self.assertEqual(response.status_code, 200)
        self.assertFalse("_auth_user_id" in self.client.session.keys())

    def test_get_of_log_out_endpoint_as_anonymous_user_is_403_forbidden(self):
        url = "/log_out/"
        response = self.client.get(url)
        self.assertEqual(response.status_code, 403)
