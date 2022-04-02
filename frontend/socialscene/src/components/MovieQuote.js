import React, {useEffect, useState} from "react";
import movieQuote from "popular-movie-quotes";
import {Box} from "@mui/material";
import FormatQuoteIcon from '@mui/icons-material/FormatQuote';
import "../styling/components/MovieQuote.css";

function MovieQuote() {
    const [quoteText, setQuoteText] = useState("")
    const [quoteMovie, setQuoteMovie] = useState("")

    useEffect(() => {
        const quoteArray = movieQuote.getSomeRandom(1);
        setQuoteText(quoteArray[0]["quote"]);
        setQuoteMovie(quoteArray[0]["movie"]);
    }, [])


    return (
        <Box sx={{position: "relative", minHeight: "150px"}}>
            <FormatQuoteIcon className={"quote-icon"}
                             sx={{
                                 width: 250,
                                 height: 250,
                                 position: "absolute",
                                 transform: "translateX(-20%) translateY(-25%)",
                                 zIndex: -1,
                                 opacity: "50%",
                             }}/>
            <Box sx={{p: 6}}>
                <h4 className={"quote-title"}>{quoteText}</h4>
                <h5 className={"quote-movie"}>{quoteMovie}</h5>
            </Box>
        </Box>

    )
}

export default MovieQuote;