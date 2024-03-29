"""Unit tests for the Membership model."""

from django.core.exceptions import ValidationError
from rest_framework.test import APITestCase
from api.models import User, Club, Membership

class UserMembershipTestCase(APITestCase):
    """Unit tests for the Membership model."""

    fixtures = [
        'api/test/fixtures/genres.json',
        'api/test/fixtures/default_user.json',
        'api/test/fixtures/other_users.json',
        'api/test/fixtures/default_club.json',
        'api/test/fixtures/other_clubs.json',
    ]

    def setUp(self):
        self.user = User.objects.get(username='johndoe')
        self.club = Club.objects.get(club_name='Beatles')
        self.membership = Membership.objects.create(user = self.user, club = self.club, role = "M", is_organiser = False)

    def test_valid_membership(self):
        self._assert_membership_is_valid()

    def test_user_may_not_be_blank(self):
        self.membership.user = None
        self._assert_membership_is_invalid()

    def test_club_may_not_be_blank(self):
        self.membership.club = None
        self._assert_membership_is_invalid()

    def test_toggle_organiser(self):
        organiserBefore = self.membership.is_organiser
        self.membership.toggle_organiser()
        organiserAfter = self.membership.is_organiser
        self.assertFalse(organiserBefore)
        self.assertTrue(organiserAfter)

    def test_get_club_membership(self):
        self.assertEqual(self.membership.role,"M")

    def test_get_role_name(self):
        role = self.membership.get_role_name()
        self.assertEqual(role, "Member")

    def _assert_membership_is_valid(self):
        try:
            self.membership.full_clean()
        except (ValidationError):
            self.fail('Test membership should be valid')

    def _assert_membership_is_invalid(self):
        with self.assertRaises(ValidationError):
            self.membership.full_clean()