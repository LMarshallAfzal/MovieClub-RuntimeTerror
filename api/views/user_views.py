from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework import status
from api.serializers import *
from api.models import *
from api.helpers import *
from django.contrib.auth import logout
from api.decorators import *
from django.views.decorators.csrf import csrf_protect

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
@csrf_protect
def get_users(request):
    users = User.objects.all()
    serializer = UserSerializer(users, many=True)

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
    serializer = UserSerializer(request.user,many=False)
    return Response(serializer.data,status=status.HTTP_200_OK)

@api_view(["GET"])
@permission_classes([IsAuthenticated])
def get_user_image(request):
    user = request.user
    image = user.gravatar()
    return Response(image,status=status.HTTP_200_OK)

@api_view(['PUT'])
@permission_classes([IsAuthenticated])
@user_exists
def toggle_follow(request, user_id):
    followee = User.objects.get(id=user_id)
    request.user.toggle_follow(followee)
    followers = request.user.followers.all()
    serializer = UserSerializer(followee, many=False) 
    return Response(serializer.data, status = status.HTTP_200_OK)

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def get_followers(request):
    followers = request.user.followers.all()
    serializer = UserSerializer(followers, many=True) 
    return Response(serializer.data, status = status.HTTP_200_OK)

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def get_following(request):
    following = request.user.followees.all()
    serializer = UserSerializer(following, many=True) 
    return Response(serializer.data, status = status.HTTP_200_OK)

@api_view(['PUT'])
@permission_classes([IsAuthenticated])
@club_exists
@is_in_club
def toggle_notifications(request, club_id):
    club = Club.objects.get(id=club_id)
    membership = Membership.objects.get(user = request.user, club = club)
    membership.toggle_notifications()
    serializer = MembershipSerializer(membership, many=False) 
    return Response(serializer.data, status = status.HTTP_200_OK)