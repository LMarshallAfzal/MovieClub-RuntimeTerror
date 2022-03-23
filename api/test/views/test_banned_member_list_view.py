from api.models import User, Club
from rest_framework.test import APITestCase
from django.urls import reverse
from rest_framework import status
from api.serializers import UserSerializer
from rest_framework.test import force_authenticate,APIClient


class BannedMembersViewTestCase(APITestCase):

    fixtures = [
        'api/test/fixtures/default_genre.json',
        'api/test/fixtures/other_genres.json',
        'api/test/fixtures/other_users.json',
        'api/test/fixtures/default_user.json',
        'api/test/fixtures/default_club.json',
    ]

    def setUp(self):
        self.club = Club.objects.get(club_name='Beatles')
        self.url = reverse("banned_member_list", kwargs={'club_id': self.club.id})
        self.user = User.objects.get(username='johndoe')
        self.club.club_members.add(self.user, through_defaults={'role': 'C'})
        self.other_user = User.objects.get(username='janedoe')
        self.client = APIClient()

    def test_get_banned_users_url(self):
        self.assertEqual(self.url, f'/banned_member_list/{self.club.id}/')

    def test_get_banned_members_endpoint_gets_banned_members_returns_200_ok(self):
        self.client.force_authenticate(user=self.user)
        self.assertTrue(self.user.is_authenticated)
        response = self.client.get(self.url)
        self._create_test_members(10)
        users = self.club.get_banned_members.all()
        serializer = UserSerializer(users, many=True)
        self.assertEqual(response.data, serializer.data)
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_get_banned_members_endpoint_gets_banned_members_returns_200_ok(self):
        self.client.force_authenticate(user=self.user)
        self.assertTrue(self.user.is_authenticated)
        response = self.client.get(self.url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_get_banned_members_endpoint_doesnt_get_banned_members_for_non_existent_club_returns_404_not_found(self):
        self.client.force_authenticate(user=self.user)
        self.assertTrue(self.user.is_authenticated)
        invalid_url = reverse('banned_member_list', kwargs={'club_id': 10})
        response = self.client.get(invalid_url)
        self.assertEqual(response.status_code, status.HTTP_404_NOT_FOUND)

    def test_get_banned_members_endpoint_cannot_get_banned_members_when_logged_out_returns_403_forbidden(self):
        response = self.client.get(self.url)
        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)

    def test_get_banned_members_endpoint_as_member_returns_403_forbidden(self):
        self.club.club_members.add(self.other_user,through_defaults={'role':'M'})
        self.client.force_authenticate(user=self.other_user)
        self.assertTrue(self.other_user.is_authenticated)
        response = self.client.get(self.url)
        self.assertEqual(response.status_code, status.HTTP_403_FORBIDDEN)

    def test_get_banned_members_endpoint_as_banned_returns_403_forbidden(self):
        self.club.club_members.add(self.other_user,through_defaults={'role':'B'})
        self.client.force_authenticate(user=self.other_user)
        self.assertTrue(self.other_user.is_authenticated)
        response = self.client.get(self.url)
        self.assertEqual(response.status_code, status.HTTP_403_FORBIDDEN)

    def test_get_banned_members_endpoint_as_organiser_returns_403_forbidden(self):
        self.club.club_members.add(self.other_user,through_defaults={'role':'O'})
        self.client.force_authenticate(user=self.other_user)
        self.assertTrue(self.other_user.is_authenticated)
        response = self.client.get(self.url)
        self.assertEqual(response.status_code, status.HTTP_403_FORBIDDEN)

    def test_get_banned_members_endpoint_as_visitor_returns_403_forbidden(self):
        self.client.force_authenticate(user=self.other_user)
        self.assertTrue(self.other_user.is_authenticated)
        response = self.client.get(self.url)
        self.assertEqual(response.status_code, status.HTTP_403_FORBIDDEN)
        
    def _create_test_banned_members(self, user_count=10):
        for user_id in range(user_count):
            user = User.objects.create_user(
                username=f'user{user_id}',
                first_name=f'First{user_id}',
                last_name=f'Last{user_id}',
                email=f'user{user_id}@test.org',
                password='Password123',
                bio=f'Bio {user_id}',
                preferences='Action',
            )
            self.club.club_members.add(user, through_defaults={'role': 'B'})
