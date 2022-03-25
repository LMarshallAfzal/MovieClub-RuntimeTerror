from api.models import User, Club
from rest_framework.test import APITestCase
from django.urls import reverse
from rest_framework import status
from api.serializers import UserSerializer
from rest_framework.test import force_authenticate,APIClient


class GetClubOwnerViewTestCase(APITestCase):

    fixtures = [
        "api/test/fixtures/genres.json",
        'api/test/fixtures/other_users.json',
        'api/test/fixtures/default_user.json',
        'api/test/fixtures/default_club.json',
    ]

    def setUp(self):
        self.club = Club.objects.get(club_name='Beatles')
        self.url = reverse("get_club_owner", kwargs={'club_id': self.club.id})
        self.owner_user = User.objects.get(username='johndoe')
        self.member_user = User.objects.get(username='janedoe')
        self.club.club_members.add(self.owner_user, through_defaults={'role': 'O'})
        self.club.club_members.add(self.member_user, through_defaults={'role': 'M'})
        self.client = APIClient()

    def test_get_users_url(self):
        self.assertEqual(self.url, f'/club_owner/{self.club.id}/')

    def test_get_club_owner_endpoint_gets_club_owner_returns_200_ok(self):
        self.client.force_authenticate(user=self.member_user)
        self.assertTrue(self.member_user.is_authenticated)
        response = self.client.get(self.url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_get_club_owner_endpoint_doesnt_get_club_owner_for_non_existent_club_returns_404_not_found(self):
        self.client.force_authenticate(user=self.member_user)
        self.assertTrue(self.member_user.is_authenticated)
        invalid_url = reverse('get_club_owner', kwargs={'club_id': 10})
        response = self.client.get(invalid_url)
        self.assertEqual(response.status_code, status.HTTP_404_NOT_FOUND)
