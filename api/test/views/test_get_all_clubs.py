"""Tests of the get_all_clubs view."""
from api.models import User, Club
from rest_framework.test import APITestCase
from django.urls import reverse
from rest_framework import status
from api.serializers import ClubSerializer

class AllClubsTestCase(APITestCase):
    """Tests of the get_all_clubs view."""

    fixtures = [
        'api/test/fixtures/genres.json',
        'api/test/fixtures/default_user.json',
    ]

    def setUp(self):
        self.user = User.objects.get(username='johndoe')
        self.url = reverse('get_all_clubs')


    def test_all_clubs_url(self):
        self.assertEqual(self.url, f'/clubs/')

    def test_get_to_retrieve_all_clubs_endpoint_retrieves_all_clubs_returns_200_ok(self):
        self.client.force_authenticate(user=self.user)
        self.assertTrue(self.user.is_authenticated)
        self._create_test_clubs()
        response = self.client.get(self.url)
        clubs = Club.objects.all()
        serializer = ClubSerializer(clubs,many=True)
        self.assertEqual(len(response.data), 10)
        self.assertEqual(response.data,serializer.data)
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_get_to_retrieve_all_clubs_endpoint_cannot_get_all_clubs_while_logged_out_returns_401_unauthorized(self):
        response = self.client.get(self.url)
        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)

    def _create_test_clubs(self, club_count=10):
        for id in range(club_count):
            Club.objects.create(
                club_name = f'Club {id}',
                mission_statement = "Best movie club in town!",
                theme_id =  id + 1
            )
