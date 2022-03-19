import React from "react";
import {Box, Grid, Stack, TextField} from "@mui/material";
import HeadingCircle from "../../components/HeadingCircle";
import FormButton from "../../components/FormButton";
import "../../styling/pages/NewClubForm.css";



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
                <h4 className={"new-club-heading"}>new club:</h4>
            </Grid>

            <Grid item xs={12}>
                <Stack spacing={2}>
                    <TextField className='dashboard-text-box' id="outlined-basic" label="Name" variant="outlined"/>
                    <TextField className='dashboard-text-box' id="outlined-basic" label="Description"
                               variant="outlined"/>
                    <TextField className='dashboard-text-box' id="outlined-basic" label="Themes" variant="outlined"/>
                    <FormButton text={"Create"}/>
                </Stack>
            </Grid>
        </Grid>
    );
}

export default NewClub;
