from api.models import Club, Movie, User, Meeting
from rest_framework.test import APITestCase
from django.urls import reverse
from rest_framework import status
import datetime
from api.serializers import MeetingSerializer

from rest_framework.test import force_authenticate,APIClient



class AttendMeetingTestCase(APITestCase):

    fixtures = [
        "api/test/fixtures/default_movie.json",
        "api/test/fixtures/default_club.json",
        "api/test/fixtures/default_user.json",
        "api/test/fixtures/other_users.json",
    ]

    def setUp(self):
        self.movie = Movie.objects.get(id=1)
        self.user = User.objects.get(id=1)
        self.club = Club.objects.get(id=1)
        self.member = User.objects.get(id=2)
        self.club.club_members.add(self.user, through_defaults={'role': 'M','is_organiser':True})
        self.club.club_members.add(self.member, through_defaults={'role': 'M'})
        self.other_user = User.objects.get(id=3)
        self.url = reverse("attend_meeting", kwargs={'club_id': self.club.id})
        
        
    def test_attend_meeting_url(self):
        self.assertEqual(self.url,f'/attend_meeting/{self.club.id}/')

    def test_attend_meeting_endpoint_with_valid_data_returns_200_ok(self):
        self.client.force_authenticate(user=self.member)
        self.assertTrue(self.member.is_authenticated)
        self._create_test_meeting()
        meeting = Meeting.objects.get(id=1)
        before_attendees = meeting.attendees.count()
        response = self.client.put(self.url)
        after_attendees = meeting.attendees.count()
        self.assertEqual(before_attendees+1, after_attendees)
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_attend_meeting_endpoint_user_already_attending_returns_validation_error(self):
        self.client.force_authenticate(user=self.member)
        self.assertTrue(self.member.is_authenticated)
        self._create_test_meeting()
        meeting = Meeting.objects.get(id=1)
        meeting.attendees.add(self.member)
        response = self.client.put(self.url)
        self.assertEqual(response.data[0],'You are already attending this meeting!')

    def test_attend_meeting_endpoint_user_not_a_member_returns_403_forbidden(self):
        self.client.force_authenticate(user=self.other_user)
        self.assertTrue(self.other_user.is_authenticated)
        self._create_test_meeting()
        meeting = Meeting.objects.get(id=1)
        before_attendees = meeting.attendees.count()
        response = self.client.put(self.url)
        after_attendees = meeting.attendees.count()
        self.assertEqual(before_attendees, after_attendees)
        self.assertEqual(response.status_code, status.HTTP_403_FORBIDDEN)

    def test_attend_meeting_endpoint_user_is_banned_returns_403_forbidden(self):
        self.club.club_members.add(self.other_user, through_defaults={'role': 'B'})
        self.client.force_authenticate(user=self.other_user)
        self.assertTrue(self.other_user.is_authenticated)
        self._create_test_meeting()
        meeting = Meeting.objects.get(id=1)
        before_attendees = meeting.attendees.count()
        after_attendees = meeting.attendees.count()
        self.assertEqual(before_attendees, after_attendees)
        response = self.client.put(self.url)
        self.assertEqual(response.status_code, status.HTTP_403_FORBIDDEN)

    def test_attend_meeting_endpoint_club_does_not_exist_returns_404_not_found(self):
        self.client.force_authenticate(user=self.member)
        self.assertTrue(self.member.is_authenticated)
        invalid_url = reverse('attend_meeting',kwargs={'club_id': 9999999})
        response = self.client.put(invalid_url)
        self.assertEqual(response.status_code, status.HTTP_404_NOT_FOUND)

    

    

    def _create_test_meeting(self):
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



        