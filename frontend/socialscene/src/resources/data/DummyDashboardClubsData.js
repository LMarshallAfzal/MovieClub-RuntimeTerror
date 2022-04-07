import React from 'react'

function get_club_membership() { 
    
    const userData = localStorage.getItem('user')
    fetch('http://127.0.0.1:8000/get_user_joined_clubs/' + userData.username + '/', {})
    .then(data => data.json())
    .then(data => console.log(data))
    .catch(error => console.error(error))
    
}

export const DummyDashboardClubsData = [
    {
        name: 'club1',
        description: 'nice club',
        themes: 'horror'
    },
    {
        name: 'club2',
        description: 'great club',
        themes: 'drama'
    },
    {
        name: 'club3',
        description: 'good club',
        themes: 'sci-fi'
    },
    {
        name: 'club4',
        description: 'bad club',
        themes: 'comedy'
    },
    {
        name: 'horrify',
        description: 'bad club',
        themes: 'terrifying'
    },
    {
        name: 'horror',
        description: 'bad club',
        themes: 'scary'
    },
    {
        name: 'horror',
        description: 'bad club',
        themes: 'scary'
    },
    {
        name: 'horror',
        description: 'bad club',
        themes: 'scary'
    },
    {
        name: 'horror',
        description: 'bad club',
        themes: 'scary'
    },
    {
        name: 'horror',
        description: 'bad club',
        themes: 'scary'
    },
    {
        name: 'horror',
        description: 'bad club',
        themes: 'scary'
    },
    {
        name: 'horror',
        description: 'bad club',
        themes: 'scary'
    },
    {
        name: 'horror',
        description: 'bad club',
        themes: 'scary'
    },
    {
        name: 'horror',
        description: 'bad club',
        themes: 'scary'
    },
    {
        name: 'horror',
        description: 'bad club',
        themes: 'scary'
    },
    {
        name: 'horror',
        description: 'bad club',
        themes: 'scary'
    },
    {
        name: 'horror',
        description: 'bad club',
        themes: 'scary'
    },
]

export const movies = [
    {
        name: 'Sex and City',
        rating: '3.9'
    },
    {
        name: 'Call Me By Your Name',
        rating: '3.9'
    },
    {
        name: 'Jesus Christ',
        rating: '3.9'
    },
    {
        name: '16 Minutes',
        rating: '3.9'
    },
    {
        name: 'Great Call',
        rating: '3.9'
    },
]

export const meetings = [
    {
        name: 'Sex and City',
        time: '15/12/2022 15:00'
    },
    {
        name: 'Call Me By Your Name',
        time: '15/12/2022 15:00'
    },
    {
        name: 'Jesus Christ',
        time: '15/12/2022 15:00'
    },
    {
        name: '16 Minutes',
        time: '15/12/2022 15:00'
    },
    {
        name: 'Great Call',
        time: '15/12/2022 15:00'
    },
]
