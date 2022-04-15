import React, {useEffect, useState} from "react";
import axios from "axios";

export const MovieDataAPI = (props) => {
    const [movie, setMovie] = useState();
    const apiKey = "199b93be";
    const movieID = "tt" + props

    useEffect(() => {
        axios
            .get(`http://www.omdbapi.com/?i=${movieID}&apikey=${apiKey}`)
            .then((res) => {
                setMovie(res.data)
            })
    }, [movieID])

    // const getMovieObjectFromAPI = async imdbID => {
    //     return await axios.get('path/to/get')
    // }

    return (
        movie
    )
}