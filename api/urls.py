from django.urls import path
from . import views
from .views import MyTokenObtainPairView

from rest_framework_simplejwt.views import (
    TokenRefreshView,
)


urlpatterns = [
    path('csrf/', views.csrf_token, name = 'csrf_token'),
    path('token/', MyTokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('sign_up/', views.sign_up, name = 'sign_up'),
    path('log_in/', views.login, name = 'log_in'),
    path("log_out/", views.log_out, name="log_out"),
    path("change_password/", views.change_password, name="change_password"),
    path('edit_profile/<int:user_id>', views.edit_profile, name = 'edit_profile'),
    path("users/", views.get_users, name = "users"),
    path("clubs/",views.get_clubs, name = "clubs"),
    path("club_members/<int:club_id>/", views.get_club_members, name = "club_members"),
    path("user/",views.get_current_user, name = "get_current_user"),
    path("user/<int:user_id>/",views.get_other_user, name = "get_other_user"),
    path("clubs/",views.get_clubs, name = "get_clubs"),
    path("create_club/",views.create_club, name = "create_club"),
    path("create_meeting/<int:club_id>/",views.create_meeting, name = "create_meeting"),
    path("add_rating/<int:movie_id>/",views.add_rating,name = "add_rating"),
    path("rec/",views.recommend_movie_user,name = "rec"),
    path("rec/clubs",views.recommend_club,name = "rec_clubs"),
    path("edit_rating/<int:movie_id>/",views.change_rating,name = "edit_rating"),
    path("memberships/<int:user_id>/", views.get_memberships_of_user, name = "get_memberships_of_user"),
    path("join_club/<int:club_id>/", views.join_club, name = "join_club"),
    path("leave_club/<int:club_id>/", views.leave_club, name = "leave_club"),
    path("add_watched_movie/<int:movie_id>/",views.add_watched_movie,name = "add_watched_movie"),
    path("remove_watched_movie/<int:movie_id>/",views.remove_watched_movie,name = "remove_watched_movie"),
    path("get_movie/<int:movie_id>/", views.get_movie, name = "get_movie"),
    path("watched_list/", views.get_watched_list, name = "get_watched_movies"),

    
]
