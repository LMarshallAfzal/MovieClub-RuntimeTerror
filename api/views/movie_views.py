from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework import status
from api.serializers import *
from api.models import *
from api.helpers import *
from api.decorators import *

@api_view(['POST'])
@permission_classes([IsAuthenticated])
@movie_exists
@has_not_watched
def add_watched_movie(request, movie_id):
    serializer = WatchMovieSerializer(
        data=request.data, context={"request": request})
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    else:
        return Response(serializer._errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(['DELETE'])
@permission_classes([IsAuthenticated])
@movie_exists
@has_watched
def remove_watched_movie(request, movie_id):
    movie = Movie.objects.get(id=movie_id)
    Watch.objects.get(user=request.user, movie=movie).delete()
    return Response(status=status.HTTP_200_OK)

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def get_all_movies(request):
    movies = Movie.objects.all()
    serializer = MovieSerializer(movies, many=True)
    return Response(serializer.data)


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def get_specific_movie(request, movie_id):
    movie = Movie.objects.get(id=movie_id)
    serializer = MovieSerializer(movie, many=False)
    return Response(serializer.data)

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def get_movie(request, movie_id):
    movie = Movie.objects.get(id=movie_id)
    serializer = MovieSerializer(movie, many=False)
    return Response(serializer.data, status=status.HTTP_200_OK)


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def get_watched_list(request):
    if request.user.is_authenticated:
        movies = request.user.get_watched_movies()
        serializer = MovieSerializer(movies, many=True)
    else:
        return Response(status=status.HTTP_403_FORBIDDEN)
    return Response(serializer.data, status=status.HTTP_200_OK)