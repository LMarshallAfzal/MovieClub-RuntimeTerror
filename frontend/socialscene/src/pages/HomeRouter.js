import React, { useState } from "react";
import "../styling/pages/HomeRouter.css";
import { Route, Routes } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import NameHeader from "../components/NameHeader";
import { Grid } from "@mui/material";
import Dashboard from "./Dashboard";
import Clubs from "./Clubs";
import Movies from "./Movies";
import WhatsOn from "./WhatsOn";
import Profile from "./Profile";
import Options from "./Options";
import Home from "./Home";
import Login from "./Login";
import OthersProfile from "./OthersProfile";
import ChangePassword from "./ChangePassword";

function HomeRouter() {
    const [token, setToken] = useState('');

    const userLogin = (tok) => {
        setToken(tok);
    }

    localStorage.setItem('token', JSON.stringify("Token " + token))
    if (!token) {
        return <Login userLogin={userLogin} />
    }

    return (
        <>
            <Grid className={"home-grid"} container>
                <Grid className={"home-grid-L-sidebar"} item xs={3}>
                    <NameHeader
                        firstName={"noah"}
                        lastName={"cheeseman"}
                        joinDate={"2022"} />
                    <Sidebar />
                </Grid>
                <Grid className={"home-grid-R-content"} item xs={9} padding={2} >
                    <Routes>
                        <Route path={"/"} element={(<Home />)} />
                        <Route path={"dashboard"} element={(<Dashboard />)} />
                        <Route path={"clubs"} element={(<Clubs />)} />
                        <Route path={"movies"} element={(<Movies />)} />
                        <Route path={"whats-on"} element={(<WhatsOn />)} />
                        <Route path={"profile"} element={(<Profile />)} />
                        <Route path={"options"} element={(<Options />)} />
                        <Route path={"change-password"} element={(<ChangePassword />)} />
                        <Route path={"others-profile"} element={(<OthersProfile />)} />
                    </Routes>
                </Grid>
            </Grid>
        </>
    );
}

export default HomeRouter;
