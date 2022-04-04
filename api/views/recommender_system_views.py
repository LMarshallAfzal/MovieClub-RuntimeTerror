from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework import status
from api.serializers import *
from api.models import *
from api.helpers import *
from recommenders.user_movie.user_movie_recommender import train_movie_data_for_user, recommend_movies_for_user
from recommenders.meeting_movie.meeting_movie_recommender import train_movie_data_for_meeting, recommend_movies_for_meeting
from recommenders.user_club.club_recommender import recommend_clubs
from api.decorators import *

@api_view(['GET'])
@permission_classes([IsAuthenticated])
@has_ratings_for_movie_recommendations
def recommend_movie_user(request):
    recommendations = []
    recommendations = recommend_movies_for_user(request.user)
    serializer = MovieSerializer(recommendations, many=True)
    return Response(serializer.data, status=status.HTTP_200_OK)


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def train_movie_data(request):
    train_movie_data_for_user()
    return Response(status=status.HTTP_200_OK)

@api_view(['GET'])
def get_random_movies(request,num_movies):
    serializer = MovieSerializer(get_random_movies(num_movies),many=True)
    return Response(serializer.data,status=status.HTTP_200_OK)

@api_view(['GET'])
@permission_classes([IsAuthenticated])
@club_exists
@is_in_club
@is_management
@members_have_ratings_for_meeting_movie_recommendations
def recommend_movie_meeting(request, club_id):
    club = Club.objects.get(id=club_id)
    recommendations = []
    recommendations = recommend_movies_for_meeting(club)
    serializer = MovieSerializer(recommendations, many=True)
    return Response(serializer.data, status=status.HTTP_200_OK)


@api_view(['GET'])
def train_meeting_data(request):
    train_movie_data_for_meeting()
    return Response(status=status.HTTP_200_OK)


@api_view(['GET'])
@permission_classes([IsAuthenticated])
@has_ratings_for_club_recommendations
def recommend_club(request):
    recommendations = recommend_clubs(request.user)
    serializer = ClubSerializer(recommendations, many=True)
    return Response(serializer.data)

