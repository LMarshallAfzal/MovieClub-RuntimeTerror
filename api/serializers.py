
from rest_framework.serializers import ModelSerializer,Serializer
from rest_framework.exceptions import NotAuthenticated
from rest_framework import serializers
from rest_framework.serializers import ModelSerializer
from .models import *
from rest_framework.validators import UniqueValidator
from django.contrib.auth.password_validation import validate_password


class UserSerializer(ModelSerializer):
    class Meta:
        model = User
        fields = '__all__'

class SignUpSerializer(serializers.Serializer):
    username = serializers.CharField(
        required = True,
        validators = [UniqueValidator(queryset=User.objects.all())]
    )

    first_name = serializers.CharField(
        required = True
    )

    last_name = serializers.CharField(
        required = True
    )

    email = serializers.CharField(
        required = True,
        validators = [UniqueValidator(queryset=User.objects.all())]
    )

    bio = serializers.CharField(
        required = False
    )

    preferences = serializers.CharField(
        required = True
    )
    
    password = serializers.CharField(write_only = True,required = True,validators=[validate_password])
    password_confirmation = serializers.CharField(write_only = True,required = True)

    class Meta:
        model = User
        fields = ['username', 'first_name', 'last_name', 'email', 'bio', 'preferences', 'password', 'password_confirmation']
        # extra_kwargs = {
        #     'first_name': {'required': True},
        #     'last_name': {'required': True},
        #     'preferences': {'required': True}
        # }
    def validate(self,data):
        if data['password'] != data['password_confirmation']:
            raise serializers.ValidationError({"password": "Passwords don't match."})
        return data
    
    def create(self,validated_data):
        user = User.objects.create(
            username = validated_data['username'],
            first_name = validated_data['first_name'],
            last_name = validated_data['last_name'],
            email = validated_data['email'],
            bio = validated_data['bio'],
            preferences = validated_data['preferences']
        )

        user.set_password(validated_data['password'])
        user.save()

        return user

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