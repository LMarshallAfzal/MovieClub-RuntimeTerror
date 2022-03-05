from rest_framework.serializers import ModelSerializer 
from rest_framework.exceptions import NotAuthenticated
from rest_framework import serializers
from api.models import Club, User, Membership, Movie
from rest_framework.validators import UniqueValidator
from django.contrib.auth import authenticate, login
from django.core.validators import RegexValidator

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
    
    password = serializers.CharField(
        style={"input_type": "password"},
        write_only=True,
        validators=[RegexValidator(regex=r"^.*(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9]).*$")],
    )
    
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

class UpdateUserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('first_name', 'last_name','email', 'bio', 'preferences')
           
class LoginSerializer(serializers.Serializer):
    username = serializers.CharField(required=True)
    password = serializers.CharField(
        style={"input_type": "password"},
        write_only=True,
        validators=[RegexValidator(regex=r"^.*(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9]).*$")],
    )

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
            login(request=self.context["request"], user=user)
            return user

        else:
            msg = 'Must include username and password'
            raise serializers.ValidationError(msg, code='authorisation')

class ChangePasswordSerializer(serializers.Serializer):
    old_password = serializers.CharField(required=True, write_only=True)
    new_password = serializers.CharField(
        required=True,
        write_only=True,
        validators=[RegexValidator(regex=r"^.*(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9]).*$")],
    )
    password_confirmation = serializers.CharField(required=True, write_only=True)

    # @Override
    def validate(self, data):
        user = self.context["request"].user
        # Why extracting into two separate
        # methods mess up type(data)?
        # Validate old password
        if not user.check_password(data["old_password"]):
            raise serializers.ValidationError("The old password entered was invalid.")
        # Validate new password
        if data["new_password"] != data["password_confirmation"]:
            raise serializers.ValidationError(
                "Your password and confirmation password do not match."
            )
        return data

    # @Override
    def save(self, **kwargs):
        user = self.context["request"].user
        user.set_password(self.validated_data["new_password"])
        user.save()
        return user

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