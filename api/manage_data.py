import csv
from csv import writer,reader
from lib2to3.pgen2.grammar import opmap_raw
from statistics import mode
import tempfile
import pandas as pd


file_path = './recommender/dataset-latest/api_ratings.csv'
dataset_path = './recommender/dataset-latest/ratings.csv'
def add_rating(rating):
    rating_contents = [rating.user.id,rating.movie.movieID,rating.score]
    with open(file_path, 'a') as file:
        write_object = writer(file)
        write_object.writerow(rating_contents)
        file.close()
        
def change_rating(self, new_rating):
        tempfile = tempfile.NamedTemporaryFile(mode = 'w', delete = False)
        fields = ['userID','movieID','rating']
        with open (file_path, 'r') as file, tempfile:
            reader = csv.DictReader(file, fieldnames=fields)
            writer = csv.DictWriter(file, fieldnames=fields)
            for row in reader:
                if row['userID'] == new_rating.user.userID and row['movieID'] == new_rating.movie.movieID:
                    row['rating'] = new_rating.rating.score
                row = {'userID' : row['userID'], 'movieID' : row['movieID'], 'rating' : row['rating']}
                writer.writerow(row)
            file.close()

def combine_data():
    local_ratings = open(file_path,'a')
    dataset_ratings = open(dataset_path,'r')
    constant = get_last_row(file_path)
    variable = constant
    reader = csv.reader(dataset_ratings)
    next(reader)
    for row in reader:
        write_object = writer(local_ratings)
        input = []
        if int(row[0]) == variable:
            calc = int(row[0]) + constant
            input = [calc,row[1],row[2]]
            write_object.writerow(input)
        else:
            variable = int(row[0])
            calc = int(row[0]) + constant
            input = [calc,row[1],row[2]]
            write_object.writerow(input)
    local_ratings.close()
    dataset_ratings.close()
    return constant

def clean(constant):
    local_ratings = open(file_path,'r')
    reader = csv.reader(local_ratings)
    lines = list()
    lines.append(['userID','movieID','rating'])
    next(reader)
    for row in reader:
        lines.append(row)
        if int(row[0]) > constant:
            lines.remove(row)
    local_ratings.close()
    local_ratings = open(file_path,'w')
    writer = csv.writer(local_ratings)
    writer.writerows(lines)
    local_ratings.close()
 
def get_last_row(file):
    df = pd.read_csv(file)
    try:
        last_line = df['userID'].values[-1]
    except:
        return 0
    return int(last_line)





