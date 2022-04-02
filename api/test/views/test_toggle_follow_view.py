from api.models import Club, Movie, User, Meeting
from rest_framework.test import APITestCase
from django.urls import reverse
from rest_framework import status

class ToggleFollowUserTestCase(APITestCase):

    fixtures = [
        'api/test/fixtures/genres.json',
        'api/test/fixtures/default_user.json',
        'api/test/fixtures/other_users.json'
    ]

    def setUp(self):
        self.user = User.objects.get(username='johndoe')
        self.followee = User.objects.get(username='janedoe')
        self.url = reverse('toggle_follow', kwargs={'user_id': self.followee.id})

    def test_follow_toggle_url(self):
        self.assertEqual(self.url,f'/toggle_follow/{self.followee.id}/')

    def test_put_to_unfollow_followee_endpoint_with_valid_data_unfollows_followee_returns_200_ok(self):
        self.client.force_authenticate(user=self.user)
        self.assertTrue(self.user.is_authenticated)
        self.user.toggle_follow(self.followee)
        user_followers_before = self.user.follower_count()
        user_followees_berore = self.user.followee_count()
        followee_followers_before = self.followee.follower_count()
        response = self.client.put(self.url)
        user_followers_after = self.user.follower_count()
        followee_followers_after = self.followee.follower_count()
        user_followees_after = self.user.followee_count()
        self.assertEqual(user_followers_before, user_followers_after)
        self.assertEqual(followee_followers_before, followee_followers_after+1)
        self.assertEqual(user_followees_berore, user_followees_after+1)
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_put_to_follow_followee_endpoint_with_valid_data_follows_followee_returns_200_ok(self):
        self.client.force_authenticate(user=self.user)
        self.assertTrue(self.user.is_authenticated)
        user_followers_before = self.user.follower_count()
        user_followees_before = self.user.followee_count()
        followee_followers_before = self.followee.follower_count()
        response = self.client.put(self.url)
        user_followers_after = self.user.follower_count()
        followee_followers_after = self.followee.follower_count()
        user_followees_after = self.user.followee_count()
        self.assertEqual(user_followees_before+1, user_followees_after)
        self.assertEqual(user_followers_before, user_followers_after)
        self.assertEqual(followee_followers_before+1, followee_followers_after)
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_put_to_follow_user_endpoint_with_invalid_user_does_not_follow_returns_404_not_found(self):
        self.client.force_authenticate(user=self.user)
        self.assertTrue(self.user.is_authenticated)
        user_followers_before = self.user.follower_count()
        followee_followers_before = self.followee.follower_count()
        url = reverse('toggle_follow', kwargs={'user_id': 0})
        response = self.client.put(url)
        user_followers_after = self.user.follower_count()
        followee_followers_after = self.followee.follower_count()
        self.assertEqual(user_followers_before, user_followers_after)
        self.assertEqual(followee_followers_before, followee_followers_after)
        self.assertEqual(response.status_code, status.HTTP_404_NOT_FOUND)

    def test_put_to_follow_user_endpoint_with_user_not_logged_in_does_not_follow(self):
        user_followers_before = self.user.follower_count()
        followee_followers_before = self.followee.follower_count()
        response = self.client.put(self.url)
        user_followers_after = self.user.follower_count()
        followee_followers_after = self.followee.follower_count()
        self.assertEqual(user_followers_before, user_followers_after)
        self.assertEqual(followee_followers_before, followee_followers_after)
        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)
        