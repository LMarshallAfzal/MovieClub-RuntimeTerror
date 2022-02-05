from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from .serializers import *
from .models import *

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
    data = {}
    serializer = SignUpSerializer(data=request.data)
    if serializer.is_valid():
        print('false')
        user = serializer.save()
        data['response'] = "successfully signed up"
        data['email'] = user.email
        data['username'] = user.username
        data['first_name'] = user.first_name
        data['last_name'] = user.last_name
        data['bio'] = user.bio
        data['preferences'] = user.preferences
        return Response(SignUpSerializer(instance=user).data, status=status.HTTP_201_CREATED)
    else:
        data = serializer.errors
        return Response(data, status=status.HTTP_400_BAD_REQUEST)

