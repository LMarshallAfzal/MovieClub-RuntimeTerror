from django.contrib.auth.models import AbstractUser
from django.db.models.fields.related import ForeignKey
from django.db import models
from django.core.validators import MaxValueValidator, MinValueValidator


class User(AbstractUser):

    username = models.CharField(
        max_length=15,
        unique=True,
        blank=False
    )

    first_name = models.CharField(
        max_length=30,
        blank=False,
        unique=False
    )

    last_name = models.CharField(
        max_length=30,
        blank=False,
        unique=False,
    )

    email = models.EmailField(
        unique=True,
        blank=False
    )

    bio = models.CharField(
        max_length=520,
        unique=False,
        blank=True
    )

    preferences = models.CharField(
        max_length=100,
        blank=False,
        unique=False
    )

    def get_user_clubs(self):
        memberships = Membership.objects.filter(user=self)
        return [membership.club for membership in memberships]


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
    themes = models.CharField(
        max_length=500,
        blank=True,
        unique=False
    )

    club_members = models.ManyToManyField(User, through='Membership')

    def get_club_membership(self, user):
        return Membership.objects.get(club=self, user=user).role

    def get_all_club_members(self):
        return self.club_members.all()


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


class Movie(models.Model):

    movieID = models.PositiveIntegerField(
    unique=True,
    default=0
    )

    title = models.CharField(
        max_length=100,
        blank=False,
        unique=False
    )
    
    genres = models.CharField(
        max_length=100,
        unique=False,
        blank=False
    )

    year = models.PositiveIntegerField(default=0)

    ratings = models.ManyToManyField(User, through='Rating')

    class Meta:
        ordering = ['title']


class Rating(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)

    movie = models.ForeignKey(Movie, on_delete=models.CASCADE)

    rating = models.FloatField(

        validators=[MinValueValidator(0.0), MaxValueValidator(5.0)]
        
    )

