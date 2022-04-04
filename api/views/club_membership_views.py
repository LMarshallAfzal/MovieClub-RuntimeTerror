from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework import status
from api.serializers import *
from api.models import *
from api.helpers import *
from api.decorators import *


@api_view(['PUT'])
@permission_classes([IsAuthenticated])
@club_exists
@is_in_club
@user_in_club
@is_owner
def remove_user_from_club(request,club_id,user_id):
    club = Club.objects.get(id=club_id)
    user = User.objects.get(id=user_id)
    membership = Membership.objects.get(club=club,user=user)
    membership.delete()
    serializer = UserSerializer(user, many=False)
    return Response(serializer.data, status=status.HTTP_200_OK)

@api_view(['PUT'])
@permission_classes([IsAuthenticated])
@club_exists
@is_in_club
@user_in_club
@is_owner
def ban_member(request, club_id, user_id):
    club = Club.objects.get(id=club_id)
    user = User.objects.get(id=user_id)
    club.change_membership(user, 'B')
    return Response(status.HTTP_200_OK)

@api_view(['PUT'])
@permission_classes([IsAuthenticated])
@club_exists
@is_in_club
@user_in_club
@is_owner
@user_is_banned
def unban_member(request, club_id, user_id):
    club = Club.objects.get(id=club_id)
    banned_user = User.objects.get(id=user_id)
    club.remove_user_from_club(banned_user)
    return Response(status=status.HTTP_200_OK)


@api_view(['GET'])
@permission_classes([IsAuthenticated])
@club_exists
@is_in_club
@is_owner
def banned_member_list(request, club_id):
    club = Club.objects.get(id=club_id)
    banned = club.get_banned_members()
    if len(banned) == 0:
        raise serializers.ValidationError("There are no banned members.")
    else:
        serializer = UserSerializer(banned, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)

@api_view(['GET'])
@permission_classes([IsAuthenticated])
@club_exists
def get_club_members(request, club_id):
    club = Club.objects.get(id=club_id)
    members = club.get_all_club_members()
    serializer = UserSerializer(members, many=True)
    return Response(serializer.data, status=status.HTTP_200_OK)


@api_view(['GET'])
@permission_classes([IsAuthenticated])
@club_exists
def get_club_owner(request, club_id):
    club = Club.objects.get(id=club_id)
    owner = club.get_club_owner()
    serializer = UserSerializer(owner, many=True)
    return Response(serializer.data, status=status.HTTP_200_OK)

@api_view(["GET"])
@permission_classes([IsAuthenticated])
def get_clubs_user_is_member_of(request, user_id):
    user = User.objects.get(id=user_id)
    clubs = user.get_user_clubs()
    if not clubs:
        raise serializers.ValidationError(
            "You are currently not part of any club.")
    serializer = ClubSerializer(clubs, many=True)
    return Response(serializer.data)

@api_view(["GET"])
@permission_classes([IsAuthenticated])
def get_memberships_of_user(request, user_id):
    user = User.objects.get(id=user_id)
    memberships = user.get_user_memberships()
    serializer = MembershipSerializer(memberships, many=True)
    return Response(serializer.data)