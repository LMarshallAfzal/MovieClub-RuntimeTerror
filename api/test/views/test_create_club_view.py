from api.models import Club, User
from rest_framework.test import APITestCase
from django.urls import reverse
from rest_framework import status

class CreateClubViewTestCase(APITestCase):
    
    fixtures = [
        "api/test/fixtures/other_users.json",
        'api/test/fixtures/default_user.json',
    ]

    def setUp(self):
        self.url = reverse("create_club")
        self.user = User.objects.get(username='johndoe')
        self.form_input = {
            "club_name": "Sharknado Appreciation Society",
            "mission_statement": "We are a club dedicated to making the world a better place through the power of sharknado",
            "themes": "Movies",
        }
        self.details = {'username' : 'johndoe', 'password':'Pa$$w0rd567'}
    
    # def test_proper_club_creation_succeeds_and_returns_201(self):
    #     self.client.force_login(self.user)
    #     before = Club.objects.count()
    #     response = self.client.post(self.url, self.form_input)
    #     after = Club.objects.count()
    #     self.assertEqual(after, before + 1)
    #     self.assertEqual(response.status_code, status.HTTP_201_CREATED)

    # def test_club_creator_is_club_owner(self):
    #     self.client.force_login(self.user)
    #     response = self.client.post(self.url, self.form_input)
    #     club = Club.objects.last()
    #     creator_role = club.get_club_membership(self.user)
    #     self.assertEqual(creator_role, "C")

    # def test_empty_club_name_returns_bad_request(self):
    #     self.client.force_login(self.user)
    #     self.form_input["club_name"] = ""
    #     response = self.client.post(self.url, self.form_input)
    #     self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)

    # def test_club_name_need_not_be_unique(self):
    #     self.client.force_login(self.user)
    #     self.form_input["club_name"] = "Sharknado Appreciation Society"
    #     self.form_input["mission_statement"] = "We are shameless copycats"
    #     response = self.client.post(self.url, self.form_input)
    #     self.assertEqual(response.status_code, status.HTTP_201_CREATED)
