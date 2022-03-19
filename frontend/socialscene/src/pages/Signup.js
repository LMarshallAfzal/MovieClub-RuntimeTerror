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
    const [usernameError, setUsernameError] = useState(false)
    const [firstNameError, setFirstNameError] = useState(false)
    const [lastNameError, setLastNameError] = useState(false)
    const [emailError, setEmailError] = useState(false)
    const [bioError, setBioError] = useState(false)
    const [preferencesError, setPreferencesError] = useState(false)
    const [passwordError, setPasswordError] = useState(false)
    const [passwordConfirmationError, setPasswordConfirmationError] = useState(false)
    // const [errors, setErrors] = useState(setUsernameError(false), setFirstNameError(false), setLastNameError(false), setEmailError(false), setBioError(false), setPreferencesError(false), setPasswordError(false), setPasswordConfirmationError(false))
    const [errorText, setErrorText] = useState('')

    const onChange = (e) => {
        setSignupCredentials(fieldData => ({ ...fieldData, [e.target.name]: e.target.value }))
        
    };

    const errorHandler = (e, data) => {
        e.preventDefault()
        if((Object.keys(data)).includes('username')) {
            setUsernameError(true)
            setErrorText(data.username)
        }
        if((Object.keys(data)).includes('first_name')) {
            setFirstNameError(true)
            setErrorText(data.first_name)
        }
        if((Object.keys(data)).includes('last_name')) {
            setLastNameError(true)
            setErrorText(data.last_name)
        }
        if((Object.keys(data)).includes('email')) {
            setEmailError(true)
            setErrorText(data.email)
        }
        if((Object.keys(data)).includes('bio')) {
            setPreferencesError(true)
            setErrorText(data.bio)
        }
        if((Object.keys(data)).includes('preferences')) {
            setPreferencesError(true)
            setErrorText(data.preferences)
        }
        if((Object.keys(data)).includes('password')) {
            setPasswordError(true)
            setErrorText(data.password)
        }
        if((Object.keys(data)).includes('password_cofirmation')) {
            setPasswordConfirmationError(true)
            setErrorText(data.password_cofirmation)
        }
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
        console.log(Object.keys(data))
        if(response.status === 201) {
            setLoginCredentials(signupCredentials.username, signupCredentials.password)
            return (loginUser(e))
        }
        else {
            errorHandler(e, data)
            // setErrorText(data.first_name)
            // alert(response.headers)
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
                            error={usernameError}
                            helperText={errorText}
                            required
                            id={"outlined-basic"}
                            label={"username"}
                            name={"username"}
                            type={"text"}
                            variant={"outlined"}
                            value={username}
                            onChange={e => onChange(e)}
                        />
                        <TextField
                            error={firstNameError}
                            helperText={errorText}
                            required
                            id={"outlined-basic"}
                            label={"first name"}
                            name={"first_name"}
                            type={"text"}
                            variant={"outlined"}
                            value={first_name}
                            onChange={e => onChange(e)}
                        />
                        <TextField
                            error={lastNameError}
                            helperText={errorText}
                            required
                            id={"outlined-basic"}
                            label={"last name"}
                            name={"last_name"}
                            type={"text"}
                            variant={"outlined"}
                            value={last_name}
                            onChange={e => onChange(e)}
                        />
                        <TextField
                            error={emailError}
                            helperText={errorText}
                            required
                            id={"outlined-basic"}
                            label={"email"}
                            name={"email"}
                            type={"email"}
                            variant={"outlined"}
                            value={email}
                            onChange={e => onChange(e)}
                        />
                        <TextField
                            error={bioError}
                            id={"outlined-basic"}
                            label={"bio"}
                            name={"bio"}
                            type={"text"}
                            variant={"outlined"}
                            multiline
                            rows={6}
                            value={bio}
                            onChange={e => onChange(e)}
                        />
                        <TextField
                            error={preferencesError}
                            helperText={errorText}
                            required
                            id={"outlined-basic"}
                            label={"preferences"}
                            name={"preferences"}
                            type={"text"}
                            variant={"outlined"}
                            value={preferences}
                            onChange={e => onChange(e)}
                        />
                        <TextField
                            error={passwordError}
                            helperText={errorText}
                            required
                            id={"outlined-basic"}
                            label={"password"}
                            name={"password"}
                            type={"password"}
                            variant={"outlined"}
                            value={password}
                            onChange={e => onChange(e)}
                        />
                        <TextField
                            error={passwordConfirmationError}
                            helperText={errorText}
                            required
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
                                        // onSubmit={setErrors}
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
