from django.core.management.base import BaseCommand
from api.models import User,Rating,Movie
from django.db import IntegrityError
from faker import Faker
import random

class Command(BaseCommand):
    def __init__(self):
        super().__init__()
        self.faker = Faker('en_GB')

    def handle(self, *args, **options):
        i = 0
        user = User.objects.get(id = 100)
        movie_id=[52319, 131013, 5349, 6502, 73881, 145]
        while i < 6:
            movie = Movie.objects.get(movieID = movie_id[i])
            Rating.objects.create(user = user,movie = movie, rating = 5.0)
            i += 1

        
        