from api.models import User
from django.test import TestCase

class ChangePasswordViewTestCase(TestCase):

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

    def test_post_to_change_password_endpoint_as_logged_in_user_is_200_ok(self):
        self.client.force_login(self.user)
        url = "/change_password/"
        input = {
            "old_password": "Password123",
            "new_password": "Foobar69",
            "password_confirmation": "Foobar69",
        }
        response = self.client.post(url, input)
        self.assertEqual(response.status_code, 200)

    def test_post_to_change_password_endpoint_as_anonymous_user_is_403_forbidden(self):
        url = "/change_password/"
        input = {
            "old_password": "Password123",
            "new_password": "Foobar69",
            "password_confirmation": "Foobar69",
        }
        response = self.client.post(url, input)
        self.assertEqual(response.status_code, 403)

    def test_post_to_password_endpoint_with_invalid_current_password_does_not_change_password(
        self,
    ):
        url = "/password/"
        input = {
            "old_password": "Foobar69",
            "new_password": "Password123",
            "password_confirmation": "Password123",
        }
        response = self.client.post(url, input)
        self.assertFalse(self.user.check_password("Foobar69"))

    def test_post_to_password_endpoint_with_non_matching_passwords_does_not_change_password(
        self,
    ):
        url = "/password/"
        input = {
            "old_password": "Password123",
            "new_password": "Hello123",
            "password_confirmation": "World69",
        }
        response = self.client.post(url, input)
        self.assertTrue(self.user.check_password("Password123"))
