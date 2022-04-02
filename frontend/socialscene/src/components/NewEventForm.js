import React, {useState} from "react";
import {
    Card,
    CardActionArea,
    CardHeader,
    CardMedia,
    Grid,
    Rating,
    Stack,
    TextField,
    Tooltip,
    Typography
} from "@mui/material";
import "../styling/components/NewEventForm.css";
import {dummyRecommendedMovies} from "../pages/data/DummyRecommendedMovies";
import FormButton from "./FormButton";
import moviePoster from "../styling/images/empty_movie_poster.png";

function NewEvent() {
    let day = new Date();
    let nextDay = new Date(day);
    let tomorrow = nextDay.setDate(day.getDate()+2);

    const [selectedMovie, setSelectedMovie] = useState("");


    return (
        <div className={"home-page-card-background"}>
            <Grid container padding={2} spacing={2}>

                <Grid item xs={12}>
                    <h5 className={"home-page-card-title"}>new event:</h5>
                </Grid>

                <Grid item xs={12}>
                    <Grid container
                          direction="row"
                          justifyContent="space-evenly"
                          alignItems="stretch">

                        {dummyRecommendedMovies.map((movie) => {
                            return (
                                <Grid item xs={2}>
                                    <Card sx={{flexDirection: "column", height: "100%"}} >
                                        <CardActionArea sx={{flexDirection: "column", height: "100%"}} onClick={() => setSelectedMovie(movie.title)}>
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

                                            <Tooltip title={movie.title} placement="top-start">
                                                <h6 className={"new-event-movie-text"}>{movie.title}</h6>
                                            </Tooltip>

                                        </Grid>
                                            </CardActionArea>
                                    </Card>
                                </Grid>

                            )})}
                    </Grid>
                </Grid>

                <Grid item xs={6}>
                    <Stack spacing={2}>
                        <TextField id={"outlined"}
                                   label={"title:"}
                                   placeholder={"event title"}
                        />
                        <TextField id={"outlined"}
                                   label={"description:"}
                                   placeholder={"short event description"}
                        />
                        <TextField disabled
                                   id="outlined-disabled"
                                   label="movie:"
                                   value={selectedMovie}
                        />
                    </Stack>
                </Grid>
                <Grid item xs={6}>
                    <Stack spacing={2}>
                        <TextField id="date"
                                   label="date:"
                                   type="date"
                                   defaultValue={tomorrow}
                                   fullWidth
                                   InputLabelProps={{
                                       shrink: true,
                                   }}
                        />
                        <TextField
                            id="time"
                            label="start:"
                            type="time"
                            defaultValue="17:00"
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
                            defaultValue="18:00"
                            InputLabelProps={{
                                shrink: true,
                            }}
                            inputProps={{step: 300,}}
                            fullWidth
                        />
                    </Stack>
                </Grid>
                <Grid item xs={12}>
                    <FormButton text={"create"} style={"primary"}/>
                </Grid>
            </Grid>
        </div>
    );
}

export default NewEvent;