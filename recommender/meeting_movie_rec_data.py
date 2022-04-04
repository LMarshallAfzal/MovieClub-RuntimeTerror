
import csv
from csv import writer
from surprise import Dataset,Reader
from collections import defaultdict
import numpy as np
import pandas as pd
from api.models import Club,Rating


class MeetingMovieRecommenderData:
    def __init__(self):
        self.meeting_rec_data_path = 'recommender/dataset-latest/meeting_movie_recommender_data.csv'
        self.movie_lens_path = 'recommender/dataset-latest/ratings.csv'

    def load_movie_data_for_meeting(self):
        ratings_dataset = 0
        self.get_db_member_ratings()
        self.combine_data()
        reader = Reader(line_format='user item rating', sep=',', skip_lines=1)
        ratings_dataset = Dataset.load_from_file(self.meeting_rec_data_path, reader = reader)
        return ratings_dataset

    def get_db_member_ratings(self):
        data = open(self.meeting_rec_data_path,'w')
        writer = csv.writer(data)
        writer.writerow(['userID','movieID','rating'])
        clubs = Club.objects.all()
        for club in clubs:
            club_members = club.club_members.all()
            member_ratings = []
            for member in club_members:
                ratings = member.get_user_ratings()
                if not ratings:
                    continue
                for rating in ratings:
                    member_ratings.append([club.id,rating.movie.ml_id,rating.score])
                for rating in member_ratings:
                    writer.writerow([rating[0],rating[1],rating[2]])
        data.close()
    
    def combine_data(self):
        local_ratings = open(self.meeting_rec_data_path,'a')
        ml_ratings = open(self.movie_lens_path,'r')
        constant = self.get_last_row(self.meeting_rec_data_path)
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
        local_ratings = open(self.meeting_rec_data_path,'w')
        local_ratings.truncate()
        local_ratings.close()

