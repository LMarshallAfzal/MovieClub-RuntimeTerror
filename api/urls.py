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
    path("club_members/<int:club_id>/", views.get_club_members, name = "club_members"),
    path("user/",views.get_current_user, name = "get_current_user"),
    path("user/<int:user_id>/",views.get_other_user, name = "get_other_user"),
    path("user_image/", views.get_user_image, name = "get_user_image"),
    path("clubs/",views.get_all_clubs, name = "get_all_clubs"),
    path("create_club/",views.create_club, name = "create_club"),
    path("edit_club/<int:club_id>/",views.edit_club, name = "edit_club"),
    path("delete_club/<int:club_id>/",views.delete_club, name = "delete_club"),
    path("remove_member/<int:club_id>/<int:user_id>/",views.remove_user_from_club, name = "remove_member"),
    path("create_meeting/<int:club_id>/",views.create_meeting, name = "create_meeting"),
    path("add_rating/<int:movie_id>/",views.add_rating,name = "add_rating"),
    path("get_rating/<int:movie_id>/",views.get_rating,name = "get_rating"),
    path("rec_movies/",views.recommend_movie_user,name = "rec"),
    path("rec_clubs/",views.recommend_club,name = "rec_clubs"),
    path("edit_rating/<int:movie_id>/",views.change_rating,name = "edit_rating"),
    path("memberships/<int:user_id>/", views.get_memberships_of_user, name = "get_memberships_of_user"),
    path("join_club/<int:club_id>/", views.join_club, name = "join_club"),
    path("leave_club/<int:club_id>/", views.leave_club, name = "leave_club"),
    path("club_owner/<int:club_id>/", views.get_club_owner, name = "get_club_owner"),
    path("add_watched_movie/<int:movie_id>/",views.add_watched_movie,name = "add_watched_movie"),
    path("remove_watched_movie/<int:movie_id>/",views.remove_watched_movie,name = "remove_watched_movie"),
    path("get_movie/<int:movie_id>/", views.get_movie, name = "get_movie"),
    path("watched_list/", views.get_watched_list, name = "get_watched_movies"),
    path("get_all_movies/", views.get_all_movies, name = "all_movies"),
    path("get_movie/<int:movie_id>/", views.get_specific_movie, name = "one_movie"),
    path("train/movie/", views.train_movie_data, name = "train"),
    path("train/meeting/", views.train_meeting_data, name = "train_meeting_data"),
    path("rec_meeting/<int:club_id>/", views.recommend_movie_meeting, name = "recommend_movie_meeting"),
    path("message_forum/<int:club_id>/", views.message_forum, name = "message_forum"),
    path("write_message/<int:club_id>/", views.write_message, name = "write_message"),
    path("ban_member/<int:club_id>/<int:user_id>/", views.ban_member,name = "ban_member"),
    path("unban_member/<int:club_id>/<int:user_id>/", views.unban_member,name = "unban_member"),
    path("banned_member_list/<int:club_id>/", views.banned_member_list,name = "banned_member_list"),
    path("edit_meeting/<int:club_id>/", views.edit_meeting,name = "edit_meeting"),
    path("attend_meeting/<int:club_id>/", views.attend_meeting,name = "attend_meeting"),
    path("leave_meeting/<int:club_id>/", views.leave_meeting,name = "leave_meeting"),
    path("cancel_meeting/<int:club_id>/", views.cancel_meeting,name = "cancel_meeting"),
    path("get_club_upcoming_meeting/<int:club_id>/", views.get_club_upcoming_meeting, name = "get_club_upcoming_meeting"),
    path("get_user_attending_meetings/", views.get_user_upcoming_attending_meetings, name = "get_user_attending_meetings"),
    path("toggle_follow/<int:user_id>/", views.toggle_follow, name = "toggle_follow"),
    path("followers/", views.get_followers, name = "get_followers"),
    path("following/",views.get_following, name="get_following"),
    path("toggle_notifications/<int:club_id>/", views.toggle_notifications, name = "toggle_notifications"),
]
