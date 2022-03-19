from django.core.management.base import BaseCommand
from api.models import Message

class Command(BaseCommand):

    def handle(self, *args, **options):
        Message.objects.all().delete()