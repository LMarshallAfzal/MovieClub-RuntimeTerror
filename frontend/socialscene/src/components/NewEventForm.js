import React from "react";
import {Grid} from "@mui/material";
import "../styling/components/NewEventForm.css";

function NewEvent() {
    return (
        <Grid container padding={1}>
            <Grid item xs={12}>
                <h4 className={"home-page-card-title"}>new event:</h4>
            </Grid>


        </Grid>
    );
}

export default NewEvent;