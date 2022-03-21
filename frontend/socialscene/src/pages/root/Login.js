import React, {useContext} from "react";
import "../../styling/pages/Login.css";
import HeadingCircle from "../../components/HeadingCircle";
import {Grid, Stack, TextField, Box} from "@mui/material";
import FormButton from "../../components/FormButton";
import Cookies from "js-cookie";
import CsrfToken from "../../components/helper/CsrfToken";
import AuthContext from "../../components/helper/AuthContext";


export function Login() {

    let {loginUser, loginCredentials, setLoginCredentials, usernameError, passwordError, errorUsernameText, errorPasswordText} = useContext(AuthContext)
    
    const {username, password} = loginCredentials;

    
    
    const onChange = (e) => {
        setLoginCredentials(fieldData => ({ ...fieldData, [e.target.name]: e.target.value }))
    };

    return (
        <Grid container direction={"row"} className={"login-grid"}  spacing={2}>
            <CsrfToken />

            <Grid  className={"login-grid-left"} item xs={6}>
                <HeadingCircle title={"log in"}/>
            </Grid>

            <Grid  className={"login-grid-right"} item xs={6}
                alignItems="center"
                justifyContent="center">
                
                <Box component={"form"} onSubmit={loginUser} className={"login-grid-right"} spacing={3}>
                    <Stack className={"form-stack"} spacing={3} height={"100%"}> 
                        <TextField
                            error={usernameError}
                            helperText={errorUsernameText}
                            required
                            className={"form-field"}
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
                            className={"form-field"}
                            id={"outlined-basic"}
                            label={"password"}
                            name={"password"}
                            type={"password"}
                            variant={"outlined"}
                            value={password}
                            onChange={e => onChange(e)}
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
                                    <FormButton
                                        type="submit"
                                        text={"log in"}   
                                        onClick={loginUser}
                                    />
                                        {/* log in
                                    </FormButton>     */}
                                </Box>

                                <Box sx={{ gridRow: '1', gridColumn: '2 / 5'}}>
                                    <FormButton
                                        type="submit"
                                        text={"forgot password"}
                                    />
                                </Box>
                            </Box>
                        </div>
                    </Stack>
                </Box>
            </Grid>
        </Grid> 
    );
}
   
export default Login
