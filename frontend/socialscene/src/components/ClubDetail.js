import React from "react";
import {useParams} from "react-router";
import {Grid} from "@mui/material";
import "../styling/components/ClubDetail.css";


function ClubDetail() {
    let { clubID } = useParams();

    return (
        <div className={"club-detail-background"}>
            <Grid
            container
            justifyContent={"center"}
            direction={"row"}
            alignItems={"flex-start"}
            spacing={2}
            >
                <Grid item xs={12}>
                    <h4 className={"club-detail-heading"}>club {clubID}</h4>
                </Grid>

                <Grid item xs={10}>

                </Grid>

                <Grid item xs={2}>

                </Grid>
            </Grid>
        </div>

    );
}

export default ClubDetail;