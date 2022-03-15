import React from "react";
import "../styling/components/FormButton.css";

function FormButton(props) {
    return (
        <FormButton className='form-button' onClick={props.onClick} >{props.text}  </FormButton>
    );
}

export default FormButton;
