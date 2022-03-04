import React from "react";
import "../styling/components/FormButton.css";

function FormButton(props) {
    return (
        <button className='form-button' type={props.type}> {props.text}  </button>
    );
}

export default FormButton;
