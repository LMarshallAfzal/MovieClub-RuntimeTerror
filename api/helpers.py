import datetime
import random
from datetime import datetime
import time
from .models import Movie, Club


def get_random_movies_helper(num_movies):
    query = []
    for movie in Movie.objects.all():
        query.append(movie.id)
    movies = random.sample(query, num_movies)
    output = []
    for randomId in query:
        output.append(Movie.objects.get(id=randomId))

    return output


def recommendations_based_on_preferences_for_user_movies(user, user_preferences):
    query = Movie.get_movies_by_genre(user_preferences)
    watched_movies = user.get_watched_movies()
    movies = set()
    for movie in query:
        if not movie in watched_movies:
            movies.add(movie)
            continue
    number_of_recomendations = 5
    if len(movies) < 5:
        number_of_recomendations = len(movies)
    recommendations = random.sample(movies, number_of_recomendations)
    return recommendations


def recommendations_based_on_theme_for_meeting_movies(club):
    watched_movies = set()
    for member in club.club_members.all():
        for movie in member.watched_movies.all():
            watched_movies.add(movie)
    query = Movie.get_movies_by_club_theme(club.theme)
    movies = set()
    for movie in query:
        if not movie in watched_movies:
            movies.add(movie)
            continue
    number_of_recomendations = 5
    if len(movies) < 5:
        number_of_recomendations = len(movies)
    recommendations = random.sample(movies, number_of_recomendations)
    return recommendations


def recommendations_based_on_preferences_for_clubs(user, user_preferences):
    queryset = Club.get_clubs_by_theme(user_preferences)
    clubs = set()
    for club in queryset:
        if not user in club.club_members.all():
            clubs.add(club)
        continue
    number_of_recomendations = 5
    if len(clubs) < 5:
        number_of_recomendations = len(clubs)
    recommendations = random.sample(clubs, number_of_recomendations)
    return recommendations


def update_upcoming_meetings():
    meetings = Club.objects.all().filter(club_meetings__completed=False)
    for meeting in meetings:
        if meeting.date <= datetime.date.today() and meeting.end_time <= datetime.now().time():
            meeting.completed = True
            meeting.save()
