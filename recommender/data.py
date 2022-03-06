import csv
from csv import writer
import sys
from surprise import Dataset,Reader
from collections import defaultdict
import numpy as np
from api.models import Movie,Rating

class Data:
    movieID_to_title = {}
    title_to_movieID = {}
    ratings_path = 'recommender/dataset-latest/ratings.csv'

    def load_movie_data(self):
        ratings_dataset = 0
        self.movieID_to_title = {}
        self.title_to_movieID = {}

        reader = Reader(line_format='user item rating', sep=',', skip_lines=1)
        ratings_dataset = Dataset.load_from_file(self.ratings_path, reader = reader)

        for movie in Movie.objects.all():
            self.movieID_to_title[movie.movieID] = movie.title
            self.title_to_movieID[movie.title] = movie.movieID
        return ratings_dataset

    #Subject to change with ratings from the database
    def get_user_rating(self,user):
        ratings = []
        user_hit = False
        with open(self.ratings_path,newlines='') as file:
            reader = csv.reader(file)
            next(reader)
            for row in reader:
                user_id = int(row[0])
                if user == user_id:
                    movie_id = int(row[1])
                    rating = float(row[2])
                    ratings.append((movie_id,rating))
                    user_hit = True
                if (user_hit and (user!=user_id)):
                    break
        return ratings

    def add_rating(self,rating):
        user_rating = [rating.user.id+610,rating.movie.movieID,rating.rating]
        with open(self.ratings_path,'a') as file:
            write_object = writer(file)
            write_object.writerow(user_rating)
            file.close()

    def popularity_ranking(self):
        ratings = defaultdict(float)
        rankings = defaultdict(int)
        with open(self.ratings_path, newline='') as file:
            reader = csv.reader(file)
            next(reader)
            for row in reader:
                movie_id = int(row[1])
                ratings[movie_id] += 1
        rank = 1
        for movie_id in sorted(ratings.items(), key=lambda x: x[1], reverse=True):
            rankings[movie_id] = rank
            rank += 1
        return rankings
        

    def get_movie_genres(self):
        genres = defaultdict(list)
        genre_IDs = {}
        max_genre_id = 0
        for movie in Movie.objects.all():
            genre_list = movie.genres.split('|')
            genre_id_list = []
            for genre in genre_list:
                if genre in genre_IDs:
                    genre_id=genre_IDs[genre]
                else:
                    genre_id = max_genre_id
                    genre_IDs[genre] = genre_id
                    max_genre_id+=1
                genre_id_list.append(genre_id)
            genres[movie.movieID] = genre_id_list
        for(movieID,genre_list) in genres.items():
            bitfield = [0] * max_genre_id
            for genre_id in genre_id_list:
                bitfield[genre_id] = 1
            genres[movieID] = bitfield

        return genres

    def get_release_year(self):
        years = defaultdict(int)
        for movie in Movie.objects.all():
            year = movie.year
            if year:
                years[movie.movieID] = int(year)
        return years

    def get_movie_title(self, movie_id):
        if movie_id in self.movieID_to_title:
            return self.movieID_to_title[movie_id]
        else:
            return ''
            
    def get_movie_id(self, title):
        if title in self.title_to_movieID:
            return self.title_to_movieID[title]
        else:
            return 0
