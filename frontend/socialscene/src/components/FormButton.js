import React from "react";
import "../styling/components/FormButton.css";

function FormButton(props) {
    return (
        <formButton className='form-button' onClick={props.onClick} >{props.text}  </formButton>
    );
}

export default FormButton;
