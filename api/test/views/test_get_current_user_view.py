from api.models import User,Club
from rest_framework.test import APITestCase
from django.urls import reverse
from rest_framework import status
from api.serializers import UserSerializer
from rest_framework.test import force_authenticate,APIClient


class GetClubMembersViewTestCase(APITestCase):

    fixtures = [
        "api/test/fixtures/default_genre.json",
        "api/test/fixtures/other_genres.json",
        'api/test/fixtures/default_user.json',
        'api/test/fixtures/default_club.json'
    ]

    def setUp(self):
        self.user = User.objects.get(username='johndoe')
        self.club = Club.objects.get(club_name = 'Beatles')

        self.url = reverse("get_current_user")
        self.client = APIClient()

    def test_get_current_user_url(self):
        self.assertEqual(self.url, f'/user/')    

    def test_get_current_user_endpoint_gets_current_user_returns_200_ok(self):
        self.client.force_authenticate(user=self.user)
        self.assertTrue(self.user.is_authenticated)
        response = self.client.get(self.url)
        serializer = UserSerializer(self.user, many=False)
        self.assertEqual(response.data, serializer.data)
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_logged_out_user_endpoint_cannot_view_current_user_returns_403_forbidden(self):
        response = self.client.get(self.url)
        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)
    
