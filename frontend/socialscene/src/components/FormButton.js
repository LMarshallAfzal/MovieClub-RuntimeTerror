import React from "react";
import "../styling/components/FormButton.css";

function FormButton(props) {

    return (
        <button type={props.type} className={"form-button"} id={props.style || "normal"} onClick={(props.style === "disabled") ? "": props.onClick}>{props.text}</button>
    );
}

export default FormButton;
