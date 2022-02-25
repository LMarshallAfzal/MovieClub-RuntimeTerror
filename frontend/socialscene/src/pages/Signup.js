import React from "react";
import "../styling/pages/Signup.css"
import HeadingCircle from "../components/HeadingCircle";
import {Box, Grid, Stack, TextField} from "@mui/material";
import FormButton from "../components/FormButton";


function signup() {
    return (
        <Grid className={"login-grid"} container spacing={2}>
            <Grid className={"login-grid-left"} item xs={6}>
                <HeadingCircle title={"sign up"}/>
            </Grid>

            <Grid className={"login-grid-right"} item xs={6}>
                <Stack className={"form-stack"} spacing={3}>
                    <TextField
                        id={"outlined-basic"}
                        label={"username"}
                        name={"username"}
                        type={"text"}
                        variant={"outlined"}
                    />
                    <TextField
                        id={"outlined-basic"}
                        label={"first name"}
                        name={"first name"}
                        type={"text"}
                        variant={"outlined"}
                    />
                    <TextField
                        id={"outlined-basic"}
                        label={"last name"}
                        name={"last name"}
                        type={"text"}
                        variant={"outlined"}
                    />
                    <TextField
                        id={"outlined-basic"}
                        label={"email"}
                        name={"email"}
                        type={"email"}
                        variant={"outlined"}
                    />
                    <TextField
                        id={"outlined-basic"}
                        label={"bio"}
                        name={"bio"}
                        type={"text"}
                        variant={"outlined"}
                    />
                    <TextField
                        id={"outlined-basic"}
                        label={"preferences"}
                        name={"preferences"}
                        type={"text"}
                        variant={"outlined"}
                    />
                    <TextField
                        id={"outlined-basic"}
                        label={"password"}
                        name={"password"}
                        type={"password"}
                        variant={"outlined"}
                    />
                    <TextField
                        id={"outlined-basic"}
                        label={"password confirmation"}
                        name={"password confirmation"}
                        type={"password"}
                        variant={"outlined"}
                    />

                    <div className={"single-button"}>
                        <Box
                            sx={{
                                display: 'grid',
                                gridAutoColumns: '1fr',
                                gap: 1,
                            }}
                        >
                            <Box sx={{ gridRow: '1', gridColumn: 'span 1' }}>
                                <FormButton
                                    text={"sign up"}
                                />
                            </Box>
                        </Box>    
                    </div>
                </Stack>

            </Grid>    

            <Grid className={"login-grid-right"} item xs={6}>
                <></>
            </Grid>
        </Grid>
    )
}

export default signup;
