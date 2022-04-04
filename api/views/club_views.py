from rest_framework.decorators import api_view, permission_classes, authentication_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework import status
from api.serializers import *
from api.models import *
from api.helpers import *
from api.decorators import *
from django.core.exceptions import ObjectDoesNotExist

@api_view(["POST"])
@permission_classes([IsAuthenticated])
def create_club(request):
    serializer = CreateClubSerializer(data=request.data)
    if serializer.is_valid():
        club = serializer.save()
        Membership.objects.create(user=request.user, club=club, role="O")
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    else:
        errors = serializer.errors
        return Response(errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['PUT'])
@permission_classes([IsAuthenticated])
@club_exists
@is_in_club
@is_owner
def edit_club(request,club_id):
    club = Club.objects.get(id=club_id)
    serializer = UpdateClubSerializer(club, data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data, status=status.HTTP_200_OK)
    else:
        return Response(serializer._errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(["POST"])
@permission_classes([IsAuthenticated])
@club_exists
def join_club(request, club_id):
    club = Club.objects.get(id=club_id)
    try:
        Membership.objects.get(club=club, user=request.user)
    except ObjectDoesNotExist:
        club.club_members.add(request.user, through_defaults={'role': 'M'})
        membership = Membership.objects.get(club=club, user=request.user)
        serializer = MembershipSerializer(membership, many=False)
        return Response(serializer.data, status=status.HTTP_200_OK)
    else:
        raise serializers.ValidationError(
            "You are already a member of this club!")


@api_view(["POST"])
@permission_classes([IsAuthenticated])
@club_exists
@is_in_club
@not_banned
def leave_club(request, club_id):
    club = Club.objects.get(id=club_id)
    Membership.objects.get(user=request.user, club=club).delete()
    serializer = UserSerializer(request.user,many=False)
    return Response(serializer.data,status=status.HTTP_200_OK)

@api_view(["DELETE"])
@permission_classes([IsAuthenticated])
@club_exists
@is_in_club
@is_owner
def delete_club(request,club_id):
    club = Club.objects.get(id=club_id)
    club.delete()
    return Response(status=status.HTTP_200_OK)

@api_view(["GET"])
@permission_classes([IsAuthenticated])
def get_all_clubs(request):
    clubs = Club.objects.all()
    serializer = ClubSerializer(clubs, many=True)
    return Response(serializer.data, status=status.HTTP_200_OK)

@api_view(['GET'])
def get_club(request, club_id):
    club = Club.objects.get(id=club_id)
    serializer = ClubSerializer(club, many=False)
    return Response(serializer.data, status=status.HTTP_200_OK)

@api_view(['GET'])
@permission_classes([IsAuthenticated])
@club_exists
@is_in_club
@not_banned
def message_forum(request, club_id):
    messages = Message.objects.filter(club=club_id)
    serializer = MessageSerializer(messages, many=True)
    return Response(serializer.data, status=status.HTTP_200_OK)

@api_view(['POST'])
@permission_classes([IsAuthenticated])
@club_exists
@is_in_club
@not_banned
def write_message(request, club_id):
    serializer = WriteMessageSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)