from surprise import KNNBasic
from collections import defaultdict
from operator import itemgetter
from .club_rec_data import ClubRecommenderData as Data
import heapq as pq
from api.models import Rating,Movie
from api.helpers import recommendations_based_on_preferences_for_clubs


data = Data()
number_of_recommendations = 5


def recommend_clubs(target):
    data.clean()
    dataset = data.load_movie_data_for_club_recommender()
    trainSet = dataset.build_full_trainset()
    model = KNNBasic(sim_options={'name': 'cosine', 'user_based': False})
    model.fit(trainSet)
    matrix = model.compute_similarities()

    try:
        user_inner_id = trainSet.to_inner_uid(str(target.id))
        target_ratings = trainSet.ur[user_inner_id]
    except:
        return recommendations_based_on_preferences_for_clubs(target, target.get_user_preferences())

    k_neighbours = pq.nlargest(
        number_of_recommendations, target_ratings, key=lambda t: t[1])

    candidates = defaultdict(float)
    for itemID, rating in k_neighbours:
        similarityRow = matrix[itemID]
        for innerID, score in enumerate(similarityRow):
            candidates[innerID] += score * (rating / 5.0)

    already_joined_clubs = []

    for club in target.get_user_clubs():
        already_joined_clubs.append(club)

    position = 0
    recommendations = set()
    for itemID, ratingSum in sorted(candidates.items(), key=itemgetter(1), reverse=True):
        ml_id = trainSet.to_raw_iid(itemID)
        movie = Movie.objects.get(ml_id=ml_id)
        similar_user_ratings = Rating.objects.filter(movie = movie)
        for rating in similar_user_ratings:
            user = rating.user
            for club in user.get_user_clubs():
                if not club in already_joined_clubs:
                    recommendations.add(club)
                    position += 1
                    
            
        if (position > 4):
            break
    return recommendations
  
  
