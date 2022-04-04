from surprise import KNNBasic
from .club_rec_data import ClubRecommenderData as Data
import heapq as pq
from api.models import Rating
from api.helpers import get_initial_recommendations_for_clubs


data = Data()
number_of_recommendations = 5


def recommend_clubs(target):
    dataset = data.load_movie_data_for_club_recommender()
    trainSet = dataset.build_full_trainset()
    model = KNNBasic(sim_options={'name': 'cosine', 'user_based': False})
    model.fit(trainSet)
    try:
        user_inner_id = trainSet.to_inner_uid(str(target.id))
        target_ratings = trainSet.ur[user_inner_id]
    except:
        return get_initial_recommendations_for_clubs(target)

    k_neighbours = pq.nlargest(
        number_of_recommendations, target_ratings, key=lambda t: t[1])

    already_joined_clubs = []

    for club in target.get_user_clubs():
        already_joined_clubs.append(club)
    recommendations = []
    for key in k_neighbours:
        print(trainSet.to_inner_iid(key[0]))
        neighbour = Rating.objects.get(id=key[0]).user
        for club in neighbour.get_user_clubs():
            if not club in already_joined_clubs:
                recommendations.append(club)
    data.clean()
    return recommendations
