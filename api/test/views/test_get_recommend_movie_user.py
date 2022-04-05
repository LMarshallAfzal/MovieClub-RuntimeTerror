"""Tests of the rec view."""
from api.models import Rating, User, Movie
from rest_framework.test import APITestCase
from django.urls import reverse
from rest_framework import status
from rest_framework.test import force_authenticate,APIClient
from recommender.user_movie_rec_data import MoviesForUserRecommenderData as Data

class RecommendMovieUserTestCase(APITestCase):
    """Tests of the rec view."""

    fixtures = [
        'api/test/fixtures/genres.json',
        'api/test/fixtures/default_user.json',
        'api/test/fixtures/default_movie.json',
        'api/test/fixtures/other_movies.json',
        'api/test/fixtures/recommended_movies.json',
    ]

    def setUp(self):
        self.user = User.objects.get(username='johndoe')
        self.url = reverse('rec')
        self.movie = Movie.objects.get(ml_id=6658)
        self.train_url = reverse('train')
        self.data = Data()

    def test_movie_recommender_url(self):
        self.assertEqual(self.url, f'/rec_movies/')

    def test_recommend_movies_to_user__endpoint_user_with_no_ratings_returns_5_recommended_movies_returns_200_ok(self):
        self.client.force_authenticate(user=self.user)
        self.assertTrue(self.user.is_authenticated)
        response = self.client.get(self.url)
        self.assertEqual(len(response.data), 5)
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_recommend_movies_to_user_endpoint_returns_5_recommended_movies_returns_200_ok(self):
        self.client.force_authenticate(user=self.user)
        self.assertTrue(self.user.is_authenticated)
        self._create_test_rated_movie()
        train_response = self.client.get(self.train_url)
        self.assertEqual(train_response.status_code,status.HTTP_200_OK)
        response = self.client.get(self.url)
        self.assertTrue(len(response.data) > 5)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.data.clean()
    
    def test_logged_out_user_cannot_get_recommended_movies_returns_401_unauthorized(self):
        response = self.client.get(self.url)
        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)

    def _create_test_rated_movie(self):
        Rating.objects.create(
            user=self.user,
            movie=self.movie,
            score = 5.0
        )
