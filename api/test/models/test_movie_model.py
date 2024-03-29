"""Unit tests for the Movie model."""

from django.core.exceptions import ValidationError
from rest_framework.test import APITestCase
from api.models import Movie, Rating, User

class MovieModelTestCase(APITestCase):
    """Unit tests for the User model."""

    fixtures = [
        'api/test/fixtures/genres.json',
        'api/test/fixtures/default_movie.json',
        'api/test/fixtures/default_user.json',
        'api/test/fixtures/other_movies.json',
        'api/test/fixtures/other_users.json',
    ]

    def setUp(self):
        self.movie = Movie.objects.get(ml_id=1)
        self.second_movie = Movie.objects.get(ml_id=2)
        self.user = User.objects.get(username='johndoe')
        self.second_user = User.objects.get(username='janedoe')

    def test_valid_movie(self):
        self._assert_movie_is_valid()

    def test_movie_id_must_be_unique(self):
        self.movie.ml_id = self.second_movie.ml_id
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
        self.movie.genres.remove(*self.movie.genres.all())
        self.movie.genres.set(self.second_movie.genres.all())
        self._assert_movie_is_valid()

    def test_genres_must_not_be_blank(self):
        self.movie.genres.remove(*self.movie.genres.all())
        self._assert_movie_is_invalid()

    def test_get_rating_author(self):
        rating = Rating.objects.create(user=self.user, movie=self.movie, score = 5.0)
        author = self.movie.get_rating_author(self.user)
        self.assertEqual(author, rating)

    def test_get_movie_title(self):
        title = self.movie.get_movie_title()
        self.assertEqual(title, self.movie.title)

    # def test_get_movies_by_genre(self):
    #     genre = self.second_movie.genres
    #     movies = self.second_movie.get_movies_by_genre('Horror')
    #     print(movies)

    def _assert_movie_is_valid(self):
        try:
            self.movie.full_clean()
        except (ValidationError):
            self.fail('Test movie should be valid')
            
    def _assert_movie_is_invalid(self):
        with self.assertRaises(ValidationError):
            self.movie.full_clean()

    

