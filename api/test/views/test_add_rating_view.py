from api.models import Rating, User, Movie
from rest_framework.test import APITestCase
from django.urls import reverse
from rest_framework import status

class CreateClubViewTestCase(APITestCase):

    fixtures = [
        "api/test/fixtures/other_users.json",
        "api/test/fixtures/default_movie",
        "api/test/fixtures/other_movie.json",
    ]

    def setUp(self):
        self.user = User.objects.get(username='janedoe')
        self.movie = Movie.objects.get(title='The Godfather')
        self.movie_input = {
            "movieID": 1,
            "title": 'TheGodfather',
            "year": 1972,
            "genres": "Crime"
        }
        self.rating_input = {
            "user": self.user,
            "movie": self.movie,
            "rating": 4.1,
        }
        # self.url = reverse("add_rating", kwargs={'MovieID':1})
        self.url = "/add_rating/1000/"


    def test_rating_is_created_and_returns_201(self):
        self.client.force_login(self.user)
        before = Rating.objects.count()
        response = self.client.post(self.url, self.rating_input)    
        after = Rating.objects.count()
        self.assertEqual(after, before+1)
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)