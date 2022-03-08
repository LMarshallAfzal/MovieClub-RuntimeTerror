from api.models import User
from rest_framework.test import APITestCase
from django.urls import reverse
from rest_framework import status
import json

class EditUserViewTestCase(APITestCase):
    
    fixtures = [
        'api/test/fixtures/default_user.json',
        'api/test/fixtures/other_users.json',
    ]

    def setUp(self):
        self.user = User.objects.get(username='johndoe')
        self.second_user = User.objects.get(username='janedoe')
        self.url = reverse('edit_profile', kwargs={'username':self.user.username})
        self.form_input = {
            "first_name": "John",
            "last_name": "Doe",
            "email": "johndoe@example.org",
            "bio": "The quick brown fox jumps over the lazy dog.",
            "preferences": "Action, Drama, Horror, Comedy, Science fiction",
        }

    def test_post_to_edit_user_endpoint_with_valid_data_edits_current_user(self):
        details = {'username' : 'johndoe', 'password':'Pa$$w0rd567'}
        input = {
            "username": "johndoe",
            "first_name": "John",
            "last_name": "Doe",
            "email": "johndoe@example.org",
            "bio": "The quick brown fox jumps over the lazy dog.",
            "preferences": "Action, Drama, Horror, Comedy, Science fiction"
        }
        input = json.dumps(input)
        self.client.login(username = details['username'],password = details['password'])
        before = User.objects.count()
        response = self.client.put(self.url, input, content_type="application/json")
        after = User.objects.count()
        self.assertEqual(after, before)
        self.assertEqual(response.status_code, 200)

    def test_post_to_edit_user_endpoint_with_not_unique_email_does_not_edit_the_user(self):
        self.client.force_login(self.user)
        before = User.objects.count()
        input = self.form_input
        input['email'] = self.second_user.email
        response = self.client.put(self.url, input)
        after = User.objects.count()
        self.assertEqual(after, before)
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)

    def test_post_to_edit_user_endpoint_with_blank_preferences_does_not_edit_the_user(self):
        self.client.force_login(self.user)
        before = User.objects.count()
        input = self.form_input
        input['email'] = ''
        response = self.client.put(self.url, input)
        after = User.objects.count()
        self.assertEqual(after, before)
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)

    
    def test_post_to_edit_user_endpoint_with_blank_first_name_does_not_edit_the_user(self):
        self.client.force_login(self.user)
        before = User.objects.count()
        input = self.form_input
        input['first_name'] = ''
        response = self.client.put(self.url, input)
        after = User.objects.count()
        self.assertEqual(after, before)
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)

    
    def test_post_to_edit_user_endpoint_with_blank_last_name_does_not_edit_the_user(self):
        self.client.force_login(self.user)
        before = User.objects.count()
        input = self.form_input
        input['last_name'] = ''
        response = self.client.put(self.url, input)
        after = User.objects.count()
        self.assertEqual(after, before)
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)