"""Unit tests for the User model."""

from django.core.exceptions import ValidationError
from rest_framework.test import APITestCase
from api.models import User, Membership, Club, Movie, Rating
from libgravatar import Gravatar

class UserModelTestCase(APITestCase):
    """Unit tests for the User model."""

    fixtures = [
        'api/test/fixtures/genres.json',
        'api/test/fixtures/default_user.json',
        'api/test/fixtures/other_users.json',
        'api/test/fixtures/default_club.json',
        'api/test/fixtures/other_clubs.json',
        'api/test/fixtures/default_movie.json',
        'api/test/fixtures/other_movies.json',
        "api/test/fixtures/genres.json",
    ]

    def setUp(self):
        self.user = User.objects.get(username='johndoe')
        self.second_user = User.objects.get(username='janedoe')
        self.third_user = User.objects.get(username='daviddoe')
        self.club = Club.objects.get(club_name='Beatles')
        self.other_club = Club.objects.get(club_name='Metallica')
        Membership.objects.create(user=self.user, club=self.club)
        Membership.objects.create(user=self.user, club=self.other_club, role = 'B')
        self.movie = Movie.objects.get(title='The Godfather')
        self.second_movie = Movie.objects.get(title='Annabelle')

    def test_valid_user(self):
        self._assert_user_is_valid()

    def test_username_must_be_unique(self):
        self.user.username = self.second_user.username
        self._assert_user_is_invalid()

    def test_username_must_not_be_blank(self):
        self.user.username = ''
        self._assert_user_is_invalid()

    def test_username_must_not_contain_more_than_15_characters(self):
        self.user.username = 'x' * 16
        self._assert_user_is_invalid()

    def test_username_may_contain_15_characters_at_most(self):
        self.user.username = 'x' * 15
        self._assert_user_is_valid()

    def test_first_name_must_not_be_blank(self):
        self.user.first_name = ''
        self._assert_user_is_invalid()

    def test_first_name_may_not_be_unique(self):
        self.user.first_name = self.second_user.first_name
        self._assert_user_is_valid()

    def test_first_name_must_not_contain_more_than_30_characters(self):
        self.user.first_name = 'x' * 31
        self._assert_user_is_invalid()

    def test_first_name_may_contain_no_more_than_30_characters(self):
        self.user.first_name = 'x' * 30
        self._assert_user_is_valid()

    def test_last_name_must_not_be_blank(self):
        self.user.last_name = ''
        self._assert_user_is_invalid()

    def test_last_name_may_not_be_unique(self):
        self.user.last_name = self.second_user.last_name
        self._assert_user_is_valid()

    def test_last_name_must_not_contain_more_than_30_characters(self):
        self.user.last_name = 'x' * 31
        self._assert_user_is_invalid()

    def test_last_name_may_contain_no_more_than_30_characters(self):
        self.user.last_name = 'x' * 30
        self._assert_user_is_valid()

    def test_email_must_not_be_blank(self):
        self.user.email = ''
        self._assert_user_is_invalid()

    def test_email_must_be_unique(self):
        self.user.email = self.second_user.email
        self._assert_user_is_invalid()

    def test_email_must_contain_username(self):
        self.user.email = '@example.org'
        self._assert_user_is_invalid()

    def test_email_must_contain_at_symbol(self):
        self.user.email = 'johndoe.example.org'
        self._assert_user_is_invalid()

    def test_email_must_contain_domain(self):
        self.user.email = 'johndoe@.org'
        self._assert_user_is_invalid()

    def test_email_must_not_contain_more_than_one_at_symbol(self):
        self.user.email = 'johndoe@@example.org'
        self._assert_user_is_invalid()

    def test_bio_may_be_blank(self):
        self.user.bio = ''
        self._assert_user_is_valid()

    def test_bio_need_not_be_unique(self):
        self.user.bio = self.second_user.bio
        self._assert_user_is_valid()

    def test_bio_may_contain_520_characters(self):
        self.user.bio = 'x' * 520
        self._assert_user_is_valid()

    def test_bio_must_not_contain_more_than_520_characters(self):
        self.user.bio = 'x' * 521
        self._assert_user_is_invalid()

    def test_preferences_must_not_be_blank(self):
        self.user.preferences.remove(*self.user.preferences.all())
        self._assert_user_is_invalid()

    def test_preferences_need_not_be_unique(self):
        self.user.preferences.remove(*self.user.preferences.all())
        self.user.preferences.set(self.second_user.preferences.all())
        self._assert_user_is_valid()

    def test_mini_gravatar(self):
        gravatar_mini = self.user.mini_gravatar()
        self.assertTrue("size=60" in gravatar_mini)

    def test_gravatar(self):
        gravatar = self.user.gravatar()
        self.assertTrue("size=120" in gravatar)

    def test_toggle_follow_user(self):
        self.assertFalse(self.user.is_following(self.second_user))
        self.assertFalse(self.second_user.is_following(self.user))
        self.user.toggle_follow(self.second_user)
        self.assertTrue(self.user.is_following(self.second_user))
        self.assertFalse(self.second_user.is_following(self.user))
        self.user.toggle_follow(self.second_user)
        self.assertFalse(self.user.is_following(self.second_user))
        self.assertFalse(self.second_user.is_following(self.user))

    def test_follow_counters(self):
        self.user.toggle_follow(self.second_user)
        self.user.toggle_follow(self.third_user)
        self.second_user.toggle_follow(self.third_user)
        self.third_user.toggle_follow(self.second_user)
        self.assertEqual(self.user.follower_count(), 0)
        self.assertEqual(self.user.followee_count(), 2)
        self.assertEqual(self.second_user.follower_count(), 2)
        self.assertEqual(self.second_user.followee_count(), 1)
        self.assertEqual(self.third_user.follower_count(), 2)
        self.assertEqual(self.third_user.followee_count(), 1)

    def test_user_cannot_follow_self(self):
        self.user.toggle_follow(self.user)
        self.assertEqual(self.user.follower_count(), 0)
        self.assertEqual(self.user.followee_count(), 0)

    def test_full_name(self):
        self.assertEqual(self.user.full_name(), self.user.first_name +' '+ self.user.last_name)

    def test_get_user_clubs(self):
        clubs = self.user.get_user_clubs()
        self.assertEqual(len(clubs), 1)

    def test_get_user_preferences(self):
        preferences = self.user.get_user_preferences()
        self.assertEqual(len(preferences), 2)

    def test_get_user_ratings(self):
        before = self.user.get_user_ratings()
        Rating.objects.create(user = self.user, movie = self.movie, score = 5.0)
        Rating.objects.create(user = self.second_user, movie = self.movie, score = 5.0)
        after = self.user.get_user_ratings()
        self.assertEqual(1, len(after))
        self.assertIsNone(before)

    def test_get_favourite_movies(self):
        before = self.user.get_favourite_movies()
        Rating.objects.create(user = self.user, movie = self.movie, score = 5.0)
        Rating.objects.create(user = self.user, movie = self.second_movie, score = 2.0)
        after = self.user.get_favourite_movies()
        self.assertEqual(len(before) + 1, len(after))

    def test_get_user_memberships(self):
        memberships = self.user.get_user_memberships()
        self.assertEqual(len(memberships), 1)

    def _assert_user_is_valid(self):
        try:
            self.user.full_clean()
        except (ValidationError):
            self.fail('Test user should be valid')

    def _assert_user_is_invalid(self):
        with self.assertRaises(ValidationError):
            self.user.full_clean()
