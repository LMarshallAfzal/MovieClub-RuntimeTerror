from api.models import Club, Movie, User, Meeting
from rest_framework.test import APITestCase
from django.urls import reverse
from rest_framework import status
import datetime
from rest_framework.test import force_authenticate,APIClient



class ClubUpcomingMeetingTestCase(APITestCase):

    fixtures = [
        "api/test/fixtures/default_movie.json",
        "api/test/fixtures/default_club.json",
        "api/test/fixtures/default_user.json",
        "api/test/fixtures/other_users.json",
    ]

    def setUp(self):
        self.movie = Movie.objects.get(id=1)
        self.organiser = User.objects.get(id=1)
        self.club = Club.objects.get(id=1)
        self.club.club_members.add(self.organiser, through_defaults={'role': 'M','is_organiser':True})
        self.url = reverse("get_club_upcoming_meeting", kwargs={'club_id': self.club.id})
        self.user = User.objects.get(id=2)

    def test_get_club_upcoming_meeting_endpoint_meeting_exists_returns_200_ok(self):
        self.client.force_authenticate(user=self.user)
        self.assertTrue(self.user.is_authenticated)
        self._create_test_meeting()
        response = self.client.get(self.url)
        self.assertTrue(response.status_code, status.HTTP_200_OK)

    def _create_test_meeting(self):
        Meeting.objects.create(
            club = self.club,
            movie = self.movie,
            organiser = self.organiser,
            meeting_title = "Star Wars Meeting",
            date = "2022-05-04",
            start_time = "18:00",
            end_time = "21:00",
            description = "We are going to watch Sharknado 7",
            meeting_link = "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
            completed = True

            )

        