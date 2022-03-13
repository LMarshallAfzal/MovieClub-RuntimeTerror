from surprise import KNNBasic
from .data import Data
import heapq as pq
from collections import defaultdict
from operator import itemgetter
from api.models import Movie


class Recommender:
    def __init__(self,target):
        self.number_of_recommendations = 6
        self.target = target
        self.data = Data()

    def recommend_movies_for_user(self):
        dataset = self.data.load_movie_data_for_user()
        self.trainSet = dataset.build_full_trainset()
        model = KNNBasic(sim_options = {'name':'cosine','user_based':True})
        model.fit(self.trainSet)
        matrix = model.compute_similarities()
        user_inner_id = self.trainSet.to_inner_uid(str(self.target))
        similarity_row = matrix[user_inner_id]

        similar_users = []

        for inner_id, score in enumerate(similarity_row):
                if(inner_id != user_inner_id):
                    similar_users.append((inner_id, score))

        k_neighbours = pq.nlargest(self.number_of_recommendations, similar_users, key=lambda t:t[1])

        candidates = defaultdict(float)
        for similar_user in k_neighbours:
            inner_id = similar_user[0]
            user_similarity_score = similar_user[1]
            similar_user_ratings = self.trainSet.ur[inner_id]
        for rating in similar_user_ratings:
            candidates[rating[0]] += (rating[1]/5.0) * user_similarity_score

        rated = {}
        for item_id,rating in self.trainSet.ur[user_inner_id]:
            rated[item_id] = 1

        position = 0
        recommendations = []
        for item_id,rating_sum in sorted(candidates.items(),key=itemgetter(1),reverse=True):
            if not item_id in rated:
                ml_id = self.trainSet.to_raw_iid(item_id)
                recommendations.append(Movie.objects.get(ml_id=ml_id))
                position += 1
                if (position > self.number_of_recommendations):
                    break
        print(k_neighbours)
        self.data.clean()
        return recommendations

    def recommend_clubs(self):
        dataset = self.data.load_movie_data_for_club_recommender()
        self.trainSet = dataset.build_full_trainset()
        model = KNNBasic(sim_options = {'name':'cosine','user_based':True})
        model.fit(self.trainSet)
        matrix = model.compute_similarities()
        user_inner_id = self.trainSet.to_inner_uid(str(self.target))
        similarity_row = matrix[user_inner_id]

        similar_users = []

        for inner_id, score in enumerate(similarity_row):
                if(inner_id != user_inner_id):
                    similar_users.append((inner_id, score))

        k_neighbours = pq.nlargest(self.number_of_recommendations, similar_users, key=lambda t:t[1])

        candidates = defaultdict(float)
        for similar_user in k_neighbours:
            inner_id = similar_user[0]
            user_similarity_score = similar_user[1]
            similar_user_ratings = self.trainSet.ur[inner_id]
        for rating in similar_user_ratings:
            candidates[rating[0]] += (rating[1]/5.0) * user_similarity_score

        rated = {}
        for item_id,rating in self.trainSet.ur[user_inner_id]:
            rated[item_id] = 1

        position = 0
        recommendations = []
        for item_id,rating_sum in sorted(candidates.items(),key=itemgetter(1),reverse=True):
            if not item_id in rated:
                ml_id = self.trainSet.to_raw_iid(item_id)
                recommendations.append(Movie.objects.get(ml_id=ml_id))
                position += 1
                if (position > self.number_of_recommendations):
                    break
        print(k_neighbours)
        self.data.clean()
        return recommendations



