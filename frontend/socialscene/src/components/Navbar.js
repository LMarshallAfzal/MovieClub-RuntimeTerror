import React from "react";
import {Link, useLocation} from "react-router-dom";
import "../styling/components/Navbar.css";
import EnterButton from "./EnterButton";


function Navbar() {
    return (
        <>
            <div className={"navbar"}>
                <div className={"navbar-black"}>
                    <Link to={"/"} className={"navbar-logo"}>
                        <span style={{fontFamily: "Helvetica-Light"}}>social</span>
                        <span style={{fontFamily: "Helvetica-Bold"}}>scene</span>
                        <span style={{ color: "red", fontWeight: "bold" }}>.</span>
                    </Link>

                    <NavbarButton />
                </div>
                <div className={"navbar-red"} />
            </div>
        </>
    );
}
export default Navbar;

function NavbarButton() {
    const location = useLocation();
    switch (location.pathname){
        case "/":
            return (
                <Link to={"/dashboard"} className={"navbar-enter-button"}>
                <EnterButton
                    text={"enter"}/>
                </Link>
            )

        case "/dashboard":
            return (
                <Link to={"/signup"} className={"navbar-enter-button"}>
                <EnterButton
                    text={"sign up"} />
                </Link>
            )

        default:
            return (
                <></>
            )
    }
}
