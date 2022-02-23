from surprise import KNNBasic
from data import Data
import heapq as pq
from collections import defaultdict
from operator import itemgetter

test_user_id = '3'
constant = 10

ml = Data()
data = ml.load_movie_data

trainSet = data.build_full_trainset()

model = KNNBasic(sim_options = {'name':'cosine','user_based':True})
model.fit(trainSet)
matrix = model.compute_similarities()

test_user_inner_id = trainSet.to_inner_uid(test_user_id)
similarity_row = matrix[test_user_inner_id]

similar_users = []

for inner_id, score in enumerate(similarity_row):
    if(inner_id != test_user_inner_id):
        similar_users.append((inner_id, score))

k_neighbours = pq.nlargest(constant, similar_users, key=lambda t:t[1])

candidates = defaultdict(float)
for similar_user in k_neighbours:
    inner_id = similar_user[0]
    user_similarity_score = similar_user[1]
    similar_user_ratings = trainSet.ur[inner_id]
    for rating in similar_user_ratings:
        candidates[rating[0]] += (rating[1]/5.0) * user_similarity_score

rated = {}
for item_id,rating in trainSet.ur[test_user_inner_id]:
    rated[item_id] = 1

position = 0

for item_id,rating_sum in sorted(candidates.items(),key=itemgetter(1),reverse=True):
    if not item_id in rated:
        movie_id = trainSet.to_raw_iid(item_id)
        print(ml.get_movie_title(int(movie_id)),rating_sum)
        position += 1
        if (position > 10):
            break