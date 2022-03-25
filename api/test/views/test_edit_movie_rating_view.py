from api.models import User, Movie, Rating
from rest_framework.test import APITestCase
from django.urls import reverse
from rest_framework import status
from rest_framework.test import force_authenticate,APIClient

class EditMovieRatingViewTestCase(APITestCase):

    fixtures = [
        'api/test/fixtures/genres.json',
        'api/test/fixtures/default_user.json',
        'api/test/fixtures/default_movie.json',
    ]

    def setUp(self):
        self.movie = Movie.objects.get(id=1)
        self.user = User.objects.get(username='johndoe')
        self.rating = Rating.objects.create(user = self.user, movie = self.movie, score = 5.0)
        self.url = reverse('edit_rating', kwargs={'movie_id':self.movie.id})
        self.form_input = {
            "user": self.user.id,
            "movie": self.movie.id,
            "score": 4.0,
        }
        self.client = APIClient()  


    def test_post_to_edit_rating_endpoint_with_valid_data_edits_rating_returns_200_ok(self):
        self.client.force_authenticate(user=self.user)
        self.assertTrue(self.user.is_authenticated)
        before = Rating.objects.count()
        response = self.client.put(self.url, self.form_input)
        after = Rating.objects.count()
        self.assertEqual(after, before)
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_post_to_edit_rating_endpoint_with_rating_higher_than_5_does_not_edit_rating_returns_400_bad_request(self):
        self.client.force_authenticate(user=self.user)
        self.assertTrue(self.user.is_authenticated)
        before = Rating.objects.count()
        input = self.form_input
        input['score'] = 6.0
        response = self.client.put(self.url, input)
        after = Rating.objects.count()
        self.assertEqual(after, before)
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)

    def test_post_to_edit_rating_endpoint_with_rating_less_than_1_does_not_edit_rating_returns_400_bad_request(self):
        self.client.force_authenticate(user=self.user)
        self.assertTrue(self.user.is_authenticated)
        before = Rating.objects.count()
        input = self.form_input
        input['score'] = 0.0
        response = self.client.put(self.url, input)
        after = Rating.objects.count()
        self.assertEqual(after, before)
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)

    def test_post_to_edit_rating_endpoint_with_invalid_movie_does_not_edit_rating_returns_404_not_found(self):
        self.client.force_authenticate(user=self.user)
        self.assertTrue(self.user.is_authenticated)
        before = Rating.objects.count()
        invalidMovieUrl = reverse('edit_rating', kwargs={'movie_id':0})
        response = self.client.put(invalidMovieUrl, self.form_input)
        after = Rating.objects.count()
        self.assertEqual(after, before)
        self.assertEqual(response.status_code, status.HTTP_404_NOT_FOUND)

    def test_post_to_edit_rating_endpoint_with_movie_that_was_not_rated_does_not_edit_rating_returns_404_not_found(self):
        self.client.force_authenticate(user=self.user)
        self.assertTrue(self.user.is_authenticated)
        before = Rating.objects.count()
        notRatedMovieUrl = reverse('edit_rating', kwargs={'movie_id':100})
        response = self.client.put(notRatedMovieUrl, self.form_input)
        after = Rating.objects.count()
        self.assertEqual(after, before)
        self.assertEqual(response.status_code, status.HTTP_404_NOT_FOUND)

    def test_post_to_edit_rating_endpoint_with_user_not_logged_in_returns_401_unautorized(self):
        before = Rating.objects.count()
        response = self.client.put(self.url, self.form_input)
        after = Rating.objects.count()
        self.assertEqual(after, before)
        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)

    