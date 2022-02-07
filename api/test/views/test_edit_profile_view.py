from api.models import User
from rest_framework.test import APITestCase
from django.urls import reverse
from rest_framework import status

class EditUserViewTestCase(APITestCase):
    
    fixtures = [
        'api/test/fixtures/default_user.json',
        'api/test/fixtures/other_users.json',
    ]

    def setUp(self):
        self.user = User.objects.get(username='johndoe')
        self.second_user = User.objects.get(username='janedoe')
        self.url = reverse('edit_profile')
        self.form_input = {
            "first_name": "John",
            "last_name": "Doe",
            "email": "johndoe@example.org",
            "bio": "The quick brown fox jumps over the lazy dog.",
            "preferences": "Action, Drama, Horror, Comedy, Science fiction",
        }

    def test_post_to_edit_user_endpoint_with_valid_data_edits_current_user(self):
        before = User.objects.count()
        response = self.client.post(self.url, self.form_input)
        after = User.objects.count()
        self.assertEqual(after, before)
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_post_to_edit_user_endpoint_with_not_unique_email_does_not_edit_the_user(self):
        before = User.objects.count()
        input = self.form_input
        input['email'] = self.second_user.email
        response = self.client.post(self.url, input)
        after = User.objects.count()
        self.assertEqual(after, before)
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)

    def test_post_to_edit_user_endpoint_with_blank_preferences_does_not_edit_the_user(self):
        before = User.objects.count()
        input = self.form_input
        input['email'] = ''
        response = self.client.post(self.url, input)
        after = User.objects.count()
        self.assertEqual(after, before)
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)

    
    def test_post_to_edit_user_endpoint_with_blank_first_name_does_not_edit_the_user(self):
        before = User.objects.count()
        input = self.form_input
        input['first_name'] = ''
        response = self.client.post(self.url, input)
        after = User.objects.count()
        self.assertEqual(after, before)
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)

    
    def test_post_to_edit_user_endpoint_with_blank_last_name_does_not_edit_the_user(self):
        before = User.objects.count()
        input = self.form_input
        input['last_name'] = ''
        response = self.client.post(self.url, input)
        after = User.objects.count()
        self.assertEqual(after, before)
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)