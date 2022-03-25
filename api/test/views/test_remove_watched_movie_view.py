from api.models import User, Movie, Watch
from rest_framework.test import APITestCase
from django.urls import reverse
from rest_framework import status
from rest_framework.test import force_authenticate,APIClient
class RemoveWatchedMovieViewTestCase(APITestCase):

    fixtures = [
        'api/test/fixtures/genres.json',
        'api/test/fixtures/default_user.json',
        'api/test/fixtures/default_movie.json',
    ]

    def setUp(self):
        self.movie = Movie.objects.get(id=1)
        self.user = User.objects.get(username='johndoe')
        self.url = reverse('remove_watched_movie', kwargs={'movie_id':self.movie.id})
        self.user.add_watched_movie(self.movie)
        self.client = APIClient()
        
    def test_delete_to_unwatch_movie_endpoint_with_valid_data_removes_watched_movie_returns_200_ok(self):
        self.client.force_authenticate(user=self.user)
        self.assertTrue(self.user.is_authenticated)
        before = Watch.objects.count()
        response = self.client.delete(self.url)
        after = Watch.objects.count()
        self.assertEqual(after + 1, before)
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_delete_to_unwatch_movie_endpoint_with_invalid_movie_does_not_remove_watched_movie_404_not_found(self):
        self.client.force_authenticate(user=self.user)
        self.assertTrue(self.user.is_authenticated)
        before = Watch.objects.count()
        invalidMovieUrl = reverse('remove_watched_movie', kwargs={'movie_id':0})
        response = self.client.delete(invalidMovieUrl)
        after = Watch.objects.count()
        self.assertEqual(after, before)
        self.assertEqual(response.status_code, status.HTTP_404_NOT_FOUND)

    def test_delete_to_unwatch_movie_endpoint_removing_movie_twice_returns_404_not_found(self):
        self.client.force_authenticate(user=self.user)
        self.assertTrue(self.user.is_authenticated)
        before = Watch.objects.count()
        self.client.delete(self.url)
        response = self.client.delete(self.url)
        after = Watch.objects.count()
        self.assertEqual(after + 1, before)
        self.assertEqual(response.status_code, status.HTTP_404_NOT_FOUND)

    def test_delete_to_unwatch_movie_endpoint_with_user_not_logged_in_does_not_remove_watched_movie(self):
        before = Watch.objects.count()
        response = self.client.delete(self.url)
        after = Watch.objects.count()
        self.assertEqual(after, before)
        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)
