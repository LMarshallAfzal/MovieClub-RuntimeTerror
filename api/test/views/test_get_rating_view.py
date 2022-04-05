"""Tests of the get_rating view."""
from api.models import User, Movie, Rating
from rest_framework.test import APITestCase
from django.urls import reverse
from rest_framework import status
from api.serializers import RatingSerializer
from rest_framework.test import force_authenticate,APIClient



class GetRatingViewTestCase(APITestCase):
    """Tests of the get_rating view."""

    fixtures = [
        'api/test/fixtures/genres.json',
        'api/test/fixtures/default_user.json',
        'api/test/fixtures/default_movie.json',
    ]

    def setUp(self):
        self.movie = Movie.objects.get(id=1)
        self.user = User.objects.get(username='johndoe')
        Rating.objects.create(user = self.user, movie = self.movie, score = 5.0)
        self.url = reverse('get_rating', kwargs={'movie_id':self.movie.id})
        self.client = APIClient()

    def test_get_rating_url(self):
        self.assertEqual(self.url, f'/get_rating/{self.movie.id}/')

    def test_get_to_retrieve_movie_endpoint_retrieves_movie_returns_200_ok(self):
        self.client.force_authenticate(user=self.user)
        self.assertTrue(self.user.is_authenticated)
        response = self.client.get(self.url)
        rating = Rating.objects.get(id = self.movie.id)
        serializer = RatingSerializer(rating,many=False)
        self.assertEqual(response.data,serializer.data)
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_get_to_retrieve_rating_endpoint_cannot_get_rating_while_logged_out_returns_401_unauthorized(self):
        response = self.client.get(self.url)
        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)