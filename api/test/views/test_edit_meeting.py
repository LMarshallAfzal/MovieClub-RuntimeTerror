from api.models import Club, Movie, User, Meeting, Membership
from rest_framework.test import APITestCase
from django.urls import reverse
from rest_framework import status
import json
import datetime
from rest_framework.test import force_authenticate,APIClient

class EditMeetingViewTestCase(APITestCase):
    
    fixtures = [
        "api/test/fixtures/default_movie.json",
        "api/test/fixtures/default_club.json",
        "api/test/fixtures/default_user.json",
        "api/test/fixtures/other_users.json",
    ]

    def setUp(self):
        self.user = User.objects.get(username='johndoe')
        self.movie = Movie.objects.get(id=1)
        self.club = Club.objects.get(id=1)
        self.membership = Membership.objects.create(user = self.user,club=self.club, is_organiser = True)
        self.url = reverse('edit_meeting', kwargs={'club_id':self.club.id})
        self.meeting = self._create_test_meetings()

        self.form_input = {
            "meeting_title": "Star Wars Meeting",
            "date": "02-05-2022",
            "start_time": "18:00",
            "end_time": "21:00",
            "description": "We are going to watch Sharknado 7",
            "meeting_link": "https://www.youtube.com/watch?v=dQw4w9WgXcQ"
        }

    def test_put_to_edit_meeting_endpoint_with_valid_data_edits_meeting_returns_200_ok(self):
        self.client.force_authenticate(user=self.user)
        self.assertTrue(self.user.is_authenticated)
        input = json.dumps(self.form_input)
        before = Meeting.objects.count()
        response = self.client.put(self.url, input, content_type="application/json")
        after = Meeting.objects.count()
        self.assertEqual(after, before)
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_put_to_edit_meeting_endpoint_with_blank_meeting_title_does_not_edit_the_meeting_returns_400_bad_request(self):
        self.client.force_authenticate(user=self.user)
        self.assertTrue(self.user.is_authenticated)
        before = Meeting.objects.count()
        input = self.form_input
        input['meeting_title'] = ''
        response = self.client.put(self.url, input)
        after = Meeting.objects.count()
        self.assertEqual(after, before)
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)

    
    def test_put_to_edit_meeting_endpoint_with_blank_date_does_not_edit_the_meeting_returns_400_bad_request(self):
        self.client.force_authenticate(user=self.user)
        self.assertTrue(self.user.is_authenticated)
        before = Meeting.objects.count()
        input = self.form_input
        input['date'] = ''
        response = self.client.put(self.url, input)
        after = Meeting.objects.count()
        self.assertEqual(after, before)
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)

    
    def test_put_to_edit_meeting_endpoint_with_blank_start_time_does_not_edit_the_meeting_returns_400_bad_request(self):
        self.client.force_authenticate(user=self.user)
        self.assertTrue(self.user.is_authenticated)
        before = Meeting.objects.count()
        input = self.form_input
        input['start_time'] = ''
        response = self.client.put(self.url, input)
        after = Meeting.objects.count()
        self.assertEqual(after, before)
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)

    def test_put_to_edit_meeting_endpoint_with_blank_end_time_does_not_edit_the_meeting_returns_400_bad_request(self):
        self.client.force_authenticate(user=self.user)
        self.assertTrue(self.user.is_authenticated)
        before = Meeting.objects.count()
        input = self.form_input
        input['end_time'] = ''
        response = self.client.put(self.url, input)
        after = Meeting.objects.count()
        self.assertEqual(after, before)
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)

    def test_put_to_edit_meeting_endpoint_with_blank_meeting_link_does_not_edit_the_meeting_returns_400_bad_request(self):
        self.client.force_authenticate(user=self.user)
        self.assertTrue(self.user.is_authenticated)
        before = Meeting.objects.count()
        input = self.form_input
        input['meeting_link'] = ''
        response = self.client.put(self.url, input)
        after = Meeting.objects.count()
        self.assertEqual(after, before)
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)

    def test_put_to_edit_meeting_endpoint_with_blank_description_does_not_edit_the_meeting_returns_400_bad_request(self):
        self.client.force_authenticate(user=self.user)
        self.assertTrue(self.user.is_authenticated)
        before = Meeting.objects.count()
        input = self.form_input
        input['description'] = ''
        response = self.client.put(self.url, input)
        after = Meeting.objects.count()
        self.assertEqual(after, before)
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)

    def test_put_to_edit_meeting_endpoint_with_blank_meeting_link_does_not_edit_the_meeting_returns_400_bad_request(self):
        self.client.force_authenticate(user=self.user)
        self.assertTrue(self.user.is_authenticated)
        before = Meeting.objects.count()
        input = self.form_input
        input['meeting_link'] = ''
        response = self.client.put(self.url, input)
        after = Meeting.objects.count()
        self.assertEqual(after, before)
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)

    def test_put_edit_meeting_endpoint_with_start_time_after_end_time_returns_400_bad_request(self):
        self.client.force_authenticate(user=self.user)
        self.assertTrue(self.user.is_authenticated)
        self.form_input['end_time'] = '12:00'
        before = Meeting.objects.count()
        response = self.client.put(self.url, self.form_input)
        after = Meeting.objects.count()
        self.assertEqual(after, before)
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)

    def test_put_edit_meeting_endpoint_with_duration_less_than_1_hour_returns_400_bad_request(self):
        self.client.force_authenticate(user=self.user)
        self.assertTrue(self.user.is_authenticated)
        self.form_input['end_time'] = '18:30'
        before = Meeting.objects.count()
        response = self.client.put(self.url, self.form_input)
        after = Meeting.objects.count()
        self.assertEqual(after, before)
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)

    def test_put_edit_meeting_endpoint_with_incorrect_start_time_format_returns_400_bad_request(self):
        self.client.force_authenticate(user=self.user)
        self.assertTrue(self.user.is_authenticated)
        self.form_input['start_time'] = '1830'
        before = Meeting.objects.count()
        response = self.client.put(self.url, self.form_input)
        after = Meeting.objects.count()
        self.assertEqual(after, before)
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)

    def test_put_edit_meeting_endpoint_with_incorrect_end_time_format_returns_400_bad_request(self):
        self.client.force_authenticate(user=self.user)
        self.assertTrue(self.user.is_authenticated)
        self.form_input['end_time'] = '1830'
        before = Meeting.objects.count()
        response = self.client.put(self.url, self.form_input)
        after = Meeting.objects.count()
        self.assertEqual(after, before)
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)

    def test_put_edit_meeting_endpoint_with_same_start_time_and_end_time_returns_400_bad_request(self):
        self.client.force_authenticate(user=self.user)
        self.assertTrue(self.user.is_authenticated)
        self.form_input['start_time'] = self.form_input['end_time']
        before = Meeting.objects.count()
        response = self.client.put(self.url, self.form_input)
        after = Meeting.objects.count()
        self.assertEqual(after, before)
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)

    def test_put_edit_meeting_endpoint_with_date_same_as_current_day_returns_400_bad_request(self):
        self.client.force_authenticate(user=self.user)
        self.assertTrue(self.user.is_authenticated)
        self.form_input['date'] = datetime.date.today()
        before = Meeting.objects.count()
        response = self.client.put(self.url, self.form_input)
        after = Meeting.objects.count()
        self.assertEqual(after, before)
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)

    def test_put_edit_meeting_endpoint_with_date_in_the_past_400_bad_request(self):
        self.client.force_authenticate(user=self.user)
        self.assertTrue(self.user.is_authenticated)
        self.form_input['date'] = '1912-04-15'
        before = Meeting.objects.count()
        response = self.client.put(self.url, self.form_input)
        after = Meeting.objects.count()
        self.assertEqual(after, before)
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)

    def test_put_edit_meeting_endpoint_with_date_not_3_days_after_current_day_returns_400_bad_request(self):
        self.client.force_authenticate(user=self.user)
        self.assertTrue(self.user.is_authenticated)
        current_year = datetime.date.today().strftime("%Y")
        current_month = datetime.date.today().strftime("%m")
        current_day = datetime.date.today().strftime("%d")
        wrong_date = f'{int(current_day) + 1}-{current_month}-{current_year}'
        self.form_input['date'] = wrong_date
        before = Meeting.objects.count()
        response = self.client.put(self.url, self.form_input)
        after = Meeting.objects.count()
        self.assertEqual(after, before)
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)

    def test_put_edit_meeting_endpoint_with_user_member_role_and_non_organiser_returns_403_forbidden(self):
        self.membership.toggle_organiser()
        self.client.force_authenticate(user=self.user)
        self.assertTrue(self.user.is_authenticated)
        before = Meeting.objects.count()
        response = self.client.put(self.url, self.form_input)
        after = Meeting.objects.count()
        self.assertEqual(after, before)
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
        return meeting
