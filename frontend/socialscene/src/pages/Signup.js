import React, {useState, useContext} from "react";
import "../styling/pages/Signup.css"
import HeadingCircle from "../components/HeadingCircle";
import {Box, Grid, Stack, TextField, Button} from "@mui/material";
import FormButton from "../components/FormButton";
import Cookies from "js-cookie";
import AuthContext from "../components/AuthContext";
import CsrfToken from "../components/CsrfToken";
import { useNavigate } from "react-router-dom"

export const Signup = () => {
    let {loginUser, setLoginCredentials} = useContext(AuthContext)
    let [signupCredentials, setSignupCredentials] = useState({
        username:'',
        first_name:'',
        last_name:'',
        email:'',
        bio:'',
        preferences:'',
        password:'',
        password_confirmation:'',
    })
    const {username, first_name, last_name, email, bio, preferences, password, password_confirmation} = signupCredentials

    const onChange = (e) => {
        setSignupCredentials(fieldData => ({ ...fieldData, [e.target.name]: e.target.value }))
        
    };

    let submitSignupForm = async (e) => {
        e.preventDefault()
        let response = await fetch("http://127.0.0.1:8000/sign_up/", {
            method: "POST",
            body: JSON.stringify({
                "username": signupCredentials.username, 
                "first_name": signupCredentials.first_name, 
                "last_name": signupCredentials.last_name,
                "email": signupCredentials.email,
                "bio": signupCredentials.bio, 
                "preferences": signupCredentials.preferences,
                "password": signupCredentials.password, 
                "password_confirmation": signupCredentials.password_confirmation
            }),
            headers: {
                "Content-Type": "application/json",
            },
        })
        let data = await response.json()
        if(response.status === 201) {
            setLoginCredentials(signupCredentials.username, signupCredentials.password)
            return (loginUser(e))
        }
        else {
            alert(response.statusText)
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
                            value={username}
                            onChange={e => onChange(e)}
                        />
                        <TextField
                            id={"outlined-basic"}
                            label={"first name"}
                            name={"first_name"}
                            type={"text"}
                            variant={"outlined"}
                            value={first_name}
                            onChange={e => onChange(e)}
                        />
                        <TextField
                            id={"outlined-basic"}
                            label={"last name"}
                            name={"last_name"}
                            type={"text"}
                            variant={"outlined"}
                            value={last_name}
                            onChange={e => onChange(e)}
                        />
                        <TextField
                            id={"outlined-basic"}
                            label={"email"}
                            name={"email"}
                            type={"email"}
                            variant={"outlined"}
                            value={email}
                            onChange={e => onChange(e)}
                        />
                        <TextField
                            id={"outlined-basic"}
                            label={"bio"}
                            name={"bio"}
                            type={"text"}
                            variant={"outlined"}
                            value={bio}
                            onChange={e => onChange(e)}
                        />
                        <TextField
                            id={"outlined-basic"}
                            label={"preferences"}
                            name={"preferences"}
                            type={"text"}
                            variant={"outlined"}
                            value={preferences}
                            onChange={e => onChange(e)}
                        />
                        <TextField
                            id={"outlined-basic"}
                            label={"password"}
                            name={"password"}
                            type={"password"}
                            variant={"outlined"}
                            value={password}
                            onChange={e => onChange(e)}
                        />
                        <TextField
                            id={"outlined-basic"}
                            label={"password confirmation"}
                            name={"password_confirmation"}
                            type={"password"}
                            variant={"outlined"}
                            value={password_confirmation}
                            onChange={e => onChange(e)}
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
                                        type="submit"
                                        text={"log in"}   
                                        onClick={submitSignupForm}
                                    />                                                    
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
