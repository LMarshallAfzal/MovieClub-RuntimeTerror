import React from "react";
import {Grid} from "@mui/material";
import "../../styling/pages/Discussion.css";
import ClubSelector from "../../components/ClubSelector";
import {Outlet} from "react-router-dom";

function Discussion() {
    return (
        <>
         <Grid item xs={12} sx={{position: "sticky", top: 0, zIndex: "9000"}}>

                <div className={"home-page-title"}>

                    <h3>discussion<h3--emphasise>.</h3--emphasise></h3>
                </div>
            </Grid>

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