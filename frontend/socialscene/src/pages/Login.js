import React, {Component} from "react";
import "../styling/pages/Login.css";
import {Link} from "react-router-dom"
import HeadingCircle from "../components/HeadingCircle";
import {Box, Grid, Stack, TextField} from "@mui/material";
import FormButton from "../components/FormButton";

class Login extends Component {

    state = {
        credentials: {username: '', password: ''}
    }

    login = async event => {
        console.log(this.state.credentials)
        fetch('http://127.0.0.1:8000/auth/', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(this.state.credentials)
        })
        .then(data => data.json())
        .then(
            data => {
            this.props.userLogin(data.token)
            }
        )
        .catch(error => console.error(error))
        const response = await fetch('http://127.0.0.1:8000/user/' + this.state.credentials.username + '/', {
        
        })
        const data =  await response.json()
        console.log(data)
        console.log({first_name: data.first_name})
        localStorage.setItem('user', JSON.stringify({username: data.username, first_name: data.first_name, last_name: data.last_name ,email: data.email, bio:data.bio, preferences:data.preferences}))
        .catch(error => console.error(error))
        this.setState({
            username:'',
            first_name:'',
            last_name:'',
            email:'',
            bio:'',
            preferences:'',
            password:'',
            password_confirmation:''
        })
    }
    
    inputChanged = event => {
        const cred = this.state.credentials;
        cred[event.target.name] = event.target.value;
        this.setState({credentials: cred});
    }
    
    render() {
        return (
            <Grid className={"login-grid"} container spacing={2}>
                <Grid className={"login-grid-left"} item xs={6}>
                    <HeadingCircle title={"log in"}/>
                </Grid>

                <Grid className={"login-grid-right"} item xs={6}>
                    <Stack className={"form-stack"} spacing={3}>
                        <TextField
                            id={"outlined-basic"}
                            label={"username"}
                            name={"username"}
                            variant={"outlined"}
                            value={this.state.credentials.username}
                            onChange={this.inputChanged}
                        />

                        <TextField
                            id={"outlined-basic"}
                            label={"password"}
                            name={"password"}
                            type={"password"}
                            variant={"outlined"}
                            value={this.state.credentials.password}
                            onChange={this.inputChanged}
                        />

                        <div className={"dual-button"}>
                            <Box
                                sx={{
                                    display: 'grid',
                                    gridAutoColumns: '1fr',
                                    gap: 1,
                                }}
                            >
                                <Box sx={{ gridRow: '1', gridColumn: 'span 1' }}>
                                        <FormButton
                                            text={"log in"}
                                            onClick={this.login}
                                        />
                                </Box>

                                <Box sx={{ gridRow: '1', gridColumn: '2 / 5'}}>
                                    <FormButton
                                        text={"forgot password"}
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

export default Login;
