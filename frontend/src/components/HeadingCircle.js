import React from "react";
import "../styling/components/HeadingCircle.css"

function HeadingCircle(props) {
    return (
        <div className={"circle"}>
            <h2 className={"circle-text"}>
                {props.title}<h2--emphasise>.</h2--emphasise>
            </h2>
        </div>
    );
}

export default HeadingCircle;
