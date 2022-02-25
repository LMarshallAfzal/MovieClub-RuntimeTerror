from .metrics import Metrics
from .evaluator_data import EvaluateData


class EvaluatedAlgorithm:
    def __init__(self, algorithm, name):
        self.algorithm = algorithm
        self.name = name

    def evaluate(self, evaluation_data, topN, constant=10, verbose=True):
        metrics = {}
        if verbose:
            print("Evaluating accuracy...")
            self.algorithm.fit(evaluation_data.get_trainset())
            predictions = self.algorithm.test(evaluation_data.get_test_set())
            metrics["RMSE"] = Metrics.RMSE_accuracy(predictions)
            metrics["MAE"] = Metrics.MAE_accuracy(predictions)

            if (topN):
                if (verbose):
                    print("Evaluating top-N with leave-one-out...")
            self.algorithm.fit(evaluation_data.get_LOOCV_trainset())
            leftOutPredictions = self.algorithm.test(
                evaluation_data.get_LOOCV_testset())
            allPredictions = self.algorithm.test(
                evaluation_data.get_LOOCV_anti_testset())
            topNPredicted = Metrics.get_top_N(allPredictions, constant)
            if (verbose):
                print("Computing hit-rate and rank metrics...")
            metrics["HR"] = Metrics.hit_rate(topNPredicted, leftOutPredictions)
            metrics["cHR"] = Metrics.cummulative_hit_rate(
                topNPredicted, leftOutPredictions)
            metrics["ARHR"] = Metrics.reciprocal_hit_rank(
                topNPredicted, leftOutPredictions)

            if (verbose):
                print("Computing recommendations with full data set...")
            self.algorithm.fit(evaluation_data.get_full_trainset())
            allPredictions = self.algorithm.test(
                evaluation_data.get_full_anti_testset())
            topNPredicted = Metrics.get_top_N(allPredictions, constant)
            if (verbose):
                print("Analyzing coverage, diversity, and novelty...")
            metrics["Coverage"] = Metrics.user_coverage(topNPredicted,
                                                        evaluation_data.get_full_trainset().n_users,
                                                        ratingThreshold=4.0)
            metrics["Diversity"] = Metrics.recommendation_diversity(
                topNPredicted, evaluation_data.get_similarities())

            metrics["Novelty"] = Metrics.novelty(topNPredicted,
                                                 evaluation_data.get_popular_rankings())
    def GetName(self):
        return self.name
    
    def GetAlgorithm(self):
        return self.algorithm
    
    