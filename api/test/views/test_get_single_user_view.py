from api.models import User
from rest_framework.test import APITestCase
from django.urls import reverse
from rest_framework import status
from api.serializers import UserSerializer



class GetSingleUserViewTestCase(APITestCase):

    fixtures = [
        'api/test/fixtures/other_users.json',
        'api/test/fixtures/default_user.json',
    ]

    def setUp(self):
        self.url = reverse("users")
        self.user = User.objects.get(username='johndoe')
        self.other_user = User.objects.get(username='janedoe')
