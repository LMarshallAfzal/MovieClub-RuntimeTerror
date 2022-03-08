from django.urls import path
from . import views

urlpatterns = [
    path('', views.getRoutes),
    path('sign_up/', views.signUp, name = 'sign_up'),
    path('log_in/', views.login, name = 'log_in'),
    path("log_out/", views.log_out, name="log_out"),
    path("change_password/", views.change_password, name="change_password"),
    path('edit_profile/<str:username>', views.edit_profile, name = 'edit_profile'),
    path("users/", views.get_users, name = "users"),
    path("user/<str:username>/",views.get_user, name = "user"),
    path("clubs/",views.get_clubs, name = "clubs"),
    path("create_club/",views.create_club, name = "create_club"),
    path("add_rating/<int:movieID>/",views.add_rating,name = "add_rating"),
    path("rec/",views.recommend_movie_user,name = "rec"),
    path("edit_rating/<int:movieID>/",views.change_rating,name = "edit_rating"),
]
