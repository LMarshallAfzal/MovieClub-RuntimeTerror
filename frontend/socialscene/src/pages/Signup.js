import React, {useState, useContext} from "react";
import "../styling/pages/Signup.css"
import HeadingCircle from "../components/HeadingCircle";
import {Box, Grid, Stack, TextField, Button} from "@mui/material";
import FormButton from "../components/FormButton";
import Cookies from "js-cookie";
import AuthContext from "../components/AuthContext";
import CsrfToken from "../components/CsrfToken";
import { useNavigate } from "react-router-dom"

const Signup = () => {
    let {loginUser} = useContext(AuthContext)

    let submitSignupForm = async (e) => {
        e.preventDefault()
        let response = await fetch("http://127.0.0.1:8000/sign_up/", {
            method: "POST",
            body: JSON.stringify({
                "username": e.target.username.value, 
                "first_name": e.target.first_name.value, 
                "last_name": e.target.last_name.value,
                "email": e.target.email.value,
                "bio": e.target.bio.value, 
                "preferences": e.target.preferences.value,
                "password": e.target.password.value, 
                "password_confirmation": e.target.password_confirmation.value
            }),
            headers: {
                "Content-Type": "application/json",
            },
        })
        let data = await response.json()
        if(response.status === 201) {
            return (loginUser(e))
        }
        else {
            alert("Invalid credentials")
        }  
    }
    
    return (
        <Grid className={"login-grid"} container spacing={2}>
            <CsrfToken />

            <Grid className={"login-grid-left"} item xs={6}>
                <HeadingCircle title={"sign up"}/>
            </Grid>

            <Grid className={"login-grid-right"} item xs={6}>
                <Box component="form" onSubmit={submitSignupForm}>
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
                            name={"first_name"}
                            type={"text"}
                            variant={"outlined"}
                        />
                        <TextField
                            id={"outlined-basic"}
                            label={"last name"}
                            name={"last_name"}
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
                            name={"password_confirmation"}
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
                                        <Button
                                            // text={"sign up"}
                                            // onClick={this.submitForm}
                                            type="submit"
                                        >
                                            sign up
                                        </Button>                                                    
                                </Box>
                            </Box>
                        </div>
                    </Stack>
                </Box>    
            </Grid>

            <Grid className={"login-grid-right"} item xs={6}>
                <></>
            </Grid>
        </Grid>
    )
}

export default Signup;
