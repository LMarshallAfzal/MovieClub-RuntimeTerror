import React from "react";
import "../styling/components/EnterButton.css";

function EnterButton(props) {
    return (
        <enterButton className='btn'>{props.text}</enterButton>
    );
}

export default EnterButton;
