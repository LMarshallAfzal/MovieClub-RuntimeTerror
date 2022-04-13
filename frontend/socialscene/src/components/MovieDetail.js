import React, { useContext, useEffect, useState, useCallback } from "react";
import { useParams } from "react-router";
import axios from "axios";
import {
    Card,
    CardContent,
    CardMedia,
    Grid,
    ListItemButton,
    ListItemText,
    Paper,
    Rating,
    Stack,
    Typography
} from "@mui/material";
import { DummyDashboardClubsData } from '../resources/data/DummyDashboardClubsData';
import "../styling/components/MovieDetail.css";
import moviePoster from '../resources/images/empty_movie_poster.png';
import AuthContext from "./helper/AuthContext";
import { MovieDataAPI } from "./helper/MovieDataAPI";
import LoadingSkeleton from "./helper/LoadingSkeleton";


function MovieDetail() {
    const params = useParams();
    let { movieID } = useParams();
    console.log(params)
    console.log(movieID)
    console.log(params, Object.keys(params), params.movieID, typeof params.movieID);
    const [movie, setMovie] = useState("");
    const [movieAPIData,setMovieAPIData] = useState("");

    let { user, authTokens } = useContext(AuthContext);


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
    }, [movie.imdb_id,movieID]);
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

            <Grid item xs={12} style={{ paddingTop: '20px' }}>
                <div className={"home-page-card-background"} style={{ padding: '20px' }}>
                    <h4 className={"home-page-card-title"}>{movie.title}
                        <h4--emphasise>.</h4--emphasise>
                    </h4>

                    <Grid container
                        spacing={2}
                        direction={"row"}
                        paddingTop={'20px'}
                        justifyContent="center"
                    // alignItems="center"
                    >
                        <Grid item xs={4}>

                            <Grid item>
                                <Stack paddingTop={1} alignItems={"center"} spacing={1}>
                                    <Card sx={{ width: "100%" }}>
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
                        </Grid>

                        <Grid item xs={8}>
                            <Stack spacing={2}>
                                <Card>
                                    <CardContent>
                                        <h5>Year: </h5><span>{movieAPIData.Year}</span>
                                        <h5>Released: </h5><span>{movieAPIData.Released}</span>
                                        <h5>Runtime: </h5><span>{movieAPIData.Runtime}</span>
                                        <h5>Genre: </h5><span>{movieAPIData.Genre}</span>
                                        <h5>Director: </h5><span>{movieAPIData.Director}</span>
                                        <h5>Writer: </h5><span>{movieAPIData.Writer}</span>
                                        <h5>Actors: </h5><span>{movieAPIData.Actors}</span>
                                        <h5>Awards: </h5><span>{movieAPIData.Awards}</span>
                                        <h5>Language: </h5><span>{movieAPIData.Language}</span>
                                        <h5>Rated: </h5><span>{movieAPIData.Rated}</span>
                                        <h5>Plot: </h5><span>{movieAPIData.Plot}</span>
                                    </CardContent>
                                </Card>

                                <Card>
                                    <CardContent>
                                        <Typography sx={{ fontSize: 20 }} color="text.secondary" gutterBottom>
                                            Rate the movie:
                                        </Typography>
                                        <Rating
                                            name="simple-controlled"
                                            sx={{ width: "100%" }}
                                            precision={0.5}
                                            max={5}
                                        />
                                    </CardContent>
                                </Card>

                                
                            </Stack>
                        </Grid>
                    </Grid>
                </div>
            </Grid>
        </Grid>
    );
}

export default MovieDetail;