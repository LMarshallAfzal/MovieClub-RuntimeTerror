"""Tests of the leave_club view."""
from api.models import Club, User, Membership
from rest_framework.test import APITestCase
from django.urls import reverse
from rest_framework import status
from rest_framework.test import force_authenticate,APIClient

class LeaveClubViewTestCase(APITestCase):
    """Tests of the leave_club view."""
    
    fixtures = [
        "api/test/fixtures/genres.json",
        "api/test/fixtures/default_user.json",
        "api/test/fixtures/default_club.json",
        "api/test/fixtures/other_users.json",
    ]

    def setUp(self):
        self.club = Club.objects.get(club_name='Beatles')
        self.user = User.objects.get(username='johndoe')
        self.other_user = User.objects.get(username='janedoe')
        self.url = reverse("leave_club", kwargs={"club_id": self.club.id})
        Membership.objects.create(user=self.user, club=self.club)
        self.client = APIClient()

    def test_unauthenticated_request_returns_forbidden(self):
        members_before = Membership.objects.filter(club=self.club).count()
        response = self.client.post(self.url)
        members_after = Membership.objects.filter(club=self.club).count()
        self.assertEqual(members_after, members_before)
        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)
    
    def test_post_leave_club_endpoint_user_leaves_club_returns_200_ok(self):
        self.client.force_authenticate(user=self.user)
        self.assertTrue(self.user.is_authenticated)
        members_before = Membership.objects.filter(club=self.club).count()
        response = self.client.post(self.url)
        members_after = Membership.objects.filter(club=self.club).count()
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(members_after+1, members_before)
        
    def test_post_to_leave_club_endpoint_with_invalid_club_id_returns_404_not_found(self):
        self.client.force_authenticate(user=self.user)
        self.assertTrue(self.user.is_authenticated)
        members_before = Membership.objects.filter(club=self.club).count()
        invalidClubUrl = reverse('leave_club', kwargs={'club_id':0})
        response = self.client.post(invalidClubUrl)
        members_after = Membership.objects.filter(club=self.club).count()
        self.assertEqual(members_after, members_before)
        self.assertEqual(response.status_code, status.HTTP_404_NOT_FOUND)

    def test_post_to_leave_club_endpoint_whilst_not_a_member_returns_403_forbidden(self):
        self.client.force_authenticate(user=self.other_user)
        self.assertTrue(self.other_user.is_authenticated)
        members_before = Membership.objects.filter(club=self.club).count()
        response = self.client.post(self.url)
        members_after = Membership.objects.filter(club=self.club).count()
        self.assertEqual(members_after, members_before)
        self.assertEqual(response.status_code, status.HTTP_403_FORBIDDEN)