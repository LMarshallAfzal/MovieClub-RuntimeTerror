import React, {useState} from 'react'
import {Link} from "react-router-dom";

function Navbar() {
    return (
        <>
            <nav className={"Navbar"}>
                <div className={"navbar-container"}>
                    <Link to={"/"} className={"navbar-logo"}>
                        NOAH
                    </Link>
                </div>
            </nav>
        </>
    );
}

export default Navbar

