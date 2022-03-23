import React from "react";
import "../styling/components/ClubDiscussion.css";
import {useParams} from "react-router";
import {DummyClubData} from "../pages/data/DummyClubsData";
import {Grid} from "@mui/material";

function ClubDiscussion() {

    let { clubID } = useParams();
    let club = DummyClubData.find(obj => obj.ID === clubID);

    return(
        <Grid container
              spacing={2}>

            <Grid item xs={12}>
                <h4 className={"home-page-sub-section-heading"}>{club.clubName}:</h4>
            </Grid>

            <Grid item={6}>

            </Grid>

            <Grid
        </Grid>
    )
}

export default ClubDiscussion;