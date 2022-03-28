import React from "react";
import movie1 from "../../styling/images/example movies/movie1.jpg";
import movie2 from "../../styling/images/example movies/movie2.jpg";
import movie3 from "../../styling/images/example movies/movie3.jpeg";
import movie4 from "../../styling/images/example movies/movie4.jpg";
import movie5 from "../../styling/images/example movies/movie5.jpg";

export const dummyRecommendedMovies = [
    {
        ID: 1,
        title: "Moonlight",
        poster: movie1,
        rating: 3.1,
        watched: false,
    },
    {
        ID: 2,
        title: "Avatar",
        poster: movie2,
        rating: 4.9,
        watched: true,
    },
    {
        ID: 3,
        title: "Bee Movie",
        poster: movie3,
        rating: 2.8,
        watched: false,
    },
    {
        ID: 4,
        title: "Howl's Moving Castle",
        poster: movie4,
        rating: 5,
        watched: false,
    },
    {
        ID: 5,
        title: "Madagascar: Escape 2 Africa",
        poster: movie5,
        rating: 4.3,
        watched: true,
    },
]