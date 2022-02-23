import React from "react";
import {Link} from "react-router-dom";
import "../styling/components/Navbar.css";
import EnterButton from "./EnterButton";


function Navbar() {
    return (
        <>
            <div className={"socialscene-navbar"}>
                <div className={"navbar-black"}>
                    <Link to={"/"} className={"navbar-logo"}>
                        <span style={{fontFamily: "Helvetica-Light"}}>social</span>
                        <span style={{fontFamily: "Helvetica-Bold"}}>scene</span>
                        <span style={{ color: "red", fontWeight: "bold" }}>.</span>
                    </Link>
                    <Link to={"/login"} className={"navbar-enter-button"}>
                        <EnterButton text={"enter"} />
                    </Link>
                </div>
                <div className={"navbar-red"} />
            </div>
        </>
    );
}

export default Navbar
