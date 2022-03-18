from django.core.management.base import BaseCommand
from api.models import Movie
from django.db import IntegrityError
import pandas as pd


class Command(BaseCommand):
    
    def __init__(self):
        super().__init__()

    def handle(self, *args, **options):
        file = pd.read_csv("recommender/dataset-latest/movies.csv",encoding='latin-1')
        movie_count = 0
        for index,row in file.iterrows():
            print(f'Seeding movie {movie_count}',  end='\r')
            Movie.objects.create(
                ml_id = int(row['movieId']),
                title = row['title'],
                genres = row['genres'],
                year = int(row['year'])
            )
            movie_count+=1
        print('Movie seeding complete')
