from django.core.management.base import BaseCommand
from api.models import Movie
from django.db import IntegrityError
import pandas as pd
import imdb
import csv
from csv import writer

'''This seeder gets the image url from IMDB database and saves it to the movie_covers_links.csv file. 
Note that this seeder doesnt need to be called again if the movie_covers_links.csv file is already present.
WARNING: This seeder will take a while to run (AROUND 8 HOURS).'''

class Command(BaseCommand):
    
    def __init__(self):
        super().__init__()

    def handle(self, *args, **options):
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
        print('Movie cover seeding complete')

    def get_imdb_id(self,ml_id):
        link_file = pd.read_csv("recommender/dataset-latest/links.csv",encoding='latin-1')
        for index,row in link_file.iterrows():
            if int(row['movieId']) == ml_id:       
                cover_link = self.get_cover_url(str(int(float(row['imdbId']))))
                return cover_link
        
    def get_cover_url(self,imdb_id):
        access = imdb.IMDb()
        imdb_id = imdb_id.lstrip('0')
        try:
            movie = access.get_movie(imdb_id)
            url = movie['cover url']
        except Exception as e:
            return 'No image'
        else:
            return url

    
        