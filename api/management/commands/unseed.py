from django.core.management.base import BaseCommand
from api.models import Movie, User,Club,Membership

class Command(BaseCommand):

    def handle(self, *args, **options):
        User.objects.filter(is_staff = False, is_superuser = False, email__contains='@example.org').delete()
        Club.objects.filter(mission_statement__contains='Movie').delete()
        Movie.objects.all().delete()
