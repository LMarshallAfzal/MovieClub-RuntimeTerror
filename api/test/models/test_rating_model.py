"""Unit tests for the Rating model."""

from django.core.exceptions import ValidationError
from rest_framework.test import APITestCase
from api.models import User, Movie, Rating

class RatingModelTestCase(APITestCase):
    """Unit tests for the Rating model."""

    fixtures = [
        'api/test/fixtures/default_user.json',
        'api/test/fixtures/default_movie.json',
    ]

    def setUp(self):
        self.user = User.objects.get(username='johndoe')
        self.movie = Movie.objects.get(movieID=1000)
        self.rating = Rating(user = self.user, movie = self.movie, score = 5.0)

    def test_valid_rating(self):
        self._assert_rating_is_valid()

    def test_user_may_not_be_blank(self):
        self.rating.user = None
        self._assert_rating_is_invalid()

    def test_movie_may_not_be_blank(self):
        self.rating.movie = None
        self._assert_rating_is_invalid()

    def test_score_may_not_be_blank(self):
        self.rating.score = None
        self._assert_rating_is_invalid()

    def test_score_may_not_be_higher_than_5(self):
        self.rating.score = 6.0
        self._assert_rating_is_invalid()

    def test_score_may_not_be_lower_than_1(self):
        self.rating.score = 0.0
        self._assert_rating_is_invalid()

    def _assert_rating_is_valid(self):
        try:
            self.rating.full_clean()
        except (ValidationError):
            self.fail('Test rating should be valid')

    def _assert_rating_is_invalid(self):
        with self.assertRaises(ValidationError):
            self.rating.full_clean()