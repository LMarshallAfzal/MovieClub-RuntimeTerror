from api.models import Club, Movie, User, Meeting
from rest_framework.test import APITestCase
from django.urls import reverse
from rest_framework import status

class GetFollowersTestCase(APITestCase):

    fixtures = [
        'api/test/fixtures/default_user.json',
        'api/test/fixtures/other_users.json'
    ]

    def setUp(self):
        self.user = User.objects.get(username='johndoe')
        self.other_user = User.objects.get(username='janedoe')
        self.url = reverse('get_followers')

    def test_get_followers_url(self):
        self.assertEqual(self.url,f'/followers/')

    def test_get_followers_endpoint_returns_200_ok(self):
        self.client.force_authenticate(user=self.user)
        self.assertTrue(self.user.is_authenticated)
        user_followers_before = self.user.follower_count()
        user_followees_berore = self.user.followee_count()
        other_user_followees_before = self.other_user.followee_count()
        self.other_user.toggle_follow(self.user)
        response = self.client.get(self.url)
        self.assertContains(response,self.other_user)
        user_followers_after = self.user.follower_count()
        other_user_followees_after = self.other_user.followee_count()
        user_followees_after = self.user.followee_count()
        self.assertEqual(user_followers_before+1, user_followers_after)
        self.assertEqual(other_user_followees_before+1, other_user_followees_after)
        self.assertEqual(user_followees_berore, user_followees_after)
        self.assertEqual(response.status_code, status.HTTP_200_OK)


    def test_get_followers_endpoint_with_user_not_logged_in_does_not_follow(self):
        response = self.client.get(self.url)
        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)
        