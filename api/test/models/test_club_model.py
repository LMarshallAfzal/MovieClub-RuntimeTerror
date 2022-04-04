"""Unit tests for the Club model."""

from django.core.exceptions import ValidationError
from rest_framework.test import APITestCase
from api.models import Club, User, Membership, Message

class ClubModelTestCase(APITestCase):
    """Unit tests for the Club model."""

    fixtures = [
        'api/test/fixtures/default_club.json',
        'api/test/fixtures/default_user.json',
        'api/test/fixtures/other_users.json',
        'api/test/fixtures/other_clubs.json',
    ]

    def setUp(self):
        self.user = User.objects.get(username='johndoe')
        self.second_user = User.objects.get(username='janedoe')
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

    def test_club_mission_statement_may_not_be_blank(self):
        self.club.mission_statement = ''
        self._assert_club_is_invalid()

    def test_club_mission_statement_must_not_contain_more_than_500_characters(self):
        self.club.mission_statement = 'x' * 501
        self._assert_club_is_invalid()

    def test_club_mission_statement_may_contain_500_characters_at_most(self):
        self.club.mission_statement = 'x' * 500
        self._assert_club_is_valid()

    def test_get_all_users_in_club(self):
        Membership.objects.create(user=self.user, club=self.club)
        Membership.objects.create(user=self.second_user, club=self.club)
        users = self.club.get_all_users_in_club()
        self.assertEqual(2, len(users))

    def test_get_organiser(self):
        Membership.objects.create(user=self.user, club=self.club, is_organiser = True)
        organiser = self.club.get_organiser()
        self.assertEqual(organiser[0], self.user)
    
    def test_get_club_messages(self):
        message = Message.objects.create(sender = self.user, club = self.club, message = "Hello")
        self.club.club_messages.add(message)
        club_messages = self.club.get_club_messages()
        self.assertEqual(len(club_messages), 1)

    def _assert_club_is_valid(self):
        try:
            self.club.full_clean()
        except (ValidationError):
            self.fail('Test club should be valid')

    def _assert_club_is_invalid(self):
        with self.assertRaises(ValidationError):
            self.club.full_clean()
