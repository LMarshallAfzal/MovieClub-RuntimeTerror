from data import Data
from surprise import KNNBasic
from surprise import NormalPredictor
from evaluator import Evaluate

import random
import numpy as np

def load_data():
    ml = Data()
    print("Loading movie ratings...")
    data = ml.load_movie_data()
    print("\nComputing movie popularity ranks so we can measure novelty later...")
    popularity_rankings = ml.popularity_ranking()
    return (ml,data,popularity_rankings)

np.random.seed(0)
random.seed(0)

ml, data, popularity_rankings = load_data()

evaluator = Evaluate(data, popularity_rankings)

model = KNNBasic(sim_options={'name': 'cosine', 'user_based': True})
evaluator.add_algorithm(model, "User-based KNN")

Random = NormalPredictor()
evaluator.add_algorithm(Random, "Random")


evaluator.evaluate(False)
evaluator.sample_top_n(ml)