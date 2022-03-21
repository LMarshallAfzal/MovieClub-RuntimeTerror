from surprise import KNNBasic
from .meeting_movie_rec_data import MeetingMovieRecommenderData as Data
import heapq as pq
from collections import defaultdict
from operator import itemgetter
from api.models import Movie, User, Rating


data = Data()
dict = {}
number_of_recommendations = 6

def train_movie_data_for_meeting():
    data.clean()
    dataset = data.load_movie_data_for_meeting()
    trainSet = dataset.build_full_trainset()
    model = KNNBasic(sim_options={'name': 'cosine', 'user_based': False})
    model.fit(trainSet)
    matrix = model.compute_similarities()
    dict['trainSet'] = trainSet
    dict['matrix'] = matrix

def recommend_movies_for_meeting(club):
    trainSet = dict['trainSet']
    matrix = dict['matrix']
    user_inner_id = trainSet.to_inner_uid(str(club.id))

    target_ratings = trainSet.ur[user_inner_id]
    k_neighbours = pq.nlargest(
        number_of_recommendations, target_ratings, key=lambda t: t[1])

    candidates = defaultdict(float)
    for itemID, rating in k_neighbours:
        similarityRow = matrix[itemID]
        for innerID, score in enumerate(similarityRow):
            candidates[innerID] += score * (rating / 5.0)

    watched = {}
    for itemID, rating in trainSet.ur[user_inner_id]:
        watched[itemID] = 1

    position = 0
    recommendations = []
    for itemID, ratingSum in sorted(candidates.items(), key=itemgetter(1), reverse=True):
        if not itemID in watched:
            ml_id = trainSet.to_raw_iid(itemID)
            movie = Movie.objects.get(ml_id=ml_id)
            #if not movie in target.watched_movies.all():
            recommendations.append(movie)
            position += 1
            if (position > 4):
                break

    return recommendations
