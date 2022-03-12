from django.shortcuts import redirect
from django.conf import settings
from .models import User,Movie,Club,Rating,Watch
from django.core.exceptions import ObjectDoesNotExist
from rest_framework.response import Response
from rest_framework import status
from functools import wraps


def movie_exists(view_function):
    @wraps(view_function)
    def modified_view_function(request,movie_id,*args,**kwargs):
        try:
            Movie.objects.get(movie_id=movie_id)
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