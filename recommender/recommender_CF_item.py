from surprise import KNNBasic
from .data import Data
import heapq as pq
from collections import defaultdict
from operator import itemgetter
from api.models import Movie, User, Rating


class Recommender:
    def __init__(self, target):
        self.number_of_recommendations = 6
        self.target = target
        self.data = Data()

    def recommend_movies_for_user(self):
        dataset = self.data.load_movie_data_for_user()
        self.trainSet = dataset.build_full_trainset()
        model = KNNBasic(sim_options={'name': 'cosine', 'user_based': False})
        model.fit(self.trainSet)
        matrix = model.compute_similarities()
        user_inner_id = self.trainSet.to_inner_uid(str(self.target.id))

        target_ratings = self.trainSet.ur[user_inner_id]
        k_neighbours = pq.nlargest(
            self.number_of_recommendations, target_ratings, key=lambda t: t[1])

        candidates = defaultdict(float)
        for itemID, rating in k_neighbours:
            similarityRow = matrix[itemID]
            for innerID, score in enumerate(similarityRow):
                candidates[innerID] += score * (rating / 5.0)

        watched = {}
        for itemID, rating in self.trainSet.ur[user_inner_id]:
            watched[itemID] = 1

        position = 0
        recommendations = []
        for itemID, ratingSum in sorted(candidates.items(), key=itemgetter(1), reverse=True):
            if not itemID in watched:
                ml_id = self.trainSet.to_raw_iid(itemID)
                movie = Movie.objects.get(ml_id=ml_id)
                if not movie in self.target.watched_movies.all(): 
                    recommendations.append(movie)
                position += 1
                if (position > 4):
                    break
        
        self.data.clean()
        print(watched)
        return recommendations

    def recommend_clubs(self):
        dataset = self.data.load_movie_data_for_club_recommender()
        self.trainSet = dataset.build_full_trainset()
        model = KNNBasic(sim_options={'name': 'cosine', 'user_based': False})
        model.fit(self.trainSet)
        user_inner_id = self.trainSet.to_inner_uid(str(self.target.id))

        target_ratings = self.trainSet.ur[user_inner_id]
        k_neighbours = pq.nlargest(
            self.number_of_recommendations, target_ratings, key=lambda t: t[1])

        already_joined_clubs = []

        for club in self.target.get_user_clubs():
            already_joined_clubs.append(club)
        recommendations = []
        for key in k_neighbours:
            neighbour = Rating.objects.get(id=key[0]).user
            for club in neighbour.get_user_clubs():
                if not club in already_joined_clubs:
                    recommendations.append(club)

        self.data.clean()
        return recommendations
