import React from 'react'
import SideNavbar from '../components/Sidebar';
import NameHeader from '../components/NameHeader';
import "../styling/pages/Profile.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import React from 'react';
import "../styling/pages/EditProfile.css";
import {Box, Grid, Stack, TextField} from "@mui/material";
import FormButton from "../components/FormButton";
// import {Link} from "react-router-dom";

function profile() {
    return (
        // <>
        //     <table style={{ borderSpacing: 0 }}>
        //         <tr>
        //             <div className='edit-profile-info-text'>Edit profile info:</div>
        //         </tr>
        //     </table>
        // </>
        <Grid className={"editProfile-grid"} container spacing={2}>

                <Grid className={"editProfile-grid-right"} item xs={6}>
                    <Grid className={"editProfile-grid-right"} item xs={6}>
                        <Stack className={"form-stack"} spacing={3}>
                            <TextField
                                id={"outlined-basic"}
                                label={"username"}
                                name={"username"}
                                type={"text"}
                                variant={"outlined"}
                                // value={this.state.username}
                                // onChange={this.changeHandler}
                            />
                            <TextField
                                id={"outlined-basic"}
                                label={"first name"}
                                name={"first_name"}
                                type={"text"}
                                variant={"outlined"}
                                // onChange={this.changeHandler}
                                // value={this.state.first_name}
                            />
                            <TextField
                                id={"outlined-basic"}
                                label={"last name"}
                                name={"last_name"}
                                type={"text"}
                                variant={"outlined"}
                                // onChange={this.changeHandler}
                                // value={this.state.last_name}
                            />
                            <TextField
                                id={"outlined-basic"}
                                label={"email"}
                                name={"email"}
                                type={"email"}
                                variant={"outlined"}
                                // onChange={this.changeHandler}
                                // value={this.state.email}
                            />
                            <TextField
                                id={"outlined-basic"}
                                label={"bio"}
                                name={"bio"}
                                type={"text"}
                                variant={"outlined"}
                                // onChange={this.changeHandler}
                                // value={this.state.bio}
                            />
                            <TextField
                                id={"outlined-basic"}
                                label={"preferences"}
                                name={"preferences"}
                                type={"text"}
                                variant={"outlined"}
                                // onChange={this.changeHandler}
                                // value={this.state.preferences}
                            />
                            <div className={"single-button"}>
                                <Box
                                    sx={{
                                        display: 'grid',
                                        gridAutoColumns: '1fr',
                                        gap: 1,
                                    }}
                                >
                                    <Box sx={{ gridRow: '1', gridColumn: 'span 1' }}>
                                        {/* <Link to={"/dashboard"} className={"navbar-enter-button"}> */}
                                            <FormButton
                                                text={"save changes"}
                                                // onClick={this.submitForm}
                                            />
                                        {/* </Link>     */}
                                    </Box>
                                </Box>    
                            </div>
                        </Stack>
                    </Grid>                
                </Grid>

                <Grid className={"login-grid-right"} item xs={6}>
                    <></>
                </Grid> 
            </Grid>
    );
}

export default profile;
