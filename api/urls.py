from django.urls import path
from . import views

urlpatterns = [
    path('', views.getRoutes),
    path('sign_up/', views.login, name = 'sign_up'),
    path('log_in/', views.login, name = 'login'),
]
