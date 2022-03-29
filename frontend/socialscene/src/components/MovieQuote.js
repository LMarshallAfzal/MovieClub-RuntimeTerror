import React from "react";
import movieQuote from "popular-movie-quotes";
import {Grid} from "@mui/material";

function MovieQuote() {
const quoteArray = movieQuote.getSomeRandom(1);
const theQuote = quoteArray[0];
console.log(movieQuote)

    return (
        <Grid container spacing={2}>

            <Grid item xs={2}>
                <h2>"</h2>
            </Grid>

            <Grid item xs={10}>
                <h3>{theQuote.quote}</h3>
                <h5 className={""}>{theQuote.movie}</h5>
            </Grid>

        </Grid>
    )
}

export default MovieQuote;