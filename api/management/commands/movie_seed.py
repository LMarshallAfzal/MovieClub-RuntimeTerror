from django.core.management.base import BaseCommand
from api.models import Genre, Movie
from django.db import IntegrityError
import pandas as pd
import csv
from csv import writer

def get_genre_id(genre_name):
    try:
        return Genre.objects.get(name=genre_name).id
    except Genre.DoesNotExist:
        new_genre = Genre.objects.create(name=genre_name)
        return new_genre.id

class Command(BaseCommand):
    
    def __init__(self):
        super().__init__()

    def handle(self, *args, **options):
        file = pd.read_csv("recommender/dataset-latest/movies.csv",encoding='latin-1')
        movie_count = 0
        for index,row in file.iterrows():
            print(f'Seeding movie {movie_count}',  end='\r')

            genres = [get_genre_id(genre) for genre in row['genres'].split('|')]
            
            movie = Movie.objects.create(
                ml_id = int(row['movieId']),
                title = row['title'],
                year = int(row['year'])
                cover_link = self.get_db_movie_cover_links(int(row['movieId']))
            )
            movie.genres.set(genres)
            movie_count+=1
        print('Movie seeding complete')

    def get_db_movie_cover_links(self,ml_id):
        file = pd.read_csv("recommender/dataset-latest/movie_covers_links.csv",encoding='latin-1')
        for index,row in file.iterrows():
            if int(row['movieId']) == ml_id:
                return row['cover_link']

