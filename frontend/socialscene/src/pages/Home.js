import React from "react";
import {Outlet, Route, Routes} from "react-router-dom";
import SideNavbar from "../components/Sidebar";
import NameHeader from "../components/NameHeader";


function home() {
    return (
        <>
            <NameHeader />
            <SideNavbar />

            <Outlet />
        </>
    );
}

export default home;
