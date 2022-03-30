import React, { useCallback } from "react";
import { useNavigate, useParams } from "react-router";
import { Tooltip, Rating, CardHeader, CardMedia, Chip, Avatar, Box, Stack, Card, CardContent, TextField, Typography, Grid, Paper, ListItemText, ListItemButton } from "@mui/material";
import FormButton from "./FormButton";
import iconImage from "../styling/images/testIconPic.jpg";
import { DummyDashboardClubsData, meetings, movies } from '../pages/data/DummyDashboardClubsData';
import { moviesWithPoster } from '../pages/data/DummyMoviesData';
import moviePoster from '../styling/images/empty_movie_poster.png';
import { DummyClubMemberData } from "../pages/data/DummyClubMemberData";


function Movie() {
    let { movieID } = useParams();

    return (
        <Grid container
            spacing={2}
            direction={"row"}
        >

            <Grid item xs={12} style={{ paddingTop: '20px' }}>
                <div className={"home-page-card-background"} style={{ padding: '20px' }}>
                    {/* SUBSTITUTE WITH FIRST NAME AND LAST NAME */}
                    <h4 className={"home-page-card-title"}>Movie Name<h4--emphasise>.</h4--emphasise> 8.7</h4>

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
                                        <CardMedia
                                            component="img"
                                            height="100%"
                                            image={moviePoster}
                                            alt='moviePoster'
                                        />
                                    </Card>

                                </Stack>
                            </Grid>
                        </Grid>

                        <Grid item xs={4}>
                            <Stack spacing={2}>

                                <Card>
                                    <CardContent>
                                        <Typography sx={{ fontSize: 20 }} color="text.secondary" gutterBottom>
                                            year | runtime | genre :
                                        </Typography>
                                        {/* UNCOMMENT AND SUBSTITUTE WITH MOVIE GENRE */}
                                        {/* {MOVIEGENRE.map((preference) =>
                                    return <Chip style={{margin:'5px'}} label={preference} />
                                    )} */}
                                        <Chip style={{ margin: '5px' }} label="2021" />
                                        <Chip style={{ margin: '5px' }} label="125 min" />
                                        <Chip style={{ margin: '5px' }} label="Horror" />
                                        <Chip style={{ margin: '5px' }} label="Fantasy" />
                                    </CardContent>
                                </Card>

                                <Card>
                                    <CardContent>
                                        <Typography sx={{ fontSize: 20 }} color="text.secondary" gutterBottom>
                                            director:
                                        </Typography>
                                        {/* THE DIRECTOR */}
                                        <h6>Christopher Nolan</h6>
                                    </CardContent>
                                </Card>

                                <Card>
                                    <CardContent>
                                        <Typography sx={{ fontSize: 20 }} color="text.secondary" gutterBottom>
                                            actors:
                                        </Typography>
                                        {/*THE ACTORS */}
                                        <h6>Robin Williams, Kirsten Dunst, Bonnie Hunt</h6>
                                    </CardContent>
                                </Card>

                                <Card>
                                    <CardContent>
                                        <Typography sx={{ fontSize: 20 }} color="text.secondary" >
                                            rate the movie:
                                        </Typography>
                                        <Rating
                                            name="simple-controlled"
                                            sx={{ width: "100%" }}
                                            precision={0.5}
                                            max={5}
                                            paddingBottom={1}
                                        />
                                        <FormButton
                                            text={"watch"}
                                        // onClick={() => {
                                        //     addToWatchedList(movie.id);
                                        // }}
                                        // onChange={() => {
                                        //     getRecommendedMovies();
                                        // }}
                                        />
                                    </CardContent>
                                </Card>
                            </Stack>
                        </Grid>

                        <Grid item xs={4}>
                            <Stack spacing={2}>
                                <Card>
                                    <CardContent>
                                        <Typography sx={{ fontSize: 20 }} color="text.secondary" gutterBottom>
                                            awards:
                                        </Typography>
                                        {/* THE PLOT */}
                                        <h6>4 wins & 11 nominations</h6>
                                    </CardContent>
                                </Card>

                                <Card>
                                    <CardContent>
                                        <Typography sx={{ fontSize: 20 }} color="text.secondary" gutterBottom>
                                            plot:
                                        </Typography>
                                        {/* THE PLOT */}
                                        <h6>When two kids find and play a magical board game, they release a man trapped in it for decades - and a host of dangers that can only be stopped by finishing the game.</h6>
                                    </CardContent>
                                </Card>
                            </Stack>

                        </Grid>

                    </Grid>
                </div>
            </Grid>
        </Grid >
    );
}

export default Movie;