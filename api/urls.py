from django.urls import path
from . import views

urlpatterns = [
    path('', views.getRoutes),
    path('login/<str:pk>', views.login),
]