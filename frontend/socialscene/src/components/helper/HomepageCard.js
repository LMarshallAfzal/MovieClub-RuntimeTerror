import React from "react";
import {Grid} from "@mui/material";
import "../../styling/components/HomepageCard.css";

function HomepageCard(props) {
    return (
        <div className={"home-page-card-background"}>
            <Grid container direction={"row"} padding={2} spacing={0}>
                <Grid item xs={9}>
                    <h5 className={"home-page-card-title"}>{props.title}</h5>
                </Grid>

                <Grid item xs={3}>
                    {props.titleItem}
                </Grid>

                {props.children}

            </Grid>
        </div>
    )
}

export default HomepageCard;