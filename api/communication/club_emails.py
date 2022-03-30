from django.core.mail import send_mail
from backend.settings import EMAIL_HOST_USER
from django.template.loader import render_to_string

class ClubEmail:

    def __init__(self, club):
        self.club = club

    def send_new_meeting_notification(self):
        recipients = []
        meeting = self.club.get_upcoming_meeting()
        html = render_to_string('new_meeting_email.html',{'cover_url':f'http://img.omdbapi.com/?i=tt{meeting.movie.imdb_id}&apikey=d938f360 ','meeting_title':meeting.meeting_title,'meeting_description':meeting.description,'meeting_date':meeting.date,'meeting_start_time':meeting.start_time})
        for member in self.club.club_members.filter(membership__notifications=True):
            recipients.append(member.email)
        send_mail(
            f"{meeting.club}'s upcoming meeting",
            f'A new meeting got added called: {meeting.meeting_title}.\n It will happen at {meeting.date} and the start time is {meeting.start_time}.',
            EMAIL_HOST_USER,
            recipients,
            html_message=html
            )


