"""Tests of the get_following view."""
from api.models import User
from rest_framework.test import APITestCase
from django.urls import reverse
from rest_framework import status

class GetFolloweesTestCase(APITestCase):
    """Tests of the get_following view."""

    fixtures = [
        'api/test/fixtures/genres.json',
        'api/test/fixtures/default_user.json',
        'api/test/fixtures/other_users.json'
    ]

    def setUp(self):
        self.user = User.objects.get(username='johndoe')
        self.other_user = User.objects.get(username='janedoe')
        self.url = reverse('get_following',kwargs={'user_id':self.user.id})

    def test_get_followers_url(self):
        self.assertEqual(self.url,f'/following/{self.user.id}/')

    def test_get_following_endpoint_returns_200_ok(self):
        self.client.force_authenticate(user=self.user)
        self.assertTrue(self.user.is_authenticated)
        user_followers_before = self.user.follower_count()
        user_followees_berore = self.user.followee_count()
        other_user_followees_before = self.other_user.followee_count()
        self.user.toggle_follow(self.other_user)
        response = self.client.get(self.url)
        self.assertContains(response,self.other_user)
        user_followers_after = self.user.follower_count()
        other_user_followees_after = self.other_user.followee_count()
        user_followees_after = self.user.followee_count()
        self.assertEqual(user_followers_before, user_followers_after)
        self.assertEqual(other_user_followees_before, other_user_followees_after)
        self.assertEqual(user_followees_berore+1, user_followees_after)
        self.assertEqual(response.status_code, status.HTTP_200_OK)


    def test_get_following_endpoint_with_user_not_logged_in_does_not_follow_returns_401_unauthorized(self):
        response = self.client.get(self.url)
        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)
        