"""Unit tests for the Membership model."""

from django.core.exceptions import ValidationError
from rest_framework.test import APITestCase
from api.models import User, Club, Meeting, Movie

class MeetingTestCase(APITestCase):
    """Unit tests for the Membership model."""

    fixtures = [
        'api/test/fixtures/default_user.json',
        'api/test/fixtures/other_users.json',
        'api/test/fixtures/default_club.json',
        'api/test/fixtures/other_clubs.json',
        "api/test/fixtures/default_movie.json",
    ]

    def setUp(self):
        self.user = User.objects.get(username='johndoe')
        self.club = Club.objects.get(club_name='Beatles')
        self.movie = Movie.objects.get(id=1)
        self.meeting = Meeting.objects.create(
            club = self.club, 
            movie = self.movie, 
            organiser = self.user, 
            meeting_title = "The best meeting", 
            date = "2022-12-22", 
            start_time = "22:22", 
            end_time = "23:22", 
            completed = False,
            description = "The best description", 
            meeting_link = "https://www.youtube.com/watch?v=dQw4w9WgXcQ"
            )

    def test_valid_meeting(self):
        self._assert_meeting_is_valid()

    def test_organiser_may_not_be_blank(self):
        self.meeting.organiser = None
        self._assert_meeting_is_invalid()

    def test_club_may_not_be_blank(self):
        self.meeting.club = None
        self._assert_meeting_is_invalid()

    def test_movie_may_not_be_blank(self):
        self.meeting.movie = None
        self._assert_meeting_is_invalid()

    def test_meeting_title_may_not_be_blank(self):
        self.meeting.meeting_title = None
        self._assert_meeting_is_invalid()

    def test_meeting_title_must_not_contain_more_than_200_characters(self):
        self.meeting.meeting_title = 'x' * 201
        self._assert_meeting_is_invalid()

    def test_date_may_not_be_blank(self):
        self.meeting.date = None
        self._assert_meeting_is_invalid()

    def test_start_time_may_not_be_blank(self):
        self.meeting.start_time = None
        self._assert_meeting_is_invalid()

    def test_end_time_may_not_be_blank(self):
        self.meeting.end_time = None
        self._assert_meeting_is_invalid()

    def test_description_may_not_be_blank(self):
        self.meeting.description = None
        self._assert_meeting_is_invalid()

    def test_description_must_not_contain_more_than_500_characters(self):
        self.meeting.description = 'x' * 501
        self._assert_meeting_is_invalid()

    def test_meeting_link_may_not_be_blank(self):
        self.meeting.meeting_link = None
        self._assert_meeting_is_invalid()

    def test_meeting_link_must_not_contain_more_than_100_characters(self):
        self.meeting.meeting_link = 'x' * 101
        self._assert_meeting_is_invalid()

    def test_toggle_completed(self):
        completedBefore = self.meeting.completed
        self.meeting.toggle_completed()
        completedAfter = self.meeting.completed
        self.assertFalse(completedBefore)
        self.assertTrue(completedAfter)

    def test_toggle_completed_when_meeting_is_completed(self):
        self.meeting.completed = True
        completedBefore = self.meeting.completed
        self.meeting.toggle_completed()
        completedAfter = self.meeting.completed
        self.assertTrue(completedBefore)
        self.assertFalse(completedAfter)

    def _assert_meeting_is_valid(self):
        try:
            self.meeting.full_clean()
        except (ValidationError):
            self.fail('Test meeting should be valid')

    def _assert_meeting_is_invalid(self):
        with self.assertRaises(ValidationError):
            self.meeting.full_clean()