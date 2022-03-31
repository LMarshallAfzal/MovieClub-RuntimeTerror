import React, {useState} from 'react';
import {Box, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Rating} from "@mui/material";
import ThemeButton from "../core/ThemeButton";
import {DummyRecommendedMovies} from "../../resources/data/DummyRecommendedMovies";

function MovieWatchRateDialog(props) {
    let movie = (props.data && DummyRecommendedMovies.find(obj => obj.ID === props.data.ID)); // substitute for movie logic
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

                <h4>add rating<h4--emphasise>.</h4--emphasise></h4>
            </DialogTitle>

            <DialogContent>
                <DialogContentText id="alert-dialog-description">

                    <h6>marked as watched, how was <span style={{color: "red"}}>{movieTitle}</span>?</h6>
                </DialogContentText>

                <Box justifyItems={"center"}>

                    <Rating
                    name="half-rating"
                    defaultValue={2.5}
                    precision={0.5}
                    size={"large"}
                />
                </Box>

            </DialogContent>

            <DialogActions>

                <ThemeButton
                    onClick={handleRateMovie}
                    text={"save"}
                    style={"primary"}
                />

                <ThemeButton
                    onClick={handleClose}
                    text={"cancel"} />
            </DialogActions>
        </Dialog>

    );
}

export default MovieWatchRateDialog;