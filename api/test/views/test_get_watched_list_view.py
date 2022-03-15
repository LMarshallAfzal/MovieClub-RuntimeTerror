from api.models import User, Movie, Watch
from rest_framework.test import APITestCase
from django.urls import reverse
from rest_framework import status
from api.test.helpers import LogInTester
from api.serializers import MovieSerializer



class WatchListTestCase(APITestCase, LogInTester):

    fixtures = [
        'api/test/fixtures/default_user.json',
        'api/test/fixtures/default_movie.json',
        'api/test/fixtures/other_movies.json',
    ]

    def setUp(self):
        self.user = User.objects.get(username='johndoe')
        self.url = reverse('get_watched_movies')
        self.details = {'username': 'johndoe', 'password': 'Pa$$w0rd567'}


    def test_watched_list_url(self):
        self.assertEqual(self.url, f'/watched_list/')

    def test_get_to_retrieve_watched_movies_endpoint_retrieves_watched_movies_returns_200_ok(self):
        self.client.login(username = self.details['username'],password = self.details['password'])
        self.assertTrue(self._is_logged_in())
        self.assertTrue(self._is_logged_in())
        self._create_test_watched_movies()
        response = self.client.get(self.url)
        watched_movies = self.user.get_watched_movies()
        serializer = MovieSerializer(watched_movies,many=True)
        self.assertEqual(response.data,serializer.data)
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_get_to_retrieve_watched_movies_endpoint_with_no_watched_movies_returns_200_ok(self):
        self.client.login(username = self.details['username'],password = self.details['password'])
        self.assertTrue(self._is_logged_in())
        self.assertTrue(self._is_logged_in())
        response = self.client.get(self.url)
        watched_movies = self.user.get_watched_movies()
        serializer = MovieSerializer(watched_movies,many=True)
        self.assertEqual(response.data,serializer.data)
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_get_to_retrieve_watched_movies_endpoint_cannot_get_watched_movie_while_logged_out_returns_403_forbidden(self):
        response = self.client.get(self.url)
        self.assertEqual(response.status_code, status.HTTP_403_FORBIDDEN)

    def _create_test_watched_movies(self, movie_count=3):
        for id in range(movie_count):
            movie = Movie.objects.get(ml_id=id)
            Watch.objects.create(
                user=self.user,
                movie=movie
            )
