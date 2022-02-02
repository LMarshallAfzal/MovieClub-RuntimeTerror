from rest_framework.serializers import ModelSerializer
from .models import Movie, User, Club

class UserSerializer(ModelSerializer):
    class Meta:
        model = User
        fields = '__all__'

class ClubSerializer(ModelSerializer):
    class Meta:
        model = Club
        fields = '__all__'

class MovieSerializer(ModelSerializer):
    class Meta:
        model = Movie
        fields = '__all__'