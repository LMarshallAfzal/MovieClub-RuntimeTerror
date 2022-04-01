import React, { useCallback } from "react";
import { useNavigate, useParams } from "react-router";
import { Tooltip, Rating, CardHeader, CardMedia, Chip, Avatar, Box, Stack, Card, CardContent, TextField, Typography, Grid, Paper, ListItemText, ListItemButton } from "@mui/material";
import { DummyDashboardClubsData, meetings, movies } from '../resources/data/DummyDashboardClubsData';
import moviePoster from '../resources/images/empty_movie_poster.png';


function MovieDetail() {
    let {movieID} = useParams();

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

                        <Grid item xs={8}>
                            <Stack spacing={2}>


                                <Card>
                                    <CardContent>
                                        <Typography sx={{ fontSize: 20 }} color="text.secondary" gutterBottom>
                                            Year and genre:
                                        </Typography>
                                        {/* UNCOMMENT AND SUBSTITUTE WITH MOVIE GENRE */}
                                        {/* {MOVIEGENRE.map((preference) =>
                                    return <Chip style={{margin:'5px'}} label={preference} />
                                    )} */}
                                        <Chip  label="2021" />
                                        <Chip style={{ margin: '5px' }} label="Horror" />
                                        <Chip style={{ margin: '5px' }} label="Fantasy" />
                                    </CardContent>
                                </Card>

                                <Card>
                                    <CardContent>
                                        <Typography sx={{ fontSize: 20 }} color="text.secondary" gutterBottom>
                                            Director:
                                        </Typography>
                                        <Typography sx={{ fontSize: 25 }} variant="body2">
                                            Christopher Nolan
                                        </Typography>
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

                                <div>
                                    <Typography style={{ paddingLeft: '10px' }} sx={{ fontSize: 20 }} color="text.secondary" >
                                        Casts:
                                    </Typography>
                                </div>
                                <Paper style={{ maxHeight: 110, overflow: 'auto' }}>
                                    <Stack direction={"row"}>
                                        {/* SUBSTITUTE WITH MUTUAL CLUBS DATA */}
                                        {DummyDashboardClubsData.map((val) => {
                                            return (
                                                <ListItemButton>
                                                    <ListItemText primary={val.name} />
                                                </ListItemButton>
                                            );
                                        })}
                                    </Stack>
                                </Paper>

                            </Stack>
                        </Grid>

                    </Grid>
                </div>
            </Grid>
        </Grid >
    );
}

export default MovieDetail;