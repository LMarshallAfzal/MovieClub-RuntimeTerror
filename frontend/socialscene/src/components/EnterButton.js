import React from "react";
import "../styling/components/EnterButton.css";

function EnterButton(props) {
    return (
        <enterButton className='enter-button'>{props.text}</enterButton>
    );
}

export default EnterButton;
