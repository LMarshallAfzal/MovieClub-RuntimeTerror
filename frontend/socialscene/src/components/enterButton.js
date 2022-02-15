import React from "react";
import "../styling/enterButton.css";
import {Link} from "react-router-dom";

export function enterButton() {
    return (
        <Link to='/'>
            <enterButton className='btn'>enter</enterButton>
        </Link>
    );
}
