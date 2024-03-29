from rest_framework.serializers import ModelSerializer
from rest_framework.exceptions import NotAuthenticated
from rest_framework import serializers
from api.models import *
from rest_framework.validators import UniqueValidator
from rest_framework.authtoken.models import Token
from django.contrib.auth import authenticate
from django.core.validators import RegexValidator
import datetime
from datetime import timedelta
from django.core.validators import MaxValueValidator, MinValueValidator, MaxLengthValidator


class UserSerializer(ModelSerializer):
    username = serializers.CharField(
        required=True,
        validators=[UniqueValidator(queryset=User.objects.all())]
    )

    first_name = serializers.CharField(
        required=True
    )

    last_name = serializers.CharField(
        required=True
    )

    email = serializers.EmailField(
        required=True,
        validators=[UniqueValidator(queryset=User.objects.all())]
    )

    bio = serializers.CharField(
        required=False, allow_blank=True
    )

    preferences = serializers.SlugRelatedField(
        many=True,
        slug_field='name',
        queryset=Genre.objects.all()
    )

    gravatar = serializers.CharField(
        required=False, allow_blank=True
    )

    class Meta:
        model = User
        fields = ['id', 'username', 'first_name', 'last_name', 'email',
                  'bio', 'preferences', 'gravatar']


class ClubSerializer(ModelSerializer):
    theme = serializers.SlugRelatedField(
        many=False,
        slug_field='name',
        queryset=Genre.objects.all()
    )

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


class WatchMovieSerializer(serializers.ModelSerializer):
    user = serializers.PrimaryKeyRelatedField(
        read_only=False, queryset=User.objects.all())
    movie = serializers.PrimaryKeyRelatedField(
        read_only=False, queryset=Movie.objects.all())

    class Meta:
        model = Watch
        fields = ['user', 'movie']


class MeetingSerializer(serializers.ModelSerializer):
    class Meta:
        model = Meeting
        fields = '__all__'


class SignUpSerializer(serializers.Serializer):
    username = serializers.CharField(
        required=True,
        validators=[UniqueValidator(queryset=User.objects.all())]
    )

    first_name = serializers.CharField(
        required=True
    )

    last_name = serializers.CharField(
        required=True
    )

    email = serializers.EmailField(
        required=True,
        validators=[UniqueValidator(queryset=User.objects.all())]
    )

    bio = serializers.CharField(
        required=False, allow_blank=True
    )

    preferences = serializers.SlugRelatedField(
        many=True,
        slug_field='name',
        queryset=Genre.objects.all()
    )

    password = serializers.CharField(
        style={"input_type": "password"},
        write_only=True,
        validators=[RegexValidator(
            regex=r"^.*(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9]).*$")],
    )

    password_confirmation = serializers.CharField(
        write_only=True, required=True)

    class Meta:
        model = User
        fields = ['id', 'username', 'first_name', 'last_name', 'email',
                  'bio', 'preferences', 'password', 'password_confirmation']

    def validate(self, data):
        if len(data['preferences']) == 0:
            raise serializers.ValidationError(
                {"preferences": "At least one genre must be selected"})
        if data['password'] != data['password_confirmation']:
            raise serializers.ValidationError(
                {"password": "Passwords don't match."})
        return data

    def create(self, validated_data):
        user = User.objects.create(
            username=validated_data['username'],
            first_name=validated_data['first_name'],
            last_name=validated_data['last_name'],
            email=validated_data['email'],
            bio=validated_data['bio'],
            # preferences=validated_data['preferences']
        )
        user.preferences.set(validated_data['preferences'])
        Token.objects.create(user=user)

        user.set_password(validated_data['password'])
        user.save()

        return user


class UpdateUserSerializer(serializers.ModelSerializer):

    username = serializers.CharField(
        required=True,
        validators=[UniqueValidator(queryset=User.objects.all())]
    )

    first_name = serializers.CharField(
        required=True
    )

    last_name = serializers.CharField(
        required=True
    )

    email = serializers.EmailField(
        required=True,
        validators=[UniqueValidator(queryset=User.objects.all())]
    )

    bio = serializers.CharField(
        required=False, allow_blank=True
    )

    preferences = serializers.SlugRelatedField(
        many=True,
        slug_field='name',
        queryset=Genre.objects.all()
    )

    class Meta:
        model = User
        fields = ['username', 'first_name', 'last_name',
                  'email', 'bio', 'preferences']

    def validate(self, data):
        if len(data['preferences']) == 0:
            raise serializers.ValidationError(
                {"preferences": "At least one genre must be selected"})
        return data


class LoginSerializer(serializers.Serializer):
    username = serializers.CharField(required=True)
    password = serializers.CharField(
        style={"input_type": "password"},
        write_only=True,
        validators=[RegexValidator(
            regex=r"^.*(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9]).*$")],
    )

    class Meta:
        model = User
        fields = ['id', 'username', 'password']

    def validate(self, data):
        username = data['username']
        password = data['password']
        user = authenticate(request=self.context.get(
            'request'), username=username, password=password)
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
        validators=[RegexValidator(
            regex=r"^.*(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9]).*$")],
    )
    new_password_confirmation = serializers.CharField(
        required=True, write_only=True)

    def validate(self, data):
        user = self.context["request"].user
        if not user.check_password(data["old_password"]):
            raise serializers.ValidationError(
                "The old password entered was invalid.")
        if data["new_password"] != data["new_password_confirmation"]:
            raise serializers.ValidationError(
                "Your password and confirmation password do not match."
            )
        return data

    def save(self, **kwargs):
        user = self.context["request"].user
        user.set_password(self.validated_data["new_password"])
        user.save()
        return user


class CreateClubSerializer(serializers.Serializer):
    club_name = serializers.CharField(
        required=True,
        validators=[UniqueValidator(
            queryset=Club.objects.all()), MaxLengthValidator(50)]
    )

    mission_statement = serializers.CharField(
        required=True,
        validators=[MaxLengthValidator(500)]
    )

    theme = serializers.SlugRelatedField(
        many=False,
        slug_field='name',
        queryset=Genre.objects.all()
    )

    class Meta:
        model = Club
        fields = '__all__'

    def create(self, validated_data):
        club = Club.objects.create(
            club_name=validated_data['club_name'],
            mission_statement=validated_data['mission_statement'],
            theme=validated_data['theme'],
        )
        club.save()

        return club


class UpdateClubSerializer(serializers.ModelSerializer):

    club_name = serializers.CharField(
        required=True,
        validators=[UniqueValidator(
            queryset=Club.objects.all()), MaxLengthValidator(50)]
    )

    mission_statement = serializers.CharField(
        required=True,
        validators=[MaxLengthValidator(500)]
    )

    theme = serializers.SlugRelatedField(
        many=False,
        slug_field='name',
        queryset=Genre.objects.all()
    )

    class Meta:
        model = Club
        fields = ['club_name', 'mission_statement', 'theme']


class CreateMeetingSerializer(serializers.Serializer):
    club = serializers.PrimaryKeyRelatedField(
        read_only=False,
        queryset=Club.objects.all()
    )

    movie = serializers.PrimaryKeyRelatedField(
        read_only=False,
        queryset=Movie.objects.all()
    )

    organiser = serializers.PrimaryKeyRelatedField(
        read_only=False,
        queryset=User.objects.all()
    )

    meeting_title = serializers.CharField(
        required=True,
        validators=[MaxLengthValidator(100)]
    )

    date = serializers.DateField(
        format="%d-%m-%Y",
        input_formats=['%d-%m-%Y', 'iso-8601']
    )
    start_time = serializers.TimeField(
        format="%H:%M",
        input_formats=["%H:%M", 'iso-8601'],
        required=True
    )

    end_time = serializers.TimeField(
        format="%H:%M",
        input_formats=["%H:%M", 'iso-8601'],
        required=True
    )

    description = serializers.CharField(
        required=True,
        validators=[MaxLengthValidator(500)]
    )

    meeting_link = serializers.CharField(
        required=True,
        validators=[MaxLengthValidator(500)]
    )

    def validate(self, data):
        meeting_date = data['date']
        start_time = data['start_time']
        end_time = data['end_time']
        link = data['meeting_link']

        if meeting_date < datetime.date.today():
            raise serializers.ValidationError(
                {"date": "Date must be in the future"})

        if (meeting_date - datetime.date.today()).days < 3:
            raise serializers.ValidationError(
                {"meeting_date": "Date must be at least 3 days in the future."})

        start_time_delta = timedelta(hours=int(start_time.strftime(
            "%H")), minutes=int(start_time.strftime("%M")))
        end_time_delta = timedelta(hours=int(end_time.strftime(
            "%H")), minutes=int(end_time.strftime("%M")))

        if start_time > end_time:
            raise serializers.ValidationError(
                {"start_time": "Start time must be before end time."})

        if (end_time_delta-start_time_delta).total_seconds() < 3600:
            raise serializers.ValidationError(
                {"duration": "Duration must be at least 1 hour."})

        if start_time == end_time:
            raise serializers.ValidationError({"end_time":
                                               "Start and End times cannot be the same."}
                                              )

        if not link.startswith("https://"):
            raise serializers.ValidationError(
                {"meeting_link": "Link must start with https://"})

        return data

    def create(self, validated_data):
        meeting = Meeting.objects.create(**validated_data)
        return meeting

    class Meta:
        model = Meeting
        fields = '__all__'


class UpdateMeetingSerializer(serializers.ModelSerializer):
    meeting_title = serializers.CharField(
        required=True,
        validators=[MaxLengthValidator(100)]
    )

    date = serializers.DateField(
        format="%d-%m-%Y",
        input_formats=['%d-%m-%Y', 'iso-8601']
    )
    start_time = serializers.TimeField(
        format="%H:%M",
        input_formats=["%H:%M", 'iso-8601'],
        required=True
    )

    end_time = serializers.TimeField(
        format="%H:%M",
        input_formats=["%H:%M", 'iso-8601'],
        required=True
    )

    description = serializers.CharField(
        required=True,
        validators=[MaxLengthValidator(500)]
    )

    meeting_link = serializers.CharField(
        required=True,
        validators=[MaxLengthValidator(500)]
    )

    def validate(self, data):
        meeting_date = data['date']
        start_time = data['start_time']
        end_time = data['end_time']
        link = data['meeting_link']

        if meeting_date < datetime.date.today():
            raise serializers.ValidationError(
                "No past date allowed.")

        if meeting_date == datetime.date.today():
            raise serializers.ValidationError(
                "Date must be in the future.")

        if (meeting_date - datetime.date.today()).days < 3:
            raise serializers.ValidationError(
                "Date must be minimum 3 days from now.")

        start_time_delta = timedelta(hours=int(start_time.strftime(
            "%H")), minutes=int(start_time.strftime("%M")))
        end_time_delta = timedelta(hours=int(end_time.strftime(
            "%H")), minutes=int(end_time.strftime("%M")))

        if start_time > end_time:
            raise serializers.ValidationError(
                "Start time should be before end time."
            )

        if (end_time_delta-start_time_delta).total_seconds() < 3600:
            raise serializers.ValidationError(
                "Meeting should be minimum 1 hour long.")

        if start_time == end_time:
            raise serializers.ValidationError(
                "Start and End times cannot be the same."
            )

        if not link.startswith("https://"):
            raise serializers.ValidationError(
                {"meeting_link": "Link must start with https://"})

        return data

    class Meta:
        model = Meeting
        fields = ['meeting_title', 'start_time', 'end_time',
                  'meeting_link', 'date', 'description']


class AddRatingSerializer(serializers.ModelSerializer):
    user = serializers.PrimaryKeyRelatedField(
        read_only=False, queryset=User.objects.all())

    movie = serializers.PrimaryKeyRelatedField(
        read_only=False, queryset=Movie.objects.all())

    score = serializers.FloatField(required=True, validators=[
                                   MinValueValidator(0.0), MaxValueValidator(5.0)])

    class Meta:
        fields = '__all__'
        model = Rating


class ChangeRatingSerializer(serializers.ModelSerializer):
    score = serializers.FloatField(required=True, validators=[
                                   MinValueValidator(0.0), MaxValueValidator(5.0)])

    class Meta:
        model = Rating
        fields = '__all__'


class MessageSerializer(serializers.ModelSerializer):
    class Meta:
        model = Message
        fields = ['sender', 'club', 'message', 'timestamp', 'sender_gravatar']


class WriteMessageSerializer(serializers.ModelSerializer):
    sender = serializers.SlugRelatedField(
        many=False,
        slug_field='username',
        queryset=User.objects.all()
    )
    club = serializers.SlugRelatedField(
        many=False,
        queryset=Club.objects.all(),
        slug_field='id'
    )
    message = serializers.CharField(
        required=True, allow_blank=False
    )

    sender_gravatar = serializers.CharField(required=False, allow_blank=True)

    class Meta:
        model = Message
        fields = ['sender', 'club', 'message', 'timestamp', 'sender_gravatar']

    def create(self, validated_data):
        message = Message.objects.create(**validated_data)
        user = User.objects.get(username=validated_data['sender'])
        message.sender_gravatar = user.gravatar()
        message.save()
        return message
