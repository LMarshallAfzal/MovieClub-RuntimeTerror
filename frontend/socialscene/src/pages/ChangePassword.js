import React from "react";
import { Box, Grid, Stack, TextField } from "@mui/material";
import "../styling/pages/ChangePassword.css";

import FormButton from "../components/FormButton";


class ChangePassword extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            old_password: '',
            new_password: '',
            new_password_confirmation: '',
        }
        this.changeHandler = this.changeHandler.bind(this)
        this.submitForm = this.submitForm.bind(this)
    }

    changeHandler(event) {
        this.setState({
            [event.target.name]: event.target.value
        });
    }

    submitForm() {
        const token = JSON.parse(localStorage.getItem('token'))
        fetch('http://127.0.0.1:8000/change_password/', {
            method: 'PUT',
            body: JSON.stringify(this.state),
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
                Authorization: token
            },
        })
            .then(response => response.json())
            .then((response) => console.log(response))
        localStorage.setItem('user', JSON.stringify(this.state))
    }


    fetchData() {
        const userData = JSON.parse(localStorage.getItem('user'))
        this.setState({
            old_password: userData.old_password,
            new_password: userData.new_password,
            new_password_confirmation: userData.new_password_confirmation,
        });
    }

    componentDidMount() {
        this.fetchData();
    }

    render() {
        return (
            <table className="change-password-table style={{ borderSpacing: 0 }}">
                <tr>
                    <div className='settings-text'>Settings:</div>
                </tr>
                <tr>
                    <td className='text-field'>
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
                                value={this.state.old_password}
                                onChange={this.changeHandler}
                            />

                            <TextField
                                className={"form-field"}
                                id={"outlined-basic"}
                                label={"new password"}
                                name={"new_password"}
                                type={"password"}
                                variant={"outlined"}
                                value={this.state.password_confirmation}
                                onChange={this.changeHandler}
                            />

                            <TextField
                                className={"form-field"}
                                id={"outlined-basic"}
                                label={"also new password"}
                                name={"also_new_password"}
                                type={"password"}
                                variant={"outlined"}
                                value={this.state.new_password_confirmation}
                                onChange={this.changeHandler}
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
                                            onClick={this.submitForm}
                                        />
                                    </Box>
                                </Box>
                            </div>
                        </Stack>
                    </td>
                </tr>
            </table>
        );
    }
}

export default ChangePassword