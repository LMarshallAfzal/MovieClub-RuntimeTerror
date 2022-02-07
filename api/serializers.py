
from typing import overload
from rest_framework.serializers import ModelSerializer 
from rest_framework.exceptions import NotAuthenticated
from rest_framework import serializers
from api.models import Club, User, Membership, Movie
from rest_framework.validators import UniqueValidator
from django.contrib.auth.password_validation import validate_password
from django.contrib.auth import authenticate

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

    email = serializers.EmailField(
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

# class EditProfileSerializer(serializers.Serializer):
#     first_name = serializers.CharField(
#         required = True
#     )

#     last_name = serializers.CharField(
#         required = True
#     )

#     email = serializers.EmailField(
#         required = True,
#         validators = [UniqueValidator(queryset=User.objects.all())]
#     )

#     bio = serializers.CharField(
#         required = True
#     )

#     preferences = serializers.CharField(
#         required = True
#     )

#     class Meta:
#         model = User
#         fields = ['first_name', 'last_name','email', 'bio', 'preferences']

#     def create(self, data):
#         return User(**data)    
    
#     def update(self, user, validated_data):
#         print(validated_data)
#         # user.first_name = validated_data['first_name']
#         # user.last_name = validated_data['last_name']
#         # user.email = validated_data['email']
#         # user.bio = validated_data['bio']
#         # user.preferences = validated_data['preferences']
#         # user.save()
#         return user    


#     # def save(self):
#     #     first_name = self.validated_data['first_name']
#     #     last_name = self.validated_data['last_name']
#     #     email = self.validated_data['email']
#     #     bio = self.validated_data['bio']
#     #     preferences = self.validated_data['preferences']

class UpdateUserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('first_name', 'last_name','email', 'bio', 'preferences')
           




class LoginSerializer(serializers.Serializer):
    username = serializers.CharField(required=True)
    password = serializers.CharField(write_only = True ,required = True,validators=[validate_password])

    class Meta:
        model = User
        fields = ['username', 'password']
    
    def validate(self,data):
        username = data['username']
        password = data['password']
        user = authenticate(request=self.context.get('request'), username=username, password=password)
        if not user:
            msg = 'Unable to login'
            raise serializers.ValidationError(msg, code='authorisation')

        elif User.objects.filter(username=user.username).filter(password=user.password):
            return user

        else:
            msg = 'Must include username and password'
            raise serializers.ValidationError(msg, code='authorisation')
            
        
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