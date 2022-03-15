from api.models import User, Club
from rest_framework.test import APITestCase
from django.urls import reverse
from rest_framework import status
from api.serializers import UserSerializer
from api.test.helpers import LogInTester


class GetClubMembersViewTestCase(APITestCase, LogInTester):

    fixtures = [
        'api/test/fixtures/other_users.json',
        'api/test/fixtures/default_user.json',
        'api/test/fixtures/default_club.json',
    ]

    def setUp(self):
        self.club = Club.objects.get(club_name='Beatles')
        self.url = reverse("club_members", kwargs={'club_id': self.club.id})
        self.user = User.objects.get(username='johndoe')
        self.club.club_members.add(self.user, through_defaults={'role': 'M'})
        self.other_user = User.objects.get(username='janedoe')
        self.details = {'username': 'johndoe', 'password': 'Pa$$w0rd567'}

    def test_get_users_url(self):
        self.assertEqual(self.url, f'/club_members/{self.club.id}/')

    def test_get_club_members_endpoint_gets_club_members_returns_200_ok(self):
        self.client.login(
            username=self.details['username'], password=self.details['password'])
        self.assertTrue(self._is_logged_in())
        response = self.client.get(self.url)
        self._create_test_members(10)
        users = User.objects.all()
        serializer = UserSerializer(users, many=True)
        self.assertEqual(response.data, serializer.data)
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_get_club_members_endpoint_gets_club_members_returns_200_ok(self):
        self.client.login(
            username=self.details['username'], password=self.details['password'])
        self.assertTrue(self._is_logged_in())
        response = self.client.get(self.url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_get_club_members_endpoint_doesnt_get_club_members_for_non_existent_club_returns_404_not_found(self):
        self.client.login(
            username=self.details['username'], password=self.details['password'])
        self.assertTrue(self._is_logged_in())
        invalid_url = reverse('club_members',kwargs={'club_id': 10})
        response = self.client.get(invalid_url)
        self.assertEqual(response.status_code, status.HTTP_404_NOT_FOUND)



    # def test_get_club_members_endpoint_cannot_get_club_members_when_logged_out_returns_403_forbidden(self):
    #     response = self.client.get(self.url)
    #     self.assertEqual(response.status_code, status.HTTP_403_FORBIDDEN)

    def _create_test_members(self, user_count=10):
        for user_id in range(user_count):
            user = User.objects.create_user(
                username=f'user{user_id}',
                first_name=f'First{user_id}',
                last_name=f'Last{user_id}',
                email=f'user{user_id}@test.org',
                password='Password123',
                bio=f'Bio {user_id}',
                preferences='Horror,Action',
            )
            self.club.club_members.add(user, through_defaults={'role': 'M'})
    # def test_logged_out_user_cannot_view_users(self):
    #     response = self.client.get(self.url)
    #     self.assertEqual(response.status_code, status.HTTP_403_FORBIDDEN)
