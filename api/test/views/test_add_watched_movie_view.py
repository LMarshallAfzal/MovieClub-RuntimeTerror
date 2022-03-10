from api.models import User, Movie, Viewer
from rest_framework.test import APITestCase
from django.urls import reverse
from rest_framework import status

class AddWatchedMovieViewTestCase(APITestCase):

    fixtures = [
        'api/test/fixtures/default_user.json',
        'api/test/fixtures/default_movie.json',
    ]

    def setUp(self):
        self.movie = Movie.objects.get(movieID=1000)
        self.user = User.objects.get(username='johndoe')
        self.url = reverse('add_watched_movie', kwargs={'movieID':self.movie.id})
    
    def test_post_to_add_watched_movie_endpoint_with_valid_data_adds_to_watched(self):
        self.client.force_login(self.user)
        before = Viewer.objects.count()
        response = self.client.post(self.url)
        after = Viewer.objects.count()
        self.assertEqual(after, before + 1)
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)

    def test_post_to_add_watched_movie_endpoint_with_invalid_movie_does_not_add_to_watched(self):
        self.client.force_login(self.user)
        before = Viewer.objects.count()
        invalidMovieUrl = reverse('add_watched_movie', kwargs={'movieID':0})
        response = self.client.post(invalidMovieUrl)
        after = Viewer.objects.count()
        self.assertEqual(after, before)
        self.assertEqual(response.status_code, status.HTTP_404_NOT_FOUND)

    def test_post_user_cannot_add_same_movie_twice_to_watched(self):
        self.client.force_login(self.user)
        before = Viewer.objects.count()
        self.client.post(self.url)
        response = self.client.post(self.url)
        after = Viewer.objects.count()
        self.assertEqual(after, before + 1)
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_post_to_add_watched_movie_endpoint_with_user_not_logged_in_does_not_add_to_watched(self):
        before = Viewer.objects.count()
        response = self.client.post(self.url)
        after = Viewer.objects.count()
        self.assertEqual(after, before)
        self.assertEqual(response.status_code, status.HTTP_403_FORBIDDEN)

    