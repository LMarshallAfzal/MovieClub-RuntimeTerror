from rest_framework.serializers import ModelSerializer 
from rest_framework.exceptions import NotAuthenticated
from rest_framework import serializers
from api.models import Club, User, Membership, Movie, Rating, Meeting
from rest_framework.validators import UniqueValidator
from rest_framework.authtoken.models import Token
from django.contrib.auth import authenticate
from django.core.validators import RegexValidator
from django.core.validators import MaxValueValidator, MinValueValidator, MaxLengthValidator

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

class MembershipSerializer(ModelSerializer):
    class Meta:
        model = Membership
        fields = '__all__'

class RatingSerializer(ModelSerializer):
    class Meta:
        model = Rating
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
        fields = ['id', 'username', 'first_name', 'last_name', 'email', 'bio', 'preferences', 'password', 'password_confirmation']

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
        Token.objects.create(user=user)

        user.set_password(validated_data['password'])
        user.save()

        return user


class UpdateUserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('username', 'first_name', 'last_name','email', 'bio', 'preferences')
           
class LoginSerializer(serializers.Serializer):
    username = serializers.CharField(required=True)
    password = serializers.CharField(
        style={"input_type": "password"},
        write_only=True,
        validators=[RegexValidator(regex=r"^.*(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9]).*$")],
    )

    class Meta:
        model = User
        fields = ['id', 'username', 'password']
    
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

class ChangePasswordSerializer(serializers.Serializer):
    old_password = serializers.CharField(required=True, write_only=True)
    new_password = serializers.CharField(
        required=True,
        write_only=True,
        validators=[RegexValidator(regex=r"^.*(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9]).*$")],
    )
    new_password_confirmation = serializers.CharField(required=True, write_only=True)

    # @Override
    def validate(self, data):
        user = self.context["request"].user
        # Why extracting into two separate
        # methods mess up type(data)?
        # Validate old password
        if not user.check_password(data["old_password"]):
            raise serializers.ValidationError("The old password entered was invalid.")
        # Validate new password
        if data["new_password"] != data["new_password_confirmation"]:
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

class CreateClubSerializer(serializers.Serializer):
    club_name = serializers.CharField(
        required = True,
        validators = [MaxLengthValidator(50)]
    )

    mission_statement = serializers.CharField(
        required = False,
        validators = [MaxLengthValidator(500)]
    )

    def create(self, validated_data):
        club = Club.objects.create(**validated_data)
        return club
    
    class Meta:
        model = Club
        fields = '__all__'

class CreateMeetingSerializer(serializers.Serializer):
    # Based on the AddRatingSerializer below
    club = serializers.PrimaryKeyRelatedField(
        read_only=False,
        queryset=Club.objects.all()
    )
    
    movie = serializers.PrimaryKeyRelatedField(
        read_only=False,
        queryset=Movie.objects.all()
    )

    organizer = serializers.PrimaryKeyRelatedField(
        read_only=False,
        queryset=User.objects.all()
    )

    start_time = serializers.DateTimeField(
        format="%Y-%m-%d %H:%M:%S",
        required = True
    )

    end_time = serializers.DateTimeField(
        format="%Y-%m-%d %H:%M:%S",
        required = True
    )

    description = serializers.CharField(
        required = True,
        validators = [MaxLengthValidator(500)]
    )

    meeting_link = serializers.CharField(
        required = False,
        validators = [MaxLengthValidator(500)]
    )

    def create(self, validated_data):
        meeting = Meeting.objects.create(**validated_data)
        return meeting
    
    class Meta:
        model = Meeting
        fields = '__all__'


class AddRatingSerializer(serializers.ModelSerializer):
    user = serializers.PrimaryKeyRelatedField(read_only=False,queryset=User.objects.all())
    movie = serializers.PrimaryKeyRelatedField(read_only=False,queryset=Movie.objects.all())
    score = serializers.FloatField(required = True,write_only=True,validators=[MinValueValidator(0.0), MaxValueValidator(5.0)])
    
    class Meta:
        model = Rating
        fields = ['user','movie','score']

class ChangeRatingSerializer(serializers.ModelSerializer):
    score = serializers.FloatField(required = True,write_only=True,validators=[MinValueValidator(0.0), MaxValueValidator(5.0)])
    class Meta:
        model = Rating
        fields = ['score']
   
    