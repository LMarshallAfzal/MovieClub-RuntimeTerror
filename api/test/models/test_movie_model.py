"""Unit tests for the Movie model."""

from django.core.exceptions import ValidationError
from rest_framework.test import APITestCase
from api.models import Movie

class MovieModelTestCase(APITestCase):
    """Unit tests for the User model."""

    fixtures = [
        'api/test/fixtures/default_movie.json',
        'api/test/fixtures/other_movie.json',
    ]

    def setUp(self):
        self.movie = Movie.objects.get(movieID=1000)
        self.second_movie = Movie.objects.get(movieID=1001)

    def test_valid_movie(self):
        self._assert_movie_is_valid()

    def test_movieID_must_be_unique(self):
        self.movie.movieID = self.second_movie.movieID
        print(self.movie.movieID)
        self._assert_movie_is_invalid()

    def test_title_must_not_be_blank(self):
        self.movie.title = ''
        self._assert_movie_is_invalid()

    def test_title_may_contain_100_characters_at_most(self):
        self.movie.title = 'x' * 100
        self._assert_movie_is_valid()

    def test_title_must_not_contain_more_than_100_characters(self):
        self.movie.title = 'x' * 101
        self._assert_movie_is_invalid()
    
    def test_year_must_not_be_blank(self):
        self.movie.year = ''
        self._assert_movie_is_invalid()

    def test_year_need_not_be_unique(self):
        self.movie.year = self.second_movie.year
        self._assert_movie_is_valid()
    
    def test_genres_need_not_be_unique(self):
        self.movie.genres = self.second_movie.genres
        self._assert_movie_is_valid()

    def test_genres_must_not_be_blank(self):
        self.movie.genres = ''
        self._assert_movie_is_invalid()

    def test_genres_contain_100_characters_at_most(self):
        self.movie.genres = 'x' * 100
        self._assert_movie_is_valid()

    def test_genres_must_not_contain_more_than_100_characters(self):
        self.movie.genres = 'x' * 101
        self._assert_movie_is_invalid()

    def _assert_movie_is_valid(self):
        try:
            self.movie.full_clean()
        except (ValidationError):
            self.fail('Test movie should be valid')
            
    def _assert_movie_is_invalid(self):
        with self.assertRaises(ValidationError):
            self.movie.full_clean()

    

