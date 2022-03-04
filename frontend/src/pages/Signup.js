import React, {useState} from "react";
import "../styling/pages/Signup.css"
import HeadingCircle from "../components/HeadingCircle";
import {Box, Grid, Stack, TextField} from "@mui/material";
import FormButton from "../components/FormButton";
import {Link, Navigate} from "react-router-dom";
import { connect } from 'react-redux';
import { register } from '../API/actions/auth';
import CSRFToken from '../API/CSRFToken';

const Register = ({ register, isAuthenticated }) => {
    const [formData, setFormData] = useState({
        username:'',
        first_name:'',
        last_name:'',
        email:'',
        bio:'',
        preferences:'',
        password:'',
        password_confirmation:''
    });
    const [accountCreated, setAccountCreated] = useState(false);

    const { username, first_name, last_name, email, bio, preferences, password, password_confirmation } = formData;

    const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });

    const onSubmit = e => {
        e.preventDefault();

        if (password === password_confirmation) {
            register(username, first_name, last_name, email, bio, preferences, password_confirmation);
            setAccountCreated(true);
        }
    };

    if (isAuthenticated)
        return <Navigate to='/dashboard' />;
    else if (accountCreated)
        return <Navigate to='/login' />;


    return (
        <Grid className={"login-grid"} container spacing={2}>
            <Grid className={"login-grid-left"} item xs={6}>
                <HeadingCircle title={"sign up"}/>
            </Grid>

            <Grid className={"login-grid-right"} item xs={6}>
                <Stack className={"form-stack"} spacing={3}>
                    <TextField
                        id={"outlined-basic"}
                        label={"username"}
                        name={"username"}
                        type={"text"}
                        variant={"outlined"}
                        onChange={e => onChange(e)}
                        value={username}
                    />
                    <TextField
                        id={"outlined-basic"}
                        label={"first name"}
                        name={"first_name"}
                        type={"text"}
                        variant={"outlined"}
                        onChange={e => onChange(e)}
                        value={first_name}
                    />
                    <TextField
                        id={"outlined-basic"}
                        label={"last name"}
                        name={"last_name"}
                        type={"text"}
                        variant={"outlined"}
                        onChange={e => onChange(e)}
                        value={last_name}
                    />
                    <TextField
                        id={"outlined-basic"}
                        label={"email"}
                        name={"email"}
                        type={"email"}
                        variant={"outlined"}
                        onChange={e => onChange(e)}
                        value={email}
                    />
                    <TextField
                        id={"outlined-basic"}
                        label={"bio"}
                        name={"bio"}
                        type={"text"}
                        variant={"outlined"}
                        onChange={e => onChange(e)}
                        value={bio}
                    />
                    <TextField
                        id={"outlined-basic"}
                        label={"preferences"}
                        name={"preferences"}
                        type={"text"}
                        variant={"outlined"}
                        oonChange={e => onChange(e)}
                        value={preferences}
                    />
                    <TextField
                        id={"outlined-basic"}
                        label={"password"}
                        name={"password"}
                        type={"password"}
                        variant={"outlined"}
                        onChange={e => onChange(e)}
                        value={password}
                    />
                    <TextField
                        id={"outlined-basic"}
                        label={"password confirmation"}
                        name={"password_confirmation"}
                        type={"password"}
                        variant={"outlined"}
                        onChange={e => onChange(e)}
                        value={password_confirmation}
                    />

                    <div className={"single-button"}>
                        <Box
                            sx={{
                                display: 'grid',
                                gridAutoColumns: '1fr',
                                gap: 1,
                            }}
                        >
                            <Box sx={{gridRow: '1', gridColumn: 'span 1'}}>
                                <Link to={"/home"} className={"navbar-enter-button"}>
                                    <FormButton
                                        text={"sign up"}

                                        onClick={e => onSubmit(e)}
                                    />
                                </Link>
                            </Box>
                        </Box>
                    </div>
                </Stack>
            </Grid>
        </Grid>
    );
}

const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated
});

export default connect(mapStateToProps, { register })(Register);
