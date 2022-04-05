from django.views.decorators.csrf import csrf_protect, ensure_csrf_cookie
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework_simplejwt.views import TokenObtainPairView

from recommender.club_recommender import recommend_clubs
from recommender.meeting_movie_recommender import train_movie_data_for_meeting, recommend_movies_for_meeting
from recommender.user_movie_recommender import train_movie_data_for_user, recommend_movies_for_user
from .communication.club_emails import ClubEmail
from .decorators import *
from .helpers import *


class MyTokenObtainPairSerializer(TokenObtainPairSerializer):
    @classmethod
    def get_token(cls, user):
        token = super().get_token(user)

        # Add custom claims
        token['username'] = user.username
        token['first_name'] = user.first_name
        token['last_name'] = user.last_name

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

# @api_view(['GET'])
# def update_gravatars(request):
#     for user in User.objects.all():
#         user.gravavatar_link = user.get_gravatar(user.email)
#         user.save()
#     return Response(status=status.HTTP_200_OK)

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
@club_exists
def get_club_owner(request, club_id):
    club = Club.objects.get(id=club_id)
    owner = club.get_club_owner()
    serializer = UserSerializer(owner, many=True)
    return Response(serializer.data, status=status.HTTP_200_OK)


@api_view(['GET'])
@permission_classes([IsAuthenticated])
@user_exists
def get_other_user(request, user_id):
    try:
        user = User.objects.get(id=user_id)
        serializer = UserSerializer(user, many=False)
        return Response(serializer.data, status=status.HTTP_200_OK)
    except:
        return Response(status=status.HTTP_404_NOT_FOUND)

@api_view([ 'GET'])
@permission_classes([IsAuthenticated])
@user_exists
def get_favourite_movies(request,user_id):
    user = User.objects.get(id=user_id)
    favourite_movies = user.get_favourite_movies()
    serializer = MovieSerializer(favourite_movies, many=True)
    return Response(serializer.data, status=status.HTTP_200_OK)

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
def get_all_clubs(request):
    clubs = Club.objects.all()
    serializer = ClubSerializer(clubs, many=True)
    return Response(serializer.data, status=status.HTTP_200_OK)

@api_view(["POST"])
@permission_classes([IsAuthenticated])
def create_club(request):
    serializer = CreateClubSerializer(data=request.data)
    if serializer.is_valid():
        club = serializer.save()
        Membership.objects.create(user=request.user, club=club, role="O")
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    else:
        errors = serializer.errors
        return Response(errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['PUT'])
@permission_classes([IsAuthenticated])
@club_exists
@is_in_club
@is_owner
def edit_club(request,club_id):
    club = Club.objects.get(id=club_id)
    serializer = UpdateClubSerializer(club, data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data, status=status.HTTP_200_OK)
    else:
        return Response(serializer._errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(["POST"])
@permission_classes([IsAuthenticated])
@club_exists
@is_in_club
@not_banned
@club_has_no_upcoming_meeting
def create_meeting(request, club_id):
    club = Club.objects.get(id=club_id)
    serializer = CreateMeetingSerializer(
        data=request.data, context={"request": request})
    if serializer.is_valid():
        serializer.save()
        Membership.objects.get(user=request.user, club=club).toggle_organiser()
        ClubEmail(club).send_new_meeting_notification()
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    else:
        errors = serializer.errors
        return Response(errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(["POST"])
@permission_classes([IsAuthenticated])
@club_exists
def join_club(request, club_id):
    club = Club.objects.get(id=club_id)
    try:
        Membership.objects.get(club=club, user=request.user)
    except ObjectDoesNotExist:
        club.club_members.add(request.user, through_defaults={'role': 'M'})
        membership = Membership.objects.get(club=club, user=request.user)
        serializer = MembershipSerializer(membership, many=False)
        return Response(serializer.data, status=status.HTTP_200_OK)
    else:
        raise serializers.ValidationError(
            "You are already a member of this club!")


@api_view(["POST"])
@permission_classes([IsAuthenticated])
@club_exists
@is_in_club
@not_banned
def leave_club(request, club_id):
    club = Club.objects.get(id=club_id)
    Membership.objects.get(user=request.user, club=club).delete()
    serializer = UserSerializer(request.user,many=False)
    return Response(serializer.data,status=status.HTTP_200_OK)

@api_view(["DELETE"])
@permission_classes([IsAuthenticated])
@club_exists
@is_in_club
@is_owner
def delete_club(request,club_id):
    club = Club.objects.get(id=club_id)
    club.delete()
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
@user_has_rated_movie
def change_rating(request, movie_id):
    movie = Movie.objects.get(id=movie_id)
    rating = Rating.objects.get(user=request.user, movie=movie)
    rating.score = request.data['score']
    rating.save()
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


@api_view(['GET'])
@permission_classes([IsAuthenticated])
@has_ratings_for_movie_recommendations
def recommend_movie_user(request):
    recommendations = []
    recommendations = recommend_movies_for_user(request.user)
    recommendations_based_on_genre = recommendations_based_on_preferences_for_user_movies(request.user, request.user.get_user_preferences())
    for movie in recommendations_based_on_genre:
        if not movie in recommendations:
            recommendations.append(movie)
    serializer = MovieSerializer(recommendations, many=True)
    return Response(serializer.data, status=status.HTTP_200_OK)


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def train_movie_data(request):
    train_movie_data_for_user()
    return Response(status=status.HTTP_200_OK)

@api_view(['GET'])
def get_random_movies(request):
    random_movie = Movie.objects.order_by('?')[0]
    serializer = MovieSerializer(random_movie,many=False)
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
    recommendations_based_on_theme = recommendations_based_on_theme_for_meeting_movies(club)
    if len(recommendations) != 5:
        for movie in recommendations_based_on_theme:
            if not movie in recommendations:
                recommendations.append(movie)
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
    recommendation_based_on_preferences = recommendations_based_on_preferences_for_clubs(request.user, request.user.get_user_preferences())
    for club in recommendation_based_on_preferences:
            if not club in recommendations:
                recommendations.add(club)
    serializer = ClubSerializer(recommendations, many=True)
    return Response(serializer.data)
    


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


@api_view(["GET"])
@permission_classes([IsAuthenticated])
def get_clubs_user_is_member_of(request, user_id):
    user = User.objects.get(id=user_id)
    clubs = user.get_user_clubs()
    if not clubs:
        raise serializers.ValidationError(
            "You are currently not part of any club.")
    serializer = ClubSerializer(clubs, many=True)
    return Response(serializer.data)

@api_view(["GET"])
@permission_classes([IsAuthenticated])
def get_memberships_of_user(request, user_id):
    user = User.objects.get(id=user_id)
    memberships = user.get_user_memberships()
    serializer = MembershipSerializer(memberships, many=True)
    return Response(serializer.data)

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def get_movie(request, movie_id):
    movie = Movie.objects.get(id=movie_id)
    serializer = MovieSerializer(movie, many=False)
    return Response(serializer.data, status=status.HTTP_200_OK)


@api_view(['GET'])
@permission_classes([IsAuthenticated])
@user_exists
def get_watched_list(request,user_id):
    user = User.objects.get(id=user_id)
    if user.is_authenticated:
        movies = user.get_watched_movies()
        serializer = MovieSerializer(movies, many=True)
    else:
        return Response(status=status.HTTP_403_FORBIDDEN)
    return Response(serializer.data, status=status.HTTP_200_OK)


@api_view(['GET'])
@permission_classes([IsAuthenticated])
@club_exists
@is_in_club
@not_banned
def message_forum(request, club_id):
    messages = Message.objects.filter(club=club_id)
    serializer = MessageSerializer(messages, many=True)
    return Response(serializer.data, status=status.HTTP_200_OK)


@api_view(['PUT'])
@permission_classes([IsAuthenticated])
@club_exists
@is_management
@club_has_upcoming_meeting
def edit_meeting(request, club_id):
    club = Club.objects.get(id=club_id)
    meeting = club.get_upcoming_meeting()
    serializer = UpdateMeetingSerializer(meeting, data=request.data)
    if serializer.is_valid():
        serializer.save()
        ClubEmail(club).send_meeting_update_notification()
        return Response(serializer.data, status=status.HTTP_200_OK)
    else:
        return Response(serializer._errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(['PUT'])
@permission_classes([IsAuthenticated])
@club_exists
@club_has_upcoming_meeting
@is_in_club
@not_banned
@not_attendee
def attend_meeting(request, club_id):
    club = Club.objects.get(id=club_id)
    meeting = club.get_upcoming_meeting()
    request.user.attend_meeting(meeting)
    serializer = MeetingSerializer(meeting, many=False)
    return Response(serializer.data, status=status.HTTP_200_OK)


@api_view(['PUT'])
@permission_classes([IsAuthenticated])
@club_exists
@is_in_club
@not_banned
@club_has_upcoming_meeting
@is_attendee
def leave_meeting(request, club_id):
    club = Club.objects.get(id=club_id)
    meeting = club.get_upcoming_meeting()
    request.user.leave_meeting(meeting)
    serializer = MeetingSerializer(meeting, many=False)
    return Response(serializer.data, status=status.HTTP_200_OK)

@api_view(['PUT'])
@permission_classes([IsAuthenticated])
@club_exists
@is_in_club
@user_in_club
@is_owner
def remove_user_from_club(request,club_id,user_id):
    club = Club.objects.get(id=club_id)
    user = User.objects.get(id=user_id)
    membership = Membership.objects.get(club=club,user=user)
    membership.delete()
    serializer = UserSerializer(user, many=False)
    return Response(serializer.data, status=status.HTTP_200_OK)

@api_view(['GET'])
def check_upcoming_meetings(request):
    update_upcoming_meetings()
    return Response(status=status.HTTP_200_OK)


@api_view(['DELETE'])
@club_exists
@is_in_club
@is_management
@permission_classes([IsAuthenticated])
def cancel_meeting(request, club_id):
    club = Club.objects.get(id=club_id)
    meeting = club.get_upcoming_meeting()
    ClubEmail(club).send_meeting_cancellation_notification()
    meeting.delete()
    return Response(status=status.HTTP_200_OK)


@api_view(['GET'])
@club_exists
@is_in_club
@club_has_upcoming_meeting
@not_banned
def get_club_upcoming_meeting(request, club_id):
    club = Club.objects.get(id=club_id)
    meeting = club.get_upcoming_meeting()
    serializer = MeetingSerializer(meeting, many=False)
    return Response(serializer.data, status=status.HTTP_200_OK)

@api_view(['GET'])
def get_club(request, club_id):
    club = Club.objects.get(id=club_id)
    serializer = ClubSerializer(club, many=False)
    return Response(serializer.data, status=status.HTTP_200_OK)



@api_view(['GET'])
@permission_classes([IsAuthenticated])
def get_user_upcoming_attending_meetings(request):
    meetings = request.user.get_attending_meetings()
    if not meetings:
        raise serializers.ValidationError(
            "You are currently not attending any meetings.")
    serializer = MeetingSerializer(meetings, many=True)
    return Response(serializer.data, status=status.HTTP_200_OK)


@api_view(['POST'])
@permission_classes([IsAuthenticated])
@club_exists
@is_in_club
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
@is_in_club
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
@is_in_club
@user_in_club
@is_owner
@user_is_banned
def unban_member(request, club_id, user_id):
    club = Club.objects.get(id=club_id)
    banned_user = User.objects.get(id=user_id)
    club.remove_user_from_club(banned_user)
    return Response(status=status.HTTP_200_OK)


@api_view(['GET'])
@permission_classes([IsAuthenticated])
@club_exists
@is_in_club
@is_owner
def banned_member_list(request, club_id):
    club = Club.objects.get(id=club_id)
    banned = club.get_banned_members()
    if len(banned) == 0:
        raise serializers.ValidationError("There are no banned members.")
    else:
        serializer = UserSerializer(banned, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)

@api_view(['PUT'])
@permission_classes([IsAuthenticated])
@user_exists
def toggle_follow(request, user_id):
    followee = User.objects.get(id=user_id)
    request.user.toggle_follow(followee)
    serializer = UserSerializer(followee, many=False) 
    return Response(serializer.data, status = status.HTTP_200_OK)

@api_view(['GET'])
@permission_classes([IsAuthenticated])
@user_exists
def get_followers(request, user_id):
    user = User.objects.get(id=user_id)
    followers = user.followers.all()
    serializer = UserSerializer(followers, many=True) 
    return Response(serializer.data, status = status.HTTP_200_OK)

@api_view(['GET'])
@permission_classes([IsAuthenticated])
@user_exists
def get_following(request,user_id):
    user = User.objects.get(id=user_id)
    following = user.followees.all()
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