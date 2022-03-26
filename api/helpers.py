from .models import Movie, Club
import random
import datetime
from datetime import datetime
from django.core.mail import send_mass_mail
from backend.settings import EMAIL_HOST_USER


def get_initial_recommendations_for_movies(user, user_preferences):
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


def get_initial_recommendations_for_clubs(user, user_preferences):
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

def update_upcoming_meetings():
    meetings = Club.objects.all().filter(club_meetings__completed=False)
    for meeting in meetings:
        if meeting.date <= datetime.date.today() and meeting.end_time <= datetime.now().time():
            meeting.completed = True
            meeting.save()

def send_notifications(club):
    emails = []
    for member in club.club_members.all():
        emails.append(f'{member.user.email}')

    message = (
        'New Meeting',
        'You have a new meeting!', 
        EMAIL_HOST_USER,
        [emails]
    )
    send_mass_mail(message, fail_silently=False)

    
            
    
            
