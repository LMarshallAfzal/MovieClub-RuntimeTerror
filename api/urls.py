from django.urls import path
from . import views

urlpatterns = [
    path('', views.getRoutes),
    path('sign_up/', views.signUp, name = 'sign_up'),
    path('log_in/', views.login, name = 'log_in'),
    path("log_out/", views.log_out, name="log_out"),
]
