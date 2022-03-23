import csv
from csv import writer
from surprise import Dataset,Reader
from collections import defaultdict
from api.models import Rating


class ClubRecommenderData:
    def __init__(self):
        self.club_rec_data_path = 'recommender/dataset-latest/club_recommender_data.csv'

    def load_movie_data_for_club_recommender(self):
        ratings_dataset = 0
        self.get_db_user_ratings() #stays for club
        reader = Reader(line_format='user item rating', sep=',', skip_lines=1)
        ratings_dataset = Dataset.load_from_file(self.club_rec_data_path, reader = reader)
        return ratings_dataset
        
    def get_db_user_ratings(self):
        data = open(self.club_rec_data_path,'w')
        writer = csv.writer(data)
        writer.writerow(['userID','movieID','rating'])
        ratings = Rating.objects.all()
        for rating in ratings:
            writer.writerow([rating.user.id,rating.movie.ml_id,rating.score])
        data.close()
    
    def clean(self):
        data = open(self.club_rec_data_path,'w')
        data.truncate()
        data.close()

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
