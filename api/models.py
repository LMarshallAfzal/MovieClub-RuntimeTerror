from pyexpat import model
from django.contrib.auth.models import AbstractUser
from django.db.models import Count, F, Value
from django.db.models.fields.related import ForeignKey
from django.db import models
from django.core.validators import MaxValueValidator, MinValueValidator, MinLengthValidator
from django.core.exceptions import ValidationError
from django.utils.translation import gettext_lazy as _
import datetime
from datetime import datetime
from libgravatar import Gravatar


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

    preferences = models.ManyToManyField(
        'Genre', related_name='preferences', blank=False)

    watched_movies = models.ManyToManyField('Movie', through='Watch')

    followers = models.ManyToManyField(
        'self', symmetrical=False, related_name='followees'
    )

    gravatar = models.CharField(max_length=100, blank=True)

    
    def toggle_follow(self, followee):

        if followee == self:
            return
        if self.is_following(followee):
            self._unfollow(followee)
        else:
            self._follow(followee)

    def _follow(self, user):
        user.followers.add(self)

    def _unfollow(self, user):
        user.followers.remove(self)

    def is_following(self, user):

        return user in self.followees.all()

    def follower_count(self):

        return self.followers.count()

    def followee_count(self):

        return self.followees.count()

    def full_name(self):
        return f'{self.first_name} {self.last_name}'

    def mini_gravatar(self):
        "Return a URL to a miniature version of the user's gravatar."""
        return self.gravatar(size=60)

    def gravatar(self, size=120):
        """Return a URL to the user's gravatar."""
        gravatar_object = Gravatar(self.email)
        gravatar_url = gravatar_object.get_image(
            size=size, default='identicon')
        return gravatar_url

    def get_user_ratings(self):
        ratings = Rating.objects.filter(user=self)
        if not ratings:
            return None
        else:
            return ratings

    def attend_meeting(self, meeting):
        meeting.attendees.add(self)
        meeting.save()

    def get_attending_meetings(self):
        meetings = []
        meetings = Meeting.objects.all().filter(attendees=self)
        return meetings

    def leave_meeting(self, meeting):
        meeting.attendees.remove(self)
        meeting.save()

    def get_user_clubs(self):
        clubs = []
        for club in Club.objects.filter(club_members__username=self.username):
            if Membership.objects.get(user=self, club=club).role != 'B':
                clubs.append(club)
        return clubs

    def get_user_memberships(self):
        memberships = Membership.objects.filter(user=self).exclude(role='B')
        return memberships

    def get_user_preferences(self):
        return [genre.id for genre in self.preferences.all()]

    def add_watched_movie(self, movie):
        self.watched_movies.add(movie)
        self.save()
        return

    def get_watched_movies(self):
        movies = self.watched_movies.all()
        return movies
    
    def get_favourite_movies(self):
        favourites = []
        movies_rated = Rating.objects.filter(user=self)
        for rating in movies_rated:
            if rating.score == 5:
                favourites.append(rating.movie)
        return favourites
                                
    def clean(self):
        if self.preferences.count() == 0:
            raise ValidationError(_('You must have at least one preference'))
        return super().clean()


class Genre(models.Model):
    name = models.CharField(max_length=100, unique=True)

    def __str__(self):
        return self.name

    def get_genre_id(self, genre_name):
        try:
            return Genre.objects.get(name=genre_name).id
        except Genre.DoesNotExist:
            new_genre = Genre.objects.create(name=genre_name)
            return new_genre.id

    def get_genre_ids(self, genre_names):
        return [self.get_genre_id(genre_name) for genre_name in genre_names]


class Club(models.Model):

    club_name = models.CharField(
        max_length=50,
        blank=False,
        unique=True
    )

    mission_statement = models.CharField(
        max_length=500,
        blank=False,
        unique=False
    )
    theme = models.ForeignKey(Genre, on_delete=models.CASCADE)

    club_members = models.ManyToManyField(User, through='Membership')

    club_messages = models.ManyToManyField(
        'Message', related_name='club_messages')

    club_meetings = models.ManyToManyField(
        'Meeting', related_name='club_meetings')

    def get_all_users_in_club(self):
        return self.club_members.all().exclude(membership__role='B')

    def get_all_club_members(self):
        return self.club_members.all().filter(
            club=self, membership__role='M')

    def get_club_owner(self):
        return self.club_members.all().filter(club=self, membership__role='O')

    def remove_user_from_club(self, user):
        Membership.objects.get(club=self, user=user).delete()

    def get_banned_members(self):
        return self.club_members.filter(club=self, membership__role='B')

    def get_organiser(self):
        return self.club_members.filter(club=self, membership__is_organiser=True)

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

    def change_membership(self, user, role):
        membership = Membership.objects.get(user=user, club=self)
        membership.role = role
        membership.save()

    def get_club_messages(self):
        return self.club_messages.all()

    def get_upcoming_meeting(self):
        meeting = Meeting.objects.get(club=self, completed=False)
        return meeting

    def __unicode__(self):
        return '%d: %s' % (self.club_name)


class Membership(models.Model):
    """
    Membership is an intermediate model that connects Users to Clubs.

    Apart from the two foreign keys, it contains the nature of the relationship:
        Club Owner | Member | Banned
    """
    class MembershipStatus(models.TextChoices):
        MEMBER = 'M', _('Member')
        OWNER = 'O', _('Owner')
        BANNED = 'B', _('BannedMember')

    user = ForeignKey(User, on_delete=models.CASCADE)
    club = ForeignKey(Club, on_delete=models.CASCADE)
    role = models.CharField(
        max_length=1,
        choices=MembershipStatus.choices,
        default=MembershipStatus.MEMBER
    )
    is_organiser = models.BooleanField(default=False)

    notifications = models.BooleanField(default=False)

    """We must ensure that only one relationship is created per User-Club pair."""
    class Meta:
        unique_together = ('user', 'club')

    def get_role_name(self):
        return self.MembershipStatus(self.role).name.title()

    def toggle_organiser(self):
        if self.is_organiser == True:
            self.is_organiser = False
        else:
            self.is_organiser = True
        self.save()

    def toggle_notifications(self):
        if self.notifications == True:
            self.notifications = False
        else:
            self.notifications = True
        self.save()


class Movie(models.Model):

    ml_id = models.PositiveIntegerField(
        unique=True,
        default=0,
    )

    imdb_id = models.CharField(max_length=10, unique=True)

    title = models.CharField(
        max_length=100,
        blank=False,
        unique=False
    )

    genres = models.ManyToManyField(Genre, related_name='genres')

    year = models.PositiveIntegerField(default=0)

    ratings = models.ManyToManyField(User, through='Rating')

    viewers = models.ManyToManyField(
        User, through='Watch', related_name='viewers')

    class Meta:
        ordering = ['title']

    def clean(self):
        if self.genres.count() == 0:
            raise ValidationError(_('The movie must have at least one genre'))
        return super().clean()

    def get_rating_author(self, user):
        author = Rating.objects.get(user=user.id, movie=self.id)
        return author

    def get_movie_title(self):
        return Movie.objects.get(id=self.id).title

    def get_movies_by_genre(genres):
        return Movie.objects.filter(genres__id__in=genres)

    def get_movies_by_club_theme(theme):
        theme = [theme.get_genre_id(theme.name)]
        return Movie.objects.filter(genres__id__in=theme)


class Rating(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)

    movie = models.ForeignKey(Movie, on_delete=models.CASCADE)

    score = models.FloatField(
        null=True,
        validators=[MinValueValidator(0.0), MaxValueValidator(5.0)]
    )

    class Meta:
        ordering = ['user']


class Meeting(models.Model):
    club = ForeignKey(Club, on_delete=models.CASCADE)

    movie = ForeignKey(Movie, on_delete=models.CASCADE)

    meeting_title = models.CharField(max_length=200, blank=False)

    organiser = ForeignKey(User, on_delete=models.CASCADE)

    date = models.DateField(auto_now=False, blank=False)

    start_time = models.TimeField(auto_now=False, blank=False)

    end_time = models.TimeField(auto_now=False, blank=False)

    attendees = models.ManyToManyField(User, related_name="attendees")

    meeting_link = models.CharField(max_length=100, blank=False)

    completed = models.BooleanField(default=False)

    description = models.CharField(
        max_length=500,
        blank=False,
        unique=False
    )

    def toggle_completed(self):
        if self.completed == False:
            self.completed = True
        else:
            self.completed = False
        self.save()


class Message(models.Model):
    sender = models.ForeignKey(
        User, to_field='username', on_delete=models.CASCADE, unique=False)

    club = models.ForeignKey(Club, on_delete=models.CASCADE, unique=False)

    message = models.CharField(max_length=1500)

    timestamp = models.DateTimeField(auto_now_add=True)

    sender_gravatar = models.CharField(max_length=100, blank=True)


    def __str__(self):
        return self.message

    class Meta:
        ordering = ('timestamp',)


class Watch(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)

    movie = models.ForeignKey(Movie, on_delete=models.CASCADE)

    time_watched = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ('time_watched',)
