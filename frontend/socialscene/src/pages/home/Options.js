import React, { useEffect, useState, useContext } from "react";
import { Box, Grid, Stack, TextField, Button } from "@mui/material";
import "../../styling/pages/Options.css";
import AuthContext from "../../components/helper/AuthContext";
import FormButton from "../../components/FormButton";
import HomePageTitle from "../../components/HomePageTitle";

const Options = () => {
    const [passwordData, setPasswordData] = useState({
        old_password: '',
        new_password: '',
        new_password_confirmation: '',
    })

    let {authTokens} = useContext(AuthContext)

    const [oldPasswordError, setOldPasswordError] = useState(false)
    const [newPasswordError, setNewPasswordError] = useState(false)
    const [newPasswordConfirmationError, setNewPasswordConfirmationError] = useState(false)
    const [errorOldPasswordText, setOldPasswordErrorText] = useState('')
    const [errorNewPasswordText, setNewPasswordErrorText] = useState('')
    const [errorNewPasswordConfirmationText, setNewPasswordConfirmationErrorText] = useState('')

    const onChange = (e) => {
        setPasswordData( fieldData => ({...fieldData, [e.target.name]: e.target.value}))
    }; 

    let resetErrorState = () => {
        setOldPasswordError(false);
        setNewPasswordError(false);
        setNewPasswordConfirmationError(false);

        setOldPasswordErrorText('');
        setNewPasswordErrorText('');
        setNewPasswordConfirmationErrorText('');
    }

    let errorHandler = (e, data) => {
        e.preventDefault()
        if((Object.keys(data)).includes('old_password')) {
            setOldPasswordError(true)
            setOldPasswordErrorText(data.old_password)
        }
        if((Object.keys(data)).includes('new_password')) {
            setNewPasswordError(true)
            setNewPasswordErrorText(data.new_password)
        }
        if((Object.keys(data)).includes('new_password_confirmation')) {
            setNewPasswordConfirmationError(true)
            setNewPasswordConfirmationErrorText(data.new_password_cofirmation)
        }
        if((Object.keys(data)).includes('non_field_errors')) {
            setNewPasswordError(true)
            setNewPasswordErrorText(data.non_field_errors)
            setNewPasswordConfirmationError(true)
            setNewPasswordConfirmationErrorText(data.non_field_errors)
        }
    }

    let submitChangePasswordForm = async (e) => {
        e.preventDefault()
        resetErrorState()
        let response = await fetch('http://127.0.0.1:8000/change_password/', {
            method: 'PUT',
            body:JSON.stringify({
                "old_password": passwordData.old_password, 
                "new_password": passwordData.new_password, 
                "new_password_confirmation": passwordData.new_password_confirmation,
            }),
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
                'Authorization': 'Bearer ' + String(authTokens.access)
            },
        })
        let data = await response.json()
        if(response.status === 200) {
            setPasswordData(data);
            alert("You have successfully changed you password")
        }
        else {
            errorHandler(e, data)
        }  
    }
    
    return (
        <>
            <HomePageTitle title={"options"}/>

        <Grid container
              direction={"row"}
              spacing={2}
              padding={2}
        >

            <Grid item xs={6}>

                <form onSubmit={submitChangePasswordForm} className={"home-page-card-background"}>
                    <Grid container padding={2} spacing={2}>

                        <Grid item xs={12}>
                            <h5 className={"home-page-card-title"}>change password:</h5>
                        </Grid>

                        <Grid item xs={12}>
                             <Stack spacing={2} height={"100%"}>

                                 <TextField
                                    data-testid="old-password"
                                     error={oldPasswordError}
                                     helperText={errorOldPasswordText}
                                     required
                                     fullWidth
                                     id={"outlined-basic"}
                                     label={"current"}
                                     name={"old_password"}
                                     type={"password"}
                                     variant={"outlined"}
                                     value={passwordData.old_password}
                                     onChange={e => onChange(e)}
                                 />

                                 <TextField
                                    data-testid="new-password"
                                    error={newPasswordError}
                                     helperText={errorNewPasswordText}
                                     required
                                     fullWidth
                                     id={"outlined-basic"}
                                     label={"new"}
                                     name={"new_password"}
                                     type={"password"}
                                     variant={"outlined"}
                                     value={passwordData.password_confirmation}
                                     onChange={e => onChange(e)}
                                 />

                                 <TextField
                                    data-testid="confirm-new-password"
                                    error={newPasswordConfirmationError}
                                     helperText={errorNewPasswordConfirmationText}
                                     required
                                     fullWidth
                                     id={"outlined-basic"}
                                     label={"confirm"}
                                     name={"new_password_confirmation"}
                                     type={"password"}
                                     variant={"outlined"}
                                     value={passwordData.new_password_confirmation}
                                     onChange={e => onChange(e)}
                                 />

                                 <FormButton
                                    data-testid="submit-button"
                                     text={"submit"}
                                     onClick={submitChangePasswordForm}
                                     type="submit"
                                     style={"primary"}
                                    />
                             </Stack>
                        </Grid>
                    </Grid>
                </form>
            </Grid>

            <Grid item xs={6}>
                <div className={"home-page-card-background"}>

                    <Grid container direction={"row"} padding={2}>

                        <Grid item xs={11}>
                            <h5 className={"home-page-card-title"}>notifications</h5>
                        </Grid>
                    </Grid>
                </div>
            </Grid>
        </Grid>
            </>
    );
}

export default Options
