from api.models import Rating, User, Movie
from rest_framework.test import APITestCase
from django.urls import reverse
from rest_framework import status
from rest_framework.test import force_authenticate,APIClient



class RecommendClubUserTestCase(APITestCase):

    fixtures = [
        'api/test/fixtures/default_user.json',
        'api/test/fixtures/default_movie.json',
        'api/test/fixtures/recommended_movies.json',
    ]

    def setUp(self):
        self.user = User.objects.get(username='johndoe')
        self.url = reverse('rec_clubs')
        self.movie = Movie.objects.get(ml_id=7541)

    def test_movie_recommender_url(self):
        self.assertEqual(self.url, f'/rec/clubs/')

    # def test_recommend_clubs_to_user_endpoint_returns_2_recommended_clubs_returns_200_ok(self):
    #     self.client.force_authenticate(user=self.user)
    #     self.assertTrue(self.user.is_authenticated)
    #     self._create_test_rated_movie()
    #     response = self.client.get(self.url)
    #     self.assertEqual(len(response.data), 2)
    #     self.assertEqual(response.status_code, status.HTTP_200_OK)
    
    def test_logged_out_user_cannot_get_recommended_clubs_returns_401_unauthorized(self):
        response = self.client.get(self.url)
        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)

    def _create_test_rated_movie(self):
        Rating.objects.create(
            user=self.user,
            movie=self.movie,
            score = 2.0
        )
