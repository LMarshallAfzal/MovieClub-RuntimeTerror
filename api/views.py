from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from .serializers import *
from .models import *
from api import serializers

@api_view(['GET'])
def getRoutes(request):
    routes = [
        {
            'Endpoint': '/signup/',
            'method': 'POST',
            'username': {'username,' ""},
            'first_name': {'first_name': ""},
            'last_name': {'last_name': ""},
            'email': {'email': ""},
            'bio': {'bio': ""},
            'description': 'Creates a user with data sent into POST request'
        }
    ]
    return Response(routes)

@api_view(['POST'])
def signUp(request):
    serializer = SignUpSerializer(data=request.data)
    data = {}
    if serializer.is_valid():
        user = serializer.save()
        data['response'] = "successfully signed up"
        data['email'] = user.email
        data['username'] = user.username
    else:
        data = serializer.errors
    return Response(data)

