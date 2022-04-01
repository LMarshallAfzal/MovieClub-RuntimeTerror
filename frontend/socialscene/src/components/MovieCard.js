import React, {useState} from "react";
import {Card, CardMedia, Chip, Grid, Rating, Stack, Tooltip} from "@mui/material";
import "../styling/components/MovieCard.css";
import ThemeButton from "./core/ThemeButton";
import MovieWatchRateDialog from "./helper/MovieWatchRateDialog";
import LoadingSkeleton from "./helper/LoadingSkeleton";
import placeholder from "../resources/images/empty_movie_poster.png";
import {HandleNavigate} from "./helper/HandleNavigate";

function MovieCard(props) {
    const [watchedMovies, setWatchedMovies] = useState([]);
    const [showPrompt, setShowPrompt] = useState(false);
    const [promptData, setPromptData] = useState("");
    const [cardWidth, setCardWidth] = useState(150);
    const [cardBorder, setCardBorder] = useState("0px solid black");
    const [loaded, setLoaded] = useState(true);

    let moviePoster = props.poster && placeholder;


    const closePrompt = () => {
        setShowPrompt(false);
    }

    //MovieCard is passed the movie object, all movie interactions occurs here

    function ClubMovie() {
        if (props.clubMovie === true) {
            const toolText = `event: {event.title} 
                            ${props.movie.deadline}
                            at {eventtime}`;
            return (
                <>
                    <Tooltip
                        arrow
                        placement={"right"}
                        title={
                            <>
                                <p className={"movie-card-event"}>event</p>
                                <h6>{props.movie.deadline}</h6>
                                <h6>17:30</h6>
                            </>
                        }>
                        <Chip
                            label={props.movie.club}
                            onClick={() => HandleNavigate("/home/discussion")}
                        />
                    </Tooltip>
                </>
            )
        } else {
            return (
                <></>
            )
        }
    }

    function RateMovie() {
        if (props.rateMovie === true) {
            return (
                <>
                    <MovieWatchRateDialog isOpen={showPrompt} onClose={closePrompt} data={promptData}/>
                    <ThemeButton
                        text={"watch"}
                        style={"primary"}
                        onClick={() => {
                            setPromptData(props.movie);
                            setShowPrompt(true);
                        }}
                    />
                </>
            )
        } else {
            return (
                <></>
            )
        }
    }

    return (
        <Grid item>
            <LoadingSkeleton loading={loaded}>
                <Card sx={{
                    width: cardWidth,
                    transition: "ease-out",
                    transitionDuration: "0.2s",
                    border: cardBorder
                }}
                      onMouseEnter={() => {
                          setCardWidth(160)
                          setCardBorder("2px solid red")
                      }}
                      onMouseLeave={() => {
                          setCardWidth(150)
                          setCardBorder("0px solid black")
                      }}
                      translate={"yes"}
                >


                    <CardMedia
                        component={"img"}
                        sx={{height: "100%"}}
                        image={moviePoster}
                        alt={props.movie.title}
                    />

                    <Tooltip
                        arrow
                        placement="right"
                        title={
                            <p className={"movie-card-event"}>{props.movie.rating} stars</p>
                        }
                    >
                        <Stack paddingTop={1} alignItems={"center"}>

                            <Rating
                                readOnly
                                sx={{fontSize: "1.2em"}}
                                precision={0.5}
                                name={"read-only"}
                                value={props.movie.rating}
                            />

                        </Stack>
                    </Tooltip>

                    <Stack spacing={1} padding={1} alignItems={"left"}>
                        <Tooltip
                            arrow
                            placement="right"
                            title={
                                <p className={"movie-card-event"}>{props.movie.title}</p>
                            }
                        >
                            <h6 className={"movie-card-title"}>{props.movie.title}</h6>
                        </Tooltip>

                        <ClubMovie/>

                        <RateMovie/>

                    </Stack>
                </Card>
            </LoadingSkeleton>
        </Grid>
    );
}

export default MovieCard;

