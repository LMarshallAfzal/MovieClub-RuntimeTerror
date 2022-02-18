import React from 'react'
import SideNavbar from '../components/sidebar';
import NameHeader from '../components/NameHeader';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function dashboard() {
    return (
        <>
            <NameHeader />
            <SideNavbar />
        </>
    );
}

export default dashboard;