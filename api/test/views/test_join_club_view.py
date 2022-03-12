from api.models import Club, User, Membership
from rest_framework.test import APITestCase
from django.urls import reverse
from rest_framework import status


class JoinClubViewTestCase(APITestCase):

    fixtures = [
        "api/test/fixtures/default_user.json",
        "api/test/fixtures/default_club.json",
    ]

    def setUp(self):
        self.club = Club.objects.get(club_name='Beatles')
        self.user = User.objects.get(username='johndoe')
        self.url = reverse('join_club', kwargs={'club_id': self.club.id})
        self.login_details = {
            'username': self.user.username, 'password': 'Pa$$w0rd567'}

    def test_post_to_join_club_endpoint_with_valid_data_joins_club(self):
        self.client.login(
            username=self.login_details['username'], password=self.login_details['password'])
        members_before = self.club.club_members.count()
        response = self.client.post(self.url)
        members_after = self.club.club_members.count()
        self.assertEqual(members_after, members_before + 1)
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    # def test_post_to_join_club_endpoint_with_user_not_logged_in_does_not_join_club(self):
    #     before = self.club.club_members.count()
    #     response = self.csrf_client.post(self.url)
    #     after = self.club.club_members.count()
    #     self.assertEqual(after, before)
    #     self.assertEqual(response.status_code, status.HTTP_403_FORBIDDEN)
