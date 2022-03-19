import React, { useEffect, useState, useContext } from "react";
import { Box, Grid, Stack, TextField, Button } from "@mui/material";
import "../../styling/pages/Options.css";
import AuthContext from "../../components/helper/AuthContext";

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
        <table className="change-password-table style={{ borderSpacing: 0 }}">
            <tr>
                <div className='settings-text'>Settings:</div>
            </tr>
            <tr>
                <td className='text-field'>
                    <Box component="form" onSubmit={submitChangePasswordForm}>
                    <Stack className={"form-stack"} spacing={2}
                        height={"100%"}>
                        <div className='change-password-text'>Change Password:</div>
                        <TextField
                            className={"form-field"}
                            id={"outlined-basic"}
                            label={"old password"}
                            name={"old_password"}
                            type={"password"}
                            variant={"outlined"}
                            // value={passwordData.old_password}
                        />

                        <TextField
                            className={"form-field"}
                            id={"outlined-basic"}
                            label={"new password"}
                            name={"new_password"}
                            type={"password"}
                            variant={"outlined"}
                            // value={passwordData.password_confirmation}
                            // onChange={handleChange}
                        />

                        <TextField
                            className={"form-field"}
                            id={"outlined-basic"}
                            label={"also new password"}
                            name={"new_password_confirmation"}
                            type={"password"}
                            variant={"outlined"}
                            // value={passwordData.new_password_confirmation}
                            // onChange={handleChange}
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
                                    {/* <FormButton */}
                                    <Button
                                        // text={"submit"}
                                        // onClick={this.submitForm}
                                        type="submit"
                                    >
                                        submit
                                    </Button>
                                </Box>
                            </Box>
                        </div>
                    </Stack>
                    </Box>
                </td>
            </tr>
        </table>
    );
}

export default Options
