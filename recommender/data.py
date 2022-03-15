
import csv
from csv import writer
from surprise import Dataset,Reader
from collections import defaultdict
import numpy as np
import pandas as pd
from api.models import Movie,Rating


class Data:

    def __init__(self):
        self.ratings_path = 'recommender/dataset-latest/api_ratings.csv'
        self.movie_lens_path = 'recommender/dataset-latest/ratings.csv' 

    def load_movie_data_for_club_recommender(self):
        ratings_dataset = 0
        self.get_ratings_user() #stays for club
        reader = Reader(line_format='user item rating', sep=',', skip_lines=1)
        ratings_dataset = Dataset.load_from_file(self.ratings_path, reader = reader)
        return ratings_dataset
        
    def load_movie_data_for_club_meeting(self):
        pass

    def load_movie_data_for_user(self):
        ratings_dataset = 0
        self.get_ratings_user() #stays for club
        self.combine_data()
        reader = Reader(line_format='user item rating', sep=',', skip_lines=1)
        ratings_dataset = Dataset.load_from_file(self.ratings_path, reader = reader)
        return ratings_dataset

    def get_ratings_user(self):
        api_ratings = open(self.ratings_path,'w')
        writer = csv.writer(api_ratings)
        writer.writerow(['userID','movieID','rating'])
        ratings = Rating.objects.all()
        for rating in ratings:
            writer.writerow([rating.user.id,rating.movie.ml_id,rating.score])
        api_ratings.close()
    
    def combine_data(self):
        local_ratings = open(self.ratings_path,'a')
        ml_ratings = open(self.movie_lens_path,'r')
        constant = self.get_last_row(self.ratings_path)
        variable = constant
        reader = csv.reader(ml_ratings)
        next(reader)
        for row in reader:
            write_object = writer(local_ratings)
            input = []
            if int(row[0]) == variable:
                calc = int(row[0]) + constant
                input = [calc,row[1],row[2]]
                write_object.writerow(input)
            else:
                variable = int(row[0])
                calc = int(row[0]) + constant
                input = [calc,row[1],row[2]]
                write_object.writerow(input)
        local_ratings.close()
        ml_ratings.close()

    def get_last_row(self,file):
            df = pd.read_csv(file)
            try:
                last_line = df['userID'].values[-1]
            except:
                return 0
            return int(last_line)
    
    def clean(self):
        local_ratings = open(self.ratings_path,'w')
        local_ratings.truncate()
        local_ratings.close()

    def get_ratings_club(self):
        pass

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
