import React from "react";
import {Box, Grid, Stack, TextField} from "@mui/material";
import HeadingCircle from "./HeadingCircle";
import FormButton from "./FormButton";
import "../styling/pages/NewClubForm.css";



function NewClub() {
    return (
        <Grid
            container
            justifyContent={"center"}
            direction={"row"}
            alignItems={"flex-start"}
            spacing={2}
        >


            <Grid item xs={12}>
                <h4 className={"club-detail-heading"}>new club:</h4>
            </Grid>

            <Grid item xs={12}>
                <Stack spacing={2}>
                    <TextField id="outlined-basic" label="name" variant="outlined"/>
                    <TextField id="outlined-basic" label="description" variant="outlined"/>
                    <TextField id="outlined-basic" label="themes" variant="outlined"/>
                    <FormButton text={"create"} style={"primary"}/>
                </Stack>
            </Grid>
        </Grid>
    );
}

export default NewClub;
