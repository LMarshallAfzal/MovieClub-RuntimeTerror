from django.core.management.base import BaseCommand
from api.models import User,Club,Rating,Movie
from django.db import IntegrityError
from csv import writer
import random

class Command(BaseCommand):
    def __init__(self):
        super().__init__()

    def handle(self, *args, **options):
        movies = Movie.objects.all()
        for club in Club.objects.all():
            for member in club.club_members.all():
                Rating.objects.create(user=member, movie = random.choice(movies),score = random.randint(1,5))




    

        
        