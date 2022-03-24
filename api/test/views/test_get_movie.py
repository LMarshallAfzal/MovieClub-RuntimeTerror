from api.models import User, Movie
from rest_framework.test import APITestCase
from django.urls import reverse
from rest_framework import status
from api.serializers import MovieSerializer
from rest_framework.test import force_authenticate,APIClient



class GetMovieViewTestCase(APITestCase):

    fixtures = [
        'api/test/fixtures/default_genre.json',
        'api/test/fixtures/other_genres.json',
        'api/test/fixtures/default_user.json',
        'api/test/fixtures/default_movie.json',
    ]

    def setUp(self):
        self.movie = Movie.objects.get(id=1)
        self.user = User.objects.get(username='johndoe')
        self.url = reverse('get_movie', kwargs={'movie_id':self.movie.id})
        self.client = APIClient()

    def test_get_movie_url(self):
        self.assertEqual(self.url, f'/get_movie/{self.movie.id}/')

    def test_get_to_retrieve_movie_endpoint_retrieves_movie_returns_200_ok(self):
        self.client.force_authenticate(user=self.user)
        self.assertTrue(self.user.is_authenticated)
        response = self.client.get(self.url)
        movie = Movie.objects.get(id = self.movie.id)
        serializer = MovieSerializer(movie,many=False)
        self.assertEqual(response.data,serializer.data)
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_get_to_retrieve_movie_endpoint_cannot_get_movie_while_logged_out_returns_403_forbidden(self):
        response = self.client.get(self.url)
        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)