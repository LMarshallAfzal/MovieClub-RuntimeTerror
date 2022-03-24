from api.models import User
from django.test import TestCase
from django.urls import reverse
from rest_framework import status
from rest_framework.test import force_authenticate,APIClient


class LogOutViewTestCase(TestCase):

    fixtures = [
        "api/test/fixtures/default_genre.json",
        "api/test/fixtures/other_genres.json",
        "api/test/fixtures/default_user.json"
    ]


    def setUp(self):
        self.user = User.objects.get(username='johndoe')
        self.url = reverse('log_out')
        self.client = APIClient()


    def test_get_of_log_out_endpoint_as_logged_in_user_is_200_ok(self):
        self.client.force_authenticate(user=self.user)
        self.assertTrue(self.user.is_authenticated)
        response = self.client.get(self.url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertFalse("_auth_user_id" in self.client.session.keys())

    def test_get_of_log_out_endpoint_as_anonymous_user_is_403_forbidden(self):
        response = self.client.get(self.url)
        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)
