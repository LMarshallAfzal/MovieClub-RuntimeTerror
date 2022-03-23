import React from "react";
import {Card, CardActionArea, CardActions, CardContent, CardMedia, Grid, Rating} from "@mui/material";
import "../styling/components/NewEventForm.css";
import {dummyRecommendedMovies} from "../pages/data/DummyRecommendedMovies";
import EnterButton from "./EnterButton";

function NewEvent() {
    return (
        <Grid container padding={1}>
            <Grid item xs={12}>
                <h4 className={"home-page-card-title"}>new event:</h4>
            </Grid>

            <Grid item xs={12}>
                <Grid container
                      direction="row"
                      justifyContent="space-evenly"
                      alignItems="stretch">

                    {dummyRecommendedMovies.map((movie) => {
                        return (
                            <Grid item xs={2} >
                                <Card sx={{flexDirection: "column", height: "100%"}} >
                                    {/*<CardActionArea>*/}
                                    <CardMedia component={"img"}
                                               alt={movie.title}
                                               image={movie.poster}/>

                                    <Grid container
                                          direction={"column"}
                                          alignItems={"center"}
                                          textAlign={"center"}
                                    >
                                        {/*<CardHeader title={movie.title}/>*/}
                                        <Rating readOnly
                                                sx={{fontSize: "1.2em"}}
                                                name={"read-only"}
                                                value={movie.rating}
                                        />
                                        <h6 className={"new-event-movie-text"}>{movie.title}</h6>

                                    </Grid>
                                        {/*</CardActionArea>*/}
                                </Card>
                            </Grid>
                        )})}
                </Grid>
            </Grid>
        </Grid>
    );
}

export default NewEvent;