"""Tests of the leave_meeting view."""
from api.models import Club, User, Movie,Membership,Meeting
from rest_framework.test import APITestCase
from django.urls import reverse
from rest_framework import status
from rest_framework.test import force_authenticate, APIClient


class LeaveMeetingViewTestCase(APITestCase):
    """Tests of the leave_meeting view."""

    fixtures = [
        "api/test/fixtures/genres.json",
        "api/test/fixtures/default_user.json",
        "api/test/fixtures/default_club.json",
        "api/test/fixtures/other_users.json",
        "api/test/fixtures/default_movie.json"
    ]

    def setUp(self):
        self.club = Club.objects.get(club_name='Beatles')
        self.user = User.objects.get(username='johndoe')
        self.movie = Movie.objects.get(id = 1)
        self.attendee = User.objects.get(username='janedoe')
        self.non_attendee = User.objects.get(username='daviddoe')
        self.url = reverse("leave_meeting", kwargs={"club_id": self.club.id})
        Membership.objects.create(user=self.user, club=self.club)
        Membership.objects.create(user=self.attendee, club=self.club)
        Membership.objects.create(user=self.non_attendee, club=self.club)
        self.client = APIClient()

    def test_leave_meeting_endpoint_user_logged_out_returns_401_unauthorized(self):
        meeting = self._create_test_meetings()
        attendees_before = meeting.attendees.count()
        response = self.client.put(self.url)
        attendees_after = meeting.attendees.count()
        self.assertEqual(attendees_after, attendees_before)
        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)

    def test_put_leave_meeting_endpoint_user_leaves_meeting_returns_200_ok(self):
        self.client.force_authenticate(user=self.attendee)
        self.assertTrue(self.attendee.is_authenticated)
        meeting = self._create_test_meetings()
        attendees_before = meeting.attendees.count()
        response = self.client.put(self.url)
        attendees_after = meeting.attendees.count()
        self.assertEqual(attendees_after+1,attendees_before)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
    
    def test_put_leave_meeting_endpoint_with_invalid_club_does_not_leave_meeting_404_not_found(self):
        self.client.force_authenticate(user=self.attendee)
        self.assertTrue(self.attendee.is_authenticated)
        meeting = self._create_test_meetings()
        attendees_before = meeting.attendees.count()
        invalidClubUrl = reverse('leave_meeting', kwargs={'club_id':0})
        response = self.client.put(invalidClubUrl)
        attendees_after = meeting.attendees.count()
        self.assertEqual(attendees_before, attendees_after)
        self.assertEqual(response.status_code, status.HTTP_404_NOT_FOUND)
        
    def test_put_leave_meeting_endpoint_whilst_not_an_attendee_returns_403_forbidden(self):
        self.client.force_authenticate(user=self.non_attendee)
        self.assertTrue(self.non_attendee.is_authenticated)
        meeting = self._create_test_meetings()
        attendees_before = meeting.attendees.count()
        response = self.client.put(self.url)
        attendees_after = meeting.attendees.count()
        self.assertEqual(attendees_after, attendees_before)
        self.assertEqual(response.status_code, status.HTTP_403_FORBIDDEN)

    def _create_test_meetings(self):
        meeting = Meeting.objects.create(
            club=self.club,
            movie=self.movie,
            organiser=self.user,
            meeting_title="Star Wars Meeting",
            date="2022-05-04",
            start_time="18:00",
            end_time="21:00",
            description="We are going to watch Star Wars",
            meeting_link="https://www.youtube.com/watch?v=dQw4w9WgXcQ"
        )
        meeting.attendees.add(self.attendee)
        return meeting
