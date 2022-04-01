import React from "react";
import "../../styling/components/ThemeButton.css";

function ThemeButton(props) {

    return (
        <button type={props.type} className={"form-button"} id={props.style || "normal"}
                onClick={(props.style === "disabled") ? "" : props.onClick}>{props.text}</button>
    );
}

export default ThemeButton;
