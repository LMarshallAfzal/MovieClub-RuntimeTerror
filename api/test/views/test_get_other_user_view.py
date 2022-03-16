from api.models import User
from rest_framework.test import APITestCase
from django.urls import reverse
from rest_framework import status
from api.serializers import UserSerializer
from api.test.helpers import LogInTester



class GetOtherUserViewTestCase(APITestCase,LogInTester):

    fixtures = [
        'api/test/fixtures/other_users.json',
        'api/test/fixtures/default_user.json',
    ]

    def setUp(self):
        self.user = User.objects.get(username='johndoe')
        self.other_user = User.objects.get(username='janedoe')
        self.url = reverse("get_other_user", kwargs={'user_id':self.other_user.id})
        self.details = {'username' : 'johndoe', 'password':'Pa$$w0rd567'}

    def test_get_a_single_user_url(self):
        self.assertEqual(self.url, f'/user/{self.other_user.id}/')    

    def test_get_a_single_user_endpoint_gets_other_user_returns_200_ok(self):
        self.client.login(username = self.details['username'],password = self.details['password'])
        self.assertTrue(self._is_logged_in())
        response = self.client.get(self.url)
        serializer = UserSerializer(self.other_user, many=False)
        self.assertEqual(response.data, serializer.data)
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_get_a_single_user_endpoint_other_user_does_not_exist_returns_404_not_found(self):
        self.client.login(username = self.details['username'],password = self.details['password'])
        self.assertTrue(self._is_logged_in())
        invalid_user_url = reverse("get_other_user",kwargs = {'user_id': 100})
        response = self.client.get(invalid_user_url)
        self.assertEqual(response.status_code, status.HTTP_404_NOT_FOUND)

    def test_logged_out_user_cannot_view_a_single_user(self):
        response = self.client.get(self.url)
        self.assertEqual(response.status_code, status.HTTP_403_FORBIDDEN)
    


