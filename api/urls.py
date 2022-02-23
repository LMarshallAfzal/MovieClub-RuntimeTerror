from django.urls import path
from . import views

urlpatterns = [
    path('', views.getRoutes),
    path('sign_up/', views.signUp, name = 'sign_up'),
    path('log_in/', views.login, name = 'log_in'),
    path("log_out/", views.log_out, name="log_out"),
    path("change_password/", views.change_password, name="change_password"),
    path('edit_profile/<int:pk>/', views.editProfile, name = 'edit_profile'),
    path("users/", views.get_users, name = "users"),
    path("user/<int:pk>/",views.get_user, name = "user"),
    path("add_rating/<int:movieID>/",views.addRating,name = "add_rating"),
    path("rec/", views.recommend, name = "rec"),
]
