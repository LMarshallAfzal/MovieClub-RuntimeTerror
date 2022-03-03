import React from "react";
import "../styling/pages/Signup.css"
import HeadingCircle from "../components/HeadingCircle";
import {Box, Grid, Stack, TextField} from "@mui/material";
import FormButton from "../components/FormButton";
import {Link} from "react-router-dom";



function Signup () {
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
                        value={this.state.username}
                        onChange={this.changeHandler}
                    />
                    <TextField
                        id={"outlined-basic"}
                        label={"first name"}
                        name={"first_name"}
                        type={"text"}
                        variant={"outlined"}
                        onChange={this.changeHandler}
                        value={this.state.first_name}
                    />
                    <TextField
                        id={"outlined-basic"}
                        label={"last name"}
                        name={"last_name"}
                        type={"text"}
                        variant={"outlined"}
                        onChange={this.changeHandler}
                        value={this.state.last_name}
                    />
                    <TextField
                        id={"outlined-basic"}
                        label={"email"}
                        name={"email"}
                        type={"email"}
                        variant={"outlined"}
                        onChange={this.changeHandler}
                        value={this.state.email}
                    />
                    <TextField
                        id={"outlined-basic"}
                        label={"bio"}
                        name={"bio"}
                        type={"text"}
                        variant={"outlined"}
                        onChange={this.changeHandler}
                        value={this.state.bio}
                    />
                    <TextField
                        id={"outlined-basic"}
                        label={"preferences"}
                        name={"preferences"}
                        type={"text"}
                        variant={"outlined"}
                        onChange={this.changeHandler}
                        value={this.state.preferences}
                    />
                    <TextField
                        id={"outlined-basic"}
                        label={"password"}
                        name={"password"}
                        type={"password"}
                        variant={"outlined"}
                        onChange={this.changeHandler}
                        value={this.state.password}
                    />
                    <TextField
                        id={"outlined-basic"}
                        label={"password confirmation"}
                        name={"password_confirmation"}
                        type={"password"}
                        variant={"outlined"}
                        onChange={this.changeHandler}
                        value={this.state.password_confirmation}
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
                                        onClick={this.submitForm}
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

export default Signup;
