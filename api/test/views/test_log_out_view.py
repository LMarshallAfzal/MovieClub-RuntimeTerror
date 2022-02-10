from api.models import User
from django.test import TestCase

class LogOutViewTestCase(TestCase):

    fixtures = [
        'api/test/fixtures/default_user.json',
    ]

    def setUp(self):
        self.user = User.objects.get(username='johndoe')

    def test_get_of_log_out_endpoint_as_logged_in_user_is_200_ok(self):
        self.client.force_login(self.user)
        url = "/log_out/"
        response = self.client.get(url)
        self.assertEqual(response.status_code, 200)
        self.assertFalse("_auth_user_id" in self.client.session.keys())

    def test_get_of_log_out_endpoint_as_anonymous_user_is_403_forbidden(self):
        url = "/log_out/"
        response = self.client.get(url)
        self.assertEqual(response.status_code, 403)
