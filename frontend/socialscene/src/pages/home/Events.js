import React from "react";
import {Grid} from "@mui/material";
import "../../styling/pages/Events.css";
import ClubSelector from "../../components/ClubSelector";
import {Outlet} from "react-router-dom";

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

            <Grid item xs={12}>
                <ClubSelector />
            </Grid>

            <Grid item xs={12}>
                <Outlet />
            </Grid>

        </Grid>
    );
}

export default Events;
