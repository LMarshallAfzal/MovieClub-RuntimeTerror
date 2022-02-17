from django.db import models

class Movie(models.Model):
    movie_name = models.CharField(
        max_length=100,
        blank=False,
        unique=True
    )

    release_year = models.PositiveIntegerField()
    
    genres = models.CharField(
        max_length=100,
        unique=False,
        blank=False
    )

    class Meta:
        ordering = ['movie_name']

class Viewer(models.Model):
    viewer_id = models.CharField(primary_key=True,max_length=200)
    average_rating = models.FloatField(max_length=20, min = 0.0, max = 5.0)

class Rating(models.Model):
    viewer = models.ForeignKey(Viewer,on_delete=models.CASCADE)
    movie = models.ForeignKey(Movie, on_delete=models.CASCADE)
    rating = models.FloatField(min = 0.0,max = 5.0) 