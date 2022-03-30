import React, {useState} from 'react';
import {Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Rating} from "@mui/material";
import FormButton from "../FormButton";
import {DummyRecommendedMovies} from "../../pages/data/DummyRecommendedMovies";

function MovieWatchRate(props) {
    // const [showPrompt, setShowPrompt] = useState(true);
    let movie = (props.data && DummyRecommendedMovies.find(obj => obj.ID === props.data.ID));

    const handleClose = () => {
        props.onClose();
    }

    const handleRateMovie = () => {
        console.log(`${movie.title} rated`);
        handleClose();
    }

    console.log(`${movie.title} set as watched`)


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
                    <h6>rate {movie.title}</h6>
                </DialogContentText>

                <Rating
                    name="half-rating"
                    defaultValue={2.5}
                    precision={0.5}
                    size={"large"}
                />
            </DialogContent>

            <DialogActions>

                <FormButton
                    onClick={handleRateMovie}
                    text={"save"}
                    style={"primary"}
                />

                <FormButton
                    onClick={handleClose}
                    text={"cancel"} />
            </DialogActions>
        </Dialog>

    );
}

export default MovieWatchRate;