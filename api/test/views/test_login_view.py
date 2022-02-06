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
        details = {'username' : self.user.username, 'password':'Password123'}
        response = self.client.login(
            username = details['username'],password = details['password']
        )
        self.assertTrue(response)
        response = self.client.post(self.url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    #status code cant be 200
    def test_user_logged_in_unsuccessfully(self):
        details = {'username' : "wrongusername", 'password':'Password123'}
        response = self.client.login(
            username = details['username'],password = details['password']
        )
        self.assertFalse(response)
        response = self.client.post(self.url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)


        



    
