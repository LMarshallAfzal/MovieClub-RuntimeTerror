import React, {useEffect, useState} from "react";
import axios from "axios";

export const MovieDataAPI = (props) => {
    const [movie, setMovie] = useState();
    const apiKey = "d938f360";
    const movieID = "tt" + props

    axios
            .get(`http://www.omdbapi.com/?i=${movieID}&apikey=${apiKey}`)
            .then((res) => {setMovie(res.data)})

    // useEffect(() => {
    //     axios
    //         .get(`http://www.omdbapi.com/?i=${movieID}&apikey=${apiKey}`)
    //         .then((res) => {setMovie(res.data)})
    // })


    return (
        movie
    )
}