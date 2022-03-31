import React, {useState} from "react";
import {Card, CardMedia, Grid, Rating, Stack, Tooltip, Typography} from "@mui/material";
import "../styling/components/ClubCard.css";
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
        <Grid item>
            <Card sx={{width: 150}}>
                <CardMedia
                    component="img"
                    sx={{height: "100%"}}
                    image={props.poster}
                    alt={props.movie.title}
                />

                <Stack paddingTop={1} alignItems={"center"}>

                    <Rating
                        name="simple-controlled"
                        sx={{fontSize: "1.2em"}}
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
                    <MovieClub/>
                    <ThemeButton
                        text={"watch"}
                        // onClick={() => {
                        //     addToWatchedList(movie.id);
                        // }}
                        // onChange={() => {
                        //     getRecommendedMovies();
                        // }}
                    />
                    <clubInfo movie={props.movie}/>
                </Stack>
            </Card>
        </Grid>
    );
}

// <Grid item>
//                                         <Card sx={{width: 150}}>
//                                             <CardMedia
//                                                 component="img"
//                                                 image={moviePoster}
//                                                 alt={movie.title}
//                                             />
//
//                                             <Stack paddingTop={1} alignItems={"center"}>
//                                                 <Rating
//                                                     name="simple-controlled"
//                                                     sx={{fontSize: "1.2em"}}
//                                                     precision={0.5}
//                                                     max={5}
//                                                     // onChange={(event, newValue) => (this.setState({score: newValue, onChange: this.fetchAddRating(movie.id)}))}
//                                                 />
//                                             </Stack>
//
//                                             <Stack
//                                                 spacing={1}
//                                                 padding={1}
//                                                 alignItems={"left"}
//                                             >
//                                                 <Tooltip
//                                                     title={movie.title}
//                                                     placement="top-start"
//                                                 >
//                                                     <Typography noWrap>{movie.title}</Typography>
//                                                 </Tooltip>
//
//                                                 <ThemeButton text={"watch"}/>
//                                             </Stack>
//                                         </Card>
//                                     </Grid>

export default MovieCard;

