"""Tests of the all_movies view."""
from api.models import User, Movie
from rest_framework.test import APITestCase
from django.urls import reverse
from rest_framework import status
from api.serializers import MovieSerializer

class AllMoviesTestCase(APITestCase):
    """Tests of the all_movies view."""

    fixtures = [
        'api/test/fixtures/genres.json',
        'api/test/fixtures/default_user.json',
    ]

    def setUp(self):
        self.user = User.objects.get(username='johndoe')
        self.url = reverse('all_movies')


    def test_all_movies_url(self):
        self.assertEqual(self.url, f'/get_all_movies/')

    def test_get_to_retrieve_all_movies_endpoint_retrieves_all_movies_returns_200_ok(self):
        self.client.force_authenticate(user=self.user)
        self.assertTrue(self.user.is_authenticated)
        self._create_test_movies()
        response = self.client.get(self.url)
        movies = Movie.objects.all()
        serializer = MovieSerializer(movies,many=True)
        self.assertEqual(len(response.data), 10)
        self.assertEqual(response.data,serializer.data)
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_get_to_retrieve_all_movies_endpoint_cannot_get_all_movies_while_logged_out_returns_403_forbidden(self):
        response = self.client.get(self.url)
        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)

    def _create_test_movies(self, movie_count=10):
        for id in range(movie_count):
            movie = Movie.objects.create(
                ml_id= 10000 + id,
                imdb_id = "100" + str(id),
                title="Best movie",
                #genres=[1,2],
                year=2000 + id,
            )
            movie.genres.set([1,2])
