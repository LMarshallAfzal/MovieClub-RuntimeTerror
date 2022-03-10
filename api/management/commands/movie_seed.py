from django.core.management.base import BaseCommand
from api.models import Movie, Topic
from django.db import IntegrityError
import pandas as pd


class Command(BaseCommand):
    
    def __init__(self):
        super().__init__()

    def handle(self, *args, **options):
        file = pd.read_csv("dataset/movies.csv",encoding='latin-1')
        movie_count = 0
        for index,row in file.iterrows():
            print(f'Seeding movie {movie_count}',  end='\r')
            Movie.objects.create(
                movieID = int(row['movieId']),
                title = row['title'],
                genres = row['genres'],
                year = int(row['year'])
            )

            for genre in row['genres'].split('|'):
                try:
                    Topic.objects.create(
                        name = genre.lower()
                    )
                except IntegrityError:
                    pass

            movie_count+=1
        print('Movie seeding complete')

        file = pd.read_csv("dataset/tags.csv",encoding='latin-1')
        tag_count = 0
        for index,row in file.iterrows():
            print(f'Seeding topic {tag_count}',  end='\r')
            try:
                Topic.objects.create(
                    name = (row['tag']).lower(),
                )
                tag_count+=1
            except IntegrityError:
                pass
        print('Topic seeding complete')
