"""Unit tests for the Watch model."""

from django.core.exceptions import ValidationError
from rest_framework.test import APITestCase
from api.models import User, Movie, Watch

class WatchModelTestCase(APITestCase):
    """Unit tests for the Watch model."""

    fixtures = [
        'api/test/fixtures/genres.json',
        'api/test/fixtures/default_user.json',
        'api/test/fixtures/default_movie.json',
    ]

    def setUp(self):
        self.user = User.objects.get(username='johndoe')
        self.movie = Movie.objects.get(title='The Godfather')
        self.viewer = Watch(user = self.user, movie = self.movie)

    def test_valid_viewer(self):
        self._assert_viewer_is_valid()

    def test_user_may_not_be_blank(self):
        self.viewer.user = None
        self._assert_viewer_is_invalid()

    def test_movie_may_not_be_blank(self):
        self.viewer.movie = None
        self._assert_viewer_is_invalid()

    def _assert_viewer_is_valid(self):
        try:
            self.viewer.full_clean()
        except (ValidationError):
            self.fail('Test viewer should be valid')

    def _assert_viewer_is_invalid(self):
        with self.assertRaises(ValidationError):
            self.viewer.full_clean()