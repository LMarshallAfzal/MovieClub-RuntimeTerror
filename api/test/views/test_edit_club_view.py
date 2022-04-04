from api.models import Club, User, Membership, Genre
from rest_framework.test import APITestCase
from django.urls import reverse
from rest_framework import status
import json
from rest_framework.test import force_authenticate,APIClient

class EditClubViewTestCase(APITestCase):
    
    fixtures = [
        "api/test/fixtures/genres.json",
        "api/test/fixtures/default_club.json",
        "api/test/fixtures/default_user.json",
        "api/test/fixtures/other_users.json",
        "api/test/fixtures/other_clubs.json"
    ]

    def setUp(self):
        self.owner = User.objects.get(username='johndoe')
        self.member = User.objects.get(username='janedoe')
        self.club = Club.objects.get(id=1)
        self.other_club = Club.objects.get(id=2)
        self.ownership = Membership.objects.create(user = self.owner,club=self.club, role = 'O')
        self.membership = Membership.objects.create(user = self.member,club=self.club, role = 'M')
        self.url = reverse('edit_club', kwargs={'club_id':self.club.id})

        self.form_input = {
            "club_name": "The best club",
            "mission_statement": "Stay the best",
            "theme": "Comedy"
        }

    def test_put_to_edit_club_endpoint_with_valid_data_edits_club_returns_200_ok(self):
        self.client.force_authenticate(user=self.owner)
        self.assertTrue(self.owner.is_authenticated)
        input = json.dumps(self.form_input)
        before = Club.objects.count()
        response = self.client.put(self.url, input, content_type="application/json")
        after = Club.objects.count()
        self.assertEqual(after, before)
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_put_to_edit_club_endpoint_with_member_does_not_edit_club_returns_403_forbidden(self):
        self.client.force_authenticate(user=self.member)
        self.assertTrue(self.member.is_authenticated)
        input = json.dumps(self.form_input)
        before = Club.objects.count()
        response = self.client.put(self.url, input, content_type="application/json")
        after = Club.objects.count()
        self.assertEqual(after, before)
        self.assertEqual(response.status_code, status.HTTP_403_FORBIDDEN)

    def test_put_to_edit_club_endpoint_with_blank_club_name_does_not_edit_the_club_returns_400_bad_request(self):
        self.client.force_authenticate(user=self.owner)
        self.assertTrue(self.owner.is_authenticated)
        before = Club.objects.count()
        input = self.form_input
        input['club_name'] = ''
        response = self.client.put(self.url, input)
        after = Club.objects.count()
        self.assertEqual(after, before)
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)

    def test_put_to_edit_club_endpoint_with_non_unique_club_name_does_not_edit_the_club_returns_400_bad_request(self):
        self.client.force_authenticate(user=self.owner)
        self.assertTrue(self.owner.is_authenticated)
        before = Club.objects.count()
        self.form_input['club_name'] = self.other_club.club_name
        response = self.client.put(self.url, self.form_input)
        after = Club.objects.count()
        self.assertEqual(after, before)
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
    
    def test_put_to_edit_club_endpoint_with_blank_mission_statement_does_not_edit_the_club_returns_400_bad_request(self):
        self.client.force_authenticate(user=self.owner)
        self.assertTrue(self.owner.is_authenticated)
        before = Club.objects.count()
        input = self.form_input
        input['mission_statement'] = ''
        response = self.client.put(self.url, input)
        after = Club.objects.count()
        self.assertEqual(after, before)
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)

    def test_put_to_edit_club_endpoint_with_blank_theme_does_not_edit_the_club_returns_400_bad_request(self):
        self.client.force_authenticate(user=self.owner)
        self.assertTrue(self.owner.is_authenticated)
        before = Club.objects.count()
        input = self.form_input
        input['theme'] = ''
        response = self.client.put(self.url, input)
        after = Club.objects.count()
        self.assertEqual(after, before)
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)

    def test_put_to_edit_club_endpoint_with_user_logged_out_returns_401_unauthorized(self):
        response = self.client.put(self.url)
        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)