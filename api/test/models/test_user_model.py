"""Unit tests for the User model."""

from django.core.exceptions import ValidationError
from rest_framework.test import APITestCase
from api.models import User, Membership, Club

class UserModelTestCase(APITestCase):
    """Unit tests for the User model."""

    fixtures = [
        'api/test/fixtures/genres.json',
        'api/test/fixtures/default_user.json',
        'api/test/fixtures/other_users.json',
        'api/test/fixtures/default_club.json',
    ]

    def setUp(self):
        self.user = User.objects.get(username='johndoe')
        self.second_user = User.objects.get(username='janedoe')

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

    def test_get_user_clubs(self):
        clubs = self.user.get_user_clubs()
        self.assertEqual(clubs.count(), 0)
        club = Club.objects.get(club_name='Beatles')
        Membership.objects.create(user=self.user, club=club)
        clubs = self.user.get_user_clubs()

        self.assertEqual(clubs.count(), 1)

    def _assert_user_is_valid(self):
        try:
            self.user.full_clean()
        except (ValidationError):
            self.fail('Test user should be valid')

    def _assert_user_is_invalid(self):
        with self.assertRaises(ValidationError):
            self.user.full_clean()
