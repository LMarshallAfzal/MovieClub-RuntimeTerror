from api.models import User, Movie, Rating
from rest_framework.test import APITestCase
from django.urls import reverse
from rest_framework import status
from rest_framework.test import force_authenticate,APIClient



class AverageScoreTestCase(APITestCase):

    fixtures = [
        'api/test/fixtures/default_user.json',
        'api/test/fixtures/other_users.json',
        'api/test/fixtures/default_movie.json',
    ]

    def setUp(self):
        self.user = User.objects.get(username='johndoe')
        self.other_user = User.objects.get(username='janedoe')
        self.movie = Movie.objects.get(id = 1)
        self.rating = Rating.objects.create(
            user=self.user,
            movie=self.movie,
            score = 5.0
        )
        self.url = reverse('get_average_rating', kwargs={'movie_id':self.movie.id})

    def test_average_rating_url(self):
        self.assertEqual(self.url, f'/average_rating/{self.movie.id}/')

    def test_get_to_retrieve_average_movie_rating_endpoint_with_one_rating_retrieves_that_movie_rating_returns_200_ok(self):
        self.client.force_authenticate(user=self.user)
        self.assertTrue(self.user.is_authenticated)
        response = self.client.get(self.url)
        self.assertEqual(response.data.get(1), self.rating.score)
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_get_to_retrieve_average_movie_rating_endpoint_retrieves_average_movie_rating_returns_200_ok(self):
        self.client.force_authenticate(user=self.user)
        self.assertTrue(self.user.is_authenticated)
        self._create_test_rated_movie()
        response = self.client.get(self.url)
        self.assertEqual(response.data.get(1), 4.5)
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_get_to_retrieve_average_movie_rating_endpoint_with_no_rating_returns_0_returns_200_ok(self):
        Rating.objects.get(user = self.user, movie = self.movie).delete()
        self.client.force_authenticate(user=self.user)
        self.assertTrue(self.user.is_authenticated)
        response = self.client.get(self.url)
        self.assertEqual(response.data.get(1), 0)
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_get_to_retrieve_average_movie_rating_endpoint_with_invalid_movie_returns_404_not_found(self):
        self.client.force_authenticate(user=self.user)
        self.assertTrue(self.user.is_authenticated)
        invalidMovieUrl = reverse('get_average_rating', kwargs={'movie_id':0})
        response = self.client.get(invalidMovieUrl)
        self.assertEqual(response.status_code, status.HTTP_404_NOT_FOUND)

    def test_get_to_retrieve_average_movie_rating_endpoint_cannot_get_average_movie_rating_while_logged_out_returns_403_forbidden(self):
        response = self.client.get(self.url)
        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)

    def _create_test_rated_movie(self):
        Rating.objects.create(
            user=self.other_user,
            movie=self.movie,
            score = 4.0
        )