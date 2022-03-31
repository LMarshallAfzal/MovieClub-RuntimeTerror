import React from "react";
import {Autocomplete, Box, Grid, Stack, TextField} from "@mui/material";
import HeadingCircle from "./HeadingCircle";
import ThemeButton from "./core/ThemeButton";
import "../styling/components/NewClubForm.css";
import { themes } from "../resources/data/MovieThemes"




function ClubCreate() {
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

                    <TextField
                        id={"outlined-required"}
                        label={"name"}
                        required
                        placeholder={"choose a club name"}
                    />

                    <TextField
                        id={"outlined-required"}
                        label={"description"}
                        required
                        placeholder={"short club description"}
                    />

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
                                    label={"theme"}
                                    name={"preferences"}
                                    type={"text"}
                                    variant={"outlined"}
                                    multiline
                                    placeholder={"choose the club theme"}
                                    // value={userData.preferences}
                                    // onChange={e => onChange(e)}
                                />
                            )}
                        />
                    <ThemeButton text={"create"} style={"primary"}/>
                </Stack>
            </Grid>
        </Grid>
    );
}

export default ClubCreate;
