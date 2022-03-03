from rest_framework.views import APIView
from rest_framework.response import Response
from .models import UserAccount
from .serializers import UserAccountSerializer
from rest_framework.decorators import api_view, permission_classes, authentication_classes

class GetUserAccountView(APIView):
    def get(self, request, format=None):
        user = self.request.user
        username = user.username

        user_account = UserAccount.objects.get(user=user)
        user_account = UserAccountSerializer(user_account)

        return Response({'account':user_account.data, 'username': str(username)})
