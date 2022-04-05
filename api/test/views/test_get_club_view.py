"""Tests of the get_club view."""
from api.models import User, Club
from rest_framework.test import APITestCase
from django.urls import reverse
from rest_framework import status
from api.serializers import ClubSerializer
from rest_framework.test import force_authenticate,APIClient



class GetClubViewTestCase(APITestCase):
    """Tests of the get_club view."""

    fixtures = [
        'api/test/fixtures/genres.json',
        'api/test/fixtures/default_user.json',
        'api/test/fixtures/default_club.json',
    ]

    def setUp(self):
        self.club = Club.objects.get(id=1)
        self.user = User.objects.get(username='johndoe')
        self.url = reverse('get_club', kwargs={'club_id':self.club.id})
        self.client = APIClient()

    def test_get_club_url(self):
        self.assertEqual(self.url, f'/club/{self.club.id}/')

    def test_get_to_retrieve_club_endpoint_retrieves_club_returns_200_ok(self):
        self.client.force_authenticate(user=self.user)
        self.assertTrue(self.user.is_authenticated)
        response = self.client.get(self.url)
        club = Club.objects.get(id = self.club.id)
        serializer = ClubSerializer(club,many=False)
        self.assertEqual(response.data,serializer.data)
        self.assertEqual(response.status_code, status.HTTP_200_OK)