import React, {useCallback, useState} from "react";
import {Card, CardMedia, Chip, Grid, Rating, Stack, Tooltip} from "@mui/material";
import "../styling/components/MovieCard.css";
import ThemeButton from "./core/ThemeButton";
import {useNavigate} from "react-router-dom";
import MovieWatchRateDialog from "./helper/MovieWatchRateDialog";
import LoadingSkeleton from "./helper/LoadingSkeleton";
import placeholder from "../resources/images/empty_movie_poster.png";

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

    const navigate = useNavigate();
    const createNewClub = useCallback(() => navigate('/home/discussion', {replace: false}), [navigate]);


    //MovieCard is passed the movie object, all movie interactions occurs here

    function MovieClub() {
        if (props.isClubMovie === true) {
            const toolText = `event: {event.title} 
                            ${props.movie.deadline}
                            at {eventtime}`;
            return (
                <>
                    <Tooltip title={toolText}>
                        <Chip
                            label={props.movie.club}
                            onClick={createNewClub}
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
                        component="img"
                        sx={{height: "100%"}}
                        image={moviePoster}
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
            </LoadingSkeleton>
        </Grid>
    );
}

export default MovieCard;

