import React from "react";
import "../styling/components/FormButton.css";

function FormButton(props) {
    return (
        <formButton className='form-button' role='button' data-testid='100' onClick={props.onClick} >{props.text}  </formButton>
    );
}

export default FormButton;
