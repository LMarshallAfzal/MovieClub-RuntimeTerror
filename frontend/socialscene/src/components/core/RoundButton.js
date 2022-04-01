import React, {useCallback} from "react";
import "../../styling/components/RoundButton.css";
import {useNavigate} from "react-router";

function RoundButton(props) {

    const navigate = useNavigate();
    const onCLickNavigate = useCallback(() => navigate(`${props.linkTo}`, {replace: false}), [navigate]);

    return (
        <button className={"enter-button"} onClick={props.onClick || onCLickNavigate}>{props.text}</button>
    );
}

export default RoundButton;
