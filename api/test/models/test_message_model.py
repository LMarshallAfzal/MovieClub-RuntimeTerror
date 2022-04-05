"""Unit tests for the Message model."""

from django.core.exceptions import ValidationError
from rest_framework.test import APITestCase
from api.models import User, Club, Message

class MessageModelTestCase(APITestCase):
    """Unit tests for the Message model."""

    fixtures = [
        'api/test/fixtures/genres.json',
        'api/test/fixtures/default_user.json',
        'api/test/fixtures/default_club.json',
    ]

    def setUp(self):
        self.user = User.objects.get(username='johndoe')
        self.club = Club.objects.get(id=1)
        self.message = Message.objects.create(sender = self.user, club = self.club, message = "Hello")
        self.club.club_messages.add(self.message)

    def test_valid_message(self):
        self._assert_message_is_valid()

    def test_sender_may_not_be_blank(self):
        self.message.sender = None
        self._assert_message_is_invalid()

    def test_club_may_not_be_blank(self):
        self.message.club = None
        self._assert_message_is_invalid()

    def test_message_may_not_be_blank(self):
        self.message.message = None
        self._assert_message_is_invalid()

    def test_message_must_not_contain_more_than_1500_characters(self):
        self.message.message = 'x' * 1501
        self._assert_message_is_invalid()

    def test_message_may_contain_1500_characters_at_most(self):
        self.message.message = 'x' * 1500
        self._assert_message_is_valid()

    def _assert_message_is_valid(self):
        try:
            self.message.full_clean()
        except (ValidationError):
            self.fail('Test message should be valid')

    def _assert_message_is_invalid(self):
        with self.assertRaises(ValidationError):
            self.message.full_clean()