import React from 'react'
import SideNavbar from '../components/Sidebar';
import NameHeader from '../components/NameHeader';
import "../styling/pages/Profile.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function profile() {
    return (
        <>
            <table style={{ borderSpacing: 0 }}>
                <tr>
                    <div className='edit-profile-info-text'>Edit profile info:</div>
                </tr>
            </table>
        </>
    );
}

export default profile;
