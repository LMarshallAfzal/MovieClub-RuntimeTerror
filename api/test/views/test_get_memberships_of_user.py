"""Tests of the get_memberships_of_user view."""
from api.models import User, Club, Membership
from rest_framework.test import APITestCase
from django.urls import reverse
from rest_framework import status
from api.serializers import MembershipSerializer
from rest_framework.test import force_authenticate,APIClient



class GetUserMembershipsViewTestCase(APITestCase):
    """Tests of the get_memberships_of_user view."""

    fixtures = [
        "api/test/fixtures/genres.json",
        'api/test/fixtures/default_user.json',
        'api/test/fixtures/default_club.json',
        'api/test/fixtures/other_clubs.json',
    ]

    def setUp(self):
        self.user = User.objects.get(username='johndoe')
        self.clubA = Club.objects.get(club_name="Beatles")
        self.clubB = Club.objects.get(club_name="ADCD")
        self.clubNonMember = Club.objects.get(club_name="Metallica")
        self.url = reverse('get_memberships_of_user', kwargs={'user_id':self.user.id})
        self.client = APIClient()

    def test_get_memberships_of_user_url(self):
        self.assertEqual(self.url, f'/user_memberships/{self.user.id}/')

    def test_get_to_retrieve_memberships_of_user_endpoint_retrieves_memberships_of_user_returns_200_ok(self):
        self.client.force_authenticate(user=self.user)
        self.assertTrue(self.user.is_authenticated)
        self._create_test_memberships()
        response = self.client.get(self.url)
        memberships = self.user.get_user_memberships()
        serializer = MembershipSerializer(memberships,many=True)
        self.assertEqual(len(response.data), 2)
        self.assertEqual(response.data,serializer.data)
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_get_to_retrieve_memberships_of_user_endpoint_with_no_memberships_returns_200_ok(self):
        self.client.force_authenticate(user=self.user)
        self.assertTrue(self.user.is_authenticated)
        response = self.client.get(self.url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)


    def test_get_to_retrieve_memberships_of_user_endpoint_cannot_get_memberships_of_user_while_logged_out_returns_401_unauthorized(self):
        response = self.client.get(self.url)
        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)

    def _create_test_memberships(self):
        Membership.objects.create(user = self.user, club = self.clubA)
        Membership.objects.create(user = self.user, club = self.clubB)