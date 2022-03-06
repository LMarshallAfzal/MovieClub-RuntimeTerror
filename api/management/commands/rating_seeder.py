from django.core.management.base import BaseCommand
from api.models import User,Rating,Movie
from django.db import IntegrityError
from recommender.data import Data
from csv import writer
import random

class Command(BaseCommand):
    def __init__(self):
        super().__init__()

    def handle(self, *args, **options):
        i = 0
        user = User.objects.get(id = 100)
        movie_id=[52319, 131013, 5349, 6502, 73881, 145]
        while i < 6:
            movie = Movie.objects.get(movieID = movie_id[i])
            score = 5.0
            rating = Rating.objects.create(user = user,movie = movie, rating = score)
            Data().add_rating(rating)
            
            i += 1

        
        