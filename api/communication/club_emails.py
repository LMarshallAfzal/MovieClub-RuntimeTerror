from django.core.mail import send_mail
from backend.settings import EMAIL_HOST_USER
from django.template.loader import render_to_string
from .ics_manager import ICSGenerator
from django.core.mail import EmailMessage


class ClubEmail:

    def __init__(self, club):
        self.club = club

    def send_new_meeting_notification(self):
        recipients = []
        for member in self.club.club_members.filter(membership__notifications=True):
            recipients.append(member.email)
        meeting = self.club.get_upcoming_meeting()
        html = render_to_string('new_meeting_email.html',
        {'cover_url':f'http://img.omdbapi.com/?i=tt{meeting.movie.imdb_id}&apikey=199b93be',
        'meeting_title':meeting.meeting_title,
        'meeting_description':meeting.description,
        'meeting_date':meeting.date,
        'meeting_start_time':meeting.start_time,
        'meeting_end_time':meeting.end_time,
        'meeting_link':meeting.meeting_link,
        'movie_title':meeting.movie.title,
        'movie_year':meeting.movie.year}
        )
        ICSGenerator(meeting).generate_ics()
        email = EmailMessage(
            f"{meeting.club}'s upcoming meeting",
            html,
            EMAIL_HOST_USER,
            to = recipients,
            )
        email.content_subtype = "html"
        email.attach_file('calendar.ics')
        email.send()

    def send_meeting_update_notification(self):
        recipients = []
        for member in self.club.club_members.filter(membership__notifications=True):
            recipients.append(member.email)
        meeting = self.club.get_upcoming_meeting()
        html = render_to_string('meeting_update_email.html',
        {
        'meeting_title':meeting.meeting_title,
        'meeting_date':meeting.date,
        'meeting_start_time':meeting.start_time,
        'meeting_end_time':meeting.end_time,
        'meeting_link':meeting.meeting_link,
        'movie_title': meeting.movie.title,}
        )
        ICSGenerator(meeting).generate_ics()
        email = EmailMessage(
            f"{meeting.club} meeting update!",
            html,
            EMAIL_HOST_USER,
            to = recipients,
            )
        email.content_subtype = "html"
        email.attach_file('calendar.ics')
        email.send()

    def send_meeting_cancellation_notification(self):
        recipients = []
        for member in self.club.club_members.filter(membership__notifications=True):
            recipients.append(member.email)
        print(recipients)
        meeting = self.club.get_upcoming_meeting()
        html = render_to_string('meeting_cancelled_email.html',{
            'meeting_title':meeting.meeting_title,
            'club_name':meeting.club.club_name,
            'meeting_date':meeting.date,
        }
        )
        email = EmailMessage(
            f"{meeting.club} meeting update!",
            html,
            EMAIL_HOST_USER,
            to = recipients,
            )
        email.content_subtype = "html"
        email.send()


        

        
