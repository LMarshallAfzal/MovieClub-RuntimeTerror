from api.models import User
from rest_framework.test import APITestCase
from django.urls import reverse
from rest_framework import status

class SignUpViewTestCase(APITestCase):
    
    fixtures = [
        'api/test/fixtures/other_users.json',
    ]

    def setUp(self):
        self.url = reverse('sign_up')
        self.form_input = {
            "username": "johndoe",
            "first_name": "John",
            "last_name": "Doe",
            "email": "johndoe@example.org",
            "bio": "The quick brown fox jumps over the lazy dog.",
            "preferences": "Action, Drama, Horror, Comedy, Science fiction",
            "password": "complexpassword",
            "password_confirmation": "complexpassword",
        }
        self.second_user = User.objects.get(username='janedoe')

    def test_post_to_sign_up_endpoint_with_valid_data_creates_new_user(self):
        before = User.objects.count()
        response = self.client.post(self.url, self.form_input)
        after = User.objects.count()
        self.assertEqual(after, before + 1)
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)

    def test_post_to_sign_up_endpoint_with_not_unique_username_does_not_create_new_user(self):
        before = User.objects.count()
        input = self.form_input
        input['username'] = self.second_user.username
        response = self.client.post(self.url, input)
        after = User.objects.count()
        self.assertEqual(after, before)
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)

    def test_post_to_sign_up_endpoint_with_not_unique_email_does_not_create_new_user(self):
        before = User.objects.count()
        input = self.form_input
        input['email'] = self.second_user.email
        response = self.client.post(self.url, input)
        after = User.objects.count()
        self.assertEqual(after, before)
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
