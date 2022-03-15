from api.models import Club, User, Membership
from rest_framework.test import APITestCase
from django.urls import reverse
from rest_framework import status
from api.test.helpers import LogInTester
class LeaveClubViewTestCase(APITestCase,LogInTester):
    
    fixtures = [
        "api/test/fixtures/default_user.json",
        "api/test/fixtures/default_club.json",
        ]

    def setUp(self):
        self.club = Club.objects.get(club_name='Beatles')
        self.user = User.objects.get(username='johndoe')
        self.url = reverse("leave_club", kwargs={"club_id": self.club.id})
        Membership.objects.create(user=self.user, club=self.club)
        self.details = {
            'username': self.user.username, 'password': 'Pa$$w0rd567'}

    # def test_unauthenticated_request_returns_forbidden(self):
    #     members_before = Membership.objects.filter(club=self.club).count()
    #     response = self.client.post(self.url(0))
    #     members_after = Membership.objects.filter(club=self.club).count()
    #     self.assertEqual(members_after, members_before)
    #     self.assertEqual(response.status_code, status.HTTP_403_FORBIDDEN)
    
    def test_post_leave_club_endpoint_user_leaves_club_returns_200_0k(self):
        self.client.login(username=self.details['username'], password=self.details['password'])
        self.assertTrue(self._is_logged_in())
        members_before = Membership.objects.filter(club=self.club).count()
        response = self.client.post(self.url)
        members_after = Membership.objects.filter(club=self.club).count()
        self.assertEqual(members_after+1, members_before)
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_post_to_leave_club_endpoint_with_invalid_club_id_returns_404_not_found(self):
        self.client.login(username=self.details['username'], password=self.details['password'])
        self.assertTrue(self._is_logged_in())
        members_before = Membership.objects.filter(club=self.club).count()
        invalidClubUrl = reverse('leave_club', kwargs={'club_id':0})
        response = self.client.post(invalidClubUrl)
        members_after = Membership.objects.filter(club=self.club).count()
        self.assertEqual(members_after, members_before)
        self.assertEqual(response.status_code, status.HTTP_404_NOT_FOUND)