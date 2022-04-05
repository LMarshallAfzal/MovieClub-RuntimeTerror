# from api.models import Rating, User, Movie, Membership, Club
# from rest_framework.test import APITestCase
# from django.urls import reverse
# from rest_framework import status
# from rest_framework.test import force_authenticate, APIClient
# class RecommendClubUserTestCase(APITestCase):

#     fixtures = [
#         "api/test/fixtures/genres.json",
#         'api/test/fixtures/default_user.json',
#         'api/test/fixtures/other_users.json',
#         'api/test/fixtures/recommended_movies.json',
#         'api/test/fixtures/default_club.json',
#         'api/test/fixtures/other_clubs.json',
#     ]

#     def setUp(self):
#         self.user = User.objects.get(username='johndoe')
#         self.second_user = User.objects.get(username='janedoe')
#         self.third_user = User.objects.get(username='daviddoe')
#         self.clubA = Club.objects.get(club_name="Beatles")
#         self.clubB = Club.objects.get(club_name="ADCD")
#         self.clubC = Club.objects.get(club_name="Metallica")
#         self.clubD = Club.objects.get(club_name="KISS")
#         Membership.objects.create(
#             user=self.second_user, club=self.clubA, role='M')
#         Membership.objects.create(
#             user=self.third_user, club=self.clubA, role='M')
#         Membership.objects.create(
#             user=self.second_user, club=self.clubB, role='M')
#         Membership.objects.create(
#             user=self.third_user, club=self.clubB, role='M')
#         Membership.objects.create(
#             user=self.second_user, club=self.clubC, role='M')
#         Membership.objects.create(
#             user=self.third_user, club=self.clubC, role='M')
#         Membership.objects.create(user=self.user, club=self.clubD, role='M')
#         self.movie = Movie.objects.get(ml_id=7541)
#         self.second_movie = Movie.objects.get(ml_id=101)
#         self.third_movie = Movie.objects.get(ml_id=6658)
#         self.url = reverse('rec_clubs')

#     def test_movie_recommender_url(self):
#         self.assertEqual(self.url, f'/rec_clubs/')

#     def test_recommend_clubs_to_user_endpoint_returns_3_recommended_clubs_returns_200_ok(self):
#         self.client.force_authenticate(user=self.user)
#         self.assertTrue(self.user.is_authenticated)
#         response = self.client.get(self.url)
#         self.assertEqual(len(response.data), 3)
#         self.assertEqual(response.status_code, status.HTTP_200_OK)

#     def test_recommend_clubs_to_user_endpoint_returns_2_recommended_clubs_returns_200_ok(self):
#         self.client.force_authenticate(user=self.user)
#         self.assertTrue(self.user.is_authenticated)
#         self._create_test_rated_movie()
#         response = self.client.get(self.url)
#         self.assertEqual(len(response.data), 3)
#         self.assertEqual(response.status_code, status.HTTP_200_OK)

#     def test_logged_out_user_cannot_get_recommended_clubs_returns_401_unauthorized(self):
#         response = self.client.get(self.url)
#         self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)

#     def _create_test_rated_movie(self):
#         Rating.objects.create(
#             id=0,
#             user=self.user,
#             movie=self.movie,
#             score=5.0
#         )
#         Rating.objects.create(
#             id=1,
#             user=self.user,
#             movie=self.second_movie,
#             score=5.0
#         )
#         Rating.objects.create(
#             id=11,
#             user=self.user,
#             movie=self.third_movie,
#             score=5.0
#         )
#         Rating.objects.create(
#             id=2,
#             user=self.second_user,
#             movie=self.movie,
#             score=5.0
#         )
#         Rating.objects.create(
#             id=3,
#             user=self.second_user,
#             movie=self.second_movie,
#             score=5.0
#         )
#         Rating.objects.create(
#             id=13,
#             user=self.second_user,
#             movie=self.third_movie,
#             score=5.0
#         )
#         Rating.objects.create(
#             id=4,
#             user=self.third_user,
#             movie=self.movie,
#             score=5.0
#         )
#         Rating.objects.create(
#             id=5,
#             user=self.third_user,
#             movie=self.second_movie,
#             score=5.0
#         )
#         Rating.objects.create(
#             id=15,
#             user=self.third_user,
#             movie=self.third_movie,
#             score=5.0
#         )
