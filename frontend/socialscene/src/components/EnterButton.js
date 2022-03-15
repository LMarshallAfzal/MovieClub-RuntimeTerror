import React from "react";
import "../styling/components/EnterButton.css";
import {Link} from "react-router-dom";

function EnterButton(props) {
    return (
        <EnterButton className='enter-button'>{props.text}</EnterButton>
    );
}

export default EnterButton;
