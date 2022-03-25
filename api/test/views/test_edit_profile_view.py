from api.models import User
from rest_framework.test import APITestCase
from django.urls import reverse
from rest_framework import status
import json
from rest_framework.test import force_authenticate,APIClient

class EditUserViewTestCase(APITestCase):
    
    fixtures = [
        'api/test/fixtures/genres.json',
        'api/test/fixtures/default_user.json',
        'api/test/fixtures/other_users.json',
    ]

    def setUp(self):
        self.user = User.objects.get(username='johndoe')
        self.second_user = User.objects.get(username='janedoe')
        self.url = reverse('edit_profile', kwargs={'user_id':self.user.id})
        self.form_input = {
            "username": "johndoe",
            "first_name": "John",
            "last_name": "Doe",
            "email": "johndoe@example.org",
            "bio": "The quick brown fox jumps over the lazy dog.",
            "preferences": [1,2,3,4]
        }

    def test_put_to_edit_user_endpoint_with_valid_data_edits_current_user_returns_200_ok(self):
        self.client.force_authenticate(user=self.user)
        self.assertTrue(self.user.is_authenticated)
        input = json.dumps(self.form_input)
        before = User.objects.count()
        response = self.client.put(self.url, input, content_type="application/json")
        after = User.objects.count()
        self.assertEqual(after, before)
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_put_to_edit_user_endpoint_with_not_unique_email_does_not_edit_the_user_returns_400_bad_request(self):
        self.client.force_authenticate(user=self.user)
        self.assertTrue(self.user.is_authenticated)
        before = User.objects.count()
        self.form_input['email'] = self.second_user.email
        response = self.client.put(self.url, self.form_input)
        after = User.objects.count()
        self.assertEqual(after, before)
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)

    def test_put_to_edit_user_endpoint_with_wrong_email_format_does_not_edit_the_user_returns_400_bad_request(self):
        self.client.force_authenticate(user=self.user)
        self.assertTrue(self.user.is_authenticated)
        before = User.objects.count()
        self.form_input['email'] = 'wrong@format'
        response = self.client.put(self.url, self.form_input)
        after = User.objects.count()
        self.assertEqual(after, before)
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)

    def test_put_to_edit_user_endpoint_with_blank_email_does_not_edit_the_user_returns_400_bad_request(self):
        self.client.force_authenticate(user=self.user)
        self.assertTrue(self.user.is_authenticated)
        before = User.objects.count()
        input = self.form_input
        input['email'] = ''
        response = self.client.put(self.url, input)
        after = User.objects.count()
        self.assertEqual(after, before)
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
    
    def test_put_to_edit_user_endpoint_with_blank_first_name_does_not_edit_the_user_returns_bad_request(self):
        self.client.force_authenticate(user=self.user)
        self.assertTrue(self.user.is_authenticated)     
        before = User.objects.count()
        input = self.form_input
        input['first_name'] = ''
        response = self.client.put(self.url, input)
        after = User.objects.count()
        self.assertEqual(after, before)
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
    
    def test_put_to_edit_user_endpoint_with_blank_last_name_does_not_edit_the_user_returns_400_bad_request(self):
        self.client.force_authenticate(user=self.user)
        self.assertTrue(self.user.is_authenticated)
        before = User.objects.count()
        input = self.form_input
        input['last_name'] = ''
        response = self.client.put(self.url, input)
        after = User.objects.count()
        self.assertEqual(after, before)
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)

    def test_put_to_edit_user_endpoint_with_blank_preferences_does_not_edit_the_user_returns_400_bad_request(self):
        self.client.force_authenticate(user=self.user)
        self.assertTrue(self.user.is_authenticated)
        before = User.objects.count()
        input = self.form_input
        input['preferences'] = []
        response = self.client.put(self.url, input)
        after = User.objects.count()
        self.assertEqual(after, before)
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
