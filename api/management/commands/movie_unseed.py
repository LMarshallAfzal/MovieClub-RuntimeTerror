from django.core.management.base import BaseCommand
from api.models import Movie, Topic

class Command(BaseCommand):

    def handle(self, *args, **options):
        Movie.objects.all().delete()
        Topic.objects.all().delete()