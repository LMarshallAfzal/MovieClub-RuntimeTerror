from rest_framework.test import APITestCase, APIClient
from rest_framework import status
from django.urls import reverse
from api.models import User

class LoginViewTestcase(APITestCase):

    fixtures = [
        'api/test/fixtures/genres.json',
        'api/test/fixtures/default_user.json',
        'api/test/fixtures/other_users.json',
    ]

    def setUp(self):
        self.client = APIClient()
        self.user = User.objects.get(username='johndoe')
        self.url = reverse('log_in')
        self.client = APIClient()
        self.details = {'username' : self.user.username, 'password':'Pa$$w0rd567'}

    def test_login_url(self):
        self.assertEqual(self.url, '/log_in/')

    def test_post_log_in_endpoint_user_logs_in_successfully_returns_200_ok(self):
        response = self.client.login(
            username = self.details['username'],password = self.details['password']
        )
        self.assertTrue(response)
        response = self.client.post(self.url, self.details)
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_post_log_in_endpoint_user_logs_in_un_with_unsuccessfully_with_wrong_username_returns_400_bad_request(self):
        response = self.client.login(
            username = self.details['username'],password = self.details['password']
        )
        self.assertFalse(response)
        response = self.client.post(self.url,self.details)
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)

    def test_post_log_in_endpoint_user_logs_in_un_with_unsuccessfully_with_wrong_username_returns_400_bad_request(self):
        self.details['username'] = 'wrongusername'
        response = self.client.login(
            username = self.details['username'],password = self.details['password']
        )
        self.assertFalse(response)
        self.details['username'] = 'wrongusername'
        response = self.client.post(self.url,self.details)
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)

    def test_post_log_in_endpoint_user_logs_in_un_with_unsuccessfully_with_wrong_password_returns_400_bad_request(self):
        self.details['password'] = 'wrongpassword'
        response = self.client.login(
            username = self.details['username'],password = self.details['password']
        )
        self.assertFalse(response)
        response = self.client.post(self.url,self.details)
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)

    def test_post_log_in_endpoint_user_logs_in_un_with_unsuccessfully_with_blank_fields_returns_400_bad_request(self):
        self.details['username'] = ''
        self.details['password'] = ''
        response = self.client.login(
            username = self.details['username'],password = self.details['password']
        )
        self.assertFalse(response)
        response = self.client.post(self.url, self.details)
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)

    