from rest_framework.serializers import ModelSerializer,Serializer
from rest_framework.exceptions import NotAuthenticated
from .models import Membership, Movie, User, Club

class UserSerializer(ModelSerializer):
    class Meta:
        model = User
        fields = '__all__'

class LoginSerializer(ModelSerializer):
    class Meta:
        model = User
        fields = ['username', 'password']
        extra_kwargs = {
            'password': {'write_only': True}
        }

    def validate(self,data):
        username = data.get('username',None)
        password = data.get('password',None)
        if User.objects.filter(username=username).filter(password=password).first():
            return True
        return NotAuthenticated

class ClubSerializer(ModelSerializer):
    class Meta:
        model = Club
        fields = '__all__'

class MovieSerializer(ModelSerializer):
    class Meta:
        model = Movie
        fields = '__all__'

class MembershipSerializer(ModelSerializer):
    class Meta:
        model = Membership
        fields = '__all__'