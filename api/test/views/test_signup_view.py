from api.models import User
from rest_framework.test import APITestCase,APIClient
from django.urls import reverse
from rest_framework import status

class SignUpViewTestCase(APITestCase):
    
    fixtures = [
        'api/test/fixtures/genres.json',
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
            "preferences": [1, 2, 3, 4],
            "password": "Password123",
            "password_confirmation": "Password123",
        }
        self.second_user = User.objects.get(username='janedoe')
        self.client = APIClient()

    def test_post_to_sign_up_endpoint_with_valid_data_creates_new_user_returns_201_created(self):
        before = User.objects.count()
        response = self.client.post(self.url, self.form_input)
        after = User.objects.count()
        self.assertEqual(after, before + 1)
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)

    def test_post_to_sign_up_endpoint_with_not_unique_username_does_not_create_new_user_returns_400_bad_request(self):
        before = User.objects.count()
        input = self.form_input
        input['username'] = self.second_user.username
        response = self.client.post(self.url, input)
        after = User.objects.count()
        self.assertEqual(after, before)
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)

    def test_post_to_sign_up_endpoint_with_not_unique_email_does_not_create_new_user_returns_400_bad_request(self):
        before = User.objects.count()
        self.form_input['email'] = self.second_user.email
        response = self.client.post(self.url, self.form_input)
        after = User.objects.count()
        self.assertEqual(after, before)
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)

    def test_post_to_sign_up_endpoint_with_non_matching_passwords_returns_400_bad_request(self):
        self.form_input['password_confirmation'] = 'wrongpassword'
        response = self.client.post(self.url, self.form_input)
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)

    def test_post_to_sign_up_endpoint_with_blank_preferences_returns_400_bad_request(self):
        self.form_input['preferences'] = []
        response = self.client.post(self.url, self.form_input)
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)

    def test_post_to_sign_up_endpoint_with_blank_first_name_returns_400_bad_request(self):
        self.form_input['first_name'] = ''
        response = self.client.post(self.url, self.form_input)
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)

    def test_post_to_sign_up_endpoint_with_blank_last_name_returns_400_bad_request(self):
        self.form_input['last_name'] = ''
        response = self.client.post(self.url, self.form_input)
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)

    def test_post_to_sign_up_endpoint_with_blank_email_returns_400_bad_request(self):
        self.form_input['email'] = ''
        response = self.client.post(self.url, self.form_input)
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)

    def test_post_to_sign_up_endpoint_with_blank_username_returns_400_bad_request(self):
        self.form_input['username'] = ''
        response = self.client.post(self.url, self.form_input)
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)

    def test_post_to_sign_up_endpoint_with_blank_password_returns_400_bad_request(self):
        self.form_input['password'] = ''
        response = self.client.post(self.url, self.form_input)
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)

    def test_post_to_sign_up_endpoint_with_blank_password_confirmation_returns_400_bad_request(self):
        self.form_input['password_confirmation'] = ''
        response = self.client.post(self.url, self.form_input)
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)

    def test_post_to_sign_up_endpoint_with_blank_bio_returns_201_created(self):
        self.form_input['bio'] = ''
        response = self.client.post(self.url, self.form_input)
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)

    def test_post_to_sign_up_endpoint_with_non_unique_preferences_returns_201_created(self):
        other_preferences = self.second_user.preferences.all().values_list('id', flat=True)
        self.form_input['preferences'] = other_preferences
        response = self.client.post(self.url, self.form_input)
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)

    def test_post_to_sign_up_endpoint_with_non_unique_bio_returns_201_created(self):
        self.form_input['bio'] = self.second_user.bio
        response = self.client.post(self.url, self.form_input)
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)

    def test_post_to_sign_up_endpoint_with_non_unique_first_name_returns_201_created(self):
        self.form_input['first_name'] = self.second_user.first_name
        response = self.client.post(self.url, self.form_input)
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)

    def test_post_to_sign_up_endpoint_with_non_unique_last_name_returns_201_created(self):
        self.form_input['last_name'] = self.second_user.last_name
        response = self.client.post(self.url, self.form_input)
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
