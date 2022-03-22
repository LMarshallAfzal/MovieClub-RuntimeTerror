from django.contrib.auth.models import AbstractUser
from django.db.models import Count, F, Value
from django.db.models.fields.related import ForeignKey
from django.db import models
from django.core.validators import MaxValueValidator, MinValueValidator,MinLengthValidator
from django.utils.translation import gettext_lazy as _

class User(AbstractUser):

    username = models.CharField(
        max_length=15,
        validators=[MinLengthValidator(4)],
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

    watched_movies = models.ManyToManyField('Movie', through='Watch')

    def full_name(self):
        return f'{self.first_name} {self.last_name}'

    def get_user_clubs(self):
         return Club.objects.all().filter(
            club_members__username=self.username,role__club_role='M')|Club.objects.all().filter(
            club_members__username=self.username,role__club_role='O')|Club.objects.all().filter(
            club_members__username=self.username,role__club_role='C')

    def get_user_ratings(self):
        ratings = Rating.objects.filter(user=self)
        if not ratings:
            return None
        else:
            return ratings

    def get_user_clubs(self):
        clubs = Club.objects.filter(club_members__username=self.username)
        return clubs

    def get_user_memberships(self):
        memberships = Membership.objects.filter(user=self)
        return memberships

    def get_user_preferences(self):
        return self.preferences

    def add_watched_movie(self, movie):
        self.watched_movies.add(movie)
        self.save()
        return

    def get_watched_movies(self):
        movies = self.watched_movies.all()
        return movies


class Club(models.Model):

    club_name = models.CharField(
        max_length=50,
        blank=False,
        unique=True
    )

    mission_statement = models.CharField(
        max_length=500,
        blank=True,
        unique=False
    )
    theme = models.CharField(
        max_length=20,
        blank=True,
        unique=False
    )

    club_members = models.ManyToManyField(User, through='Membership')

    club_messages = models.ManyToManyField('Message', related_name='club_messages')

    club_meetings = models.ManyToManyField('Meeting', related_name='club_meetings')

    def get_all_users_in_club(self):
        return self.club_members.all()

    def get_all_club_members(self):
        return self.club_members.all().filter(
            club = self, membership__role = 'M')

    def remove_user_from_club(self, user):
        Membership.objects.get(club=self, user=user).delete()
    
    def get_all_banned_members(self):
        return self.club_members.filter(club = self, membership__role = 'B')

    def get_organiser(self):
        return self.club_members.filter(club = self,membership__role = 'O')
    
    def get_clubs_by_theme(preferences):
        clubs = []
        for preference in preferences:
            clubs.append(Club.objects.annotate(
            string=Value(preference)
                ).filter(string__icontains=F('theme')))
        return clubs

    def get_club_membership(self, user):
        membership = Membership.objects.get(user=user, club=self).role
        return membership

    def change_membership(self,user,role):
        membership = Membership.objects.get(user=user, club=self)
        membership.role = role
        membership.save()

    def get_club_messages(self):
        return self.club_messages.all()

    def __unicode__(self):
        return '%d: %s' % (self.club_name)


class Membership(models.Model):
    """
    Membership is an intermediate model that connects Users to Clubs.

    Apart from the two foreign keys, it contains the nature of the relationship:
        Club Owner | Organiser | Member | Banned
    """
    class MembershipStatus(models.TextChoices):
        MEMBER = 'M', _('Member')
        OWNER = 'C', _('Owner')
        ORGANISER = 'O', _('Organiser')
        BANNED = 'B',_('BannedMember')
    
    user = ForeignKey(User, on_delete=models.CASCADE)
    club = ForeignKey(Club, on_delete=models.CASCADE)
    role = models.CharField(
        max_length=1,
        choices=MembershipStatus.choices,
        default=MembershipStatus.MEMBER
        )

    """We must ensure that only one relationship is created per User-Club pair."""
    class Meta:
        unique_together = ('user', 'club')

    def get_role_name(self):
        return self.MembershipStatus(self.role).name.title()
class Movie(models.Model):

    ml_id = models.PositiveIntegerField(
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

    viewers = models.ManyToManyField(
        User, through='Watch', related_name='viewers')

    meetings = models.ManyToManyField('Meeting', related_name='meetings')
    class Meta:
        ordering = ['title']

    def get_rating_author(self, user):
        author = Rating.objects.get(user=user.id, movie=self.id)
        if not user:
            return None
        else:
            return author

    def get_movie_title(movie_id):
        return Movie.objects.get(movie_id=movie_id).title

    def get_movies_by_genre(genres):
        movies = []
        for genre in genres:
            movies.append(Movie.objects.annotate(
            string=Value(genre)
                ).filter(string__icontains=F('genres')))
        return movies

class Rating(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)

    movie = models.ForeignKey(Movie, on_delete=models.CASCADE)

    score = models.FloatField(

        validators=[MinValueValidator(1.0), MaxValueValidator(5.0)]
    )
    class Meta:
        ordering = ['user']

class Meeting(models.Model):
    club = ForeignKey(Club, on_delete=models.CASCADE)

    movie = ForeignKey(Movie, on_delete=models.CASCADE)

    meeting_title = models.CharField(max_length=200,blank=False)

    organiser = ForeignKey(User, on_delete=models.CASCADE)

    date = models.DateField(auto_now=False, blank=False)

    start_time = models.TimeField(auto_now=False, blank=False)

    end_time = models.TimeField(auto_now=False, blank=False)

    attendees = models.ManyToManyField(User, related_name="attendees")

    meeting_link = models.CharField(max_length=100,blank=False)

    description = models.CharField(
        max_length=500,
        blank=False,
        unique=False
    )

class Message(models.Model):
    sender = models.ForeignKey(User,on_delete=models.CASCADE,unique=False)

    club = models.ForeignKey(Club,on_delete=models.CASCADE,unique=False)

    message = models.CharField(max_length=1500)

    timestamp = models.DateTimeField(auto_now=True)

    def __str__(self):
            return self.message

    class Meta:
        ordering = ('timestamp',)


class Watch(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)

    movie = models.ForeignKey(Movie, on_delete=models.CASCADE)

    time_watched = models.DateTimeField(auto_now_add=True)
