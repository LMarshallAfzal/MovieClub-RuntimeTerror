import itertools
from surprise import accuracy
from collections import defaultdict


class Metrics:

    def MAE_accuracy(predictions):
        return accuracy.mae(predictions, verbose=False)

    def RMSE_accuracy(predictions):
        return accuracy.rmse(predictions, verbose=False)

    def getTopN(predictions, n=5, minimum_rating=4.0):
        topN = defaultdict(list)

        for user_id, movie_id, rating, predicted_rating, _ in predictions:
            if minimum_rating <= predicted_rating:
                topN[int(user_id)].append((int(movie_id), predicted_rating))
        for user_id, ratings in topN.items():
            ratings.sort(key=lambda x: x[1], reverse=True)
            topN[int(user_id)] = ratings[:n]
        return topN

    def hit_rate(topN, left_out_predictions):
        total = 0
        hits = 0

        for left_out in left_out_predictions:
            user_id = left_out[0]
            left_out_movie = left_out[1]
            is_hit = False
            for movie, predicted_rating in topN[int(user_id)]:
                if(int(left_out_movie)) == int(movie):
                    is_hit = True
                    break
            if is_hit:
                hits += 1

            total += 1
        precision = hits/total
        return precision

    def cummulative_hit_rate(topN, left_out_predictions, cutoff=0):
        hits = 0
        total = 0

        for user_id, left_out_movie, rating, predicted_rating, _ in left_out_predictions:
            if rating >= cutoff:
                is_hit = False
                for movie, predicted_rating in topN[int(user_id)]:
                    if(int(left_out_movie)) == int(movie):
                        is_hit = True
                        break
                if is_hit:
                    hits += 1
                total += 1

        precision = hits/total
        return precision

    def rating_hit_rate(topN, left_out_predictions):
        hits = defaultdict(float)
        total = defaultdict(float)

        for user_id, left_out_movie, rating, predicted_rating, _ in left_out_predictions:
            is_hit = False
            for movie, predicted_rating in topN[int(user_id)]:
                if int(left_out_movie) == movie:
                    is_hit = True
                    break
            if is_hit:
                hits[rating] += 1
            total[rating] += 1

        for rating in sorted(hits.keys()):
            print(rating, hits[rating]/total[rating])

    def reciprocal_hit_rank(topN, left_out_predictions):
        sum = 0
        total = 0

        for user_id, left_out_movie, rating, predicted_rating, _ in left_out_predictions:
            hit_rank = 0
            ranking = 0

            for movie, predicted_rating in topN[int(user_id)]:
                ranking += 1
                if int(left_out_movie) == movie:
                    hit_rank = ranking
                    break
            if hit_rank > 0:
                sum = sum + (1.0/hit_rank)

            total += 1
        average = sum/total
        return average

    def user_coverage(topN, num_users, threshold=0):
        hits = 0
        for user_id in topN.keys():
            is_hit = False
            for movie, predicted_rating in topN[int(user_id)]:
                if predicted_rating > threshold:
                    is_hit = True
                    break
            if is_hit:
                hits += 1

        coverage = hits/num_users
        return coverage

    def recommendation_diversity(topN, simsAlgo):
        constant = 0
        total = 0
        matrix = simsAlgo.compute_similarities()
        for user_id in topN.keys():
            pairs = itertools.combinations(topN[user_id], 2)
            for pair in pairs:
                m1 = pair[0][0]
                m2 = pair[1][0]
                inner1 = simsAlgo.trainset.to_inner_iid(str(m1))
                inner2 = simsAlgo.trainset.to_inner_iid(str(m2))
                similarity = matrix[inner1][inner2]
                total += similarity
                constant += 1

        S = total/constant
        diff = 1 - S
        return diff

    def novelty(topN, rankings):
        constant = 0
        total = 0
        for user_id in topN.keys():
            for rating in topN[user_id]:
                movie = rating[0]
                rank = rankings[movie]
                total += rank
                constant += 1
        novelty = total / constant
        return novelty
