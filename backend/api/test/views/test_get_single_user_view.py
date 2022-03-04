from backend.api.models import User
from rest_framework.test import APITestCase
from django.urls import reverse
from rest_framework import status
from backend.api.serializers import UserSerializer



class GetSingleUserViewTestCase(APITestCase):

    fixtures = [
        'api/test/fixtures/other_users.json',
        'api/test/fixtures/default_user.json',
    ]

    def setUp(self):
        self.user = User.objects.get(username='johndoe')
        self.other_user = User.objects.get(username='janedoe')
        self.url = reverse("user", kwargs={'username':self.other_user.username})

    def test_get_a_single_user_url(self):
        self.assertEqual(self.url, '/user/janedoe/')    

    def test_get_a_single_user(self):
        self.client.force_login(self.user)
        response = self.client.get(self.url)
        user = User.objects.get(pk=2)
        serializer = UserSerializer(user, many=False)
        self.assertEqual(response.data, serializer.data)
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_logged_in_user_can_view_a_single_user(self):
        self.client.force_login(self.user)
        response = self.client.get(self.url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    # def test_logged_out_user_cannot_view_a_single_user(self):
    #     response = self.client.get(self.url)
    #     self.assertEqual(response.status_code, status.HTTP_403_FORBIDDEN)
    


