import React, {useContext} from "react";
import {Link, useLocation,matchPath} from "react-router-dom";
import "../../styling/components/Navbar.css";
import RoundButton from "./RoundButton";
import AuthContext from "../../components/helper/AuthContext"


function Navbar() {

    return (
        <>
            <div className={"navbar"}>
                <div className={"navbar-black"}>
                    <Link to={"/"} className={"navbar-logo"}>
                        <span className={"logo-social"}>social</span>
                        <span className={"logo-scene"}>scene</span>
                        <span className={"logo-scene-emphasise"}>.</span>
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

            <RoundButton
                text={"enter"}
                linkTo={"/home"}
            />
        )} else {return (

            <RoundButton
                text={"enter"}
                linkTo={"/login"}
            />
        )}

        case "/login": return (

            <RoundButton
                text={"sign up"}
                linkTo={"/signup"}
            />
        )

        default: if(user) {return (

            <RoundButton
                text={"log out"}
                onClick={logoutUser}
            />
        )} else {return (
            <></>
        )}
    }
}
