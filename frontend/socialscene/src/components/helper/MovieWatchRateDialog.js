import React from 'react';
import "../../styling/components/MovieWatchRateDialog.css";
import {Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Rating, Stack} from "@mui/material";
import ThemeButton from "../core/ThemeButton";
import {moviesWithPoster} from "../../resources/data/DummyMoviesData";

function MovieWatchRateDialog(props) {
    // NOAH DATASET
    // let movie = (props.data && DummyRecommendedMovies.find(obj => obj.ID === props.data.ID)); // substitute for movie logic
    // let movieTitle = (props.data && movie.title);

    // ALESSIO DATASET
    let movie = (props.data && moviesWithPoster.find(obj => obj.title === props.data.title));
    let movieTitle = (props.data && movie.title);

    const handleClose = () => {
        console.log(`${movie.title} set as watched`) // substitute for watch logic
        props.onClose();
    }

    const handleRateMovie = () => {
        console.log(`${movieTitle} rated`); // substitute for rate logic
        handleClose();
    }

    return (
        <Dialog
            open={props.isOpen}
            onClose={handleClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description">

            <DialogTitle id="alert-dialog-title">

                <h4>add rating
                    <h4--emphasise>.</h4--emphasise>
                </h4>
            </DialogTitle>

            <DialogContent>

                <DialogContentText id="alert-dialog-description">
                    <h6 className={"dialog-content"}>marked as watched, how was <span
                        className={"dialog-content-emphasise"}>{movieTitle}</span>?</h6>
                </DialogContentText>

                <Stack spacing={2} padding={2} alignItems={"center"}>
                    <Rating
                        name="half-rating"
                        defaultValue={2.5}
                        precision={0.5}
                        size={"large"}
                    />
                </Stack>

            </DialogContent>

            <DialogActions>

                <ThemeButton
                    onClick={handleRateMovie}
                    text={"save"}
                    style={"primary"}
                />

                <ThemeButton
                    onClick={handleClose}
                    text={"cancel"}/>
            </DialogActions>
        </Dialog>

    );
}

export default MovieWatchRateDialog;