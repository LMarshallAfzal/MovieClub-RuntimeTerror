"""Tests of the create_club view."""
from api.models import Club, User, Genre
from rest_framework.test import APITestCase
from django.urls import reverse
from rest_framework import status
from api.test.helpers import LogInTester
from rest_framework.test import force_authenticate,APIClient


class CreateClubViewTestCase(APITestCase,LogInTester):
    """Tests of the create_club view."""
    
    fixtures = [
        'api/test/fixtures/genres.json',
        "api/test/fixtures/default_user.json",
        'api/test/fixtures/default_club.json',
    ]

    def setUp(self):
        self.url = reverse("create_club")
        self.user = User.objects.get(username='johndoe')
        self.other_club = Club.objects.get(club_name='Beatles')
        self.form_input = {
            "club_name": "Sharknado Appreciation Society",
            "mission_statement": "We are a club dedicated to making the world a better place through the power of sharknado",
            "theme": Genre.objects.get(name="Animation"),
        }
        self.client = APIClient()
    
    def test_create_club_endpoint_with_valid_data_creates_club_returns_201_created(self):
        self.client.force_authenticate(user=self.user)
        self.assertTrue(self.user.is_authenticated)
        before = Club.objects.count()
        response = self.client.post(self.url, self.form_input)
        after = Club.objects.count()
        self.assertEqual(after, before + 1)
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)

    def test_create_club_endpoint_club_creator_is_club_owner(self):
        self.client.force_authenticate(user=self.user)
        self.assertTrue(self.user.is_authenticated)
        self.client.post(self.url, self.form_input)
        club = Club.objects.get(club_name="Sharknado Appreciation Society")
        owner = club.get_club_membership(self.user)
        self.assertEqual(owner, "O")

    def test_create_club_endpoint_with_empty_club_name_returns_400_bad_request(self):
        self.client.force_authenticate(user=self.user)
        self.assertTrue(self.user.is_authenticated)
        self.form_input["club_name"] = ""
        response = self.client.post(self.url, self.form_input)
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)

    def test_create_club_endpoint_with_non_unique_club_name_returns_400_bad_request(self):
        self.client.force_authenticate(user=self.user)
        self.assertTrue(self.user.is_authenticated)
        self.form_input["club_name"] = self.other_club.club_name
        response = self.client.post(self.url, self.form_input)
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)

    def test_create_club_endpoint_with_empty_mission_statement_returns_400_bad_request(self):
        self.client.force_authenticate(user=self.user)
        self.assertTrue(self.user.is_authenticated)
        self.form_input["mission_statement"] = ""
        response = self.client.post(self.url, self.form_input)
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)

    def test_create_club_endpoint_with_empty_theme_returns_400_bad_request(self):
        self.client.force_authenticate(user=self.user)
        self.assertTrue(self.user.is_authenticated)
        self.form_input["theme"] = ""
        response = self.client.post(self.url, self.form_input)
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)

    def test_post_to_create_club_endpoint_with_user_logged_out_returns_401_unauthorized(self):
        response = self.client.post(self.url)
        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)

