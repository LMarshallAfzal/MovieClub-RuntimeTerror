import React, {useContext} from "react";
import {Link} from "react-router-dom";
import AuthContext from "./AuthContext";

const Header = () => {
    let {user} = useContext(AuthContext);
    return (
        <div>
            <Link to="/home">Home</Link>
            <span> | </span>
            <Link to="/login">Login</Link>
        </div>
    )
}

export default Header