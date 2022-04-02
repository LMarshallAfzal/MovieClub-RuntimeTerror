from api.models import User, Club, Meeting, Movie, Membership
from rest_framework.test import APITestCase
from django.urls import reverse
from rest_framework import status
from rest_framework.test import force_authenticate,APIClient

class CancelMeetingViewTestCase(APITestCase):

    fixtures = [
        'api/test/fixtures/genres.json',
        'api/test/fixtures/default_user.json',
        'api/test/fixtures/other_users.json',
        'api/test/fixtures/default_club.json',
        'api/test/fixtures/other_clubs.json',
        'api/test/fixtures/default_movie.json',
    ]

    def setUp(self):
        self.meeting_organiser = User.objects.get(username='johndoe')
        self.non_organiser = User.objects.get(username='janedoe')
        self.club = Club.objects.get(club_name='Beatles')
        self.club2 = Club.objects.get(club_name='Metallica')
        self.movie = Movie.objects.get(title='The Godfather')
        Membership.objects.create(user = self.meeting_organiser, club = self.club, role = 'M',is_organiser = True)
        Membership.objects.create(user = self.non_organiser, club = self.club, role = 'M',is_organiser = False,notifications = True)
        self.url = reverse('cancel_meeting', kwargs={'club_id':self.club.id})
        self.meeting = Meeting.objects.create(
            club = self.club,
            movie = self.movie,
            organiser = self.meeting_organiser,
            meeting_title = "Star Wars Meeting",
            date = "2022-02-02",
            start_time = "18:00",
            end_time = "21:00",
            description = "We are going to watch Sharknado 7",
            meeting_link = "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
            completed = False
        )

        self.client = APIClient()
        
    def test_delete_cancel_meeting_endpoint_with_valid_data_cancels_meeting_returns_200_ok(self):
        self.client.force_authenticate(user=self.meeting_organiser)
        self.assertTrue(self.meeting_organiser.is_authenticated)
        before = Meeting.objects.count()
        response = self.client.delete(self.url)
        after = Meeting.objects.count()
        self.assertEqual(after + 1, before)
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_delete_cancel_meeting_endpoint_cancelling_meeting_by_non_organiser_returns_403_forbidden(self):
        self.client.force_authenticate(user=self.non_organiser)
        self.assertTrue(self.non_organiser.is_authenticated)
        before = Meeting.objects.count()
        response = self.client.delete(self.url)
        after = Meeting.objects.count()
        self.assertEqual(after, before)
        self.assertEqual(response.status_code, status.HTTP_403_FORBIDDEN)

    def test_delete_cancel_meeting_endpoint_with_invalid_club_does_not_cancel_meeting_404_not_found(self):
        self.client.force_authenticate(user=self.meeting_organiser)
        self.assertTrue(self.meeting_organiser.is_authenticated)
        before = Meeting.objects.count()
        invalidClubUrl = reverse('cancel_meeting', kwargs={'club_id':0})
        response = self.client.delete(invalidClubUrl)
        after = Meeting.objects.count()
        self.assertEqual(after, before)
        self.assertEqual(response.status_code, status.HTTP_404_NOT_FOUND)

    def test_delete_cancel_meeting_endpoint_with_user_not_logged_in_does_not_cancel_meeting(self):
        before = Meeting.objects.count()
        response = self.client.delete(self.url)
        after = Meeting.objects.count()
        self.assertEqual(after, before)
        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)
