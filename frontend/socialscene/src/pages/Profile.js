import React from 'react'
import SideNavbar from '../components/Sidebar';
import NameHeader from '../components/NameHeader';
import "../styling/pages/Profile.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "../styling/pages/EditProfile.css";
import { Box, Grid, Stack, TextField } from "@mui/material";
import FormButton from "../components/FormButton";
// import {Link} from "react-router-dom";

function profile() {
    return (
        <table className='profile-table' style={{ borderSpacing: 0 }}>
            <tr>
                <div className='edit-profile-info-text'>Edit profile info:</div>
            </tr>
            <tr>
                <td className='text-field'>
                    <Stack spacing={2}>
                        <TextField className='profile-text-box'
                            id={"outlined-basic"}
                            label={"username"}
                            name={"username"}
                            type={"text"}
                            variant={"outlined"}
                        // value={this.state.username}
                        // onChange={this.changeHandler}
                        />
                        <TextField className='profile-text-box'
                            id={"outlined-basic"}
                            label={"first name"}
                            name={"first_name"}
                            type={"text"}
                            variant={"outlined"}
                        // onChange={this.changeHandler}
                        // value={this.state.first_name}
                        />
                        <TextField className='profile-text-box'
                            id={"outlined-basic"}
                            label={"last name"}
                            name={"last_name"}
                            type={"text"}
                            variant={"outlined"}
                        // onChange={this.changeHandler}
                        // value={this.state.last_name}
                        />
                        <TextField className='profile-text-box'
                            id={"outlined-basic"}
                            label={"email"}
                            name={"email"}
                            type={"email"}
                            variant={"outlined"}
                        // onChange={this.changeHandler}
                        // value={this.state.email}
                        />
                        <TextField className='profile-text-box-bio'
                            spacing={6}
                            id={"outlined-multiline-static"}
                            label={"bio"}
                            name={"bio"}
                            type={"text"}
                            variant={"outlined"}
                            multiline
                            rows={7.5}
                            defaultValue="here goes the bio" //{this.state.bio}
                        // onChange={this.changeHandler}
                        // value={this.state.bio}
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
                                        text={"cancel"}
                                    // onClick={this.submitForm}
                                    />
                                    {/* </Link>     */}
                                </Box>
                            </Box>
                        </div>
                    </Stack>
                </td>
                <td className='text-field'>
                    <Stack spacing={2}>
                        <TextField className='profile-text-box-preference'
                            spacing={6}
                            id={"outlined-multiline-static"}
                            label={"preferences"}
                            name={"preferences"}
                            type={"text"}
                            variant={"outlined"}
                            multiline
                            rows={20}
                            defaultValue="here goes the preference"
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
                </td>
            </tr>
        </table >
    );
}

export default profile;
