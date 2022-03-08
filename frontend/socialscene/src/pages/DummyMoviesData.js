import React from 'react'
import avengerImage from "../styling/avengers.jpg";
import djangoImage from "../styling/django.jpeg";
import jackImage from "../styling/jack-giant.jpg";

export const moviesWithPoster = [
    {
        title: 'The Avengers',
        poster: avengerImage,
        rating: 4.0,
        club: 'clubOne',
        deadline: '12/12/2022',
    },
    {
        title: 'Django Unchained',
        poster: djangoImage,
        rating: 4.5,
        club: 'clubTwo',
        deadline: '12/08/2022',
    },
    {
        title: 'Jack the Giant Slayer',
        poster: jackImage,
        rating: 4.3,
        club: 'clubThree',
        deadline: '12/17/2022',
    },
]