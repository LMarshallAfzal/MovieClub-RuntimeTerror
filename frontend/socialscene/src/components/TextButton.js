import React from "react";
import "../styling/components/TextButton.css";

function TextButton(props) {
    return (
        <button className={"text-button"}>{props.text}</button>
    );
}

export default TextButton;