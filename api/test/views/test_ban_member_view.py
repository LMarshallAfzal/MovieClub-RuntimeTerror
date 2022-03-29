"""Tests of the ban_member view."""
from rest_framework import status
from rest_framework.test import APITestCase,APIClient
from django.urls import reverse
from api.models import User,Club,Membership


class BanMemberViewTestCase(APITestCase):
    """Tests of the ban_member view."""

    fixtures = ['api/test/fixtures/default_user.json',
                'api/test/fixtures/default_club.json',
                'api/test/fixtures/other_users.json']

    def setUp(self):
        self.user = User.objects.get(username='johndoe')
        self.other_user = User.objects.get(username='daviddoe')
        self.member = User.objects.get(username='janedoe')
        self.club = Club.objects.get(club_name='Beatles')
        self.club.club_members.add(self.user,through_defaults={'role':'O'})
        self.club.club_members.add(self.member,through_defaults={'role':'M'})
        self.url = reverse('ban_member',kwargs={'club_id': self.club.id,'user_id':self.member.id})
        self.client = APIClient()  

    def test_ban_list_url(self):
        self.assertEqual(self.url,f'/ban_member/{self.club.id}/{self.member.id}/')

    def test_ban_member_endpoint_with_valid_data_returns_200_ok(self):
        self.client.force_authenticate(user=self.user)
        self.assertTrue(self.user.is_authenticated)
        before_members = Membership.objects.all().filter(club=self.club,role='M').count()
        before_banned = Membership.objects.all().filter(club=self.club,role='B').count()
        response = self.client.put(self.url)
        after_members =  Membership.objects.all().filter(club=self.club,role='M').count()
        after_banned =  Membership.objects.all().filter(club=self.club,role='B').count()
        self.assertEqual(before_members,after_members+1)
        self.assertEqual(before_banned+1,after_banned)
        role = self.member.membership_set.get(club=self.club)
        self.assertEqual('B',role.role)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(Membership.objects.get(user=self.member, club=self.club).role,'B')

    def test_ban_member_endpoint_with_invalid_user_returns_400_bad_request(self):
        self.client.force_authenticate(user=self.user)
        self.assertTrue(self.user.is_authenticated)
        before = Membership.objects.all().filter(club=self.club,role='M').count()
        url = reverse('ban_member',kwargs={'club_id': self.club.id,'user_id':99999999})
        response = self.client.put(url)
        after = Membership.objects.all().filter(club=self.club,role='M').count()
        self.assertEqual(before,after)
        role = self.member.membership_set.get(club=self.club)
        self.assertEqual('M',role.role)
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)

    def test_ban_member_endpoint_with_invalid_club_returns_404_not_found(self):
        self.client.force_authenticate(user=self.user)
        self.assertTrue(self.user.is_authenticated)
        url = reverse('ban_member', kwargs={'club_id':99999,'user_id': self.member.id})
        response = self.client.put(url)
        self.assertEqual(response.status_code,status.HTTP_404_NOT_FOUND)

    def test_ban_member_endpoint_as_member_returns_403_forbidden(self):
        self.club.club_members.add(self.other_user,through_defaults={'role':'M'})
        self.client.force_authenticate(user=self.other_user)
        self.assertTrue(self.other_user.is_authenticated)
        response = self.client.put(self.url)
        self.assertEqual(response.status_code,status.HTTP_403_FORBIDDEN)


    def test_ban_member_endpoint_as_user_not_in_club_returns_403_forbidden(self):
        self.client.force_authenticate(user=self.other_user)
        self.assertTrue(self.other_user.is_authenticated)
        response = self.client.put(self.url)
        self.assertEqual(response.status_code,status.HTTP_403_FORBIDDEN)

    def test_ban_member_endpoint_as_banned_returns_403_forbidden(self):
        self.club.club_members.add(self.other_user,through_defaults={'role':'B'})
        self.client.force_authenticate(user=self.other_user)
        self.assertTrue(self.other_user.is_authenticated)
        response = self.client.put(self.url)
        self.assertEqual(response.status_code,status.HTTP_403_FORBIDDEN)

    def test_ban_member_endpoint_while_logged_out_returns_401_unauthorized(self):
        response = self.client.put(self.url)
        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)
