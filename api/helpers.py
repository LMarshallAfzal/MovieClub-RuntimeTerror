from .models import Movie, Club
import random

def get_initial_recommendations_for_movies(user,user_preferences):
    querysets = []
    querysets = Movie.get_movies_by_genre(user_preferences)
    watched_movies = user.get_watched_movies()
    movies = set()
    for queryset in querysets:
        for movie in queryset:
            if not movie in watched_movies:
                movies.add(movie)
            continue
    number_of_recomendations = 5
    if len(movies) < 5:
        number_of_recomendations = len(movies)
    recommendations = random.sample(movies, number_of_recomendations)
    return recommendations

def get_initial_recommendations_for_clubs(user,user_preferences):
    querysets = []
    querysets = Club.get_clubs_by_theme(user_preferences)
    clubs = set()
    for queryset in querysets:
        for club in queryset:
            if not user in club.club_members.all():
                clubs.add(club)
            continue
    number_of_recomendations = 5
    if len(clubs) < 5:
        number_of_recomendations = len(clubs)
    recommendations = random.sample(clubs, number_of_recomendations)
    return recommendations

