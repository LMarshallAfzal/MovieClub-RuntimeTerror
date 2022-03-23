
import csv
from csv import writer
from surprise import Dataset,Reader
from collections import defaultdict
import pandas as pd
from api.models import Rating


class MoviesForUserRecommenderData:

    def __init__(self):
        self.movie_rec_data_path = 'recommender/dataset-latest/user_movie_recommender_data.csv'
        self.movie_lens_path = 'recommender/dataset-latest/ratings.csv' 

    def load_movie_data_for_user(self):
        self.clean()
        ratings_dataset = 0
        self.get_db_user_ratings() #stays for club
        self.combine_data()
        reader = Reader(line_format='user item rating', sep=',', skip_lines=1)
        ratings_dataset = Dataset.load_from_file(self.movie_rec_data_path, reader = reader)
        return ratings_dataset

    def get_db_user_ratings(self):
        api_ratings = open(self.movie_rec_data_path,'w')
        writer = csv.writer(api_ratings)
        writer.writerow(['userID','movieID','rating'])
        ratings = Rating.objects.all()
        for rating in ratings:
            writer.writerow([rating.user.id,rating.movie.ml_id,rating.score])
        api_ratings.close()
    
    def combine_data(self):
        local_ratings = open(self.movie_rec_data_path,'a')
        ml_ratings = open(self.movie_lens_path,'r')
        constant = self.get_last_row(self.movie_rec_data_path)
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
        local_ratings = open(self.movie_rec_data_path,'w')
        local_ratings.truncate()
        local_ratings.close()

    # def popularity_ranking(self):
    #     ratings = defaultdict(float)
    #     rankings = defaultdict(int)
    #     with open(self.movie_rec_data_path, newline='') as file:
    #         reader = csv.reader(file)
    #         next(reader)
    #         for row in reader:
    #             movie_id = int(row[1])
    #             ratings[movie_id] += 1
    #     rank = 1
    #     for movie_id in sorted(ratings.items(), key=lambda x: x[1], reverse=True):
    #         rankings[movie_id] = rank
    #         rank += 1
    #     return rankings
