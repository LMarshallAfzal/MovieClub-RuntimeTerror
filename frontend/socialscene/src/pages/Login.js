import React from "react";
import "../styling/pages/Login.css";
import {Link} from "react-router-dom"
import HeadingCircle from "../components/HeadingCircle";
import {Box, Grid, Stack, TextField} from "@mui/material";
import FormButton from "../components/FormButton";


function login() {
    return (
        <Grid className={"login-grid"} container spacing={2}>
            <Grid className={"login-grid-left"} item xs={6}>
                <HeadingCircle title={"log in"}/>
            </Grid>

            <Grid className={"login-grid-right"} item xs={6}
                  alignItems="center"
                  justifyContent="center">
                <Stack className={"form-stack"} spacing={3}
                height={"100%"}>
                    <TextField
                        className={"form-field"}
                        id={"outlined-basic"}
                        label={"username"}
                        variant={"outlined"}
                    />

                    <TextField
                        className={"form-field"}
                        id={"outlined-basic"}
                        label={"password"}
                        variant={"outlined"}
                    />

                    <div className={"form-field"}>
                        <Box
                            sx={{
                                display: 'grid',
                                gridAutoColumns: '1fr',
                                gap: 1,
                            }}
                        >
                            <Box sx={{ gridRow: '1', gridColumn: 'span 1' }}>
                                <Link to={"/home"}>
                                    <FormButton
                                        text={"log in"}
                                    />
                                </Link>
                            </Box>

                            <Box sx={{ gridRow: '1', gridColumn: '2 / 5'}}>
                                <FormButton
                                    text={"forgot password"}
                                />
                            </Box>
                        </Box>
                    </div>
                </Stack>
            </Grid>
        </Grid>
    );
}

export default login;
