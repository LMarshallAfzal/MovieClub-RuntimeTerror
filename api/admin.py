from django.contrib import admin

from api.models import User


@admin.register(User)
class UserAdmin(admin.ModelAdmin):
    users = User.objects.all()
