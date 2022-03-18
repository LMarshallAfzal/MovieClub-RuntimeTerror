import React, { useEffect, useState, useContext } from "react";
import { Box, Grid, Stack, TextField, Button } from "@mui/material";
import "../styling/pages/ChangePassword.css";
import AuthContext from "../components/AuthContext";
import FormButton from "../components/FormButton";


const ChangePassword = () => {
    const [passwordData, setPasswordData] = useState({
        old_password: '',
        new_password: '',
        new_password_confirmation: '',
    })

    let {authTokens} = useContext(AuthContext)

    const onChange = (e) => {
        setPasswordData( fieldData => ({...fieldData, [e.target.name]: e.target.value}))
    }; 

    let submitChangePasswordForm = async (e) => {
        e.preventDefault()
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
            alert(response.statusText)
        }  
    }
    
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
                            value={passwordData.old_password}
                            onChange={e => onChange(e)}
                        />

                        <TextField
                            className={"form-field"}
                            id={"outlined-basic"}
                            label={"new password"}
                            name={"new_password"}
                            type={"password"}
                            variant={"outlined"}
                            value={passwordData.password_confirmation}
                            onChange={e => onChange(e)}
                        />

                        <TextField
                            className={"form-field"}
                            id={"outlined-basic"}
                            label={"also new password"}
                            name={"new_password_confirmation"}
                            type={"password"}
                            variant={"outlined"}
                            value={passwordData.new_password_confirmation}
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
                                        text={"submit"}
                                        onClick={submitChangePasswordForm}
                                        type="submit"
                                    />                                   
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

export default ChangePassword