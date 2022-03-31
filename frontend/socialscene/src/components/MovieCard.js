import React, { useState } from "react";
import { useParams } from "react-router";
import { Typography, Tooltip, Rating, CardMedia, Card, ListItem, Avatar, AvatarGroup, Box, Chip, Grid, Stack } from "@mui/material";
import icon5 from "../resources/images/example icons/icon5.jpeg"
import icon2 from "../resources/images/example icons/icon2.jpeg"
import icon3 from "../resources/images/example icons/icon3.jpeg"
import icon4 from "../resources/images/example icons/icon4.jpeg"
import "../styling/components/ClubCard.css";
import RoundButton from "./core/RoundButton";
import { Link } from "react-router-dom";
import ThemeButton from "./core/ThemeButton";

function MovieCard(props) {
    // let { movieID } = useParams();
    const [watchedMovies, setWatchedMovies] = useState([]);

    function MovieClub() {
        if (props.isClubMovie === true) {
            return (
                <>
                    <Tooltip title={`From ${props.movie.club}`} placement="top-start">
                        <Typography fontSize="1" noWrap>{`From ${props.movie.club}`}</Typography>
                    </Tooltip>

                    <Tooltip title={`Due ${props.movie.deadline}`} placement="top-start">
                        <Typography fontSize="1" noWrap>{`Due ${props.movie.deadline}`}</Typography>
                    </Tooltip>
                </>
            )
        } else {
            return (
                <></>
            )
        }
    }


    return (
        <ListItem sx={{ p: 1 }}>
            <Card sx={{ width: 150 }}>
                <CardMedia
                    component="img"
                    sx={{ height: "100%" }}
                    image={props.poster}
                    alt={props.movie.title}
                />

                <Stack paddingTop={1} alignItems={"center"}>

                    <Rating
                        name="simple-controlled"
                        sx={{ fontSize: "1.2em" }}
                        precision={0.5}
                        max={5}
                    // onChange={(event, newValue) =>
                    //     setRating({
                    //         score: newValue,
                    //         onChange: AddRating(movie.id, newValue),
                    //     })
                    // }
                    />
                </Stack>

                <Stack spacing={1} padding={1} alignItems={"left"}>
                    <Tooltip title={props.movie.title} placement="top-start">
                        <Typography noWrap>{props.movie.title}</Typography>
                    </Tooltip>
                    <MovieClub />
                    <ThemeButton
                        text={"watch"}
                    // onClick={() => {
                    //     addToWatchedList(movie.id);
                    // }}
                    // onChange={() => {
                    //     getRecommendedMovies();
                    // }}
                    />
                    <clubInfo movie={props.movie} />
                </Stack>
            </Card>
        </ListItem>
    );
}

export default MovieCard;

