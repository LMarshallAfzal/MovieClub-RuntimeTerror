import React from "react";
import {Link, useLocation} from "react-router-dom";
import "../styling/components/Navbar.css";
import EnterButton from "./EnterButton";
import { connect } from 'react-redux';
import { logout } from '../API/actions/auth';


const Navbar = ({isAuthenticated, logout}) => {

    const authLinks = (
        <Link
            to={"/login"}
            onClick={logout}
            className={"navbar-enter-button"}>
            <EnterButton
                text={"log out"}
            />
        </Link>
    );

    const links = (
        <></>
    );

    function NavbarButton({isAuthenticated}) {
        const location = useLocation();
        switch (location.pathname){
            case "/":
                return (
                    <Link to={"/login"} className={"navbar-enter-button"}>
                        <EnterButton
                            text={"enter"}/>
                    </Link>
                )

            case "/login":
                return (
                    <Link to={"/signup"} className={"navbar-enter-button"}>
                        <EnterButton
                            text={"sign up"} />
                    </Link>
                )

            case "/home":
                return (
                    <Link to={"/login"} onClick={logout} className={"navbar-enter-button"}>
                        <EnterButton text={"log out"} />
                    </Link>
                )

            default:
                return (
                    // <></>
                    <>{isAuthenticated ? authLinks : links}</>
                )
        }
    }


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

const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated
});

export default connect(mapStateToProps,{logout})(Navbar);
