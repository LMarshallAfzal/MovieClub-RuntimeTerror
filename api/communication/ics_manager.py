from ics import Calendar,Event
import datetime
from datetime import datetime

class ICSGenerator:

    def __init__(self,meeting):
        self.meeting = meeting
        self.cal = Calendar()
        self.event = Event()

    def generate_ics(self):
        self.event.name = self.meeting.meeting_title
        self.event.begin = datetime.combine(self.meeting.date, self.meeting.start_time)
        self.event.end = datetime.combine(self.meeting.date, self.meeting.end_time)
        self.event.location = self.meeting.meeting_link
        self.cal.events.add(self.event)
        self.cal.events
        with open('temp.ics', 'w') as my_file:
            my_file.writelines(self.cal)
        my_file.close()