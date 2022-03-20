import React from "react";
import "../styling/components/EnterButton.css";
import {Link} from "react-router-dom";

function EnterButton(props) {
    return (
        <Link to={props.linkTo} className={"enter-button-wrapper"}>
            <enterButton className='enter-button'>{props.text}</enterButton>
        </Link>
    );
}

export default EnterButton;
