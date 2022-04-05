"""Tests of the add_rating view."""
from api.models import User, Movie, Rating
from rest_framework.test import APITestCase
from django.urls import reverse
from rest_framework import status
from rest_framework.test import force_authenticate,APIClient



class AddMovieRatingViewTestCase(APITestCase):
    """Tests of the add_rating view."""

    fixtures = [
        'api/test/fixtures/genres.json',
        'api/test/fixtures/default_user.json',
        'api/test/fixtures/default_movie.json',
    ]

    def setUp(self):
        self.movie = Movie.objects.get(id=1)
        self.user = User.objects.get(username='johndoe')
        self.url = reverse('add_rating', kwargs={'movie_id':self.movie.id})
        self.form_input = {
            "user": self.user.id,
            "movie" : self.movie.id,
            "score": 5.0,
        }
        self.client = APIClient()

        
    def test_post_to_add_rating_endpoint_with_valid_data_creates_new_rating_returns_201_created(self):
        self.client.force_authenticate(user=self.user)
        self.assertTrue(self.user.is_authenticated)
        before = Rating.objects.count()
        response = self.client.post(self.url, self.form_input)
        after = Rating.objects.count()
        self.assertEqual(after, before + 1)
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)

    def test_post_to_add_rating_endpoint_with_rating_higher_than_5_does_not_create_new_rating_returns_400_bad_request(self):
        self.client.force_authenticate(user=self.user)
        self.assertTrue(self.user.is_authenticated)
        before = Rating.objects.count()
        input = self.form_input
        input['score'] = 6.0
        response = self.client.post(self.url, input)
        after = Rating.objects.count()
        self.assertEqual(after, before)
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)

    def test_post_to_add_rating_endpoint_with_invalid_movie_does_not_create_new_rating_returns_404_not_found(self):
        self.client.force_authenticate(user=self.user)
        self.assertTrue(self.user.is_authenticated)
        before = Rating.objects.count()
        invalidMovieUrl = reverse('add_rating', kwargs={'movie_id':0})
        response = self.client.post(invalidMovieUrl, self.form_input)
        after = Rating.objects.count()
        self.assertEqual(after, before)
        self.assertEqual(response.status_code, status.HTTP_404_NOT_FOUND)

    def test_post_to_add_rating_endpoint_with_user_not_logged_in_not_create_new_rating_returns_401_unauthorized(self):
        before = Rating.objects.count()
        response = self.client.post(self.url, self.form_input)
        after = Rating.objects.count()
        self.assertEqual(after, before)
        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)

    