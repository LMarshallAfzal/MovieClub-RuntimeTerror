import React from "react";
import {Grid} from "@mui/material";
import "../styling/pages/HomePageTitle.css";

function HomePageTitle(props) {
    return (
        <Grid item xs={12} sx={{ boxShadow: 3, position: "sticky", top: "0px", zIndex: 90000}}>

            <div className={"home-page-title"}>
                <h3>{props.title}<h3--emphasise>.</h3--emphasise></h3>
            </div>
        </Grid>
    )
}

export default HomePageTitle;