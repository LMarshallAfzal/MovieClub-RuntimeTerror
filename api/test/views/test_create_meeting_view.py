from api.models import Club, Movie, User, Meeting
from rest_framework.test import APITestCase
from django.urls import reverse
from rest_framework import status

class CreateMeetingViewTestCase(APITestCase):
    
    fixtures = [
        "api/test/fixtures/other_users.json",
        "api/test/fixtures/default_movie.json",
    ]

    def setUp(self):
        self.club_creation_url = reverse("create_club")
        self.url = reverse("create_meeting")
        self.user = User.objects.all()[0]
        
        # Create a club with our user as the owner
        self.client.force_login(self.user)
        self.club_form_input = {
            "club_name": "Sharknado Appreciation Society",
            "mission_statement": "We are a club dedicated to making the world a better place through the power of sharknado",
        }
        club_creation_response = self.client.post(self.club_creation_url, self.club_form_input)
        self.client.logout()

        # Define the meeting to be created
        self.meeting_form_input = {
            "club": Club.objects.last().id,
            "movie": Movie.objects.last().id,
            "organizer": self.user.id,
            "start_time": "2022-05-02-18:00:00",
            "end_time": "2022-05-02-21:00:00",
            "description": "We are going to watch Sharknado 7",
            "meeting_link": "https://www.youtube.com/watch?v=dQw4w9WgXcQ"
        }
        
    def test_unauthenticated_request_returns_forbidden(self):
        before = Meeting.objects.count()
        response = self.client.post(self.url, self.meeting_form_input)
        after = Meeting.objects.count()
        self.assertEqual(after, before)
        self.assertEqual(response.status_code, status.HTTP_403_FORBIDDEN)
    
    def test_proper_meeting_creation_succeeds_and_returns_201(self):
        self.client.force_login(self.user)
        before = Meeting.objects.count()
        response = self.client.post(self.url, self.meeting_form_input)
        after = Meeting.objects.count()
        self.assertEqual(after, before + 1)
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
