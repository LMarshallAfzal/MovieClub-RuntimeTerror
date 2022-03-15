from api.models import User
from django.test import TestCase
from django.urls import reverse
import json
from rest_framework import status
from api.test.helpers import LogInTester

class ChangePasswordViewTestCase(TestCase,LogInTester):

    fixtures = [
        'api/test/fixtures/default_user.json',
        'api/test/fixtures/other_users.json',
    ]

    def setUp(self):
        self.user = User.objects.get(username='johndoe')
        self.input = {
            "old_password": "Pa$$w0rd567",
            "new_password": "Foobar69",
            "new_password_confirmation": "Foobar69"
             }
        self.details = {'username' : self.user.username, 'password':'Pa$$w0rd567'}
        self.url = reverse('change_password')

    def test_put_to_change_password_endpoint_as_logged_in_user_returns_200_ok(self):
        self.client.login(username = self.details['username'],password = self.details['password'])
        self.assertTrue(self._is_logged_in())
        input = json.dumps(self.input)
        response = self.client.put(self.url, input, content_type="application/json")
        self.assertEqual(response.status_code, 200)

    def test_put_to_password_endpoint_with_invalid_current_password_does_not_change_password_returns_400_bad_request(self):
        self.client.login(username = self.details['username'],password = self.details['password'])
        self.assertTrue(self._is_logged_in())
        self.input["old_password"] = "WrongCurrentPassword"
        input = json.dumps(self.input)
        response = self.client.put(self.url, input, content_type="application/json")
        self.assertFalse(self.user.check_password(self.input["old_password"]))
        self.assertEqual(response.status_code,status.HTTP_400_BAD_REQUEST)

    def test_put_to_password_endpoint_with_non_matching_passwords_does_not_change_password_400_bad_requests(self):
        self.client.login(username = self.details['username'],password = self.details['password'])
        self.assertTrue(self._is_logged_in())
        self.input["new_password"] = "DoesntMatch"
        input = json.dumps(self.input)
        response = self.client.put(self.url, input, content_type="application/json")
        self.assertTrue(self.user.check_password(self.input["old_password"]))
        self.assertEqual(response.status_code,status.HTTP_400_BAD_REQUEST)


