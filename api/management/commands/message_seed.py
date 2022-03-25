from django.core.management.base import BaseCommand
from api.models import User,Club,Message
from django.db import IntegrityError
from recommender.data import Data
from csv import writer
import random

class Command(BaseCommand):
    def __init__(self):
        super().__init__()

    def handle(self, *args, **options):
        club = Club.objects.get(id=2)
        club_members = club.club_members.all()
        for member in club_members:
                Message.objects.create(sender=member, club =club,message = "Hello mate")
                Message.objects.create(sender=member, club =club,message = "Hello mate 2")
