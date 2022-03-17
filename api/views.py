from ast import Is
from math import perm
from re import S
from django import views
from rest_framework.decorators import api_view, permission_classes, authentication_classes
from rest_framework.authentication import SessionAuthentication, BasicAuthentication, TokenAuthentication
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework import status
from .serializers import *
from .models import *
from django.contrib.auth import logout
from recommender.recommender_CF_item import Recommender
from .decorators import movie_exists,club_exists,has_watched,has_not_watched,is_member,is_organiser
from django.views.decorators.csrf import csrf_protect, ensure_csrf_cookie, csrf_exempt
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
# @csrf_protect
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
# @authentication_classes([SessionAuthentication, BasicAuthentication])
def login(request):
    data = {}
    serializer = LoginSerializer(data=request.data)
    if serializer.is_valid():
        data['response'] = 'User login successful'
        print(serializer.data)
        return Response(serializer.data, status=status.HTTP_200_OK)
    else:
        data['response'] = 'You have entered an invalid username or password'
        return Response(data, status=status.HTTP_400_BAD_REQUEST)


@api_view(["GET"])
@authentication_classes([SessionAuthentication, BasicAuthentication, TokenAuthentication])
def log_out(request):
    if request.user.is_authenticated:
        logout(request)
        return Response(status=status.HTTP_200_OK)
    else:
        return Response(status=status.HTTP_403_FORBIDDEN)


@api_view(["PUT"])
@authentication_classes([SessionAuthentication, BasicAuthentication, TokenAuthentication])
def change_password(request):
    serializer = ChangePasswordSerializer(
        data=request.data, context={"request": request}
    )
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data, status=status.HTTP_200_OK)
    else:
        return Response(serializer._errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(["GET"])
# @authentication_classes([SessionAuthentication, BasicAuthentication, TokenAuthentication])
@csrf_protect
def get_users(request):
    users = User.objects.all()
    serializer = UserSerializer(users, many=True)

@club_exists
@authentication_classes([SessionAuthentication, BasicAuthentication, TokenAuthentication])
def get_club_members(request,club_id):
    club = Club.objects.get(id=club_id)
    members = club.get_all_club_members()
    serializer = UserSerializer(members, many=True)
    return Response(serializer.data, status=status.HTTP_200_OK)

@api_view(['GET'])
@authentication_classes([SessionAuthentication, BasicAuthentication, TokenAuthentication])
def get_other_user(request,user_id):
    if request.user.is_authenticated:
        try:
            user = User.objects.get(id=user_id)
            serializer = UserSerializer(user, many=False)
            return Response(serializer.data, status=status.HTTP_200_OK)
        except:
            return Response(status=status.HTTP_404_NOT_FOUND)
    else:
        return Response(status=status.HTTP_403_FORBIDDEN)

@api_view(["GET"])
@permission_classes([IsAuthenticated])
def get_current_user(request):
    if request.user.is_authenticated:
        serializer = UserSerializer(request.user, many=False)
        return Response(serializer.data, status=status.HTTP_200_OK)
    else:
        return Response(status=status.HTTP_403_FORBIDDEN)


@api_view(["GET"])
@movie_exists
@authentication_classes([SessionAuthentication, BasicAuthentication, TokenAuthentication])
def get_score(request, movie_id):
    movie = Movie.objects.get(movie_id=movie_id)
    score = Rating.objects.get(user=request.user, movie=movie)
    serializer = RatingSerializer(score, many=False)
    return Response(serializer.data, status=status.HTTP_200_OK)


@api_view(['PUT'])
@permission_classes([IsAuthenticated])
# @authentication_classes([SessionAuthentication, BasicAuthentication, TokenAuthentication])
def edit_profile(request, user_id):
    # user = request.user
    user = User.objects.get(id=user_id)
    serializer = UpdateUserSerializer(user, data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data, status=status.HTTP_200_OK)
    else:
        return Response(serializer._errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(["GET"])
@authentication_classes([SessionAuthentication, BasicAuthentication, TokenAuthentication])
def get_clubs(request):
    clubs = Club.objects.all()
    serializer = ClubSerializer(clubs, many=True)
    return Response(serializer.data, status=status.HTTP_200_OK)


@api_view(["POST"])
# @csrf_protect
@permission_classes([IsAuthenticated])
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
@club_exists
@is_organiser
@authentication_classes([SessionAuthentication, BasicAuthentication, TokenAuthentication])
def create_meeting(request,club_id):
    serializer = CreateMeetingSerializer(data=request.data, context={"request": request})
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    else:
        errors = serializer.errors
        return Response(errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(["POST"])
@club_exists
@authentication_classes([SessionAuthentication, BasicAuthentication, TokenAuthentication])
def join_club(request, club_id):
    club = Club.objects.get(id=club_id)
    club.club_members.add(request.user, through_defaults={'role': 'M'})
    return Response(status=status.HTTP_200_OK)


@api_view(["POST"])
@club_exists
@is_member
@authentication_classes([SessionAuthentication, BasicAuthentication, TokenAuthentication])
def leave_club(request, club_id):
    club = Club.objects.get(id=club_id)
    Membership.objects.get(user=request.user, club=club).delete()
    return Response(status=status.HTTP_200_OK)


@api_view(['POST'])
@movie_exists
@has_not_watched
@authentication_classes([SessionAuthentication, BasicAuthentication, TokenAuthentication])
def add_watched_movie(request, movie_id):
    serializer = WatchMovieSerializer(
        data=request.data, context={"request": request})
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    else:
        return Response(serializer._errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(['DELETE'])
@movie_exists
@has_watched
@authentication_classes([SessionAuthentication, BasicAuthentication, TokenAuthentication])
def remove_watched_movie(request, movie_id):
    movie = Movie.objects.get(id=movie_id)
    watched_movie = Watch.objects.get(user=request.user, movie=movie)
    watched_movie.delete()
    return Response(status=status.HTTP_200_OK)


@api_view(['POST'])
@movie_exists
@authentication_classes([SessionAuthentication, BasicAuthentication, TokenAuthentication])
def add_rating(request, movie_id):
    serializer = AddRatingSerializer(
        data=request.data, context={"request": request})
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    else:
        return Response(serializer._errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(['PUT'])
@movie_exists
@authentication_classes([SessionAuthentication, BasicAuthentication, TokenAuthentication])
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
# @authentication_classes([SessionAuthentication, BasicAuthentication, TokenAuthentication])
def recommend_movie_user(request):
    recommendations = []
    recommender = Recommender(request.user)
    recommendations = recommender.recommend_movies_for_user()
    serializer = MovieSerializer(recommendations, many=True)
    return Response(serializer.data)


@api_view(['GET'])
@authentication_classes([SessionAuthentication, BasicAuthentication, TokenAuthentication])
def recommend_club(request):
    recommender = Recommender(request.user)
    recommendations = recommender.recommend_clubs()
    serializer = ClubSerializer(recommendations, many=True)
    return Response(serializer.data)


@api_view(["GET"])
@authentication_classes([SessionAuthentication, BasicAuthentication, TokenAuthentication])
def get_memberships_of_user(request, user_id):
    user = User.objects.get(id=user_id)
    clubs = user.get_user_clubs()
    serializer = ClubSerializer(clubs, many=True)
    return Response(serializer.data)


@api_view(['GET'])
@authentication_classes([SessionAuthentication, BasicAuthentication, TokenAuthentication])
def get_movie(request, movie_id):
    movie = Movie.objects.get(id=movie_id)
    serializer = MovieSerializer(movie, many=False)
    return Response(serializer.data, status=status.HTTP_200_OK)

@api_view(['GET'])
@authentication_classes([SessionAuthentication, BasicAuthentication, TokenAuthentication])
def get_watched_list(request):
    if request.user.is_authenticated:
        movies = request.user.get_watched_movies()
        serializer = MovieSerializer(movies,many=True)
    else:
        return Response(status=status.HTTP_403_FORBIDDEN)
    return Response(serializer.data,status=status.HTTP_200_OK)
