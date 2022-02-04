from rest_framework.decorators import api_view
from rest_framework.response import Response
from .serializers import *
from .models import *
from api import serializers

@api_view(['GET'])
def getRoutes(request):
    routes = [
        {
            'Endpoint': '/feed/',
            'method': 'GET',
            'description': 'Returns an array of notes'
        }

    ]



