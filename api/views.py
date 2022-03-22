from ast import Is, IsNot
from math import perm
from re import S
from django import views
from rest_framework.decorators import api_view, permission_classes, authentication_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework import status
from .serializers import *
from .models import *
from rest_framework.parsers import JSONParser
from django.contrib.auth import logout
from recommender.user_movie_recommender import train_movie_data_for_user, recommend_movies_for_user
from recommender.meeting_movie_recommender import train_movie_data_for_meeting, recommend_movies_for_meeting
from recommender.club_recommender import recommend_clubs
from .decorators import *
from django.views.decorators.csrf import csrf_protect, ensure_csrf_cookie
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework_simplejwt.views import TokenObtainPairView


class MyTokenObtainPairSerializer(TokenObtainPairSerializer):
    @classmethod
    def get_token(cls, user):
        token = super().get_token(user)

        # Add custom claims
        token['username'] = user.username

        return token


class MyTokenObtainPairView(TokenObtainPairView):
    serializer_class = MyTokenObtainPairSerializer


@api_view(["GET"])
@ensure_csrf_cookie
def csrf_token(request):
    return Response({"result": "Success (CSRF cookie set.)"})


@api_view(['POST'])
def sign_up(request):
    data = {}
    serializer = SignUpSerializer(data=request.data)
    if serializer.is_valid():
        user = serializer.save()
        data['response'] = "successfully signed up"
        data['email'] = user.email
        data['username'] = user.username
        data['first_name'] = user.first_name
        data['last_name'] = user.last_name
        data['bio'] = user.bio
        data['preferences'] = user.preferences
        return Response(SignUpSerializer(instance=user).data, status=status.HTTP_201_CREATED)
    else:
        data = serializer.errors
        return Response(data, status=status.HTTP_400_BAD_REQUEST)


@api_view(['POST', 'GET'])
@csrf_protect
def login(request):
    data = {}
    serializer = LoginSerializer(data=request.data)
    if serializer.is_valid():
        data['response'] = 'User login successful'
        return Response(serializer.data, status=status.HTTP_200_OK)
    else:
        data['response'] = 'You have entered an invalid username or password'
        return Response(data, status=status.HTTP_400_BAD_REQUEST)


@api_view(["GET"])
@permission_classes([IsAuthenticated])
def log_out(request):
    logout(request)
    return Response(status=status.HTTP_200_OK)


@api_view(["PUT"])
@permission_classes([IsAuthenticated])
def change_password(request):
    serializer = ChangePasswordSerializer(
        data=request.data, context={"request": request}
    )
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data, status=status.HTTP_200_OK)
    else:
        errors = serializer.errors
        return Response(errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(["GET"])
@permission_classes([IsAuthenticated])
@csrf_protect
def get_users(request):
    users = User.objects.all()
    serializer = UserSerializer(users, many=True)


@api_view(['GET'])
@permission_classes([IsAuthenticated])
@club_exists
def get_club_members(request, club_id):
    club = Club.objects.get(id=club_id)
    members = club.get_all_club_members()
    serializer = UserSerializer(members, many=True)
    return Response(serializer.data, status=status.HTTP_200_OK)


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def get_other_user(request, user_id):
    try:
        user = User.objects.get(id=user_id)
        serializer = UserSerializer(user, many=False)
        return Response(serializer.data, status=status.HTTP_200_OK)
    except:
        return Response(status=status.HTTP_404_NOT_FOUND)


@api_view(["GET"])
@permission_classes([IsAuthenticated])
def get_current_user(request):
    serializer = UserSerializer(request.user, many=False)
    return Response(serializer.data, status=status.HTTP_200_OK)


@api_view(["GET"])
@movie_exists
@permission_classes([IsAuthenticated])
def get_score(request, movie_id):
    movie = Movie.objects.get(movie_id=movie_id)
    score = Rating.objects.get(user=request.user, movie=movie)
    serializer = RatingSerializer(score, many=False)
    return Response(serializer.data, status=status.HTTP_200_OK)


@api_view(['PUT'])
@permission_classes([IsAuthenticated])
def edit_profile(request, user_id):
    user = User.objects.get(id=user_id)
    serializer = UpdateUserSerializer(user, data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data, status=status.HTTP_200_OK)
    else:
        return Response(serializer._errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(["GET"])
@permission_classes([IsAuthenticated])
def get_clubs(request):
    clubs = Club.objects.all()
    serializer = ClubSerializer(clubs, many=True)
    return Response(serializer.data, status=status.HTTP_200_OK)


@api_view(["POST"])
@permission_classes([IsAuthenticated])
# @csrf_protect
def create_club(request):
    serializer = CreateClubSerializer(data=request.data)
    if serializer.is_valid():
        club = serializer.save()
        Membership.objects.create(user=request.user, club=club, role="C")
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    else:
        errors = serializer.errors
        return Response(errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(["POST"])
@permission_classes([IsAuthenticated])
@club_exists
@is_organiser
def create_meeting(request, club_id):
    serializer = CreateMeetingSerializer(
        data=request.data, context={"request": request})
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    else:
        errors = serializer.errors
        return Response(errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(["POST"])
@permission_classes([IsAuthenticated])
@club_exists
@not_banned
def join_club(request, club_id):
    club = Club.objects.get(id=club_id)
    club.club_members.add(request.user, through_defaults={'role': 'M'})
    return Response(status=status.HTTP_200_OK)


@api_view(["POST"])
@permission_classes([IsAuthenticated])
@club_exists
@is_member
def leave_club(request, club_id):
    club = Club.objects.get(id=club_id)
    Membership.objects.get(user=request.user, club=club).delete()
    return Response(status=status.HTTP_200_OK)


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
@has_ratings_for_movie_recommendations
def recommend_movie_user(request):
    recommendations = []
    recommendations = recommend_movies_for_user(request.user)
    serializer = MovieSerializer(recommendations, many=True)
    return Response(serializer.data, status=status.HTTP_200_OK)


@api_view(['GET'])
def train_movie_data(request):
    train_movie_data_for_user()
    return Response(status=status.HTTP_200_OK)


@api_view(['GET'])
@permission_classes([IsAuthenticated])
@club_exists
@is_organiser
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
    pass


@api_view(["GET"])
@permission_classes([IsAuthenticated])
def get_memberships_of_user(request, user_id):
    user = User.objects.get(id=user_id)
    clubs = user.get_user_clubs()
    serializer = ClubSerializer(clubs, many=True)
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


@api_view(['GET'])
@permission_classes([IsAuthenticated])
@club_exists
@user_in_club
@not_banned
def message_forum(request, club_id):
    messages = Message.objects.filter(club=club_id)
    serializer = MessageSerializer(messages, many=True)
    return Response(serializer.data, status=status.HTTP_200_OK)


@api_view(['POST'])
@permission_classes([IsAuthenticated])
@club_exists
@user_in_club
@not_banned
def write_message(request, club_id):
    serializer = WriteMessageSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(['PUT'])
@permission_classes([IsAuthenticated])
@club_exists
@user_in_club
@is_owner
def ban_member(request, club_id, user_id):
    club = Club.objects.get(id=club_id)
    user = User.objects.get(id=user_id)
    club.change_membership(user, 'B')
    return Response(status.HTTP_200_OK)


@api_view(['PUT'])
@permission_classes([IsAuthenticated])
@club_exists
@is_owner
@is_banned
def unban_member(request, club_id, user_id):
    club = Club.objects.get(id=club_id)
    banned_user = User.objects.get(id=user_id)
    club.remove_user_from_club(banned_user)
    return Response(status=status.HTTP_200_OK)

@api_view(['GET'])
@permission_classes([IsAuthenticated])
@club_exists
@is_owner
def banned_member_list(request, club_id):
    club = Club.objects.get(id=club_id)
    banned = club.get_banned_members()
    serializer = UserSerializer(banned, many=True)
    return Response(serializer.data,status=status.HTTP_200_OK)
