"""Tests of the delete_club view."""
from api.models import Club, User, Membership
from rest_framework.test import APITestCase
from django.urls import reverse
from rest_framework import status
from rest_framework.test import force_authenticate,APIClient

class DeleteClubViewTestCase(APITestCase):   
    """Tests of the delete_club view."""

    fixtures = [
        'api/test/fixtures/genres.json',
        "api/test/fixtures/default_user.json",
        "api/test/fixtures/default_club.json",
        "api/test/fixtures/other_users.json",
        ]

    def setUp(self):
        self.club = Club.objects.get(club_name='Beatles')
        self.owner = User.objects.get(username='johndoe')
        self.member = User.objects.get(username='janedoe')
        self.non_member = User.objects.get(username='daviddoe')
        self.url = reverse("delete_club", kwargs={"club_id": self.club.id})
        Membership.objects.create(user=self.owner, club=self.club,role='O')
        self.membership = Membership.objects.create(user=self.member, club=self.club,role='M')
        self.client = APIClient()

    def test_unauthenticated_request_returns_forbidden(self):
        clubs_before = Club.objects.all().count()
        response = self.client.delete(self.url)
        clubs_after = Club.objects.all().count()
        self.assertEqual(clubs_before, clubs_after)
        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)
    
    def test_delete_delete_club_endpoint_owner_deletes_club_returns_200_ok(self):
        self.client.force_authenticate(user=self.owner)
        self.assertTrue(self.owner.is_authenticated)
        clubs_before = Club.objects.all().count()
        response = self.client.delete(self.url)
        clubs_after = Club.objects.all().count()
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(clubs_before, clubs_after+1)
        
    def test_delete_to_delete_club_endpoint_with_invalid_club_id_returns_404_not_found(self):
        self.client.force_authenticate(user=self.owner)
        self.assertTrue(self.owner.is_authenticated)
        clubs_before = Club.objects.all().count()
        invalidClubUrl = reverse('delete_club', kwargs={'club_id':0})
        response = self.client.delete(invalidClubUrl)
        clubs_after = Club.objects.all().count()
        self.assertEqual(clubs_before, clubs_after)
        self.assertEqual(response.status_code, status.HTTP_404_NOT_FOUND)

    def test_delete_to_delete_club_endpoint_whilst_not_a_member_returns_403_forbidden(self):
        self.client.force_authenticate(user=self.non_member)
        self.assertTrue(self.non_member.is_authenticated)
        clubs_before = Club.objects.all().count()
        response = self.client.delete(self.url)
        clubs_after = Club.objects.all().count()
        self.assertEqual(clubs_before, clubs_after)
        self.assertEqual(response.status_code, status.HTTP_403_FORBIDDEN)

    def test_delete_to_delete_club_endpoint_whilst_a_member_returns_403_forbidden(self):
        self.client.force_authenticate(user=self.member)
        self.assertTrue(self.member.is_authenticated)
        clubs_before = Club.objects.all().count()
        response = self.client.delete(self.url)
        clubs_after = Club.objects.all().count()
        self.assertEqual(clubs_before, clubs_after)
        self.assertEqual(response.status_code, status.HTTP_403_FORBIDDEN)

    def test_delete_to_delete_club_endpoint_whilst_banned_returns_403_forbidden(self):
        self.membership.role = 'B'
        self.membership.save()
        self.client.force_authenticate(user=self.member)
        self.assertTrue(self.member.is_authenticated)
        clubs_before = Club.objects.all().count()
        response = self.client.delete(self.url)
        clubs_after = Club.objects.all().count()
        self.assertEqual(clubs_before, clubs_after)
        self.assertEqual(response.status_code, status.HTTP_403_FORBIDDEN)

    def test_delet_to_delete_club_endpoint_with_user_logged_out_returns_401_unauthorized(self):
        response = self.client.delete(self.url)
        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)

    