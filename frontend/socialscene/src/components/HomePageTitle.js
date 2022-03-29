import React from "react";
import {Box, Grid} from "@mui/material";
import "../styling/pages/HomePageTitle.css";

function HomePageTitle(props) {
    return (
        <Box sx={{ boxShadow: 3, zIndex: 90000}}>

            <div className={"home-page-title"}>
                <h3>{props.title}<h3--emphasise>.</h3--emphasise></h3>
            </div>
        </Box>
    )
}

export default HomePageTitle;