from api.models import User
from django.test import TestCase
from django.urls import reverse
from rest_framework import status
from api.test.helpers import LogInTester


class LogOutViewTestCase(TestCase,LogInTester):

    fixtures = ["api/test/fixtures/default_user.json"]


    def setUp(self):
        self.user = User.objects.get(username='johndoe')
        self.url = reverse('log_out')
        self.details = {
            'username': self.user.username, 'password': 'Pa$$w0rd567'}


    def test_get_of_log_out_endpoint_as_logged_in_user_is_200_ok(self):
        self.client.login(username=self.details['username'], password=self.details['password'])
        self.assertTrue(self._is_logged_in())
        response = self.client.get(self.url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertFalse("_auth_user_id" in self.client.session.keys())

    def test_get_of_log_out_endpoint_as_anonymous_user_is_403_forbidden(self):
        response = self.client.get(self.url)
        self.assertEqual(response.status_code, status.HTTP_403_FORBIDDEN)
