import React from "react";
import "../styling/components/FormButton.css";

function FormButton(props) {
    return (
        <formButton type="submit" className='form-button' onClick={props.onClick} >{props.text}  </formButton>
    );
}

export default FormButton;
