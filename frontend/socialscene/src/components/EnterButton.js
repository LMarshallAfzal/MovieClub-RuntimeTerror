import React from "react";
import "../styling/components/EnterButton.css";
import {Link} from "react-router-dom";

function EnterButton(props) {
    return (
        <enterButton className='enter-button'>{props.text}</enterButton>
    );
}

export default EnterButton;