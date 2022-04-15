import React from "react";
import {Grid} from "@mui/material";
import "../../styling/components/HomepageTitle.css";

function HomepageTitle(props) {
    return (
        <Grid
            item xs={12}
            padding={1}
            sx={{boxShadow: 3, position: "sticky", top: "0px", zIndex: 1000}}
            className={"home-page-title"}
        >
            <h3 className={"home-page-text"}>{props.title}<span className={"home-page-text-emphasise"}>.</span></h3>

        </Grid>
    )
}

export default HomepageTitle;