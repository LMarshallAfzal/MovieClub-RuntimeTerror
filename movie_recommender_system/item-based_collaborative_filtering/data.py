import csv
import sys
from surprise import Dataset,Reader
from collections import defaultdict
import numpy as np
from api.models import Movie
class Data:
    movieID_to_title = {}
    title_to_movieID = {}
    ratingsPath = './dataset/ratings.csv'
    #moviesPath = '../dataset/movies.csv'

    def load_movie_data(self):
        ratingsDataset = 0
        self.movieID_to_title = {}
        self.title_to_movieID = {}

        reader = Reader(line_format='user item rating timestamp', sep=',', skip_lines=1)
        ratingsDataset = Dataset.load_from_file(self.ratingsPath, reader = reader)

        for movie in Movie.objects.all():
            self.movieID_to_title[movie.movieID] = movie.title
            self.title_to_movieID[movie.title] = movie.movieID
        return ratingsDataset

    #Subject to change with ratings from the database
    def get_user_rating(self,user):
        ratings = []
        user_hit = False
        with open(self.ratingsPath,newlines='') as file:
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

    def popularity_ranking(self):
        ratings = defaultdict(float)
        rankings = defaultdict(int)
        with open(self.ratingsPath, newline='') as file:
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
        genreIDs = {}
        maxGenreID = 0
        for movie in Movie.objects.all():
            genreList = movie.genres.split('|')
            genreIDList = []
            for genre in genreList:
                if genre in genreIDs:
                    genreID=genreIDs[genre]
                else:
                    genreID = maxGenreID
                    genreIDs[genre] = genreID
                    maxGenreID+=1
                genreIDList.append(genreID)
            genres[movie.movie_id] = genreIDList
        for(movieID,genreList) in genres.items():
            bitfield = [0] * maxGenreID
            for genreID in genreIDList:
                bitfield[genreID] = 1
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

