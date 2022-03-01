from api.models import User
from django.test import TestCase
from django.urls import reverse
import json

# self.form_input = {
#             'new_password': 'Password345',
#             'password_confirmation': 'Password345'
#         }

# def test_successful_change_user_password(self):
#         self.client.login(email='johndoe@example.org', password='Password123')
#         self.assertTrue(self._is_logged_in())
#         response = self.client.post(self.url, self.form_input, follow=True)
#         response_url = reverse('home')
#         self.assertRedirects(response, response_url, status_code=302, target_status_code=200)
#         self.assertTemplateUsed(response, 'home.html')
#         user = User.objects.get(email='johndoe@example.org')
#         self.assertTrue(check_password('Password345', user.password))


class ChangePasswordViewTestCase(TestCase):

    fixtures = [
        'api/test/fixtures/default_user.json',
        'api/test/fixtures/other_users.json',
    ]

    def setUp(self):
        self.user = User.objects.get(username='johndoe')
        self.form_input = {
            "old_password": "Pa$$w0rd567",
            "new_password": "Foobar69",
            "new_password_confirmation": "Foobar69"
        }
        self.url = reverse('change_password')

    def test_post_to_change_password_endpoint_as_logged_in_user_is_200_ok(self):
        details = {'username' : self.user.username, 'password':'Pa$$w0rd567'}
        input = {
            "old_password": "Pa$$w0rd567",
            "new_password": "Foobar69",
            "new_password_confirmation": "Foobar69"
        }  
        input = json.dumps(input)
        self.client.login(username = details['username'],password = details['password'])
        response = self.client.put(self.url, input, content_type="application/json")
        self.assertEqual(response.status_code, 200)

    # def test_post_to_change_password_endpoint_as_anonymous_user_is_403_forbidden(self):
    #     # details = {'username' : self.user.username, 'password':'Pa$$w0rd567'}
    #     # self.client.login(username = details['username'],password = details['password'])
    #     # url = "/change_password/"
    #     # input = {
    #     #     "old_password": "Pa$$w0rd567",
    #     #     "new_password": "Foobar69",
    #     #     "new_password_confirmation": "Foobar69"
    #     # }
    #     # input = json.dumps(input)
    #     # response = self.client.put(self.url, input, content_type="application/json")
    #     # self.assertEqual(response.status_code, 403)
    #     self.assertEqual(self.url, "/change_password/")

    def test_post_to_password_endpoint_with_invalid_current_password_does_not_change_password(self):
        details = {'username' : self.user.username, 'password':'Pa$$w0rd567'}
        self.client.login(username = details['username'],password = details['password'])
        url = "/password/"
        input = {
            "old_password": "Foobar69",
            "new_password": "Pa$$w0rd567",
            "new_password_confirmation": "Password123",
        }
        response = self.client.put(url, input)
        self.assertFalse(self.user.check_password("Foobar69"))

    def test_post_to_password_endpoint_with_non_matching_passwords_does_not_change_password(self):
        details = {'username' : self.user.username, 'password':'Pa$$w0rd567'}
        self.client.login(username = details['username'],password = details['password'])
        url = "/password/"
        input = {
            "old_password": "Pa$$w0rd567",
            "new_password": "Hello123",
            "password_confirmation": "World69",
        }
        response = self.client.put(url, input)
        self.assertTrue(self.user.check_password("Pa$$w0rd567"))
