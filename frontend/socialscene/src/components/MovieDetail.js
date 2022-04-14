import React, {useContext, useEffect, useState} from "react";
import {useParams} from "react-router";
import axios from "axios";
import {Box, Card, CardMedia, Grid, Rating, Stack} from "@mui/material";
import "../styling/components/MovieDetail.css";
import moviePoster from '../resources/images/empty_movie_poster.png';
import AuthContext from "./helper/AuthContext";
import LoadingSkeleton from "./helper/LoadingSkeleton";
import HomepageCard from "./helper/HomepageCard";


function MovieDetail() {
    const params = useParams();
    let {movieID} = useParams();
    console.log(params)
    console.log(movieID)
    console.log(params, Object.keys(params), params.movieID, typeof params.movieID);
    const [movie, setMovie] = useState("");
    const [movieAPIData, setMovieAPIData] = useState("");

    let {user, authTokens} = useContext(AuthContext);


    useEffect(() => {
        let getMovie = async () => {
            let response = await fetch(
                "http://127.0.0.1:8000/get_movie/" + movieID + "/",
                {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: "Bearer " + authTokens.access,
                    },
                }
            );
            let data = await response.json();
            console.log(data);
            setMovie(data);

        };
        getMovie();
        getMovieAPIData();
        console.log(movieID);
    }, [movie.imdb_id, movieID]);
    console.log(movie);
    console.log(movie.imdb_id);
    console.log(movieAPIData);

    JSON.stringify(movie)
    let getMovieAPIData = async () => {
        axios
            .get(`http://www.omdbapi.com/?i=tt${movie.imdb_id}&apikey=88945c5e`)
            .then((res) => {
                console.log(res.data);
                setMovieAPIData(res.data)
            })
    }


    return (
        <Grid container
              spacing={2}
              direction={"row"}
        >
            <Grid item xs={12}>
                <Box padding={1} className={"home-page-sub-title"}>
                    <h4 className={"sub-title-text"}>{movie.title}</h4>
                </Box>
            </Grid>
            <Grid item xs={4}>
                <Stack alignContent={"center"} alignItems={"center"} justifyContent={"center"}
                       justifyItems={"center"}>
                    <Card sx={{width: "100%"}}>
                        <LoadingSkeleton loading={movieAPIData}>
                            <CardMedia
                                component="img"
                                height="100%"
                                image={movieAPIData ? movieAPIData.Poster : moviePoster}
                                alt='moviePoster'
                            />
                        </LoadingSkeleton>
                    </Card>
                </Stack>

            </Grid>

            <Grid item xs={8}>
                <HomepageCard title={"details"}>
                    <Grid item xs={3}>
                        <h6 className={"movie-detail-heading"}>year</h6>
                        <h5 className={"movie-detail-content"}>{movieAPIData.Year}</h5>
                    </Grid>

                    <Grid item xs={3}>
                        <h6 className={"movie-detail-heading"}>released</h6>
                        <h5 className={"movie-detail-content"}>{movieAPIData.Released}</h5>
                    </Grid>

                    <Grid item xs={3}>
                        <h6 className={"movie-detail-heading"}>runtime</h6>
                        <h5 className={"movie-detail-content"}>{movieAPIData.Runtime}</h5>
                    </Grid>

                    <Grid item xs={3}>
                        <h6 className={"movie-detail-heading"}>rated</h6>
                        <h5 className={"movie-detail-content"}>{movieAPIData.Rated}</h5>
                    </Grid>

                    <Grid item xs={12}>
                        <h6 className={"movie-detail-heading"}>plot</h6>
                        <h5 className={"movie-detail-content"}>{movieAPIData.Plot}</h5>
                    </Grid>

                    <Grid item xs={12}>
                        <Stack spacing={1}>

                            <Stack>
                                <h6 className={"movie-detail-heading"}>genres</h6>
                                <h5 className={"movie-detail-content"}>{movieAPIData.Genre}</h5>
                            </Stack>

                            <Stack>
                                <h6 className={"movie-detail-heading"}>directors</h6>
                                <h5 className={"movie-detail-content"}>{movieAPIData.Director}</h5>
                            </Stack>

                            <Stack>
                                <h6 className={"movie-detail-heading"}>writers</h6>
                                <h5 className={"movie-detail-content"}>{movieAPIData.Writer}</h5>
                            </Stack>

                            <Stack>
                                <h6 className={"movie-detail-heading"}>actors</h6>
                                <h5 className={"movie-detail-content"}>{movieAPIData.Actors}</h5>
                            </Stack>

                            <Stack>
                                <h6 className={"movie-detail-heading"}>awards</h6>
                                <h5 className={"movie-detail-content"}>{movieAPIData.Awards}</h5>
                            </Stack>

                            <Stack>
                                <h6 className={"movie-detail-heading"}>language</h6>
                                <h5 className={"movie-detail-content"}>{movieAPIData.Language}</h5>
                            </Stack>
                        </Stack>

                        <Grid item xs={12}>
                            <h6 className={"movie-detail-heading"}>your rating</h6>
                            <Rating
                                name="simple-controlled"
                                sx={{width: "100%"}}
                                precision={0.5}
                                max={5}
                            />
                        </Grid>
                    </Grid>
                </HomepageCard>

            </Grid>
        </Grid>
    );
}

export default MovieDetail;