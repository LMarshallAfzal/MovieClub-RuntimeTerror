import React from "react";
import {Card, CardMedia, Grid, Rating, Stack, TextField} from "@mui/material";
import "../styling/components/NewEventForm.css";
import {useParams} from "react-router";
import {DummyClubData} from "../pages/data/DummyClubsData";
import {DummyClubEventData} from "../pages/data/DummyClubEventData";
import {dummyRecommendedMovies} from "../pages/data/DummyRecommendedMovies";


function ShowEvent() {

    let { clubID } = useParams();
    let club = DummyClubData.find(obj => obj.ID === clubID);
    let event = DummyClubEventData.find(obj => obj.clubID === club.ID);
    let movie = dummyRecommendedMovies.find(obj => obj.ID === event.movieID);
    console.log(movie.title);


    return (
        <div className={"home-page-card-background"}>
            <Grid container padding={2} spacing={2}>
                <Grid item xs={12}>
                    <h4 className={"home-page-card-title"}>event: <span style={{color: "black"}}>{event.title}</span></h4>
                </Grid>

                <Grid item xs={12}>
                    <Grid container direction={"row"} padding={2}>
                        <Grid item xs={6}>
                            <Card sx={{flexDirection: "column", height: "100%"}} >
                                        {/*<CardActionArea>*/}
                                        <CardMedia component={"img"}
                                                   alt={movie.title}
                                                   image={movie.poster}/>

                                        <Grid container
                                              direction={"column"}
                                              alignItems={"center"}
                                              textAlign={"center"}>

                                            <Rating readOnly
                                                    sx={{fontSize: "1.2em"}}
                                                    name={"read-only"}
                                                    value={movie.rating}/>

                                            <h6 className={"new-event-movie-text"}>{movie.title}</h6>

                                        </Grid>
                                            {/*</CardActionArea>*/}
                                    </Card>

                        </Grid>

                        <Grid item xs={6}>
                            <Stack spacing={2}>
                                <TextField
                                    id="standard-read-only-input"
                                    label={"title:"}
                                    value={event.title}
                                     InputProps={{
                                        readOnly: true,}}
                                    variant="standard"
                                />

                                <TextField
                                    id="standard-multiline-static"
                                    label={"description:"}
                                    value={event.description}
                                    multiline
                                    rows={4}
                                    defaultValue="Default Value"
                                    variant="standard"
                                />
                                <TextField id="date"
                                   label="date:"
                                   type="date"
                                   value={event.date}
                                   fullWidth
                                   InputLabelProps={{
                                       shrink: true,
                                   }}
                        />
                        <TextField
                            id="time"
                            label="start:"
                            type="time"
                            value={event.start}
                            InputLabelProps={{
                                shrink: true,
                            }}
                            inputProps={{step: 300,}}
                            fullWidth
                        />
                        <TextField
                            id="time"
                            label="end:"
                            type="time"
                            value={event.end}
                            InputLabelProps={{
                                shrink: true,
                            }}
                            inputProps={{step: 300,}}
                            fullWidth
                        />
                            </Stack>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        </div>
    );
}

export default ShowEvent;