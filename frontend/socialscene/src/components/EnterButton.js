import React, {useCallback} from "react";
import "../styling/components/EnterButton.css";
import {useNavigate} from "react-router";

function EnterButton(props) {

    const navigate = useNavigate();
    const onCLickNavigate = useCallback(() => navigate(`${props.linkTo}`, {replace: false}), [navigate]);

    return (
        <button className='enter-button' data-testid="enter-button" onClick={props.onClick || onCLickNavigate}>{props.text}</button>
    );
}

export default EnterButton;
