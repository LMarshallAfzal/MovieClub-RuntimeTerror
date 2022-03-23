import React, {useContext, useEffect} from "react";
import { useNavigate } from "react-router-dom";
import "../../styling/pages/Login.css";
import HeadingCircle from "../../components/HeadingCircle";
import {Grid, Stack, TextField} from "@mui/material";
import FormButton from "../../components/FormButton";
import CsrfToken from "../../components/helper/CsrfToken";
import AuthContext from "../../components/helper/AuthContext";


export function Login() {

    let {loginUser, loginCredentials, setLoginCredentials, usernameError, passwordError, errorUsernameText, errorPasswordText} = useContext(AuthContext)
    
    const {username, password} = loginCredentials;
    
    useEffect(() => {
        loginUser()
    }, [])
    
    const onChange = (e) => {
        setLoginCredentials(fieldData => ({ ...fieldData, [e.target.name]: e.target.value }))
    };

    
    return (
        <Grid container
              direction={"row"}
              className={"login-grid"}
              spacing={2}>
            <CsrfToken />

            <Grid item
                  xs={6}
                  className={"login-grid-child"}>

                <HeadingCircle title={"log in"}/>
            </Grid>

            <Grid item
                  xs={6}
                  className={"login-grid-child"}>

                <form onSubmit={loginUser} className={"login-form"}>

                    <Stack className={"login-form-stack"}
                           spacing={3}
                           alignItems={"center"}
                    >

                        <TextField
                            error={usernameError}
                            helperText={errorUsernameText}
                            required
                            className={"login-form-row"}
                            id={"outlined-basic"}
                            label={"username"}
                            name={"username"}
                            variant={"outlined"}
                            value={username}
                            onChange={e => onChange(e)}
                        />

                        <TextField
                            error={passwordError}
                            helperText={errorPasswordText}
                            required
                            className={"login-form-row"}
                            id={"outlined-basic"}
                            label={"password"}
                            name={"password"}
                            type={"password"}
                            variant={"outlined"}
                            value={password}
                            onChange={e => onChange(e)}
                        />

                        <div className={"login-form-row"}>
                            <Grid container
                                  direction={"row"}
                                  spacing={2}
                            >

                                <Grid item xs={4}>

                                    <FormButton
                                        type="submit"
                                        text={"log in"}   
                                        onClick={loginUser}
                                       
                                    />
                                </Grid>

                                <Grid item xs={8}>

                                    <FormButton
                                        type="submit"
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
