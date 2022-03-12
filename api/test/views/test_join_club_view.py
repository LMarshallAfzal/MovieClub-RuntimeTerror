from api.models import Club, User, Membership
from rest_framework.test import APITestCase
from django.urls import reverse
from rest_framework import status

class JoinClubViewTestCase(APITestCase):
    
    fixtures = [
        "api/test/fixtures/other_users.json",
        "api/test/fixtures/default_club.json",
    ]

    def setUp(self):
        self.club = Club(club_name="Joinable Movie Club", mission_statement="We are a club you can join")
        self.club.save()
        self.user = User.objects.all()[0]

    def url(self, clubid):
        return reverse("join_club", kwargs={"clubid": clubid})

    def test_unauthenticated_request_returns_forbidden(self):
        before = Membership.objects.filter(club=self.club).count()
        response = self.client.post(self.url(0))
        after = Membership.objects.filter(club=self.club).count()
        self.assertEqual(after, before)
        self.assertEqual(response.status_code, status.HTTP_403_FORBIDDEN)
    
    def test_existing_club_returns_200(self):
        self.client.force_login(self.user)
        club = Club.objects.all()[0]
        members_before = Membership.objects.filter(club=club).count()
        response = self.client.post(self.url(club.id))
        members_after = Membership.objects.filter(club=club).count()
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(members_after, members_before + 1)