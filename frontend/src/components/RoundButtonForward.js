import React from "react";
import "../styling/components/RoundButtonForward.css";

function RoundButtonForward(props) {
    return (
        <roundButton className='round-forward'>{props.text}</roundButton>
    );
}

export default RoundButtonForward;
