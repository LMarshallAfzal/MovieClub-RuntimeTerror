from surprise import KNNBasic
from .data import Data
import heapq as pq
from collections import defaultdict
from operator import itemgetter
from api.models import Movie, User, Rating

data = Data()

number_of_recommendations = 6

def recommend_clubs(target):
    dataset = data.load_movie_data_for_club_recommender()
    trainSet = dataset.build_full_trainset()
    model = KNNBasic(sim_options={'name': 'cosine', 'user_based': False})
    model.fit(trainSet)
    user_inner_id = trainSet.to_inner_uid(str(target.id))

    target_ratings = trainSet.ur[user_inner_id]
    k_neighbours = pq.nlargest(
        number_of_recommendations, target_ratings, key=lambda t: t[1])

    already_joined_clubs = []

    for club in target.get_user_clubs():
        already_joined_clubs.append(club)
    recommendations = []
    for key in k_neighbours:
        neighbour = Rating.objects.get(id=key[0]).user
        for club in neighbour.get_user_clubs():
            if not club in already_joined_clubs:
                recommendations.append(club)

    data.clean()
    return recommendations
