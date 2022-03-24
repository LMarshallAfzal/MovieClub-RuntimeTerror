from django.contrib import admin
from .models import *

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
        'id', 'club_name', 'mission_statement', 'theme',
    ]

@admin.register(Membership)
class MembershipAdmin(admin.ModelAdmin):
    '''Configuration of the administrative interface for memberships'''
    list_display = [
        'id', 'user', 'club', 'role',
    ]   
    
@admin.register(Movie)
class MovieAdmin(admin.ModelAdmin):
    '''Configuration of the administrative interface for movies'''
    list_display = [
        'id','ml_id','title','genres','year'
    ]

@admin.register(Rating)
class RatingAdmin(admin.ModelAdmin):
    '''Configuration of the administrative interface for ratings'''
    list_display = [
        'id','user','movie','score'
    ]

@admin.register(Meeting)
class MeetingAdmin(admin.ModelAdmin):
    '''Configuration of the administrative interface for meetings'''
    list_display = [
        'id','organiser','movie','meeting_title','date','description','start_time','end_time','completed']

@admin.register(Message)
class MessageAdmin(admin.ModelAdmin):
    '''Configuration of the administrative interface for messages'''
    list_display = [
        'id','sender','message'





