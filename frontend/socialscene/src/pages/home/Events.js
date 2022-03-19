import React from "react";
import {Grid} from "@mui/material";
import "../../styling/pages/Events.css";

function Events() {
    return (
        <Grid container
              spacing={2}
        >

            <Grid item xs={12}>
                <div className={"home-page-title"}>
                    <h3>events<h3--emphasise>.</h3--emphasise></h3>
                </div>
            </Grid>
        </Grid>
    );
}

export default Events;
