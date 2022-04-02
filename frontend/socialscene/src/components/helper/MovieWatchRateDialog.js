import React, {useState, useEffect, useContext} from 'react';
import "../../styling/components/MovieWatchRateDialog.css";
import {Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Rating, Stack} from "@mui/material";
import ThemeButton from "../core/ThemeButton";
import AuthContext from "../../components/helper/AuthContext";


function MovieWatchRateDialog(props) {
    let {user, authTokens} = useContext(AuthContext);
    const [score, setScore] = useState(0);
    const [rating, setRating] = useState({
        user: user.user_id,
        movie: 0,
        score: null,
    });

    // NOAH DATASET
    // let movie = (props.data && DummyRecommendedMovies.find(obj => obj.ID === props.data.ID)); // substitute for movie logic
    // let movieTitle = (props.data && movie.title);

    // ALESSIO DATASET
    let movie = (props.movie);
    let movieTitle = (movie.title);

    useEffect(() => {
        getRating(movie.id);
    }, []);

    const handleClose = () => {
        console.log(`${movie.title} set as watched`) // substitute for watch logic
        props.onClose();
    }

    const handleRateMovie = (event, value) => {
        if (rating.score) {
            editRating(movie.id, score);
        }
        else {
            addRating(movie.id, score)
        }
        handleClose();
    }

    let addRating = async (id, ratingScore) => {
        let response1 = await fetch(
            "http://127.0.0.1:8000/add_rating/" + id + "/",
            {
                method: "POST",
                body: JSON.stringify({
                    user: user.user_id,
                    movie: id,
                    score: ratingScore,
                }),
                headers: {
                    "Content-Type": "application/json; charset=UTF-8",
                    Authorization: "Bearer " + String(authTokens.access),
                },
            }
        );
        let data1 = await response1.json();
        if (response1.status === 200) {
            setRating(data1);
        }
        // let response2 = await fetch("http://127.0.0.1:8000/train/movie/", {
        //     method: "GET",
        //     headers: {
        //         "Content-Type": "application/json; charset=UTF-8",
        //         Authorization: "Bearer " + String(authTokens.access),
        //     },
        // });
        // await response2.json();
        // let response3 = await fetch("http://127.0.0.1:8000/train/meeting/", {
        //     method: "GET",
        //     headers: {
        //         "Content-Type": "application/json; charset=UTF-8",
        //         Authorization: "Bearer " + String(authTokens.access),
        //     },
        // });
        // await response3.json();
    };

    let editRating = async (id) => {
        let response = await fetch(
            "http://127.0.0.1:8000/edit_rating/" + id + "/",
            {
                method: "PUT",
                body: JSON.stringify({
                    user: user.user_id,
                    movie: id,
                    score: rating.score,
                }),
                headers: {
                    "Content-type": "application/json; charset=UTF-8",
                    Authorization: "Bearer " + String(authTokens.access),
                },
            }
        );
        let data = await response.json();
        if (response.status === 200) {
            setRating(data);
        } 
    };

    let getRating = async (id) => {
        let response = await fetch("http://127.0.0.1:8000/get_rating/" + id + "/",
            {
                method: "GET",
                headers: {
                    "Content-Type": "application/json; charset=UTF-8",
                    Authorization: "Bearer " + String(authTokens.access),
                },
            });
        let data = await response.json();
        if (response.status === 200) {
            setRating(data);
            setScore(data.score)
        }
    };

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
                        precision={0.5}
                        size={"large"}
                        value={score}
                        onChange={(event, newValue) => setScore(newValue)}
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