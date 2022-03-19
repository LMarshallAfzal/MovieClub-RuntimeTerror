import React, { Component } from "react";
import "../../styling/pages/HomeRouter.css";
import { Route, Routes, Outlet } from "react-router-dom";
import Sidebar from "../../components/root/Sidebar";
import NameHeader from "../../components/NameHeader";
import { Grid } from "@mui/material";
import CsrfToken from "../../components/helper/CsrfToken";

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
