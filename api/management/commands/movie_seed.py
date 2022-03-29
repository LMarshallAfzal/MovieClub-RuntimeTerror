from django.core.management.base import BaseCommand
from api.models import Movie
from django.db import IntegrityError
import pandas as pd
import csv
from csv import writer


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
                imdb_id = int(row['imdbId']),
                title = row['title'],
                genres = str(row['genres']).replace('|',','),
                year = int(row['year'])
                
            )
            movie_count+=1
        print('Movie seeding complete')
        print(f'Seeded {movie_count} movies')