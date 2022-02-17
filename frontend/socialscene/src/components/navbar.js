import React, {useState} from "react";
import {Link} from "react-router-dom";
import "../styling/main.css"
import {enterButton} from "./EnterButton";


function Navbar() {
    const [setButton] = useState(true)

    const showButton = () => {
        if(window.innerWidth <= 960) {
            setButton(false);
        } else {
            setButton(true);
        }
    };

    window.addEventListener('resize', showButton);

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
                        <enterButton className={"btn"}> 
                            <Link to="login" style={{ textDecoration: 'none' }}>
                                enter ➥
                            </Link>
                        </enterButton>
                    </div>
                </div>
                <div className={"navbar-red"} />
            </div>
        </>
    );
}

export default Navbar
