from django.core.management.base import BaseCommand
from api.models import Genre, Movie
from django.db import IntegrityError
import pandas as pd

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
            )
            movie.genres.set(genres)
            movie_count+=1
        print('Movie seeding complete')
