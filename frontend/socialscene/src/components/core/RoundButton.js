import React from "react";
import "../../styling/components/RoundButton.css";
import {useNavigate} from "react-router";

function RoundButton(props) {

    const navigate = useNavigate();

    const HandleNavigate = (location) => {
        return (
            navigate(`${location}`, {replace: false})
        )
    }

    return (
        <button className={"enter-button"}
                onClick={props.onClick || (props.linkTo ? () => HandleNavigate(props.linkTo) : "")}>
            {props.text}
        </button>
    );
}

export default RoundButton;
