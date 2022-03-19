import React, {useContext, useState} from "react";
import "../styling/pages/Login.css";
import HeadingCircle from "../components/HeadingCircle";
import {Box, Grid, Stack, TextField, Button} from "@mui/material";
import FormButton from "../components/FormButton";
import Cookies from "js-cookie";
import CsrfToken from "../components/CsrfToken";
import AuthContext from "../components/AuthContext";

function Login() {

    let {loginUser} = useContext(AuthContext)
    
    return (
        <Grid container direction={"row"}
              className={"login-grid"}
              spacing={2}>
            {/* <CsrfToken /> */}

            <Grid item xs={6}
                  className={"login-grid-child"}>
                <HeadingCircle title={"log in"}/>
            </Grid>

            <Grid item xs={6}
                  className={"login-grid-child"}>

                <form onSubmit={loginUser} className={"login-form"}>
                    <Stack className={"login-form-stack"}
                           spacing={3}
                           alignItems={"center"}
                    >

                        <TextField
                            className={"form-field"}
                            id={"outlined-basic"}
                            label={"username"}
                            name={"username"}
                            variant={"outlined"}
                        />

                        <TextField
                            className={"form-field"}
                            id={"outlined-basic"}
                            label={"password"}
                            name={"password"}
                            type={"password"}
                            variant={"outlined"}
                        />

                        <div className={"form-field"}>
                            <Grid container
                                  direction={"row"}
                                  spacing={2}
                            >
                                <Grid item xs={4}>

                                    <FormButton
                                        type="submit"
                                        text={"log in"}
                                    />

                                </Grid>

                                <Grid item xs={8}>

                                    <FormButton
                                        text={"forgot password"}
                                    />

                                </Grid>

                            </Grid>
                        </div>
                    </Stack>
                </form>
            </Grid>
        </Grid>    
    );
}
   
export default Login
