# Generated by Django 4.0.1 on 2022-03-15 22:22

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0001_initial'),
    ]

    operations = [
        migrations.RenameField(
            model_name='meeting',
            old_name='organizer',
            new_name='organiser',
        ),
    ]
