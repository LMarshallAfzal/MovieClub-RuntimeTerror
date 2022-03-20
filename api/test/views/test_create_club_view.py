from api.models import Club, User
from rest_framework.test import APITestCase
from django.urls import reverse
from rest_framework import status
from api.test.helpers import LogInTester
from rest_framework.test import force_authenticate,APIClient


class CreateClubViewTestCase(APITestCase,LogInTester):
    
    fixtures = [
        "api/test/fixtures/default_user.json",
        'api/test/fixtures/default_club.json',
    ]

    def setUp(self):
        self.url = reverse("create_club")
        self.user = User.objects.get(username='johndoe')
        self.second_club = Club.objects.get(club_name='Beatles')
        self.form_input = {
            "club_name": "Sharknado Appreciation Society",
            "mission_statement": "We are a club dedicated to making the world a better place through the power of sharknado",
            "theme": "Horror",
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
        club = Club.objects.last()
        owner = club.get_club_membership(self.user)
        self.assertEqual(owner, "C")

    def test_create_club_endpoint_with_empty_club_name_returns_400_bad_request(self):
        self.client.force_authenticate(user=self.user)
        self.assertTrue(self.user.is_authenticated)
        self.form_input["club_name"] = ""
        response = self.client.post(self.url, self.form_input)
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)

