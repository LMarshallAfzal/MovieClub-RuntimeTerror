from api.models import User, Movie, Rating
from rest_framework.test import APITestCase
from django.urls import reverse
from rest_framework import status

class AddMovieRatingViewTestCase(APITestCase):

    fixtures = [
        'api/test/fixtures/default_user.json',
        'api/test/fixtures/default_movie.json',
    ]

    def setUp(self):
        self.movie = Movie.objects.get(movieID=1000)
        self.user = User.objects.get(username='johndoe')
        self.url = reverse('add_rating', kwargs={'movieID':self.movie.movieID})
        self.form_input = {
            "score": 5.0,
        }
        
    def test_post_to_add_rating_endpoint_with_valid_data_creates_new_rating(self):
        self.client.force_login(self.user)
        before = Rating.objects.count()
        response = self.client.post(self.url, self.form_input)
        after = Rating.objects.count()
        self.assertEqual(after, before + 1)
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)

    def test_post_to_add_rating_endpoint_with_rating_higher_than_5_does_not_create_new_rating(self):
        self.client.force_login(self.user)
        before = Rating.objects.count()
        input = self.form_input
        input['score'] = 6.0
        response = self.client.post(self.url, input)
        after = Rating.objects.count()
        self.assertEqual(after, before)
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)

    def test_post_to_add_rating_endpoint_with_invalid_movie_does_not_create_new_rating(self):
        self.client.force_login(self.user)
        before = Rating.objects.count()
        invalidMovieUrl = reverse('add_rating', kwargs={'movieID':0})
        response = self.client.post(invalidMovieUrl, self.form_input)
        after = Rating.objects.count()
        self.assertEqual(after, before)
        self.assertEqual(response.status_code, status.HTTP_404_NOT_FOUND)

    def test_post_to_add_rating_endpoint_with_user_not_logged_in_not_create_new_rating(self):
        before = Rating.objects.count()
        response = self.client.post(self.url, self.form_input)
        after = Rating.objects.count()
        self.assertEqual(after, before)
        self.assertEqual(response.status_code, status.HTTP_403_FORBIDDEN)

    