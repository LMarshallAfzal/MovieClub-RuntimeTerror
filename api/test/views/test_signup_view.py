from api.models import User
from rest_framework.test import APITestCase


class SignUpViewTestCase(APITestCase):
    def test_post_to_sign_up_endpoint_with_valid_data_creates_new_user(self):
        before = User.objects.count()
        url = "/sign_up/"
        input = {
            "username": "@johndoe",
            "first_name": "John",
            "last_name": "Doe",
            "email": "johndoe@example.org",
            "bio": "The quick brown fox jumps over the lazy dog.",
            "preferences": "Action, Drama, Horror, Comedy, Science fiction",
            "password": "complexpassword",
            "password_confirmation": "complexpassword",
        }
        response = self.client.post(url, input)
        after = User.objects.count()
        self.assertEqual(after, before + 1)
        self.assertEqual(response.status_code, 201)

    def test_post_to_sign_up_endpoint_with_invalid_data_does_not_create_new_user(self):
        before = User.objects.count()
        url = "/sign_up/"
        input = {
            "username": "",
            "first_name": "John",
            "last_name": "Doe",
            "email": "johndoe@example.org",
            "bio": "The quick brown fox jumps over the lazy dog.",
            "preferences": "Action, Drama, Horror, Comedy, Science fiction",
            "password": "Password123",
            "password_confirmation": "Foobar69",
        }
        response = self.client.post(url, input)
        after = User.objects.count()
        self.assertEqual(after, before)
        self.assertEqual(response.status_code, 400)