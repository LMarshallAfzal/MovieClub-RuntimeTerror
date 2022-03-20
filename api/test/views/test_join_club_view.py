from api.models import Club, User
from rest_framework.test import APITestCase
from django.urls import reverse
from rest_framework import status
from rest_framework.test import force_authenticate,APIClient



class JoinClubViewTestCase(APITestCase):

    fixtures = [
        "api/test/fixtures/default_user.json",
        "api/test/fixtures/default_club.json",
    ]

    def setUp(self):
        self.club = Club.objects.get(club_name='Beatles')
        self.user = User.objects.get(username='johndoe')
        self.url = reverse('join_club', kwargs={'club_id': self.club.id})
        

    def test_post_to_join_club_endpoint_with_valid_data_joins_club_returns_200_ok(self):
        self.client.force_authenticate(user=self.user)
        self.assertTrue(self.user.is_authenticated)
        members_before = self.club.club_members.count()
        response = self.client.post(self.url)
        members_after = self.club.club_members.count()
        self.assertEqual(members_after, members_before + 1)
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_post_to_join_club_endpoint_with_invalid_club_returns_404_not_found(self):
        self.client.force_authenticate(user=self.user)
        self.assertTrue(self.user.is_authenticated)
        invalid_url = reverse('join_club',kwargs={'club_id': 100})
        response = self.client.post(invalid_url)
        self.assertEqual(response.status_code, status.HTTP_404_NOT_FOUND)


    def test_post_to_join_club_endpoint_with_user_not_logged_in_does_not_join_club(self):
        before = self.club.club_members.count()
        response = self.client.post(self.url)
        after = self.club.club_members.count()
        self.assertEqual(after, before)
        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)
