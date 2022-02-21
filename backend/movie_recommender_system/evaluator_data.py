from surprise.model_selection import train_test_split
from surprise.model_selection import LeaveOneOut
from surprise import KNNBaseline

class EvaluateData:
    def __init__(self, data, popularityRankings):
        self.rankings = popularityRankings
        self.fullTrainSet = data.build_full_trainset()
        self.fullAntiTestSet = self.fullTrainSet.build_anti_testset()
        self.trainSet, self.testSet = train_test_split(data, test_size=.25, random_state=1)
        LOOCV = LeaveOneOut(n_splits=1, random_state=1)
        for train, test in LOOCV.split(data):
            self.LOOCVTrain = train
            self.LOOCVTest = test
            
        self.LOOCVAntiTestSet = self.LOOCVTrain.build_anti_testset()
        sim_options = {'name': 'cosine', 'user_based': True}
        self.simsAlgo = KNNBaseline(sim_options=sim_options)
        self.simsAlgo.fit(self.fullTrainSet)
            
    def GetFullTrainSet(self):
        return self.fullTrainSet
    
    def GetFullAntiTestSet(self):
        return self.fullAntiTestSet
    
    def GetAntiTestSetForUser(self, testSubject):
        trainset = self.fullTrainSet
        fill = trainset.global_mean
        anti_testset = []
        u = trainset.to_inner_uid(str(testSubject))
        user_items = set([j for (j, _) in trainset.ur[u]])
        anti_testset += [(trainset.to_raw_uid(u), trainset.to_raw_iid(i), fill) for
                                 i in trainset.all_items() if
                                 i not in user_items]
        return anti_testset

    def GetTrainSet(self):
        return self.trainSet
    
    def GetTestSet(self):
        return self.testSet
    
    def GetLOOCVTrainSet(self):
        return self.LOOCVTrain
    
    def GetLOOCVTestSet(self):
        return self.LOOCVTest
    
    def GetLOOCVAntiTestSet(self):
        return self.LOOCVAntiTestSet
    
    def GetSimilarities(self):
        return self.simsAlgo
    
    def GetPopularityRankings(self):
        return self.rankings