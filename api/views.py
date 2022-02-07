from django.contrib.auth import logout
from django.shortcuts import render
from rest_framework import status
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response

from api.serializers import LogInSerializer, UserSerializer


@api_view(["POST"])
def sign_up(request):
    # NotImplementedError: `request.DATA` has been deprecated!
    serializer = UserSerializer(data=request.data)
    # Should we hide logic
    # inside a serializer?
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    else:
        return Response(serializer._errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(["POST"])
def log_in(request):
    serializer = LogInSerializer(data=request.data)
    if serializer.is_valid():
        return Response(serializer.data, status=status.HTTP_200_OK)
    else:
        return Response(serializer._errors, status=status.HTTP_401_UNAUTHORIZED)


@api_view(["GET"])
@permission_classes([IsAuthenticated])
def log_out(request):
    if request.user.is_authenticated:
        logout(request)
        return Response(status=status.HTTP_200_OK)
    else:
        return Response(status=status.HTTP_403_FORBIDDEN)
