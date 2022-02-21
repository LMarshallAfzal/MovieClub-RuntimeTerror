import React from "react";
import "../styling/components/EnterButton.css";
import {Link} from "react-router-dom";

export function EnterButton() {
    return (
        <Link to='/login'>
            <enterButton className='btn'>enter</enterButton>
        </Link>
    );
}
