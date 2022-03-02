from django.urls import path
from .views import GetUserAccountView

urlpatterns = [
    path('user', GetUserAccountView.as_view())
]
