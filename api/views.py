from rest_framework.decorators import api_view, permission_classes, authentication_classes
from rest_framework.authentication import SessionAuthentication, BasicAuthentication, TokenAuthentication
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework import status
from .serializers import *
from .models import *
from django.contrib.auth import logout
from recommender.movie_CF_user import Recommender
from .manage_data import change_rating_data,add_rating_data

@api_view(['GET'])
def getRoutes(request):
    routes = [
        {
            'Endpoint': '/log_in/',
            'method': 'POST',
            'username': {'username': ""},
            'password': {'password': ""},
            'description': 'Return login details'
        },
        {
            'Endpoint': '/sign_up/',
            'method': 'POST',
            'username': {'username,' ""},
            'first_name': {'first_name': ""},
            'last_name': {'last_name': ""},
            'email': {'email': ""},
            'bio': {'bio': ""},
            'description': 'Creates a user with data sent into POST request'
        }
    ]
    return Response(routes)

@api_view(['POST'])
def signUp(request):
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
# @authentication_classes([SessionAuthentication, BasicAuthentication, TokenAuthentication])
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
    if request.user.is_authenticated:
        logout(request)
        return Response(status=status.HTTP_200_OK)
    else:
        return Response(status=status.HTTP_403_FORBIDDEN)


@api_view(["PUT"])
@authentication_classes([SessionAuthentication, BasicAuthentication, TokenAuthentication])
@authentication_classes([TokenAuthentication])
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
@permission_classes([IsAuthenticated])
def get_users(request):
    users = User.objects.all()
    serializer = UserSerializer(users, many=True)
    return Response(serializer.data)

@api_view(["GET"])
def get_user(request, username):
    data = request.data
    user = User.objects.get(username=username)
    serializer = UserSerializer(user, many=False)
    return Response(serializer.data) 

@api_view(["GET"])
def get_score(request, username, movieID):
    data = request.data
    user = User.objects.get(username=username)
    movie = Movie.objects.get(movieID=movieID)
    score = Rating.objects.get(user = user, movie = movie)
    serializer = RatingSerializer(score, many=False)
    return Response(serializer.data) 
  
@authentication_classes([SessionAuthentication, BasicAuthentication, TokenAuthentication])
@api_view(['PUT'])
def edit_profile(request, username):
    # user = request.user
    user = User.objects.get(username=username)
    serializer = UpdateUserSerializer(user, data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data, status=status.HTTP_200_OK)    
    else:
        return Response(serializer._errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(["GET"])
# @authentication_classes([SessionAuthentication, BasicAuthentication])
def get_clubs(request):
    clubs = Club.objects.all()
    serializer = ClubSerializer(clubs, many=True)
    return Response(serializer.data)

@api_view(["POST"])
@authentication_classes([SessionAuthentication, BasicAuthentication, TokenAuthentication])
def create_club(request):
    serializer = CreateClubSerializer(data=request.data)
    if serializer.is_valid():
        club = serializer.save()
        Membership.objects.create(user=request.user, club=club, role="C")
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    else:
        errors = serializer.errors
        return Response(errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def add_rating(request, movieID):
    try:
        movie = Movie.objects.get(movieID=movieID)
        user = User.objects.get(username=request.user.username)
    except:
        return Response(status=status.HTTP_404_NOT_FOUND)
    request.data._mutable = True
    request.data["user"] = user.id  
    request.data["movie"] = movie.id
    #rating = Rating.objects.get(user=user,movie=movie)
    serializer = AddRatingSerializer(data=request.data,context={"request": request})
    if serializer.is_valid():
        serializer.save()
        #add_rating_data(rating)
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    else:
        return Response(serializer._errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['PUT'])
@permission_classes([IsAuthenticated])
def change_rating(request, movieID):
    try:
        movie = Movie.objects.get(movieID=movieID)
        user = User.objects.get(username=request.user.username)
    except:
        return Response(status=status.HTTP_404_NOT_FOUND)
    request.data._mutable = True
    #rating = Rating.objects.get(user=user,movie=movie)
    serializer = ChangeRatingSerializer(rating,data=request.data)
    if serializer.is_valid():
        serializer.save()
        #change_rating_data(rating,request.data["score"])
        return Response(serializer.data, status=status.HTTP_200_OK)
    else:
        return Response(serializer._errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['GET'])
def recommend_movie_user(request):
    if request.user.get_user_ratings():
        recommender = Recommender(request.user.id)
        recommendations = recommender.recommend()
        print(recommendations)
    else:
        pass
    return Response(status = status.HTTP_200_OK)

@api_view(["GET"])
def get_memberships_of_user(request, username):
    data = request.data
    user = User.objects.get(username=username)
    serializer = MembershipSerializer(user, many=False)
    return Response(serializer.data) 