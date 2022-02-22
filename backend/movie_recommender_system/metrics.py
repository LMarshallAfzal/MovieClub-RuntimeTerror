import itertools
from surprise import accuracy
from collections import defaultdict

class Metrics:
    
    def MAE_accuracy(predictions):
        return accuracy.mae(predictions,verbose=False)

    def RMSE_accuracy(predictions):
        return accuracy.rmse(predictions,verbose=False)

    def getTopN(predictions,n=5,minimum_rating=4.0):
        topN = defaultdict(list)

        for user_id,movie_id,rating,predicted_rating, _ in predictions:
            if minimum_rating<=predicted_rating:
                topN[int(user_id)].append((int(movie_id),predicted_rating))
        for user_id,ratings in topN.items():
            ratings.sort(key=lambda x: x[1], reverse=True)
            topN[int(user_id)] = ratings[:n]
        return topN

    def HitRate(topN,left_out_predictions):
        total = 0
        hits = 0

        for left_out in left_out_predictions:
            user_id = left_out[0]
            left_out_movie = left_out[1]
            is_hit = False
            for movie,predicted_rating in topN[int(user_id)]:
                if(int(left_out_movie)) == int(movie):
                    is_hit = True
                    break
            if is_hit:
                hits+=1

            total+=1
        precision = hits/total
        return precision
