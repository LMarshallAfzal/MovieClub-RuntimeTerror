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
    email = serializers.CharField(
        required = True,
        validators = [UniqueValidator(queryset=User.objects.all())]
    )
    password = serializers.CharField(write_only = True,required = True,validators=[validate_password])
    password_confirmation = serializers.CharField(write_only = True,required = True)

    class Meta:
        model = User
        fields = ['username', 'first_name', 'last_name', 'email', 'bio', 'preferences', 'password', 'password_confirmation']
        extra_kwargs = {
            'first_name': {'required': True},
            'last_name': {'required': True},
            'preferences': {'required': True}
        }
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

    # password_confirmation = serializers.CharField(style={'input_type': 'password'}, write_only=True)

    # class Meta:
    #     model = User
    #     fields = ['username', 'first_name', 'last_name', 'email', 'bio', 'preferences', 'password', 'password_confirmation']
    #     extra_kwargs = {
    #         'password': {'write_only': True}
    #     }

    # def validate(self,data):
    #     user = User(
    #         username = self.validated_data['username'],
    #         first_name = self.validated_data['first_name'],
    #         last_name = self.validated_data['last_name'],
    #         email = self.validated_data['email'],
    #         bio = self.validated_data['bio'],
    #         preferences = self.validated_data['preferences']
    #     )
    #     password = self.validated_data['password']
    #     password_confirmation = self.validated_data['password_confirmation']

    #     if password != password_confirmation:
    #         raise serializers.ValidationError({'password': 'Password fields must match'})
    #     user.set_password(password)
    #     user.save()
    #     return user

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