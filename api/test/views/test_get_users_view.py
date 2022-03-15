from api.models import User
from rest_framework.test import APITestCase
from django.urls import reverse
from rest_framework import status
from api.serializers import UserSerializer


class GetUsersViewTestCase(APITestCase):

    fixtures = [
        'api/test/fixtures/other_users.json',
        'api/test/fixtures/default_user.json',
    ]
    def setUp(self):
        self.url = reverse("users")
        self.user = User.objects.get(username='johndoe')
        self.other_user = User.objects.get(username='janedoe')

    def test_get_users_url(self):
        self.assertEqual(self.url, '/users/')    

    def test_gets_all_users(self):
        self.client.force_login(self.user)
        response = self.client.get(self.url)
        users = User.objects.all()
        serializer = UserSerializer(users, many=True)
        self.assertEqual(response.data, serializer.data)
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_logged_in_user_can_view_users(self):
        self.client.force_login(self.user)
        response = self.client.get(self.url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    # def test_logged_out_user_cannot_view_users(self):
    #     response = self.client.get(self.url)
    #     self.assertEqual(response.status_code, status.HTTP_403_FORBIDDEN)


