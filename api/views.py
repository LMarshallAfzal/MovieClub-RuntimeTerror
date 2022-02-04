from rest_framework.decorators import api_view
from rest_framework.response import Response
from .serializers import *
from .models import *
from api import serializers

@api_view(['GET'])
def getRoutes(request):
    routes = [
        {
            'Endpoint': 'login/id',
            'username': None,
            'description': 'Return login details'
        }
    ]
    return Response(routes)

@api_view(['GET'])
def login(request, pk):
    user = User.objects.get(id=pk)
    serializer = UserSerializer(user, many=False)
    return Response(serializer.data)



