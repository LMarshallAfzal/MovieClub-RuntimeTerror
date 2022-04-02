# from api.models import Rating, User, Movie, Membership, Club
# from rest_framework.test import APITestCase
# from django.urls import reverse
# from rest_framework import status
# from rest_framework.test import force_authenticate,APIClient
# from recommender.meeting_movie_rec_data import MeetingMovieRecommenderData as Data



# class RecommendMovieMeetingTestCase(APITestCase):

#     fixtures = [
#         'api/test/fixtures/default_user.json',
#         'api/test/fixtures/other_users.json',
#         'api/test/fixtures/default_club.json',
#         'api/test/fixtures/recommended_movies.json',
#         'api/test/fixtures/other_movies.json',
#     ]

#     def setUp(self):
#         self.organiser = User.objects.get(username='johndoe')
#         self.member = User.objects.get(username='janedoe')
#         self.club = Club.objects.get(club_name="Beatles")
#         Membership.objects.create(user = self.organiser, club = self.club, role = 'M',is_organiser = True)
#         Membership.objects.create(user = self.member, club = self.club, role = 'M',is_organiser = False)
#         self.movie = Movie.objects.get(ml_id=6658)
#         self.url = reverse('recommend_movie_meeting', kwargs={'club_id':self.club.id})
#         self.train_url = reverse('train_meeting_data')
#         self.data = Data()

#     def test_meeting_movie_recommender_url(self):
#         self.assertEqual(self.url, f'/rec_meeting/{self.club.id}/')

#     def test_recommend_movies_to_meeting_organiser_endpoint_with_no_ratings_from_members_returns_5_recommended_movies_returns_200_ok(self):
#         self.client.force_authenticate(user=self.organiser)
#         self.assertTrue(self.organiser.is_authenticated)
#         response = self.client.get(self.url)
#         self.assertEqual(len(response.data), 5)
#         self.assertEqual(response.status_code, status.HTTP_200_OK)

#     def test_recommend_movies_to_meeting_organiser_endpoint_returns_5_recommended_movies_returns_200_ok(self):
#         self.client.force_authenticate(user=self.organiser)
#         self.assertTrue(self.organiser.is_authenticated)
#         self._create_test_rated_movie()
#         train_response = self.client.get(self.train_url)
#         self.assertEqual(train_response.status_code, status.HTTP_200_OK)
#         response = self.client.get(self.url)
#         self.assertEqual(len(response.data), 5)
#         self.assertEqual(response.status_code, status.HTTP_200_OK)
#         self.data.clean()

#     def test_recommend_movies_to_not_meeting_organiser_endpoint_returns_none_returns_403_forbidden(self):
#         self.client.force_authenticate(user=self.member)
#         self.assertTrue(self.member.is_authenticated)
#         self._create_test_rated_movie()
#         train_response = self.client.get(self.train_url)
#         self.assertEqual(train_response.status_code, status.HTTP_200_OK)
#         response = self.client.get(self.url)
#         self.assertEqual(response.status_code, status.HTTP_403_FORBIDDEN)
#         self.data.clean()
    
#     def test_logged_out_user_cannot_get_recommended_meeting_movies_returns_401_unauthorized(self):
#         response = self.client.get(self.url)
#         self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)

#     def _create_test_rated_movie(self):
#         Rating.objects.create(
#             user=self.organiser,
#             movie=self.movie,
#             score = 5.0
#         )
#         Rating.objects.create(
#             user=self.member,
#             movie=self.movie,
#             score = 5.0
#         )
    
