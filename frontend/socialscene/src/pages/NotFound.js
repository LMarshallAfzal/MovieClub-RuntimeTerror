import React from "react";
import "../styling/pages/NotFound.css";

function notFound() {
    return (
        <>
            <div style={{display: 'flex',  justifyContent:'center', alignItems:'center', height: '100vh'}}>
                <h1>Oops, you got lost. 404 Not Found.</h1>
            </div>
        </>
    );
}

export default notFound;
