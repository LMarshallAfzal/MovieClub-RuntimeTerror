import React from "react";
import "../styling/enterButton.css";
import {Link} from "react-router-dom";

export function EnterButton() {
    return (
        <Link to='/login'>
            <enterButton className='btn'>enter</enterButton>
        </Link>
    );
}
