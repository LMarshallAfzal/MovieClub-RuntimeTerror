from rest_framework.test import APITestCase, APIClient
from rest_framework import status
from django.urls import reverse
from api.models import User

class LoginViewTestcase(APITestCase):

    fixtures = [
        'api/test/fixtures/default_user.json',
        'api/test/fixtures/other_users.json',
    ]

    def setUp(self):
        self.client = APIClient()
        self.user = User.objects.get(username='johndoe')
        self.url = reverse('log_in')

    def test_login_url(self):
        self.assertEqual(self.url, '/log_in/')

    def test_user_logged_in_successfully(self):
        details = {'username' : self.user.username, 'password':'Pa$$w0rd567'}
        response = self.client.post(self.url, details)
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_wrong_username_returns_400(self):
        details = {'username' : "wrongusername", 'password':'Pa$$w0rd567'}
        response = self.client.post(self.url,details)
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)

    def test_username_password_may_not_be_blank(self):
        details = {'username' : "", 'password':""}
        response = self.client.post(self.url, details)
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)

    def test_wrong_password_returns_400(self):
        details = {'username' : self.user.username, 'password':'wrongpassword'}
        response = self.client.post(self.url, details)
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
