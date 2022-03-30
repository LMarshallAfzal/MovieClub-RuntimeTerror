from .models import Movie, Club, Rating, Watch, Membership
from .helpers import get_initial_recommendations_for_clubs, get_initial_recommendations_for_movies,get_initial_recommendations_for_meeting_movies
from django.core.exceptions import ObjectDoesNotExist
from rest_framework.response import Response
from rest_framework import status
from functools import wraps
from .serializers import *
import random


def user_exists(view_function):
    @wraps(view_function)
    def modified_view_function(request, user_id, *args, **kwargs):
        try:
            User.objects.get(id=user_id)
        except ObjectDoesNotExist:
            return Response(status=status.HTTP_404_NOT_FOUND)
        else:
            return view_function(request, user_id, *args, **kwargs)
    return modified_view_function

def movie_exists(view_function):
    @wraps(view_function)
    def modified_view_function(request, movie_id, *args, **kwargs):
        try:
            Movie.objects.get(id=movie_id)
        except ObjectDoesNotExist:
            return Response(status=status.HTTP_404_NOT_FOUND)
        else:
            return view_function(request, movie_id, *args, **kwargs)
    return modified_view_function


def club_exists(view_function):
    @wraps(view_function)
    def modified_view_function(request, club_id, *args, **kwargs):
        try:
            Club.objects.get(id=club_id)
        except ObjectDoesNotExist:
            return Response(status=status.HTTP_404_NOT_FOUND)
        else:
            return view_function(request, club_id, *args, **kwargs)
    return modified_view_function


def has_watched(view_function):
    @wraps(view_function)
    def modified_view_function(request, movie_id, *args, **kwargs):
        movie = Movie.objects.get(id=movie_id)
        try:
            Watch.objects.get(user=request.user, movie=movie)
        except ObjectDoesNotExist:
            return Response(status=status.HTTP_404_NOT_FOUND)
        else:
            return view_function(request, movie_id, *args, **kwargs)
    return modified_view_function


def has_not_watched(view_function):
    @wraps(view_function)
    def modified_view_function(request, movie_id, *args, **kwargs):
        movie = Movie.objects.get(id=movie_id)
        try:
            Watch.objects.get(user=request.user, movie=movie)
        except ObjectDoesNotExist:
            return view_function(request, movie_id, *args, **kwargs)
        else:
            return Response(status=status.HTTP_404_NOT_FOUND)
    return modified_view_function


def is_in_club(view_function):
    @wraps(view_function)
    def modified_view_function(request, club_id, *args, **kwargs):
        club = Club.objects.get(id=club_id)
        try:
            Membership.objects.get(club=club, user=request.user)
        except ObjectDoesNotExist:
            return Response(status=status.HTTP_403_FORBIDDEN)
        else:
            return view_function(request, club_id, *args, **kwargs)
    return modified_view_function


def is_organiser(view_function):
    @wraps(view_function)
    def modified_view_function(request, club_id, *args, **kwargs):
        club = Club.objects.get(id=club_id)
        member = Membership.objects.get(user=request.user, club=club)
        if member.is_organiser:
            return view_function(request, club_id, *args, **kwargs)
        else:
            error_serializer = MembershipSerializer(member, many=False)
            return Response(error_serializer.data, status=status.HTTP_403_FORBIDDEN)
    return modified_view_function


def is_owner(view_function):
    @wraps(view_function)
    def modified_view_function(request, club_id, *args, **kwargs):
        club = Club.objects.get(id=club_id)
        member = Membership.objects.get(user=request.user, club=club)
        if member.role == 'O':
            return view_function(request, club_id, *args, **kwargs)

        else:
            error_serializer = MembershipSerializer(member, many=False)
            return Response(error_serializer.data, status=status.HTTP_403_FORBIDDEN)

    return modified_view_function


def not_banned(view_function):
    @wraps(view_function)
    def modified_view_function(request, club_id, *args, **kwargs):
        club = Club.objects.get(id=club_id)
        member = Membership.objects.get(user=request.user, club=club)
        if member.role != 'B':
            return view_function(request, club_id, *args, **kwargs)
        else:
            return Response(status=status.HTTP_403_FORBIDDEN)
    return modified_view_function


def user_is_banned(view_function):
    @wraps(view_function)
    def modified_view_function(request, club_id, user_id, *args, **kwargs):
        club = Club.objects.get(id=club_id)
        try:
            user = User.objects.get(id=user_id)
            Membership.objects.get(user=user, club=club, role="B")
        except ObjectDoesNotExist:
            return Response(status=status.HTTP_403_FORBIDDEN)
        else:
            return view_function(request, club_id, user_id, *args, **kwargs)
    return modified_view_function


def user_in_club(view_function):
    def modified_view_function(request, club_id, user_id, *args, **kwargs):
        club = Club.objects.get(id=club_id)
        try:
            user = User.objects.get(id=user_id)
            Membership.objects.get(club=club, user=user)
        except ObjectDoesNotExist:
            return Response(status=status.HTTP_400_BAD_REQUEST)
        else:
            return view_function(request, club_id, user_id, *args, **kwargs)
    return modified_view_function


def has_ratings_for_movie_recommendations(view_function):
    @wraps(view_function)
    def modified_view_function(request, *args, **kwargs):
        if Rating.objects.filter(user=request.user.id):
            return view_function(request, *args, **kwargs)
        else:
            recommendations = get_initial_recommendations_for_movies(
            request.user, request.user.get_user_preferences())
            serializer = MovieSerializer(recommendations, many=True)
            return Response(serializer.data, status=status.HTTP_200_OK)
    return modified_view_function

def user_has_rated_movie(view_function):
    @wraps(view_function)
    def modified_view_function(request,movie_id,*args,**kwargs):
        movie = Movie.objects.get(id = movie_id)
        try:
            Rating.objects.get(user=request.user,movie=movie)
        except ObjectDoesNotExist:
            raise serializers.ValidationError("User has not rated this movie")
        else:
            return view_function(request,movie_id,*args,**kwargs)
    return modified_view_function

def has_ratings_for_club_recommendations(view_function):
    @wraps(view_function)
    def modified_view_function(request, *args, **kwargs):
        if Rating.objects.filter(user=request.user.id):
            return view_function(request, *args, **kwargs)
        else:
            recommendations = get_initial_recommendations_for_clubs(
            request.user, request.user.get_user_preferences().split(','))
            serializer = ClubSerializer(recommendations, many=True)
            return Response(serializer.data, status=status.HTTP_200_OK)
    return modified_view_function

def members_have_ratings_for_meeting_movie_recommendations(view_function):
    @wraps(view_function)
    def modified_view_function(request, club_id, *args, **kwargs):
        club = Club.objects.get(id=club_id)
        ratings = []
        for member in club.club_members.all():
            if Rating.objects.filter(user=member):
                ratings.append(Rating.objects.filter(user=member))
        if not ratings:
            recommendations = get_initial_recommendations_for_meeting_movies(club)
            serializer = MovieSerializer(recommendations, many=True)
            return Response(serializer.data, status=status.HTTP_200_OK)
        else:
            return view_function(request, club_id, *args, **kwargs)
    return modified_view_function
                

def is_attendee(view_function):
    @wraps(view_function)
    def modified_view_function(request, club_id, *args, **kwargs):
        club = Club.objects.get(id=club_id)
        meeting = club.get_upcoming_meeting()
        try:
            meeting.attendees.get(id=request.user.id)
        except ObjectDoesNotExist:
            error_serializer = UserSerializer(request.user, many=False)
            return Response(error_serializer.data, status=status.HTTP_403_FORBIDDEN)
        else:
            return view_function(request, club_id, *args, **kwargs)

    return modified_view_function


def not_attendee(view_function):
    @wraps(view_function)
    def modified_view_function(request, club_id, *args, **kwargs):
        club = Club.objects.get(id=club_id)
        meeting = club.get_upcoming_meeting()
        try:
            meeting.attendees.get(id=request.user.id)
        except ObjectDoesNotExist:
            return view_function(request,club_id, *args, **kwargs)
        else:
            raise serializers.ValidationError("You are already attending this meeting.")
    return modified_view_function


def club_has_upcoming_meeting(view_function):
    @wraps(view_function)
    def modified_view_function(request, club_id, *args, **kwargs):
        club = Club.objects.get(id=club_id)
        try:
            upcoming_meeting = club.get_upcoming_meeting()
        except ObjectDoesNotExist:
            raise serializers.ValidationError(
                f'{club.club_name} currently have no upcoming meeting.')
        else:
            return view_function(request, club_id, *args, **kwargs)
    return modified_view_function


def club_has_no_upcoming_meeting(view_function):
    @wraps(view_function)
    def modified_view_function(request, club_id, *args, **kwargs):
        club = Club.objects.get(id=club_id)
        try:
            upcoming_meeting = club.get_upcoming_meeting()

        except ObjectDoesNotExist:
            return view_function(request, club_id, *args, **kwargs)
        else:
            raise serializers.ValidationError(
                f'{club.club_name} currently has an upcoming meeting.')
    return modified_view_function
