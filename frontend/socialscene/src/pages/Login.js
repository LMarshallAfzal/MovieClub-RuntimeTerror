import React, {useState} from "react";
import {Navigate} from "react-router-dom"
import {connect} from "react-redux";
import {login} from "../API/actions/auth";
import HeadingCircle from "../components/HeadingCircle";
import {Box, Grid, Stack, TextField} from "@mui/material";
import FormButton from "../components/FormButton";
import "../styling/pages/Login.css";
import CSRFToken from "../API/CSRFToken";

const Login = ({login, isAuthenticated}) => {
    const [formData, setFormData] = useState({
        username: '',
        password: ''
    });

    const {username, password} = formData;

    const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });

    const onSubmit = e => {
        e.preventDefault();

        login(username, password);
    };

    if (isAuthenticated)
        return <Navigate replace to='/home' />;

    return (
        <Grid className={"login-grid"} container spacing={2}>
            <Grid className={"login-grid-left"} item xs={6}>
                <HeadingCircle title={"log in"}/>
            </Grid>

            <Grid className={"login-grid-right"} item xs={6}
              alignItems="center"
              justifyContent="center">
                <Stack className={"form-stack"} spacing={3}
            height={"100%"}>
                    <form onSubmit={e => onSubmit(e)}>
                        <CSRFToken />
                        <TextField
                            className={"form-field"}
                            id={"outlined-basic"}
                            label={"username"}
                            name={"username"}
                            variant={"outlined"}
                            value={username}
                            onChange={e => onChange(e)}
                        />

                        <TextField
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
                                        text={"log in"}
                                        onClick={e => onSubmit(e)}
                                    />
                                </Box>

                                <Box sx={{ gridRow: '1', gridColumn: '2 / 5'}}>
                                    <FormButton
                                        text={"forgot password"}
                                    />
                                </Box>
                            </Box>
                        </div>
                    </form>
                </Stack>
            </Grid>
        </Grid>
    );
}

const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated
});

export default connect(mapStateToProps, {login})(Login);
