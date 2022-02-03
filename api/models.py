from django.db import models
from django.contrib.auth.models import AbstractUser

"""Creation of user model"""

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
        max_length = 520,
        blank = True,
        unique = False
    )

    def get_user_clubs(self):
        clubs = Club.objects.all().filter(
            club_members__username=self.username
        )
        return clubs

    class Meta:
        """Model options."""
        ordering = ['last_name', 'first_name']

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

