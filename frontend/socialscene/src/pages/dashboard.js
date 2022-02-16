import React from 'react'
import SideNavbar from '../components/sidebar';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function dashboard() {
    return (
        <>
            <h1>This is a dashboard</h1>
            <SideNavbar />
        </>
    );
}

export default dashboard;