import React from "react";
import movieQuote from "popular-movie-quotes";
import {Grid} from "@mui/material";

function MovieQuote() {
const quoteArray = movieQuote.getSomeRandom(1);
const theQuote = quoteArray[0];
console.log(movieQuote)

    return (
        <Grid container spacing={2} height={300}>

            <Grid item xs={2}>
                <h3>"</h3>
            </Grid>

            <Grid item xs={10}>
                <h5>{theQuote.quote}</h5>
                <h6 className={""}>{theQuote.movie}</h6>
            </Grid>

        </Grid>
    )
}

export default MovieQuote;