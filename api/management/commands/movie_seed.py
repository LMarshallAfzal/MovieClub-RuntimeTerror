from django.core.management.base import BaseCommand
from api.models import Movie
from django.db import IntegrityError
import pandas as pd
import imdb
import csv
from csv import writer


class Command(BaseCommand):
    
    def __init__(self):
        super().__init__()

    def handle(self, *args, **options):
        self.get_db_movie_cover_links()
        # file = pd.read_csv("recommender/dataset-latest/movies.csv",encoding='latin-1')
        # movie_count = 0
        # for index,row in file.iterrows():
        #     print(f'Seeding movie {movie_count}',  end='\r')
        #     Movie.objects.create(
        #         ml_id = int(row['movieId']),
        #         title = row['title'],
        #         genres = row['genres'].replace('|',','),
        #         year = int(row['year']),
        #     )
        #     movie_count+=1
        # print('Movie seeding complete')

    def get_imdb_id(self,ml_id):
        link_file = pd.read_csv("recommender/dataset-latest/links.csv",encoding='latin-1')
        for index,row in link_file.iterrows():
            if int(row['movieId']) == ml_id:       
                cover_link = self.get_cover_url(str(int(float(row['imdbId']))))
                return cover_link
        
    def get_cover_url(self,imdb_id):
        access = imdb.IMDb()
        imdb_id = imdb_id.lstrip('0')
        movie = access.get_movie(imdb_id)
        try:
            url = movie['cover url']
        except Exception as e:
            return 'No image'
        else:
            return url

    def get_db_movie_cover_links(self):
        data = open("recommender/dataset-latest/movie_covers_links.csv",'w')
        writer = csv.writer(data)
        writer.writerow(['movieId','cover_link'])
        movies = Movie.objects.all()
        counter = 0
        for movie in movies:
            print(f'Movie_link {counter}',  end='\r')
            writer.writerow([movie.ml_id, self.get_imdb_id(movie.ml_id)])
            counter+=1
        data.close()