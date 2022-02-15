import React, {useState} from "react";
import {Link} from "react-router-dom";
import "../styling/navbar.css"
import {enterButton} from "./enterButton";


function Navbar() {
    const [enterButton, setButton] = useState(true)

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
                <div className={"navbar-logo-div"}>
                    <Link to={"/"} className={"navbar-logo"}>
                        socialScene.
                    </Link>
                </div>
                <div className={"navbar-enter-button"}>
                    <enterButton className={"btn"}>
                    enter
                    </enterButton>
                </div>
            </div>
            <div className={"navbar-red"} />
        </>
    );
}

export default Navbar
