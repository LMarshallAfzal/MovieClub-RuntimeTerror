from api.models import Club, Membership, User
from rest_framework.test import APITestCase
from django.urls import reverse
from rest_framework import status

class ToggleNotificationsTestCase(APITestCase):

    fixtures = [
        'api/test/fixtures/default_user.json',
        'api/test/fixtures/default_club.json',
    ]

    def setUp(self):
        self.user = User.objects.get(username='johndoe')
        self.club = Club.objects.get(club_name='Beatles')
        Membership.objects.create(user = self.user, club = self.club, role = 'M', is_organiser = False, notifications = False)
        self.url = reverse('toggle_notifications', kwargs={'club_id': self.club.id})

    def test_notifications_toggle_url(self):
        self.assertEqual(self.url,f'/toggle_notifications/{self.club.id}/')

    def test_put_to_turn_on_notifications_endpoint_with_valid_data_turns_on_notifications_returns_200_ok(self):
        self.client.force_authenticate(user=self.user)
        self.assertTrue(self.user.is_authenticated)
        club_notifications_before = Membership.objects.get(user = self.user).notifications
        response = self.client.put(self.url)
        club_notifications_after = Membership.objects.get(user = self.user).notifications
        self.assertFalse(club_notifications_before)
        self.assertTrue(club_notifications_after)
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_put_to_turn_off_notifications_endpoint_with_valid_data_turns_off_notifications_returns_200_ok(self):
        self.client.force_authenticate(user=self.user)
        self.assertTrue(self.user.is_authenticated)
        notification_membership = Membership.objects.get(user = self.user)
        notification_membership.toggle_notifications()
        club_notifications_before = notification_membership.notifications
        response = self.client.put(self.url)
        club_notifications_after = Membership.objects.get(user = self.user).notifications
        self.assertTrue(club_notifications_before)
        self.assertFalse(club_notifications_after)
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_put_to_turn_on_notifications_endpoint_with_invalid_club_does_not_turn_on_notifications_returns_404_not_found(self):
        self.client.force_authenticate(user=self.user)
        self.assertTrue(self.user.is_authenticated)
        club_notifications_before = Membership.objects.get(user = self.user).notifications
        url = reverse('toggle_notifications', kwargs={'club_id': 0})
        response = self.client.put(url)
        club_notifications_after = Membership.objects.get(user = self.user).notifications
        self.assertFalse(club_notifications_before)
        self.assertFalse(club_notifications_after)
        self.assertEqual(response.status_code, status.HTTP_404_NOT_FOUND)

    def test_put_to_turn_on_notifications_endpoint_with_user_not_logged_in_does_not_turn_on_notifications(self):
        club_notifications_before = Membership.objects.get(user = self.user).notifications
        response = self.client.put(self.url)
        club_notifications_after = Membership.objects.get(user = self.user).notifications
        self.assertFalse(club_notifications_before)
        self.assertFalse(club_notifications_after)
        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)
        