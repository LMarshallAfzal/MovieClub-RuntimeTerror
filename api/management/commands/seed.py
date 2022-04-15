from django.core.management.base import BaseCommand
from api.models import User, Club, Genre, Movie, Rating
from django.db import IntegrityError
from faker import Faker
import pandas as pd
import random

def get_genre_id(genre_name):
    try:
        return Genre.objects.get(name=genre_name).id
    except Genre.DoesNotExist:
        new_genre = Genre.objects.create(name=genre_name)
        return new_genre.id

class Command(BaseCommand):
    PASSWORD = "C0mpl3xPa$$w0rd"
    USER_COUNT = 100
    CLUB_COUNT = 5

    def __init__(self):
        super().__init__()
        self.faker = Faker('en_GB')

    def handle(self, *args, **options):
        self.seed_movies()
        self.seed_users()
        self.seed_ratings()

    def seed_movies(self):
        file = pd.read_csv("recommender/dataset-latest/movies.csv",dtype = str,encoding='latin-1')
        movie_count = 0
        for index,row in file.iterrows():
            print(f'Seeding movie {movie_count}',  end='\r')

            genres = [get_genre_id(genre) for genre in row['genres'].split('|')]
            
            movie = Movie.objects.create(
                ml_id = int(row['movieId']),
                imdb_id = row['imdb_id'],
                title = row['title'],
                year = int(row['year']),
            )
            movie.genres.set(genres)
            movie_count+=1
        print('Movie seeding complete')
        print(f'Seeded {movie_count} movies')

    def seed_users(self):
        user_count = 0
        club_count = 0

        while user_count < Command.USER_COUNT:
            print(f'Seeding user {user_count}',  end='\r')
            try:
                self._create_user()
            except IntegrityError as e:
                continue
            user_count += 1
        print('User seeding complete')

        while club_count < Command.CLUB_COUNT:
            print(f'Seeding club {club_count}',  end='\r')
            try:
                self._create_club()
            except IntegrityError as e:
                continue
            club_count += 1

        print('Club seeding complete')

    def seed_ratings(self):
        movies = Movie.objects.all()
        for club in Club.objects.all():
            for member in club.club_members.all():
                Rating.objects.create(user=member, movie = random.choice(movies),score = random.randint(1,5))
        

    def _create_user(self):
        first_name = self.faker.first_name()
        last_name = self.faker.last_name()
        username = self._username(first_name, last_name)
        email = self._email(first_name, last_name)
        bio = self.faker.unique.text(max_nb_chars=520)
        

        user = User.objects.create_user(
            username=username,
            first_name=first_name,
            last_name=last_name,
            email=email,
            password=Command.PASSWORD,
            bio=bio,
            
        )
        user.preferences.set([3,4])
        user.gravatar = user.gravatar()

    def _email(self, first_name, last_name):
        email = f'{first_name}.{last_name}.{random.randint(100,999)}@example.org'
        return email

    def _username(self, first_name, last_name):
        username = f'{first_name}{last_name}'
        return username

    def _create_club(self):
        themes = Genre.objects.all()
        club_name = self.faker.word().capitalize() + "Movie Club"
        mission_statement = 'Best movie club in town!'
        new_club = Club.objects.create(
            club_name=club_name,
            mission_statement=mission_statement,
            theme = random.choice(themes),
        )

        self._create_club_roles(new_club)

    def _create_club_roles(self, club):
        club_owner = random.choice(User.objects.all())
        club_meeting_organiser = random.choice(User.objects.all())
        club.club_members.add(club_owner, through_defaults={'role': 'C'})
        club.club_members.add(club_meeting_organiser,
                              through_defaults={'role': 'O'})

        for i in range(1, int(self.USER_COUNT/5)):
            current_user = random.choice(
                User.objects.all().difference(club.get_all_club_members()))
            club.club_members.add(current_user, through_defaults={'role': 'M'})
