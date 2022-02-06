from django.urls import path
from . import views

urlpatterns = [
    path('', views.getRoutes),
    path('sign_up/',views.signUp, name = 'sign_up'),
]     
