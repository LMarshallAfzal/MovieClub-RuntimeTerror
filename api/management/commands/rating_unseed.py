from django.core.management.base import BaseCommand
from api.models import Rating

class Command(BaseCommand):

    def handle(self, *args, **options):
        Rating.objects.all().delete()