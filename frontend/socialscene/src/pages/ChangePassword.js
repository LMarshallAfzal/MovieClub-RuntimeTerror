import React from "react";
import {Box, Grid, Stack, TextField} from "@mui/material";

import FormButton from "../components/FormButton";


class ChangePassword extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            old_password:'',
            new_password:'',
            new_password_confirmation:'',
        }
        this.changeHandler=this.changeHandler.bind(this)
        this.submitForm=this.submitForm.bind(this)
    }

    changeHandler(event){
        this.setState({
            [event.target.name]:event.target.value
        });
    }

    submitForm(){
        const token = JSON.parse(localStorage.getItem('token'))
        fetch('http://127.0.0.1:8000/change_password/',{
            method:'PUT',
            body:JSON.stringify(this.state),
            headers:{
                'Content-type': 'application/json; charset=UTF-8',
                Authorization: token
            },
        })
        .then(response=>response.json())
        .then((response)=>console.log(response))
        localStorage.setItem('user', JSON.stringify(this.state))
    }
    

    fetchData(){
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
            <Grid>
                <Grid className="profile-table" style= {{borderSpacing: 0}}>
                <tr>
                    <div className='edit-profile-info-text'>Change Password:</div>
                </tr> 
                </Grid>
                <Grid className={"changePassword-grid-right"} item xs={6}
                  alignItems="center"
                  justifyContent="center">
                    <Stack className={"form-stack"} spacing={2}
                height={"100%"}>
                        <TextField
                            className={"form-field"}
                            id={"outlined-basic"}
                            label={"old password"}
                            name={"old password"}
                            type={"passsword"}
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
                            label={"new password confirmation"}
                            name={"new_password_confirmation"}
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
                </Grid>
            </Grid>
        );
    }
}

export default ChangePassword