from api.models import Club, Movie, User, Meeting
from rest_framework.test import APITestCase
from django.urls import reverse
from rest_framework import status
import datetime
from api.serializers import MeetingSerializer

from rest_framework.test import force_authenticate,APIClient



class ClubUpcomingMeetingTestCase(APITestCase):

    fixtures = [
        "api/test/fixtures/genres.json",
        "api/test/fixtures/default_movie.json",
        "api/test/fixtures/default_club.json",
        "api/test/fixtures/default_user.json",
        "api/test/fixtures/other_users.json",
    ]

    def setUp(self):
        self.movie = Movie.objects.get(id=1)
        self.user = User.objects.get(id=1)
        self.club = Club.objects.get(id=1)
        self.other_user = User.objects.get(id=2)
        self.club.club_members.add(self.user, through_defaults={'role': 'M','is_organiser':True})
        self.url = reverse("get_club_upcoming_meeting", kwargs={'club_id': self.club.id})
        
        
    def test_get_club_upcoming_meeting_url(self):
        self.assertEqual(self.url,f'/get_club_upcoming_meeting/{self.club.id}/')

    def test_get_club_upcoming_meeting_endpoint_meeting_exists_returns_200_ok(self):
        self.client.force_authenticate(user=self.user)
        self.assertTrue(self.user.is_authenticated)
        self._create_test_meetings()
        response = self.client.get(self.url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_get_club_upcoming_meeting_endpoint_club_has_no_upcoming_meeting_returns_validation_error(self):
        self.client.force_authenticate(user=self.user)
        self.assertTrue(self.user.is_authenticated)
        self._create_test_meetings()
        meeting = self.club.get_upcoming_meeting()
        meeting.toggle_completed()
        response = self.client.get(self.url)
        self.assertEqual(response.data[0],'Beatles currently have no upcoming meeting.')

    def test_get_club_upcoming_meeting_endpoint_user_not_a_member_returns_403_forbidden(self):
        self.client.force_authenticate(user=self.other_user)
        self.assertTrue(self.other_user.is_authenticated)
        self._create_test_meetings()
        response = self.client.get(self.url)
        self.assertEqual(response.status_code, status.HTTP_403_FORBIDDEN)

    def test_get_club_upcoming_meeting_endpoint_user_is_banned_returns_403_forbidden(self):
        self.club.club_members.add(self.other_user, through_defaults={'role': 'B'})
        self.client.force_authenticate(user=self.other_user)
        self.assertTrue(self.other_user.is_authenticated)
        self._create_test_meetings()
        response = self.client.get(self.url)
        self.assertEqual(response.status_code, status.HTTP_403_FORBIDDEN)

    def test_get_club_upcoming_meeting_endpoint_club_does_not_exist_returns_404_not_found(self):
        self.client.force_authenticate(user=self.user)
        self.assertTrue(self.user.is_authenticated)
        self._create_test_meetings()
        invalid_url = reverse('get_club_upcoming_meeting',kwargs={'club_id': 9999999})
        response = self.client.get(invalid_url)
        self.assertEqual(response.status_code, status.HTTP_404_NOT_FOUND)

    def _create_test_meetings(self):
            meeting = Meeting.objects.create(
            club = self.club,
            movie = self.movie,
            organiser = self.user,
            meeting_title = "Star Wars Meeting",
            date = "2022-05-04",
            start_time = "18:00",
            end_time = "21:00",
            description = "We are going to watch Star Wars",
            meeting_link = "https://www.youtube.com/watch?v=dQw4w9WgXcQ"
            )

            self.club.club_meetings.add(meeting)



        