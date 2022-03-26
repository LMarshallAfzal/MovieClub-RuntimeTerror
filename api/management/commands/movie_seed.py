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
                title = row['title'],
                genres = row['genres'].replace('|',','),
                year = int(row['year']),
                cover_link = self.get_db_movie_cover_links(int(row['movieId']))
            )
            movie_count+=1
        print('Movie seeding complete')

    def get_db_movie_cover_links(self,ml_id):
        file = pd.read_csv("recommender/dataset-latest/movie_covers_links.csv",encoding='latin-1')
        for index,row in file.iterrows():
            if int(row['movieId']) == ml_id:
                return row['cover_link']

