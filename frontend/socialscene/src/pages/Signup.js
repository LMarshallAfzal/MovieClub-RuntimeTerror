import React from "react";
import "../styling/pages/Signup.css"
import {Grid} from "@mui/material";
import HeadingCircle from "../components/HeadingCircle";

function signup() {
    return (
        <Grid className={"login-grid"} container spacing={2}>
            <Grid className={"login-grid-left"} item xs={6}>
                <HeadingCircle title={"sign up"}/>
            </Grid>

            <Grid className={"login-grid-right"} item xs={6}>
                <></>
            </Grid>
        </Grid>
    )
}

export default signup;
