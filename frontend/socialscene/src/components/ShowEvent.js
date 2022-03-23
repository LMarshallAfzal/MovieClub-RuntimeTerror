import React from "react";
import {Grid} from "@mui/material";
import "../styling/components/NewEventForm.css";

function ShowEvent() {
    return (
        <Grid container padding={1}>
            <Grid item xs={12}>
                <h4 className={"home-page-card-title"}>events:</h4>
            </Grid>

        </Grid>
    );
}

export default ShowEvent;