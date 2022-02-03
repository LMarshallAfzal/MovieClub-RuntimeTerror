from django.contrib.auth.models import AbstractUser
from django.db import models

class User(AbstractUser):
  
    username = models.CharField(
        max_length = 15,
        unique = True,
        blank = False
    )

    first_name = models.CharField(
        max_length = 30,
        blank = False,
        unique = False
    )

    last_name = models.CharField(
        max_length = 30,
        blank = False,
        unique = False,
    )

    email = models.EmailField(
        unique = True,
        blank = False
    )

    bio = models.CharField(
        max_length=520,
        unique=False,
        blank=True
    )
    
    #Preferences is a CharField and this will need to be changed
    preferences = models.CharField(
        max_length=100, 
        blank=False, 
        unique=False
    )
    
    class Meta:
        ordering = ["last_name", "first_name"]

    def get_user_clubs(self):
        clubs = Club.objects.all().filter(
            club_members__username=self.username
        )
        return clubs

class Club(models.Model):

    club_name = models.CharField(
        max_length=50,
        blank=False,
        unique=False
    )

    mission_statement = models.CharField(
        max_length=500,
        blank=True,
        unique=False
    )


class Movie(models.Model):

    movie_name = models.CharField(
        max_length=100,
        blank=False,
        unique=True
    )

    release_date = models.DateField(
        auto_now=False,
        auto_now_add=False,
        blank=False,
        unique=False
    )
    #genres is currently a CharField and this will need to be changed
    genres = models.CharField(
        max_length=100,
        unique=False,
        blank=False
    )

    director = models.CharField(
        max_length=50,
        blank=False,
        unique=False
    )

    #cast is currently a CharField and may need to be changed later on
    cast = models.CharField(
        max_length=250,
        blank=False,
        unique=False
    )

    class Meta:
        ordering = ['movie_name']
