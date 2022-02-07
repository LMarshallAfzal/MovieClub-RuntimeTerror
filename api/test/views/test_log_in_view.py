from api.models import User
from django.test import TestCase


class LogInViewTestCase(TestCase):
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

    def test_post_to_log_in_endpoint_with_valid_credentials_user_is_logged_in(self):
        url = "/log_in/"
        input = {
            "username": "@johndoe",
            "password": "Password123",
        }
        response = self.client.post(url, input)
        self.assertEqual(response.status_code, 200)
        self.assertEqual(response.data["username"], self.user.username)

    def test_post_to_log_in_endpoint_with_invalid_credentials_user_is_not_logged_in(
        self,
    ):
        url = "/log_in/"
        input = {
            "username": "@johndoe",
            "password": "Foobar69",
        }
        response = self.client.post(url, input)
        self.assertEqual(response.status_code, 401)
        self.assertIsNone(response.data.get("username", None))
