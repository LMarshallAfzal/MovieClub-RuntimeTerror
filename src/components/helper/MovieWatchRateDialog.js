import React, {useState, useEffect, useContext} from 'react';
import "../../styling/components/MovieWatchRateDialog.css";
import {Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Rating, Stack} from "@mui/material";
import ThemeButton from "../core/ThemeButton";
import AuthContext from "./AuthContext";

function MovieWatchRateDialog(props) {
    let {user, authTokens} = useContext(AuthContext);
    const [score, setScore] = useState(0);
    const [rating, setRating] = useState({
        user: user.user_id,
        movie: 0,
        score: null,
    });

    let movie = (props.movie);
    let movieTitle = (movie.title);

    useEffect(() => {
        if(props.isOpen) {
            getRating(movie.id);
        }
    }, []);

    const handleClose = () => {
        addToWatchedList(movie.id)
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
            "https://social-scene.herokuapp.com/add_rating/" + id + "/",
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
        // let response2 = await fetch("https://social-scene.herokuapp.com/train/movie/", {
        //     method: "GET",
        //     headers: {
        //         "Content-Type": "application/json; charset=UTF-8",
        //         Authorization: "Bearer " + String(authTokens.access),
        //     },
        // });
        // await response2.json();
        // let response3 = await fetch("https://social-scene.herokuapp.com/train/meeting/", {
        //     method: "GET",
        //     headers: {
        //         "Content-Type": "application/json; charset=UTF-8",
        //         Authorization: "Bearer " + String(authTokens.access),
        //     },
        // });
        // await response3.json();
    };

    let editRating = async (id, ratingScore) => {
        let response = await fetch(
            "https://social-scene.herokuapp.com/edit_rating/" + id + "/",
            {
                method: "PUT",
                body: JSON.stringify({
                    user: user.user_id,
                    movie: id,
                    score: ratingScore,
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
        let response = await fetch("https://social-scene.herokuapp.com/get_rating/" + id + "/",
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

    let addToWatchedList = async (id) => {
        let response = await fetch(
            "https://social-scene.herokuapp.com/add_watched_movie/" + id + "/",
            {
                method: "POST",
                body: JSON.stringify({movie: id, user: user.user_id}),
                headers: {
                    "Content-Type": "application/json",
                    Authorization: "Bearer " + authTokens.access,
                },
            }
        );
        await response.json();
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