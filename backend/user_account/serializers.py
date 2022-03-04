from rest_framework import serializers
from .models import UserAccount
from django.contrib.auth.models import User

class UserAccountSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserAccount
        fields = '__all__'
