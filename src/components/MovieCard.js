import React, { useEffect, useState } from "react";
import {
  Card,
  CardActionArea,
  CardMedia,
  Chip,
  Grid,
  Rating,
  Stack,
  Tooltip,
} from "@mui/material";
import "../styling/components/MovieCard.css";
import ThemeButton from "./core/ThemeButton";
import MovieWatchRateDialog from "./helper/MovieWatchRateDialog";
import LoadingSkeleton from "./helper/LoadingSkeleton";
import {useNavigate} from "react-router";
import { MovieDataAPI } from "./helper/MovieDataAPI";
import placeHolder from '../resources/images/empty_movie_poster.png';
import { Link } from "react-router-dom";


function MovieCard(props) {
    const [watchedMovies, setWatchedMovies] = useState([]);
    const [showPrompt, setShowPrompt] = useState(false);
    const [promptData, setPromptData] = useState("");
    const [cardWidth, setCardWidth] = useState(150);
    const [cardBorder, setCardBorder] = useState("0px solid black");
    const movieAPIData = MovieDataAPI(props.movie.imdb_id);

    const closePrompt = () => {
        setShowPrompt(false);
    }

    const navigate = useNavigate();

    const HandleNavigate = (location) => {
        return (
            navigate(`${location}`, {replace: false})
        )
    }
   
    
    return (
        <Link to={`/home/movies/${props.movie.id}`}>

        <Grid item>
            <LoadingSkeleton loading={movieAPIData}>
                <Card sx={{
                    width: props.animated ? cardWidth : "100%",
                    transition: "ease-out",
                    transitionDuration: "0.2s",
                    border: cardBorder
                }}

                      onMouseEnter={props.animated ? (() => {
                          setCardWidth(160)
                          setCardBorder("2px solid red")
                      }) : null}
                      onMouseLeave={props.animated ? (() => {
                          setCardWidth(150)
                          setCardBorder("0px solid black")
                      }) : null}
                      translate={"yes"}
                >


                    <CardActionArea onClick={() => HandleNavigate(props.movie.id)}>
                    <CardMedia
                        component={"img"}
                        sx={{height: "100%"}}
                        image={movieAPIData ? movieAPIData.Poster : placeHolder}
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
                                value={movieAPIData ? parseFloat(movieAPIData.imdbRating)/2 : 0}
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


            </Stack>
          </CardActionArea>
        </Card>
      </LoadingSkeleton>
    </Grid>
    </Link>
  );
}

export default MovieCard;

