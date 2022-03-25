"""Tests of the unban_member view."""
from rest_framework import status
from rest_framework.test import APITestCase,APIClient
from django.urls import reverse
from api.models import User,Club,Membership


class UnBanMemberViewTestCase(APITestCase):
    """Tests of the unban_member view."""

    fixtures = [
        "api/test/fixtures/genres.json",
        'api/test/fixtures/default_user.json',
        'api/test/fixtures/default_club.json',
        'api/test/fixtures/other_users.json'
    ]

    def setUp(self):
        self.user = User.objects.get(username='johndoe')
        self.other_user = User.objects.get(username='daviddoe')
        self.banned = User.objects.get(username='janedoe')
        self.club = Club.objects.get(club_name='Beatles')
        self.club.club_members.add(self.user,through_defaults={'role':'C'})
        self.club.club_members.add(self.banned,through_defaults={'role':'B'})
        self.url = reverse('unban_member',kwargs={'club_id': self.club.id,'user_id':self.banned.id})
        self.client = APIClient()  

    def test_unban_member_url(self):
        self.assertEqual(self.url,f'/unban_member/{self.club.id}/{self.banned.id}/')

    def test_unban_member_endpoint_with_valid_data_returns_200_ok(self):
        self.client.force_authenticate(user=self.user)
        self.assertTrue(self.user.is_authenticated)
        users_before = User.objects.all().count()
        before_members = Membership.objects.all().filter(club=self.club,role='M').count()
        before_banned = Membership.objects.all().filter(club=self.club,role='B').count()
        response = self.client.put(self.url)
        users_after = User.objects.all().count()
        self.assertEqual(users_after,users_before)
        after_members =  Membership.objects.all().filter(club=self.club,role='M').count()
        after_banned =  Membership.objects.all().filter(club=self.club,role='B').count()
        self.assertEqual(before_members,after_members)
        self.assertEqual(before_banned,after_banned+1)
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_unban_member_endpoint_with_invalid_user_returns_403_forbidden(self):
        self.client.force_authenticate(user=self.user)
        self.assertTrue(self.user.is_authenticated)
        before = Membership.objects.all().filter(club=self.club,role='M').count()
        url = reverse('ban_member',kwargs={'club_id': self.club.id,'user_id':99999999})
        response = self.client.put(url)
        after = Membership.objects.all().filter(club=self.club,role='M').count()
        self.assertEqual(before,after)
        role = self.banned.membership_set.get(club=self.club)
        self.assertEqual('B',role.role)
        self.assertEqual(response.status_code, status.HTTP_403_FORBIDDEN)

    def test_unban_member_endpoint_with_invalid_club_returns_404_not_found(self):
        self.client.force_authenticate(user=self.user)
        self.assertTrue(self.user.is_authenticated)
        url = reverse('ban_member', kwargs={'club_id':99999,'user_id': self.banned.id})
        response = self.client.put(url)
        self.assertEqual(response.status_code,status.HTTP_404_NOT_FOUND)

    def test_unban_member_endpoint_as_member_returns_403_forbidden(self):
        self.club.club_members.add(self.other_user,through_defaults={'role':'M'})
        self.client.force_authenticate(user=self.other_user)
        self.assertTrue(self.other_user.is_authenticated)
        response = self.client.put(self.url)
        self.assertEqual(response.status_code,status.HTTP_403_FORBIDDEN)


    def test_unban_member_endpoint_as_organiser_returns_403_forbidden(self):
        self.club.club_members.add(self.other_user,through_defaults={'role':'O'})
        self.client.force_authenticate(user=self.other_user)
        self.assertTrue(self.other_user.is_authenticated)
        response = self.client.put(self.url)
        self.assertEqual(response.status_code,status.HTTP_403_FORBIDDEN)

    def test_unban_member_endpoint_as_user_not_in_club_returns_403_forbidden(self):
        self.client.force_authenticate(user=self.other_user)
        self.assertTrue(self.other_user.is_authenticated)
        response = self.client.put(self.url)
        self.assertEqual(response.status_code,status.HTTP_403_FORBIDDEN)

    def test_unban_member_endpoint_as_banned_returns_403_forbidden(self):
        self.club.club_members.add(self.other_user,through_defaults={'role':'B'})
        self.client.force_authenticate(user=self.other_user)
        self.assertTrue(self.other_user.is_authenticated)
        response = self.client.put(self.url)
        self.assertEqual(response.status_code,status.HTTP_403_FORBIDDEN)

    def test_unban_member_endpoint_while_logged_out_returns_401_unauthorized(self):
        response = self.client.put(self.url)
        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)
