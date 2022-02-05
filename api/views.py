from rest_framework.decorators import api_view
from rest_framework.response import Response
from .serializers import *
from .models import *

@api_view(['GET'])
def getRoutes(request):
    routes = [
        {
            'Endpoint': '/login/',
            'method': 'POST',
            'username': {'username': ""},
            'password': {'password': ""},
            'description': 'Return login details'
        }
    ]
    return Response(routes)

@api_view(['POST'])
def login(request):
    serializer = LoginSerializer(data=request.data)
    data = {}
    if serializer.is_valid():
        data['response'] = 'User login successful'
    else:
        data['response'] = 'You have entered an invalid username or password'
    return Response(data)
