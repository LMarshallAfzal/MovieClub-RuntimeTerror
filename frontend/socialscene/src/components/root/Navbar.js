import React, {useContext} from "react";
import {Link, useLocation,matchPath} from "react-router-dom";
import "../../styling/components/Navbar.css";
import EnterButton from "../EnterButton";
import AuthContext from "../helper/context/AuthContext"


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
    let {user,logoutUser} = useContext(AuthContext);

    switch (location.pathname){
        case "/": if (user) {return (

            <EnterButton
                text={"enter"}
                linkTo={"/home"}
            />
        )} else {return (

            <EnterButton
                text={"enter"}
                linkTo={"/login"}
            />
        )}

        case "/login": return (

            <EnterButton
                text={"sign up"}
                linkTo={"/signup"}
            />
        )

        default: if(user) {return (

            <EnterButton
                text={"log out"}
                onClick={logoutUser}
            />
        )} else {return (
            <></>
        )}
    }
}
