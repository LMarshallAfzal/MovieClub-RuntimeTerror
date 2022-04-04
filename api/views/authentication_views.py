from rest_framework.decorators import api_view
from rest_framework.response import Response
from api.serializers import *
from api.models import *
from api.helpers import *
from django.contrib.auth import logout
from recommenders.user_movie.user_movie_recommender import train_movie_data_for_user, recommend_movies_for_user
from recommenders.meeting_movie.meeting_movie_recommender import train_movie_data_for_meeting, recommend_movies_for_meeting
from recommenders.user_club.club_recommender import recommend_clubs
from api.decorators import *
from django.views.decorators.csrf import ensure_csrf_cookie
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework_simplejwt.views import TokenObtainPairView

@api_view(["GET"])
@ensure_csrf_cookie
def csrf_token(request):
    return Response({"result": "Success (CSRF cookie set.)"})
    
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


