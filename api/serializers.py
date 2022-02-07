from django.contrib.auth import authenticate
from django.core.validators import RegexValidator
from rest_framework import serializers

from api.models import Club, Membership, Movie, User


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = [
            "username",
            "first_name",
            "last_name",
            "email",
            "bio",
            "preferences",
            "password",
            "password_confirmation",
        ]
        # Ensure passwords are not displayed
        extra_kwargs = {"password": {"write_only": True}}

    password = serializers.CharField(
        style={"input_type": "password"},
        write_only=True,
        validators=[RegexValidator(regex=r"^.*(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9]).*$")],
    )

    # Why is this needed? -- ImproperlyConfigured:
    # Field name `password_confirmation`
    # is not valid for model `User`!
    password_confirmation = serializers.CharField(
        style={"input_type": "password"}, write_only=True
    )

    # @Override
    def validate(self, data):
        if data["password"] != data["password_confirmation"]:
            raise serializers.ValidationError(
                "Your password and confirmation password do not match."
            )
        return data

    # @Override
    def create(self, validated_data):
        # Should I wrap this inside try/catch?
        # Why User() instead of User.objects.create() ?
        user = User(
            username=validated_data["username"],
            first_name=validated_data["first_name"],
            last_name=validated_data["last_name"],
            email=validated_data["email"],
            bio=validated_data["bio"],
            preferences=validated_data["preferences"],
        )
        # Ensure passwords are not stored in text
        user.set_password(validated_data["password"])
        user.save()
        return user


# Why serializers.Serializer must be used
# instead of serializers.ModelSerializer?
class LogInSerializer(serializers.Serializer):
    # Why is class Meta no longer useable?
    username = serializers.CharField(required=True)
    password = serializers.CharField(required=True, write_only=True)

    # @Override
    def validate(self, data):
        # This returns a User object
        # if the credentials are valid
        user = authenticate(
            username=data["username"],
            password=data["password"],
        )
        if user is None:
            raise serializers.ValidationError("The credentials provided are invalid.")
        # Decide what we wish to return here?
        # return data
        # return user
        # or perhaps a token?
        return {"username": user.username, "password": user.password}


class ClubSerializer(serializers.ModelSerializer):
    class Meta:
        model = Club
        fields = "__all__"


class MovieSerializer(serializers.ModelSerializer):
    class Meta:
        model = Movie
        fields = "__all__"


class MembershipSerializer(serializers.ModelSerializer):
    class Meta:
        model = Membership
        fields = "__all__"