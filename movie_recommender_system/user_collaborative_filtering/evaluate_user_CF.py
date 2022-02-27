from .data import Data
from surprise import KNNBasic, Trainset
import heapq as pq
from collections import defaultdict
from operator import itemgetter
from surprise.model_selection import LeaveOneOut
from .metrics import Metrics
from .evaluator_data import EvaluateData 

def load_data():
    ml = Data()
    print("Loading movie ratings...")
    data = ml.load_movie_data()
    print("\nComputing movie popularity ranks so we can measure novelty later...")
    popularity_rankings = ml.popularity_ranking()
    return (ml,data,popularity_rankings)

ml, data, popularity_rankings = load_data()

evaluate_data = EvaluateData(data, popularity_rankings)

trainSet = evaluate_data.get_LOOCV_trainset()
model = KNNBasic(sim_options = {{'name': 'cosine','user_based': True}})
model.fit(trainSet)
matrix = model.compute_similarities()

left_out_testset = evaluate_data.get_LOOCV_testset()

topN = defaultdict(list)
constant = 10

for uiid in range(trainSet.n_users):
    similarity_row = matrix[uiid]

    similar_users = []

    for inner_id,rating in enumerate(similarity_row):
        if inner_id != uiid:
            similar_users.append((inner_id,rating))

    k_neighbours = pq.nlargest(constant,similar_users,key=lambda t:t[1])

    candidates = defaultdict(float)
    for similar_user in k_neighbours:
        inner_id = similar_user[0]
        user_similarity_score = similar_user[1]
        similar_user_ratings = trainSet.ur[inner_id]
        for rating in similar_user_ratings:
            candidates[rating[0]] += (rating[1]/5.0) * user_similarity_score

    rated = {}
    for item_id,rating in trainSet.ur[uiid]:
        rated[item_id] = 1

    position = 0
    for item_id,rating_sum in sorted(candidates.items(),key=itemgetter(1),reverse=True):
        if not item_id in rated:
            movie_id = trainSet.to_raw_iid(item_id)
            topN[int(trainSet.to_raw_uid(uiid))].append((int(movie_id), 0.0))
            position += 1
            if (position > 40):
                break

print("HR", Metrics.hit_rate(topN, left_out_testset))