import React from "react";
import {Grid} from "@mui/material";
import "../../styling/pages/Discussion.css";
import ClubSelector from "../../components/ClubSelector";
import {Outlet} from "react-router-dom";
import HomePageTitle from "../../components/HomePageTitle";

function Discussion() {
    return (
        <>
            <HomePageTitle title={"discussion"}/>

            <Grid container spacing={2} padding={2}>

                <Grid item xs={12}>

                    <ClubSelector />
                </Grid>

                <Grid item xs={12}>

                    <Outlet />
                </Grid>
            </Grid>
        </>
    );
}

export default Discussion;
