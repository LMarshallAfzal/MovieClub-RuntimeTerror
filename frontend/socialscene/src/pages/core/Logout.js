import React from "react";
import "../../styling/pages/Logout.css";
import {Grid, Stack} from "@mui/material";
import HeadingCircle from "../../components/HeadingCircle";
import ThemeButton from "../../components/core/ThemeButton";

function Logout() {

    return (
        <Grid container
              direction={"row"}
              spacing={2}
              className={"logout-grid"}
        >

            <Grid item
                  xs={6}
                  className={"logout-grid-child"}
            >

                <HeadingCircle title={"logged out"}/>
            </Grid>

            <Grid item
                  xs={6}
                  className={"logout-grid-child"}
            >

                <Stack className={"logout-form-stack"}

                       spacing={3}
                       alignItems={"center"}>

                    <div className={"logout-row"}>
                        <ThemeButton
                            text={"home"}
                            style={"normal"}
                            linkTo={"/"}
                        />
                    </div>

                    <div className={"logout-row"}>
                        <ThemeButton
                            text={"login"}
                            data-testid="login-button"
                            style={"primary"}
                            linkTo={"/login"}
                        />
                    </div>
                </Stack>
            </Grid>
        </Grid>
    )
}

export default Logout;
