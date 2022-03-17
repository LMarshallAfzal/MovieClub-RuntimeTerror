from api.models import User, Club, Message
from rest_framework.test import APITestCase
from django.urls import reverse
from rest_framework import status
from api.test.helpers import LogInTester
from api.serializers import MessageSerializer



class MessageForumTestCase(APITestCase, LogInTester):

    fixtures = [
        'api/test/fixtures/default_user.json',
        'api/test/fixtures/default_club.json',
        'api/test/fixtures/other_clubs.json',
        'api/test/fixtures/other_users.json'

    ]

    def setUp(self):
        self.club = Club.objects.get(club_name = "Beatles")
        self.other_user = User.objects.get(username='janedoe')
        self.user = User.objects.get(username='johndoe')
        self.url = reverse('message_forum', kwargs={'club_id':self.club.id})
        self.club.club_members.add(self.user,through_defaults={'role': 'M'})
        self.form_input = {
            "sender": self.user.id,
            "club" : self.club.id,
        }
        self.details = {'username' : self.user.username, 'password':'Pa$$w0rd567'}

    def test_get_to_retrieve_forum_endpoint_retrieves_forum_returns_200_ok(self):
        self.client.login(username = self.details['username'],password = self.details['password'])
        self.assertTrue(self._is_logged_in())
        self._create_test_messages()
        response = self.client.get(self.url)
        messages = Message.objects.filter(club = self.club)
        serializer = MessageSerializer(messages,many=True)
        self.assertEqual(response.data,serializer.data)
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_get_to_retrieve_forum_endpoint_with_user_not_member_of_club_returns_403_forbidden(self):
        self.client.login(username = self.other_user.username,password = self.details['password'])
        self.assertTrue(self._is_logged_in())
        response = self.client.get(self.url)
        messages = Message.objects.filter(club = self.club)
        serializer = MessageSerializer(messages,many=True)
        self.assertNotEqual(response.data,serializer.data)
        self.assertEqual(response.status_code, status.HTTP_403_FORBIDDEN)

    # def test_get_to_retrieve_watched_movies_endpoint_cannot_get_watched_movie_while_logged_out_returns_403_forbidden(self):
    #     response = self.client.get(self.url)
    #     self.assertEqual(response.status_code, status.HTTP_403_FORBIDDEN)

    def _create_test_messages(self, message_count=10):
        for id in range(message_count):
            Message.objects.create(
                sender= self.user,
                club= self.club,
                message = f'Test message number:{id}'
            )
