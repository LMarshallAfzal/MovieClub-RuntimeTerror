from api.models import User, Movie, Watch
from rest_framework.test import APITestCase
from django.urls import reverse
from rest_framework import status

class RemoveWatchedMovieViewTestCase(APITestCase):

    fixtures = [
        'api/test/fixtures/default_user.json',
        'api/test/fixtures/default_movie.json',
    ]

    def setUp(self):
        self.movie = Movie.objects.get(movieID=1000)
        self.user = User.objects.get(username='johndoe')
        self.url = reverse('remove_watched_movie', kwargs={'movieID':self.movie.id})
        self.user.add_watched_movie(self.movie)
        self.login_details = details = {'username' : self.user.username, 'password':'Pa$$w0rd567'}
        
    
    def test_delete_to_unwatch_movie_endpoint_with_valid_data_removes_watched_movie(self):
        self.client.login(username = self.login_details['username'],password = self.login_details['password'])
        before = Watch.objects.count()
        response = self.client.delete(self.url)
        after = Watch.objects.count()
        self.assertEqual(after + 1, before)
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_delete_to_unwatch_movie_endpoint_with_invalid_movie_does_not_remove_watched_movie(self):
        self.client.login(username = self.login_details['username'],password = self.login_details['password'])
        before = Watch.objects.count()
        invalidMovieUrl = reverse('remove_watched_movie', kwargs={'movieID':0})
        response = self.client.delete(invalidMovieUrl)
        after = Watch.objects.count()
        self.assertEqual(after, before)
        self.assertEqual(response.status_code, status.HTTP_404_NOT_FOUND)

    # def test_delete_user_cannot_unwatch_same_movie_twice(self):
    #     self.client.force_login(self.user)
    #     before = Watch.objects.count()
    #     self.client.delete(self.url)
    #     response = self.client.delete(self.url)
    #     after = Watch.objects.count()
    #     self.assertEqual(after + 1, before)
    #     self.assertEqual(response.status_code, status.HTTP_200_OK)

    # def test_delete_to_unwatch_movie_endpoint_with_user_not_logged_in_does_not_remove_watched_movie(self):
    #     before = Watch.objects.count()
    #     response = self.client.delete(self.url)
    #     after = Watch.objects.count()
    #     self.assertEqual(after, before)
    #     self.assertEqual(response.status_code, status.HTTP_403_FORBIDDEN)
