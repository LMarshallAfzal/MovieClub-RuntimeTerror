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
def add_rating(request, movie_id):
    serializer = AddRatingSerializer(
        data=request.data, context={"request": request})
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    else:
        return Response(serializer._errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(['PUT'])
@permission_classes([IsAuthenticated])
@movie_exists
@user_has_rated_movie
def change_rating(request, movie_id):
    movie = Movie.objects.get(id=movie_id)
    serializer = ChangeRatingSerializer(movie, data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data, status=status.HTTP_200_OK)
    else:
        return Response(serializer._errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['GET'])
@permission_classes([IsAuthenticated])
@movie_exists
@user_has_rated_movie
def get_rating(request,movie_id):
    movie = Movie.objects.get(id=movie_id)
    rating = Rating.objects.get(user=request.user,movie=movie)
    serializer = RatingSerializer(rating,many = False)
    return Response(serializer.data,status=status.HTTP_200_OK)

