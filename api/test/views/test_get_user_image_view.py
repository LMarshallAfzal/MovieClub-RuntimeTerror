"""Tests of the get_user_image view."""
from api.models import User
from rest_framework.test import APITestCase
from django.urls import reverse
from rest_framework import status
from rest_framework.test import force_authenticate,APIClient

class GetUserImageViewTestCase(APITestCase):
    """Tests of the get_user_image view."""

    fixtures = [
        "api/test/fixtures/genres.json",
        'api/test/fixtures/default_user.json',
    ]

    def setUp(self):
        self.user = User.objects.get(username='johndoe')
        self.url = reverse("get_user_image")
        self.client = APIClient()

    def test_get_user_image_url(self):
        self.assertEqual(self.url, f'/user_image/')    

    def test_get_user_image_endpoint_gets_user_image_returns_200_ok(self):
        self.client.force_authenticate(user=self.user)
        self.assertTrue(self.user.is_authenticated)
        response = self.client.get(self.url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_logged_out_user_endpoint_cannot_view_user_image_returns_401_unauthorized(self):
        response = self.client.get(self.url)
        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)
    
