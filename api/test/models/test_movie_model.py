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
        self.movie = Movie.objects.get(movie_name='The Godfather')
        self.second_movie = Movie.objects.get(movie_name='Pulp Fiction')

    def test_valid_movie(self):
        self._assert_movie_is_valid()

    def test_movie_name_must_be_unique(self):
        self.movie.movie_name = self.second_movie.movie_name
        self._assert_movie_is_invalid()

    def test_movie_name_must_not_be_blank(self):
        self.movie.movie_name = ''
        self._assert_movie_is_invalid()

    def test_movie_name_may_contain_100_characters_at_most(self):
        self.movie.movie_name = 'x' * 100
        self._assert_movie_is_valid()

    def test_movie_name_must_not_contain_more_than_100_characters(self):
        self.movie.movie_name = 'x' * 101
        self._assert_movie_is_invalid()
    
    def test_release_date_must_not_be_blank(self):
        self.movie.release_date = ''
        self._assert_movie_is_invalid()

    def test_release_date_need_not_be_unique(self):
        self.movie.release_date = self.second_movie.release_date
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

    def test_director_need_not_be_unique(self):
        self.movie.director = self.second_movie.director
        self._assert_movie_is_valid()

    def test_director_must_not_be_blank(self):
        self.movie.director = ''
        self._assert_movie_is_invalid()

    def test_director_contain_50_characters_at_most(self):
        self.movie.director = 'x' * 50
        self._assert_movie_is_valid()

    def test_director_must_not_contain_more_than_50_characters(self):
        self.movie.director = 'x' * 51
        self._assert_movie_is_invalid()
    
    def test_cast_need_not_be_unique(self):
        self.movie.cast = self.second_movie.cast
        self._assert_movie_is_valid()

    def test_cast_must_not_be_blank(self):
        self.movie.cast = ''
        self._assert_movie_is_invalid()

    def test_cast_contain_250_characters_at_most(self):
        self.movie.cast = 'x' * 250
        self._assert_movie_is_valid()

    def test_cast_must_not_contain_more_than_250_characters(self):
        self.movie.cast = 'x' * 251
        self._assert_movie_is_invalid()

    
    

    def _assert_movie_is_valid(self):
        try:
            self.movie.full_clean()
        except (ValidationError):
            self.fail('Test movie should be valid')
            
    def _assert_movie_is_invalid(self):
        with self.assertRaises(ValidationError):
            self.movie.full_clean()

    

