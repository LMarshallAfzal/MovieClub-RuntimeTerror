import React, {useContext} from "react";
import {Link, useLocation,matchPath} from "react-router-dom";
import "../../styling/components/Navbar.css";
import EnterButton from "../EnterButton";


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

                    <div className={"navbar-enter-button"}>
                        <NavbarButton />

                    </div>

                </div>
                <div className={"navbar-red"} />
            </div>
        </>
    );
}
export default Navbar;

function NavbarButton() {
    const location = useLocation();

    

    if (matchPath(location.pathname,"/")) {
        return (
            <EnterButton
                    text={"enter"}
                    linkTo={"/login"}
                />
        )
    } else if (matchPath(location.pathname,"/login")) {
        return (
                <EnterButton
                    text={"sign up"}
                    linkTo={"/signup"}
                />
            )
    } else if (matchPath(location.pathname, "/home/")) {
        // if(!user) return null
        return (
                <EnterButton
                
                    text={"log out"}
                    linkTo={"/home/logout"}
                    />
            )
    } else {
        return (
                <></>
            )
    }
}
