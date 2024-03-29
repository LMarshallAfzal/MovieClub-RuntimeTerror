import React from "react";
import "../../styling/components/ThemeButton.css";
import {useNavigate} from "react-router";

function ThemeButton(props) {

    const navigate = useNavigate();

    const HandleNavigate = (location) => {
        return (
            navigate(`${location}`, {replace: false})
        )
    }

    return (
        <button className={"form-button"}
                type={props.type}
                id={props.style || "normal"}
                onClick={(props.style === "disabled") ? null : (props.onClick || (props.linkTo ? () => HandleNavigate(props.linkTo) : null))}>
            {props.text}
        </button>
    );
}

export default ThemeButton;
