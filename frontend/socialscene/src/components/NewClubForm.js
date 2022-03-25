import React from "react";
import {Autocomplete, Box, Grid, Stack, TextField} from "@mui/material";
import HeadingCircle from "./HeadingCircle";
import FormButton from "./FormButton";
import "../styling/components/NewClubForm.css";
import { themes } from "../pages/data/MovieThemes"




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
                <h4 className={"home-page-sub-section-heading"}>new club:</h4>
            </Grid>

            <Grid item xs={12}>
                <Stack spacing={2}>
                    <TextField id="outlined-basic" label="name" variant="outlined"/>
                    <TextField id="outlined-basic" label="description" variant="outlined"/>
                    <Autocomplete
                            // multiple
                            id="tags-standard"
                            options={themes}
                            getOptionLabel={(option) => option.theme}
                            // defaultValue={[themes[0]]}
                            disableCloseOnSelect
                            renderInput={(params) => (
                                <TextField
                                    {...params}
                                    // error={preferencesError}
                                    // helperText={errorPreferencesText}
                                    required
                                    spacing={6}
                                    id={"outlined-basic"}
                                    label={"themes"}
                                    name={"preferences"}
                                    type={"text"}
                                    variant={"outlined"}
                                    multiline
                                    // value={userData.preferences}
                                    // onChange={e => onChange(e)}
                                />
                            )}
                        />
                    <FormButton text={"create"} style={"primary"}/>
                </Stack>
            </Grid>
        </Grid>
    );
}

export default NewClub;
