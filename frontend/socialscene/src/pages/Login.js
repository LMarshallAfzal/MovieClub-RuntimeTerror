import React, {Component} from "react";
import "../styling/pages/Login.css";
import HeadingCircle from "../components/HeadingCircle";
import {Box, Grid, Stack, TextField} from "@mui/material";
import FormButton from "../components/FormButton";
import Cookies from "js-cookie";
import CsrfToken from "../components/CsrfToken";
import {Link} from "react-router-dom";

class Login extends Component {

    state = {
        credentials: {username: '', password: ''}
    }

    login = async event => {
      fetch("http://127.0.0.1:8000/log_in/", {
        method: "POST",
        mode: "cors",
        cache: "no-cache",
        credentials: "include",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          "X-CSRFToken": Cookies.get("csrftoken"),
        },
        body: JSON.stringify(this.state.credentials),
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error("Something went wrong...");
          } else {
            return response.json();
          }
        })
        .catch((err) => console.error(err));
    }
    
    inputChanged = event => {
        const cred = this.state.credentials;
        cred[event.target.name] = event.target.value;
        this.setState({credentials: cred});
    }
    
    render() {
        return (
            <Grid className={"login-grid"} container spacing={2}>
                <CsrfToken />

                <Grid className={"login-grid-left"} item xs={6}>
                    <HeadingCircle title={"log in"}/>
                </Grid>

                <Grid className={"login-grid-right"} item xs={6}
                  alignItems="center"
                  justifyContent="center">
                    <Stack className={"form-stack"} spacing={3}
                height={"100%"}>
                        <TextField
                            className={"form-field"}
                            id={"outlined-basic"}
                            label={"username"}
                            name={"username"}
                            variant={"outlined"}
                            value={this.state.credentials.username}
                            onChange={this.inputChanged}
                        />

                        <TextField
                            className={"form-field"}
                            id={"outlined-basic"}
                            label={"password"}
                            name={"password"}
                            type={"password"}
                            variant={"outlined"}
                            value={this.state.credentials.password}
                            onChange={this.inputChanged}
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
                                        <Link to={"/home"} className={"navbar-enter-button"}>
                                            <FormButton
                                                text={"log in"}
                                                onClick={this.login}
                                            />
                                        </Link>
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


export default Login
