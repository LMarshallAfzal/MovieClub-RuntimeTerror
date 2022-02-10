from django.contrib import admin
from .models import User

@admin.register(User)
class UserAdmin(admin.ModelAdmin):
    '''Configuration of the administrative interface for users'''
    list_display = [
        'id', 'username', 'first_name', 'last_name'
    ]

