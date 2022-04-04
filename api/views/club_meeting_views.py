from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework import status
from api.serializers import *
from api.models import *
from api.helpers import *
from api.decorators import *
from api.communication.club_emails import ClubEmail 

@api_view(["POST"])
@permission_classes([IsAuthenticated])
@club_exists
@is_in_club
@not_banned
@club_has_no_upcoming_meeting
def create_meeting(request, club_id):
    club = Club.objects.get(id=club_id)
    serializer = CreateMeetingSerializer(
        data=request.data, context={"request": request})
    if serializer.is_valid():
        serializer.save()
        Membership.objects.get(user=request.user, club=club).toggle_organiser()
        ClubEmail(club).send_new_meeting_notification()
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    else:
        errors = serializer.errors
        return Response(errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['PUT'])
@permission_classes([IsAuthenticated])
@club_exists
@is_management
@club_has_upcoming_meeting
def edit_meeting(request, club_id):
    club = Club.objects.get(id=club_id)
    meeting = club.get_upcoming_meeting()
    serializer = UpdateMeetingSerializer(meeting, data=request.data)
    if serializer.is_valid():
        serializer.save()
        ClubEmail(club).send_meeting_update_notification()
        return Response(serializer.data, status=status.HTTP_200_OK)
    else:
        return Response(serializer._errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['PUT'])
@permission_classes([IsAuthenticated])
@club_exists
@club_has_upcoming_meeting
@is_in_club
@not_banned
@not_attendee
def attend_meeting(request, club_id):
    club = Club.objects.get(id=club_id)
    meeting = club.get_upcoming_meeting()
    request.user.attend_meeting(meeting)
    serializer = MeetingSerializer(meeting, many=False)
    return Response(serializer.data, status=status.HTTP_200_OK)


@api_view(['PUT'])
@permission_classes([IsAuthenticated])
@club_exists
@is_in_club
@not_banned
@club_has_upcoming_meeting
@is_attendee
def leave_meeting(request, club_id):
    club = Club.objects.get(id=club_id)
    meeting = club.get_upcoming_meeting()
    request.user.leave_meeting(meeting)
    serializer = MeetingSerializer(meeting, many=False)
    return Response(serializer.data, status=status.HTTP_200_OK)

@api_view(['GET'])
def check_upcoming_meetings(request):
    update_upcoming_meetings()
    return Response(status=status.HTTP_200_OK)


@api_view(['DELETE'])
@club_exists
@is_in_club
@is_management
@permission_classes([IsAuthenticated])
def cancel_meeting(request, club_id):
    club = Club.objects.get(id=club_id)
    meeting = club.get_upcoming_meeting()
    ClubEmail(club).send_meeting_cancellation_notification()
    meeting.delete()
    return Response(status=status.HTTP_200_OK)


@api_view(['GET'])
@club_exists
@is_in_club
@club_has_upcoming_meeting
@not_banned
def get_club_upcoming_meeting(request, club_id):
    club = Club.objects.get(id=club_id)
    meeting = club.get_upcoming_meeting()
    serializer = MeetingSerializer(meeting, many=False)
    return Response(serializer.data, status=status.HTTP_200_OK)

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def get_user_upcoming_attending_meetings(request):
    meetings = request.user.get_attending_meetings()
    if not meetings:
        raise serializers.ValidationError(
            "You are currently not attending any meetings.")
    serializer = MeetingSerializer(meetings, many=True)
    return Response(serializer.data, status=status.HTTP_200_OK)