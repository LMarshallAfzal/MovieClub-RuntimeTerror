from django.db import models
from django.contrib.auth.models import User


class UserAccount(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)

    username = models.CharField(
        max_length=255,
        default=''
        #         max_length=15,
        #         unique=True,
        #         blank=False
    )

    first_name = models.CharField(
        max_length=255,
        default=''
        #         max_length=30,
        #         blank=False,
        #         unique=False
    )

    last_name = models.CharField(
        max_length=255,
        default=''
        #         max_length=30,
        #         blank=False,
        #         unique=False
    )

    email = models.EmailField(
        max_length=255,
        default=''
        #         unique=True,
        #         blank=False
    )

    bio = models.CharField(
        max_length=255,
        default=''
        #         max_length=520,
        #         unique=False,
        #         blank=True
    )

    preferences = models.CharField(
        max_length=255,
        default=''
        #         max_length=100,
        #         blank=False,
        #         unique=False
    )

    def __str__(self):
        return self.first_name
