from .data import Data
from surprise import KNNBasic
import heapq as pq
from collections import defaultdict
from operator import itemgetter

test_user_id = '7'
constant = 10

ml = Data()
data = ml.load_movie_data()

trainSet = data.build_full_trainset()

model = KNNBasic(sim_options = {'name':'cosine','user_based':False})
model.fit(trainSet)
matrix = model.compute_similarities()

test_user_inner_id = trainSet.to_inner_uid(test_user_id)

test_user_ratings = trainSet.ur[test_user_inner_id]

k_neighbours = pq.nlargest(constant,test_user_ratings,key=lambda t:t[1])

candidates = defaultdict(float)

for item_id,ratings in k_neighbours:
    similarity_row = matrix[item_id]
    for inner_id, rating in enumerate(similarity_row):
        candidates[inner_id] += rating * (ratings / 5.0)

rated = {}

for item_id,rating in trainSet.ur[test_user_inner_id]:
    rated[item_id] = 1

position = 0
for item_id,ratings_sum in sorted(candidates.items(),key=itemgetter(1),reverse=True):
    if not item_id in rated:
        movie = trainSet.to_raw_iid(item_id)
        print(ml.get_movie_title(int(movie)))
        position += 1
        if position > constant:
            break
