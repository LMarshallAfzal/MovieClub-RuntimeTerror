"""Tests of the get_favourite_movies view."""
from api.models import User, Movie, Rating
from rest_framework.test import APITestCase
from django.urls import reverse
from rest_framework import status
from api.serializers import MovieSerializer
from rest_framework.test import force_authenticate,APIClient



class FavouriteMoviesTestCase(APITestCase):
    """Tests of the get_favourite_movies view."""

    fixtures = [
        'api/test/fixtures/genres.json',
        'api/test/fixtures/default_user.json',
        'api/test/fixtures/default_movie.json',
        'api/test/fixtures/other_movies.json',
    ]

    def setUp(self):
        self.user = User.objects.get(username='johndoe')
        self.favourite_movie = Movie.objects.get(id=1)
        self.other_movie = Movie.objects.get(id=2)
        self.url = reverse('get_favourite_movies',kwargs={'user_id':self.user.id})
    


    def test_favourite_movies_url(self):
        self.assertEqual(self.url, f'/favourite_movies/{self.user.id}/')

    def test_get_to_retrieve_favourite_movies_endpoint_retrieves_favourite_movies_returns_200_ok(self):
        self.client.force_authenticate(user=self.user)
        self.assertTrue(self.user.is_authenticated)
        self._create_test_rated_movie()
        self._create_test_rated_favourite_movie()
        response = self.client.get(self.url)
        favourite_movies = self.user.get_favourite_movies()
        serializer = MovieSerializer(favourite_movies,many=True)
        self.assertEqual(response.data,serializer.data)
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_get_to_retrieve_favourite_movies_endpoint_with_no_favourite_movies_returns_200_ok(self):
        self.client.force_authenticate(user=self.user)
        self.assertTrue(self.user.is_authenticated)
        self._create_test_rated_movie()
        response = self.client.get(self.url)
        favourite_movies = self.user.get_favourite_movies()
        serializer = MovieSerializer(favourite_movies,many=True)
        self.assertEqual(response.data,serializer.data)
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_get_to_retrieve_favourite_movies_endpoint_cannot_get_watched_movie_while_logged_out_returns_401_unauthorized(self):
        response = self.client.get(self.url)
        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)

    def _create_test_rated_movie(self):
        Rating.objects.create(
            user=self.user,
            movie=self.other_movie,
            score = 4.0
        )

    def _create_test_rated_favourite_movie(self):
        Rating.objects.create(
            user=self.user,
            movie=self.favourite_movie,
            score = 5.0
        )
