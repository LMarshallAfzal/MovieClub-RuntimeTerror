from django.urls import path
from . import views

urlpatterns = [
    path('csrf/', views.csrf_token, name = 'csrf_token'),
    path('sign_up/', views.sign_up, name = 'sign_up'),
    path('log_in/', views.login, name = 'log_in'),
    path("log_out/", views.log_out, name="log_out"),
    path("change_password/", views.change_password, name="change_password"),
    path('edit_profile/<str:username>', views.edit_profile, name = 'edit_profile'),
    path("users/", views.get_users, name = "users"),
    path("user/<str:username>/",views.get_user, name = "user"),
    path("clubs/",views.get_clubs, name = "clubs"),
    path("create_club/",views.create_club, name = "create_club"),
    path("add_rating/<int:movie_id>/",views.add_rating,name = "add_rating"),
    path("rec/",views.recommend_movie_user,name = "rec"),
    path("rec/clubs",views.recommend_club,name = "rec_clubs"),
    path("edit_rating/<int:movie_id>/",views.change_rating,name = "edit_rating"),
    path("memberships/<str:username>/", views.get_memberships_of_user, name = "get_memberships_of_user"),
    path("join_club/<int:club_id>/", views.join_club, name = "join_club"),
    path("leave_club/<int:club_id>/", views.leave_club, name = "leave_club"),
    path("add_watched_movie/<int:movie_id>/",views.add_watched_movie,name = "add_watched_movie"),
    path("remove_watched_movie/<int:movie_id>/",views.remove_watched_movie,name = "remove_watched_movie"),
    path("get_movie/<int:movie_id>/", views.get_movie, name = "get_movie"),
]
