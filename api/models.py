from enum import unique
from lib2to3.pgen2.pgen import generate_grammar
from re import T
from django.db import models
from django.contrib.auth.models import AbstractUser
from django.db.models.fields.related import ForeignKey
from django.forms import CharField

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

    club_members = models.ManyToManyField(
        User,through='Membership'
    )

    def get_club_role(self, user):
        return Membership.objects.get(club=self, user=user).role

class Membership(models.Model):
    """
    Membership is an intermediate model that connects Users to Clubs.
    
    Apart from the two foreign keys, it contains the nature of the relationship:
        Club Owner | Organiser | Member
    """
    STATUS_CHOICES = [
        ("C", 'Club Owner'),
        ("O", 'Organiser'),
        ("M", 'Member')
    ]
    user = ForeignKey(User, on_delete=models.CASCADE)
    club = ForeignKey(Club, on_delete=models.CASCADE)
    role = models.CharField(max_length=1, choices=STATUS_CHOICES, default="M")
    
    """We must ensure that only one relationship is created per User-Club pair."""
    class Meta:
        unique_together = ('user', 'club')

# class Movie(models.Model):
#
#     movie_name = models.CharField(
#         max_length=100,
#         blank=False,
#         unique=True
#     )
#
#     release_date =models.DateField(auto_now=False, auto_now_add=False)
#
#     # genre = models.Choices()  # Use dictionary to pass through all genres in the dataset
#     # cast
#     director = CharField(
#
#         max_length=50,
#         blank=False,
#         unique=False,
#     )
#     # like  # Relationship with usermodel
#     # dislike
#
#     class Meta:
#         ordering = ['movie_name']
