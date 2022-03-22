from api.models import Club, Movie, User, Meeting
from rest_framework.test import APITestCase
from django.urls import reverse
from rest_framework import status
import datetime
from rest_framework.test import force_authenticate,APIClient



class CreateMeetingViewTestCase(APITestCase):

    fixtures = [
        "api/test/fixtures/default_movie.json",
        "api/test/fixtures/default_club.json",
        "api/test/fixtures/default_user.json",
        "api/test/fixtures/other_users.json",

    ]

    def setUp(self):
        self.movie = Movie.objects.get(id=1)
        self.club = Club.objects.get(id=1)
        self.url = reverse("create_meeting", kwargs={'club_id': self.club.id})
        self.user = User.objects.get(id=1)
        self.other_user = User.objects.get(id=2)
        self.club.club_members.add(self.user, through_defaults={'role': 'O'})
        
        self.client = APIClient()
        self.form_input = {
            "club": self.club.id,
            "movie": self.movie.id,
            "organiser": self.user.id,
            "meeting_title": "Star Wars Meeting",
            "date": "02-05-2022",
            "start_time": "18:00",
            "end_time": "21:00",
            "description": "We are going to watch Sharknado 7",
            "meeting_link": "https://www.youtube.com/watch?v=dQw4w9WgXcQ"
        }


    def test_create_meeting_url(self):
        self.assertEqual(self.url, f'/create_meeting/{self.club.id}/')

    def test_post_create_meeting_endpoint_with_valid_data_returns_201_created(self):
        self.client.force_authenticate(user=self.user)
        self.assertTrue(self.user.is_authenticated)
        before = Meeting.objects.count()
        response = self.client.post(self.url, self.form_input)
        after = Meeting.objects.count()
        self.assertEqual(after, before + 1)
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)

    def test_post_create_meeting_endpoint_with_blank_date_returns_400_bad_request(self):
        self.client.force_authenticate(user=self.user)
        self.assertTrue(self.user.is_authenticated)
        self.form_input['date'] = ''
        before = Meeting.objects.count()
        response = self.client.post(self.url, self.form_input)
        after = Meeting.objects.count()
        self.assertEqual(after, before)
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)

    def test_post_create_meeting_endpoint_with_blank_title_returns_400_bad_request(self):
        self.client.force_authenticate(user=self.user)
        self.assertTrue(self.user.is_authenticated)
        self.form_input['meeting_title'] = ''
        before = Meeting.objects.count()
        response = self.client.post(self.url, self.form_input)
        after = Meeting.objects.count()
        self.assertEqual(after, before)
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)

    def test_post_create_meeting_endpoint_with_blank_start_time_returns_400_bad_request(self):
        self.client.force_authenticate(user=self.user)
        self.assertTrue(self.user.is_authenticated)
        self.form_input['start_time'] = ''
        before = Meeting.objects.count()
        response = self.client.post(self.url, self.form_input)
        after = Meeting.objects.count()
        self.assertEqual(after, before)
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)

    def test_post_create_meeting_endpoint_with_blank_end_time_returns_400_bad_request(self):
        self.client.force_authenticate(user=self.user)
        self.assertTrue(self.user.is_authenticated)
        self.form_input['end_time'] = ''
        before = Meeting.objects.count()
        response = self.client.post(self.url, self.form_input)
        after = Meeting.objects.count()
        self.assertEqual(after, before)
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)

    def test_post_create_meeting_endpoint_with_blank_description_returns_400_bad_request(self):
        self.client.force_authenticate(user=self.user)
        self.assertTrue(self.user.is_authenticated)
        self.form_input['description'] = ''
        before = Meeting.objects.count()
        response = self.client.post(self.url, self.form_input)
        after = Meeting.objects.count()
        self.assertEqual(after, before)
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)

    def test_post_create_meeting_endpoint_with_blank_meeting_link_returns_400_bad_request(self):
        self.client.force_authenticate(user=self.user)
        self.assertTrue(self.user.is_authenticated)
        self.form_input['meeting_link'] = ''
        before = Meeting.objects.count()
        response = self.client.post(self.url, self.form_input)
        after = Meeting.objects.count()
        self.assertEqual(after, before)
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)

    def test_post_create_meeting_endpoint_with_start_time_after_end_time_returns_400_bad_request(self):
        self.client.force_authenticate(user=self.user)
        self.assertTrue(self.user.is_authenticated)
        self.form_input['end_time'] = '12:00'
        before = Meeting.objects.count()
        response = self.client.post(self.url, self.form_input)
        after = Meeting.objects.count()
        self.assertEqual(after, before)
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)

    def test_post_create_meeting_endpoint_with_duration_less_than_1_hour_returns_400_bad_request(self):
        self.client.force_authenticate(user=self.user)
        self.assertTrue(self.user.is_authenticated)
        self.form_input['end_time'] = '18:30'
        before = Meeting.objects.count()
        response = self.client.post(self.url, self.form_input)
        after = Meeting.objects.count()
        self.assertEqual(after, before)
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)

    def test_post_create_meeting_endpoint_with_incorrect_start_time_format_returns_400_bad_request(self):
        self.client.force_authenticate(user=self.user)
        self.assertTrue(self.user.is_authenticated)
        self.form_input['start_time'] = '1830'
        before = Meeting.objects.count()
        response = self.client.post(self.url, self.form_input)
        after = Meeting.objects.count()
        self.assertEqual(after, before)
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)

    def test_post_create_meeting_endpoint_with_incorrect_end_time_format_returns_400_bad_request(self):
        self.client.force_authenticate(user=self.user)
        self.assertTrue(self.user.is_authenticated)
        self.form_input['end_time'] = '1830'
        before = Meeting.objects.count()
        response = self.client.post(self.url, self.form_input)
        after = Meeting.objects.count()
        self.assertEqual(after, before)
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)

    def test_post_create_meeting_endpoint_with_incorrect_date_format_returns_400_bad_request(self):
        self.client.force_authenticate(user=self.user)
        self.assertTrue(self.user.is_authenticated)
        self.form_input['date'] = '2/2/2023'
        before = Meeting.objects.count()
        response = self.client.post(self.url, self.form_input)
        after = Meeting.objects.count()
        self.assertEqual(after, before)
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)

    def test_post_create_meeting_endpoint_with_date_same_as_current_day_returns_400_bad_request(self):
        self.client.force_authenticate(user=self.user)
        self.assertTrue(self.user.is_authenticated)
        self.form_input['date'] = datetime.date.today()
        before = Meeting.objects.count()
        response = self.client.post(self.url, self.form_input)
        after = Meeting.objects.count()
        self.assertEqual(after, before)
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)

    def test_post_create_meeting_endpoint_with_date_not_3_days_after_current_day_returns_400_bad_request(self):
        self.client.force_authenticate(user=self.user)
        self.assertTrue(self.user.is_authenticated)
        current_year = datetime.date.today().strftime("%Y")
        current_month = datetime.date.today().strftime("%m")
        current_day = datetime.date.today().strftime("%d")
        wrong_date = f'{int(current_day) + 1}-{current_month}-{current_year}'
        self.form_input['date'] = wrong_date
        before = Meeting.objects.count()
        response = self.client.post(self.url, self.form_input)
        after = Meeting.objects.count()
        self.assertEqual(after, before)
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)

    def test_post_create_meeting_endpoint_with_user_member_role_in_club_returns_403_forbidden(self):
        self.club.club_members.add(self.other_user, through_defaults={'role': 'M'})
        self.client.force_authenticate(user=self.other_user)
        self.assertTrue(self.other_user.is_authenticated)
        self.form_input['organiser'] = self.other_user.id
        before = Meeting.objects.count()
        response = self.client.post(self.url, self.form_input)
        after = Meeting.objects.count()
        self.assertEqual(after, before)
        self.assertEqual(response.status_code, status.HTTP_403_FORBIDDEN)

    def test_post_create_meeting_endpoint_with_user_owner_role_in_club_returns_403_forbidden(self):
        self.club.club_members.add(self.other_user, through_defaults={'role': 'C'})
        self.client.force_authenticate(user=self.other_user)
        self.assertTrue(self.other_user.is_authenticated)
        self.form_input['organiser'] = self.other_user.id
        before = Meeting.objects.count()
        response = self.client.post(self.url, self.form_input)
        after = Meeting.objects.count()
        self.assertEqual(after, before)
        self.assertEqual(response.status_code, status.HTTP_403_FORBIDDEN)

    def test_post_create_meeting_endpoint_with_user_banned_role_in_club_returns_403_forbidden(self):
        self.club.club_members.add(self.other_user, through_defaults={'role': 'B'})
        self.client.force_authenticate(user=self.other_user)
        self.assertTrue(self.other_user.is_authenticated)
        self.form_input['organiser'] = self.other_user.id
        before = Meeting.objects.count()
        response = self.client.post(self.url, self.form_input)
        after = Meeting.objects.count()
        self.assertEqual(after, before)
        self.assertEqual(response.status_code, status.HTTP_403_FORBIDDEN)

    def test_post_create_meeting_endpoint_with_visitor_in_club_returns_403_forbidden(self):
        self.client.force_authenticate(user=self.other_user)
        self.assertTrue(self.other_user.is_authenticated)
        self.form_input['organiser'] = self.other_user.id
        before = Meeting.objects.count()
        response = self.client.post(self.url, self.form_input)
        after = Meeting.objects.count()
        self.assertEqual(after, before)
        self.assertEqual(response.status_code, status.HTTP_403_FORBIDDEN)

    def test_post_create_meeting_endpoint_with_non_existing_club_returns_404_not_found(self):
        self.client.force_authenticate(user=self.user)
        self.assertTrue(self.user.is_authenticated)
        invalid_url = reverse("create_meeting", kwargs={'club_id': 10})
        self.form_input['organiser'] = self.user.id
        before = Meeting.objects.count()
        response = self.client.post(invalid_url, self.form_input)
        after = Meeting.objects.count()
        self.assertEqual(after, before)
        self.assertEqual(response.status_code, status.HTTP_404_NOT_FOUND)

    def test_unauthenticated_request_returns_unauthorised(self):
        before = Meeting.objects.count()
        response = self.client.post(self.url, self.form_input)
        after = Meeting.objects.count()
        self.assertEqual(after, before)
        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)




    

    
