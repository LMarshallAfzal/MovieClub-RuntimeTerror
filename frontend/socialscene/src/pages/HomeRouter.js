import React, { Component } from "react";
import "../styling/pages/HomeRouter.css";
import { Route, Routes, Outlet } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import NameHeader from "../components/NameHeader";
import { Grid } from "@mui/material";
import Clubs from "./Clubs";
import Movies from "./Movies";
import WhatsOn from "./WhatsOn";
import Profile from "./Profile";
import Options from "./Options";
import Home from "./Home";
import OthersProfile from "./OthersProfile";
import ChangePassword from "./ChangePassword";
import { AuthProvider } from "../components/AuthContext";

import Cookies from "js-cookie";
import CsrfToken from "../components/CsrfToken";
// import { AuthProvider } from "../components/AuthContext";


function HomeRouter() {
    return (
        <>
        <CsrfToken/>
            <Grid className={"home-grid"} container>
                <Grid className={"home-grid-L-sidebar"} item xs={3}>
                    <NameHeader
                        firstName={"noah"}
                        lastName={"cheeseman"}
                        joinDate={"2022"} />
                    <Sidebar />
                </Grid>
                <Grid className={"home-grid-R-content"} item xs={9} padding={2} >
                 <Outlet/>
                </Grid>
            </Grid>
        </>
    );
}

export default HomeRouter;
