"""Unit tests for the Club model."""

from django.core.exceptions import ValidationError
from rest_framework.test import APITestCase
from api.models import Club

class ClubModelTestCase(APITestCase):
    """Unit tests for the Club model."""

    fixtures = [
        'api/test/fixtures/default_club.json',
        'api/test/fixtures/other_clubs.json',
    ]

    def setUp(self):
        self.club = Club.objects.get(club_name = 'Beatles')
        self.second_club = Club.objects.get(club_name = 'KISS')

    def test_valid_club(self):
        self._assert_club_is_valid()

    def test_club_name_must_not_be_blank(self):
        self.club.club_name = ''
        self._assert_club_is_invalid()

    def test_club_name_must_not_contain_more_than_50_characters(self):
        self.club.club_name = 'x' * 51
        self._assert_club_is_invalid()

    def test_club_name_may_contain_50_characters_at_most(self):
        self.club.club_name = 'x' * 50
        self._assert_club_is_valid()

    def test_club_name_must_be_unique(self):
        self.club.club_name = self.second_club.club_name
        self._assert_club_is_invalid()

    def test_club_mission_statement_may_be_blank(self):
        self.club.mission_statement = ''
        self._assert_club_is_valid()

    def test_club_mission_statement_must_not_contain_more_than_500_characters(self):
        self.club.mission_statement = 'x' * 501
        self._assert_club_is_invalid()

    def test_club_mission_statement_may_contain_500_characters_at_most(self):
        self.club.mission_statement = 'x' * 500
        self._assert_club_is_valid()

    def _assert_club_is_valid(self):
        try:
            self.club.full_clean()
        except (ValidationError):
            self.fail('Test club should be valid')

    def _assert_club_is_invalid(self):
        with self.assertRaises(ValidationError):
            self.club.full_clean()
