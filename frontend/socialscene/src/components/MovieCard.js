import React, {useCallback, useState} from "react";
import {Card, CardMedia, Chip, Collapse, Grid, Rating, Stack, Tooltip} from "@mui/material";
import "../styling/components/MovieCard.css";
import ThemeButton from "./core/ThemeButton";
import {useNavigate} from "react-router-dom";
import MovieWatchRateDialog from "./helper/MovieWatchRateDialog";

function MovieCard(props) {
    const [watchedMovies, setWatchedMovies] = useState([]);
    const [showEvent, setShowEvent] = useState(false);
    const [showPrompt, setShowPrompt] = useState(false);
    const [promptData, setPromptData] = useState("");
    const [cardWidth, setCardWidth] = useState(150);

    const closePrompt = () => {
        setShowPrompt(false);
    }

    const navigate = useNavigate();
    const createNewClub = useCallback(() => navigate('/home/discussion', {replace: false}), [navigate]);


    //MovieCard is passed the movie object, all movie interactions occurs here

    function MovieClub() {
        if (props.isClubMovie === true) {
            return (
                <>
                    {/*<Tooltip title={props.movie.club} placement={"top"}>*/}
                    <Chip
                        onMouseEnter={() => setShowEvent(true)}
                        onMouseLeave={() => setShowEvent(false)}
                        label={props.movie.club}
                        onClick={createNewClub}
                    />
                    {/*</Tooltip>*/}

                    <Collapse in={showEvent}>
                        <Tooltip title={"event title"} placement="top">
                            <p className={"movie-card-event"}>event</p>
                        </Tooltip>
                        <h6>{props.movie.deadline}</h6>
                        <h6>17:30</h6>
                    </Collapse>
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
            <Card sx={{width: cardWidth, transition: "ease-out", transitionDuration: "0.2s",}}
                  onMouseEnter={() => setCardWidth(170)}
                  onMouseLeave={() => setCardWidth(150)}
                  translate={"yes"}
            >

                <CardMedia
                    component="img"
                    sx={{height: "100%"}}
                    image={props.poster}
                    alt={props.movie.title}
                />

                <Stack paddingTop={1} alignItems={"center"}>
                    <Rating
                        readOnly
                        sx={{fontSize: "1.2em"}}
                        precision={0.5}
                        name={"read-only"}
                        value={props.movie.rating}
                    />
                </Stack>

                <Stack spacing={1} padding={1} alignItems={"left"}>
                    <Tooltip title={props.movie.title} placement="top">
                        <h6 className={"movie-card-title"}>{props.movie.title}</h6>
                    </Tooltip>
                    <MovieClub/>
                    <MovieWatchRateDialog isOpen={showPrompt} onClose={closePrompt} data={promptData}/>
                    <ThemeButton
                        text={"watch"}
                        style={"primary"}
                        onClick={() => {
                            setPromptData(props.movie);
                            setShowPrompt(true);
                        }}
                    />
                </Stack>
            </Card>
        </Grid>
    );
}

export default MovieCard;

