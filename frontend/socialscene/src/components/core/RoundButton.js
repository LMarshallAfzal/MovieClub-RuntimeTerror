import React from "react";
import "../../styling/components/RoundButton.css";
import {HandleNavigate} from "../helper/HandleNavigate";

function RoundButton(props) {

    return (
        <button className={"enter-button"} onClick={props.onClick || HandleNavigate(props.linkTo)}>{props.text}</button>
    );
}

export default RoundButton;
