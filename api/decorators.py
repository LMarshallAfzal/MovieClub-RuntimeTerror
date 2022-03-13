from django.shortcuts import redirect
from django.conf import settings
from .models import User,Movie,Club,Rating,Watch,Membership
from django.core.exceptions import ObjectDoesNotExist
from rest_framework.response import Response
from rest_framework import status
from functools import wraps


def movie_exists(view_function):
    @wraps(view_function)
    def modified_view_function(request,movie_id,*args,**kwargs):
        try:
            Movie.objects.get(id=movie_id)
        except ObjectDoesNotExist:
            return Response(status=status.HTTP_404_NOT_FOUND)
        else:
            return view_function(request,movie_id,*args,**kwargs)
    return modified_view_function

def club_exists(view_function):
    @wraps(view_function)
    def modified_view_function(request,club_id,*args,**kwargs):
        try:
            Club.objects.get(id=club_id)
        except ObjectDoesNotExist:
            return Response(status=status.HTTP_404_NOT_FOUND)
        else:
            return view_function(request,club_id,*args,**kwargs)
    return modified_view_function

def has_watched(view_function):
    @wraps(view_function)
    def modified_view_function(request,movie_id,*args,**kwargs):
        movie = Movie.objects.get(id=movie_id)
        try:
            Watch.objects.get(user=request.user,movie=movie)
        except ObjectDoesNotExist:
            return Response(status=status.HTTP_404_NOT_FOUND)
        else:
            return view_function(request,movie_id,*args,**kwargs)
    return modified_view_function

def has_not_watched(view_function):
    @wraps(view_function)
    def modified_view_function(request,movie_id,*args,**kwargs):
        movie = Movie.objects.get(id=movie_id)
        try:
            Watch.objects.get(user=request.user,movie=movie)
        except ObjectDoesNotExist:
            return view_function(request,movie_id,*args,**kwargs)
        else:
             return Response(status=status.HTTP_404_NOT_FOUND)
    return modified_view_function

def is_member(view_function):
    @wraps(view_function)
    def modified_view_function(request,club_id,*args,**kwargs):
        try:
            club = Club.objects.get(id=club_id)
            Membership.objects.get(user = request.user, club=club)
        except ObjectDoesNotExist:
            return Response(status=status.HTTP_404_NOT_FOUND)
        else:
            return view_function(request,club_id,*args,**kwargs)
    return modified_view_function