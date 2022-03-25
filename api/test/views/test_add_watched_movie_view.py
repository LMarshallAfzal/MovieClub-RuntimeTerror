from api.models import User, Movie, Watch
from rest_framework.test import APITestCase
from django.urls import reverse
from rest_framework import status
from rest_framework.test import force_authenticate,APIClient

class AddWatchedMovieViewTestCase(APITestCase):

    fixtures = [
        'api/test/fixtures/genres.json',
        'api/test/fixtures/default_user.json',
        'api/test/fixtures/default_movie.json',
    ]

    def setUp(self):
        self.movie = Movie.objects.get(id=1)
        self.user = User.objects.get(username='johndoe')
        self.url = reverse('add_watched_movie', kwargs={'movie_id':self.movie.id})
        self.form_input = {
            "user": self.user.id,
            "movie": self.movie.id
        }
        self.client = APIClient()

    
    def test_post_to_add_watched_movie_endpoint_with_valid_data_adds_to_watched_returns_201_created(self):
        self.client.force_authenticate(user=self.user)
        self.assertTrue(self.user.is_authenticated)
        before = Watch.objects.count()
        response = self.client.post(self.url,self.form_input)
        after = Watch.objects.count()
        self.assertEqual(after, before + 1)
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)

    def test_post_to_add_watched_movie_endpoint_with_invalid_movie_does_not_add_to_watched_returns_404_not_found(self):
        self.client.force_authenticate(user=self.user)
        self.assertTrue(self.user.is_authenticated)
        before = Watch.objects.count()
        invalidMovieUrl = reverse('add_watched_movie', kwargs={'movie_id':0})
        response = self.client.post(invalidMovieUrl)
        after = Watch.objects.count()
        self.assertEqual(after, before)
        self.assertEqual(response.status_code, status.HTTP_404_NOT_FOUND)

    def test_post_to_add_watched_movie_endpoint_user_cannot_add_same_movie_twice_to_watched_returns_404_not_found(self):
        self.client.force_authenticate(user=self.user)
        self.assertTrue(self.user.is_authenticated)
        before = Watch.objects.count()
        response1 = self.client.post(self.url,self.form_input)
        self.assertEqual(response1.status_code, status.HTTP_201_CREATED)
        response2 = self.client.post(self.url,self.form_input)
        after = Watch.objects.count()
        self.assertEqual(after, before + 1)
        self.assertEqual(response2.status_code, status.HTTP_404_NOT_FOUND)

    def test_post_to_add_watched_movie_endpoint_with_user_not_logged_in_does_not_add_to_watched(self):
        before = Watch.objects.count()
        response = self.client.post(self.url)
        after = Watch.objects.count()
        self.assertEqual(after, before)
        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)
