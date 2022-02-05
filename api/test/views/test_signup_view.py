from rest_framework.test import APITestCase, APIClient
from rest_framework import status
from django.urls import reverse
from api.models import User

class SignUpViewTestCase(APITestCase):

    fixtures = [
        'api/test/fixtures/default_user.json',
        'api/test/fixtures/other_users.json',
    ]

    def setUp(self):
        self.client = APIClient()
        self.url = reverse('signup')
        self.user = {
            'username': "johndoe",
            'first_name': "John",
            'last_name': "Doe",
            'email': "johndoe@example.org",
            'bio': "Hello, I am John Doe",
            'preferences': "Action, Horror",
            'password': "pbkdf2_sha256$260000$4BNvFuAWoTT1XVU8D6hCay$KqDCG+bHl8TwYcvA60SGhOMluAheVOnF1PMz0wClilc=",
        }
        
        self.response = self.client.post(reverse('signup'), self.user)

    def test_sign_up_url(self):
        self.assertEqual(self.url, '/signup/')

    def test_user_cannot_sign_up_without_data(self):
        response = self.client.post(self.url)
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)

    def test_user_can_sign_up_correctly(self):
        response = self.client.post(self.url, self.user, format="json")
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)

    def test_api_can_create_user_details(self):
        self.assertEqual(self.response.status_code, status.HTTP_201_CREATED)