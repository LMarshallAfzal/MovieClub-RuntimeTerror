from django.contrib import admin
from .models import User,Club,Movie,Rating

@admin.register(User)
class UserAdmin(admin.ModelAdmin):
    '''Configuration of the administrative interface for users'''
    list_display = [
        'id', 'username', 'first_name', 'last_name'
    ]

@admin.register(Club)
class ClubAdmin(admin.ModelAdmin):
    '''Configuration of the administrative interface for clubs'''
    list_display = [
        'id', 'club_name', 'mission_statement'
    ]

@admin.register(Movie)
class MovieAdmin(admin.ModelAdmin):
    '''Configuration of the administrative interface for movies'''
    list_display = [
        'id','movieID','title','genres','year'
    ]


@admin.register(Rating)
class RatingAdmin(admin.ModelAdmin):
    '''Configuration of the administrative interface for ratings'''
    list_display = [
        'id','user','movie','score'
    ]

