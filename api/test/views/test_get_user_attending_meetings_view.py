from api.models import Club, Movie, User, Meeting
from rest_framework.test import APITestCase
from django.urls import reverse
from rest_framework import status
from api.serializers import MeetingSerializer
from rest_framework.test import force_authenticate,APIClient



class UpcomingAttendingMeetingsTestCase(APITestCase):

    fixtures = [
        "api/test/fixtures/default_movie.json",
        "api/test/fixtures/other_clubs.json",
        "api/test/fixtures/default_club.json",
        "api/test/fixtures/default_user.json",
        "api/test/fixtures/other_users.json",
    ]

    def setUp(self):
        self.movie = Movie.objects.get(id=1)
        self.organiser = User.objects.get(id=1)
        self.club = Club.objects.get(id=1)
        self.other_club = Club.objects.get(id=2)
        self.other_user = User.objects.get(id=2)
        self.club.club_members.add(self.organiser, through_defaults={'role': 'M','is_organiser':True})
        self.other_club.club_members.add(self.organiser, through_defaults={'role': 'M','is_organiser':True})

        self.url = reverse("get_user_attending_meetings")
    
    def test_get_attending_meetings_url(self):
        self.assertEqual(self.url,f'/get_user_attending_meetings/')

    def test_get_user_upcoming_attending_meetings_endpoint_is_attending_returns_200_ok(self):
        self.client.force_authenticate(user=self.other_user)
        self.assertTrue(self.other_user.is_authenticated)
        self._create_test_meetings()
        meeting = Meeting.objects.get(id = 1)
        meeting.attendees.add(self.other_user)
        response = self.client.get(self.url)
        self.assertContains(response,'Star Wars')
        self.assertNotContains(response,'007')
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_get_user_upcoming_attending_meetings_endpoint_user_not_attending_any_meetings_returns_validation_error(self):
        self.client.force_authenticate(user=self.other_user)
        self.assertTrue(self.other_user.is_authenticated)
        self._create_test_meetings()
        response = self.client.get(self.url)
        self.assertEqual(response.data[0],"You are currently not attending any meetings.")

    def _create_test_meetings(self):
            meeting_1 = Meeting.objects.create(
            club = self.club,
            movie = self.movie,
            organiser = self.organiser,
            meeting_title = "Star Wars Meeting",
            date = "2022-05-04",
            start_time = "18:00",
            end_time = "21:00",
            description = "We are going to watch Star Wars",
            meeting_link = "https://www.youtube.com/watch?v=dQw4w9WgXcQ"
            )

            meeting_2 = Meeting.objects.create(
            club = self.other_club,
            movie = self.movie,
            organiser = self.organiser,
            meeting_title = "007 Meeting",
            date = "2022-05-04",
            start_time = "18:00",
            end_time = "21:00",
            description = "We are going to watch 007",
            meeting_link = "https://www.youtube.com/watch?v=dQw4w9WgXcQ"
            )
            self.club.club_meetings.add(meeting_1)
            self.other_club.club_meetings.add(meeting_2)



        