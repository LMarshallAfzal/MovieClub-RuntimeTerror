import React, { useEffect, useState, useContext } from "react";
import { Box, Grid, Stack, TextField, Button } from "@mui/material";
import "../../styling/pages/Options.css";
import AuthContext from "../../components/helper/AuthContext";
import FormButton from "../../components/FormButton";

const Options = () => {
    const [passwordData, setPasswordData] = useState({
        old_password: '',
        new_password: '',
        new_password_confirmation: '',
    })

    let {authTokens} = useContext(AuthContext)

    const handleChange = (event) => {
        setPasswordData( prevData => ({...prevData, [event.target.name]: event.target.value}))
    }; 

    let submitChangePasswordForm = async (e) => {
        e.preventDefault()
        let response = await fetch('http://127.0.0.1:8000/change_password/', {
            method: 'PUT',
            body:JSON.stringify({
                "old_password": e.target.old_password.value,
                "new_password": e.target.new_password.value,
                "new_password_confirmation": e.target.new_password_confirmation.value,
            }),
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
                'Authorization': 'Bearer ' + String(authTokens.access)
            },
        })
        let data = await response.json()
        setPasswordData(data);
    }


    // let getPasswordData = async (e) => {
    //     let response = await fetch("http://127.0.0.1:8000/user/", {
    //         method: 'GET',
    //         headers: {
    //             "Content-Type": "application/json",
    //             "Authorization": "Bearer " + String(authTokens.access)
    //         }
    //     })
    // }
    // let data = await response.json()


    // useEffect((e) => {
    //     // e.preventDefault();
    //     submitChangePasswordForm()
    // })

    return (
        <Grid container
              direction={"row"}
              spacing={2}
        >
            <Grid item xs={12}>
                <div className={"home-page-title"}>
                    <h3>options<h3--emphasise>.</h3--emphasise></h3>
                </div>
            </Grid>

            <Grid item xs={12}>

                <form onSubmit={submitChangePasswordForm} className={"options-card-background"}>

                    <Stack className={"form-stack"}
                           spacing={2}
                           height={"100%"}>

                        <h4 className={"options-card-heading"}>change password:</h4>
                        <TextField
                            className={"form-field"}
                            id={"outlined-basic"}
                            label={"old password"}
                            name={"old_password"}
                            type={"password"}
                            variant={"outlined"}
                        />

                        <TextField
                            className={"form-field"}
                            id={"outlined-basic"}
                            label={"new password"}
                            name={"new_password"}
                            type={"password"}
                            variant={"outlined"}
                        />

                        <TextField
                            className={"form-field"}
                            id={"outlined-basic"}
                            label={"also new password"}
                            name={"new_password_confirmation"}
                            type={"password"}
                            variant={"outlined"}
                        />

                        <FormButton type={"submit"} text={"save"} />
                    </Stack>
                </form>
            </Grid>
        </Grid>
    );
}

export default Options
