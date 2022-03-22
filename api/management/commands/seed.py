from django.core.management.base import BaseCommand
from api.models import User, Club
from django.db import IntegrityError
from faker import Faker
import random


class Command(BaseCommand):
    PASSWORD = "C0mpl3xPa$$w0rd"
    USER_COUNT = 100
    CLUB_COUNT = 5

    def __init__(self):
        super().__init__()
        self.faker = Faker('en_GB')

    def handle(self, *args, **options):
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

    def _create_user(self):
        first_name = self.faker.first_name()
        last_name = self.faker.last_name()
        username = self._username(first_name, last_name)
        email = self._email(first_name, last_name)
        bio = self.faker.unique.text(max_nb_chars=520)
        preferences = "Action,Horror,Sci-fi"

        User.objects.create_user(
            username=username,
            first_name=first_name,
            last_name=last_name,
            email=email,
            password=Command.PASSWORD,
            bio=bio,
            preferences=preferences,
        )

    def _email(self, first_name, last_name):
        email = f'{first_name}.{last_name}.{random.randint(100,999)}@example.org'
        return email

    def _username(self, first_name, last_name):
        username = f'{first_name}{last_name}'
        return username

    def _create_club(self):
        themes = ["Action","Horror","Sci-fi"]
        club_name = self.faker.word().capitalize() + "Movie Club"
        mission_statement = 'Best movie club in town!'
        theme = random.choice(themes)
        new_club = Club.objects.create(
            club_name=club_name,
            mission_statement=mission_statement,
            theme = theme,
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
