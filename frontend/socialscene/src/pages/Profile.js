import React from 'react'
import SideNavbar from '../components/Sidebar';
import NameHeader from '../components/NameHeader';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function profile() {
    return (
        <>
        <table style={{borderSpacing:0}}>
            <tr>
                <td style={{padding:0}}>
                    <NameHeader />
                    <SideNavbar />
                </td>
                <td>
                    <tr>
                        <snap>Edit profile info:</snap>
                    </tr>
                </td>
            </tr>
        </table>
        </>
    );
}

export default profile;
