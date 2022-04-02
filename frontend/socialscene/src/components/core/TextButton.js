import React from "react";
import "../../styling/components/TextButton.css";
import {useNavigate} from "react-router";

function TextButton(props) {

    const navigate = useNavigate();

    const HandleNavigate = (location) => {
        return (
            navigate(`${location}`, {replace: false})
        )
    }
    return (
        <button className={"text-button"} style={props.style}
                onClick={(props.onClick || (() => HandleNavigate(props.linkTo)))}>{props.text}</button>
    );
}

export default TextButton;