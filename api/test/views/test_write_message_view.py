from api.models import User, Club, Message
from rest_framework.test import APITestCase
from django.urls import reverse
from rest_framework import status
from api.test.helpers import LogInTester


class WriteMessageViewTestCase(APITestCase,LogInTester):

    fixtures = [
        'api/test/fixtures/default_user.json',
        'api/test/fixtures/default_club.json',
        'api/test/fixtures/other_clubs.json',
    ]

    def setUp(self):
        self.club = Club.objects.get(club_name = "Beatles")
        self.other_club = Club.objects.get(club_name = "KISS")
        self.non_member_club = Club.objects.get(club_name = "ADCD")
        self.user = User.objects.get(username='johndoe')
        self.url = reverse('write_message', kwargs={'club_id':self.club.id})
        self.club.club_members.add(self.user,through_defaults={'role': 'M'})
        self.other_club.club_members.add(self.user,through_defaults={'role': 'M'})
        self.form_input = {
            "sender": self.user.id,
            "club" : self.club.id,
            "message": 'Hello, everyone!',
        }
        self.login_details = {'username' : self.user.username, 'password':'Pa$$w0rd567'}
        
    def test_post_to_write_message_endpoint_with_valid_data_creates_new_message_returns_201_created(self):
        self.client.login(username = self.login_details['username'],password = self.login_details['password'])
        self.assertTrue(self._is_logged_in())
        before = Message.objects.filter(sender = self.user, club = self.club).count()
        response = self.client.post(self.url, self.form_input)
        after = Message.objects.filter(sender = self.user, club = self.club).count()
        self.assertEqual(after, before + 1)
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)

    def test_post_to_write_message_endpoint_with_same_message_in_another_club_returns_201_created(self):
        self.client.login(username = self.login_details['username'],password = self.login_details['password'])
        self.assertTrue(self._is_logged_in())
        response = self.client.post(self.url, self.form_input)
        self.form_input['club'] = self.other_club.id
        response = self.client.post(self.url, self.form_input)
        first_club_message = Message.objects.filter(sender = self.user, club = self.club).count()
        second_club_message = Message.objects.filter(sender = self.user, club = self.other_club).count()
        self.assertEqual(first_club_message, second_club_message)
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)

    def test_post_to_write_message_endpoint_with_non_member_club_does_not_create_new_message_returns_404_not_found(self):
        self.client.login(username = self.login_details['username'],password = self.login_details['password'])
        self.assertTrue(self._is_logged_in())
        before = Message.objects.filter(club = self.non_member_club).count()
        self.form_input['club'] = self.non_member_club.id
        invalid_url = reverse('write_message', kwargs={'club_id':self.non_member_club.id})
        response = self.client.post(invalid_url, self.form_input)
        after = Message.objects.filter(club = self.non_member_club).count()
        self.assertEqual(before, after)
        self.assertEqual(response.status_code, status.HTTP_404_NOT_FOUND)

    def test_post_to_write_message_endpoint_with_invalid_club_does_not_create_new_message_returns_404_not_found(self):
        self.client.login(username = self.login_details['username'],password = self.login_details['password'])
        self.assertTrue(self._is_logged_in())
        before = Message.objects.count()
        invalidClubUrl = reverse('write_message', kwargs={'club_id':0})
        response = self.client.post(invalidClubUrl, self.form_input)
        after = Message.objects.count()
        self.assertEqual(after, before)
        self.assertEqual(response.status_code, status.HTTP_404_NOT_FOUND)

    