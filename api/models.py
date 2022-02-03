from django.contrib.auth.models import AbstractUser
from django.db import models


class User(AbstractUser):
    username = models.CharField(max_length=15, unique=True, blank=False)
    first_name = models.CharField(max_length=30, blank=False, unique=False)
    last_name = models.CharField(max_length=30, blank=False, unique=False)
    email = models.EmailField(unique=True, blank=False)
    bio = models.CharField(max_length=520, blank=True, unique=False)
    #Preferences is a charfield and this will need to be changed
    preferences = models.CharField(max_length=100, blank=False, unique=False)

    class Meta:
        ordering = ["last_name", "first_name"]

    def clubs(self):
        clubs = Club.objects.all().filter(club_members__username=self.username)
        return clubs


class Club(models.Model):
    club_name = models.CharField(max_length=50, blank=False, unique=False)
    mission_statement = models.CharField(max_length=500, blank=True, unique=False)
