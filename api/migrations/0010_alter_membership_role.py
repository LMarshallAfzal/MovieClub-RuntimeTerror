# Generated by Django 4.0.1 on 2022-03-23 18:56

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0009_membership_is_organiser_alter_membership_role'),
    ]

    operations = [
        migrations.AlterField(
            model_name='membership',
            name='role',
            field=models.CharField(choices=[('M', 'Member'), ('O', 'Owner'), ('B', 'BannedMember')], default='M', max_length=1),
        ),
    ]
