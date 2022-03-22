from .models import Movie, Club, Rating, Watch, Membership
from .helpers import get_initial_recommendations_for_clubs, get_initial_recommendations_for_movies
from django.core.exceptions import ObjectDoesNotExist
from rest_framework.response import Response
from rest_framework import status
from functools import wraps
from .serializers import *
import random


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


def is_member(view_function):
    @wraps(view_function)
    def modified_view_function(request, club_id, *args, **kwargs):
        club = Club.objects.get(id=club_id)
        try:
            Membership.objects.get(user=request.user, club=club)
        except ObjectDoesNotExist:
            return Response(status=status.HTTP_403_FORBIDDEN)
        else:
            return view_function(request, club_id, *args, **kwargs)
    return modified_view_function


def is_organiser(view_function):
    @wraps(view_function)
    def modified_view_function(request, club_id, *args, **kwargs):
        club = Club.objects.get(id=club_id)
        try:
            Membership.objects.get(user=request.user, club=club, role="O")
        except ObjectDoesNotExist:
            return Response(status=status.HTTP_403_FORBIDDEN)
        else:
            return view_function(request, club_id, *args, **kwargs)
    return modified_view_function


def is_owner(view_function):
    @wraps(view_function)
    def modified_view_function(request, club_id, *args, **kwargs):
        club = Club.objects.get(id=club_id)
        try:
            Membership.objects.get(user=request.user, club=club, role="C")
        except ObjectDoesNotExist:
            return Response(status=status.HTTP_403_FORBIDDEN)
        else:
            return view_function(request, club_id, *args, **kwargs)
    return modified_view_function


def not_banned(view_function):
    @wraps(view_function)
    def modified_view_function(request, club_id, *args, **kwargs):
        club = Club.objects.get(id=club_id)
        try:
            Membership.objects.get(user=request.user, club=club, role="B")
        except ObjectDoesNotExist:
            return view_function(request, club_id, *args, **kwargs)
        else:
            return Response(status=status.HTTP_403_FORBIDDEN)

    return modified_view_function


def is_banned(view_function):
    @wraps(view_function)
    def modified_view_function(request, club_id, user_id, *args, **kwargs):
        club = Club.objects.get(id=club_id)
        try:
            user = User.objects.get(id=user_id)
            Membership.objects.get(user=user, club=club, role="B")
        except ObjectDoesNotExist:
            return Response(status=status.HTTP_403_FORBIDDEN)

        else:
            return view_function(request, club_id,user_id, *args, **kwargs)

    return modified_view_function


def user_in_club(view_function):
    def modified_view_function(request, club_id, *args, **kwargs):
        user = request.user
        club = Club.objects.get(id=club_id)
        try:
            for arg in kwargs.values():
                user = User.objects.get(id=arg)
            role = club.get_club_membership(user)
        except ObjectDoesNotExist:
            return Response(status=status.HTTP_403_FORBIDDEN)
        else:
            return view_function(request, club_id, *args, **kwargs)
    return modified_view_function


def has_ratings_for_movie_recommendations(view_function):
    @wraps(view_function)
    def modified_view_function(request, *args, **kwargs):
        try:
            Rating.objects.get(user=request.user.id)
        except ObjectDoesNotExist:
            recommendations = get_initial_recommendations_for_movies(
                request.user, request.user.get_user_preferences().split(','))
            serializer = MovieSerializer(recommendations, many=True)
            return Response(serializer.data, status=status.HTTP_200_OK)
        else:
            return view_function(request, *args, **kwargs)
    return modified_view_function


def has_ratings_for_club_recommendations(view_function):
    @wraps(view_function)
    def modified_view_function(request, *args, **kwargs):
        try:
            Rating.objects.get(user=request.user.id)
        except ObjectDoesNotExist:
            recommendations = get_initial_recommendations_for_clubs(
                request.user, request.user.get_user_preferences().split(','))
            serializer = ClubSerializer(recommendations, many=True)
            return Response(serializer.data, status=status.HTTP_200_OK)
        else:
            return view_function(request, *args, **kwargs)
    return modified_view_function
