"""Unit tests for the Genre model."""

from django.core.exceptions import ValidationError
from rest_framework.test import APITestCase
from api.models import Genre

class GenreModelTestCase(APITestCase):
    """Unit tests for the Genre model."""

    fixtures = [
        "api/test/fixtures/genres.json",
    ]

    def setUp(self):
        self.genre = Genre.objects.get(id=1)
        self.other_genre = Genre.objects.get(id = 2)

    def test_valid_genre(self):
        self._assert_genre_is_valid()

    def test_genre_must_be_unique(self):
        self.genre.name = self.other_genre.name
        self._assert_genre_is_invalid()

    def test_genre_must_not_contain_more_than_100_characters(self):
        self.genre.name = 'x' * 101
        self._assert_genre_is_invalid()

    def test_genre_may_contain_100_characters_at_most(self):
        self.genre.name = 'x' * 100
        self._assert_genre_is_valid()

    def test_get_genre_id(self):
        genre_id = self.genre.get_genre_id('Comedy')
        self.assertEqual(genre_id, 1)

    def test_get_genre_id_with_new_genre(self):
        genresBefore = Genre.objects.count()
        self.genre.get_genre_id('Best')
        genresAfter = Genre.objects.count()
        self.assertEqual(genresBefore + 1, genresAfter)

    def test_get_genre_ids(self):
        genres = ['Comedy', 'War']
        genre_ids = self.genre.get_genre_ids(genres)
        self.assertEqual(len(genre_ids), 2)

    def _assert_genre_is_valid(self):
        try:
            self.genre.full_clean()
        except (ValidationError):
            self.fail('Test genre should be valid')

    def _assert_genre_is_invalid(self):
        with self.assertRaises(ValidationError):
            self.genre.full_clean()

    