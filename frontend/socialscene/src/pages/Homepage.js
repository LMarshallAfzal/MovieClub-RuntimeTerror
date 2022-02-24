import React from "react";
import "../styling/pages/Homepage.css";

function homepage() {
    return (
        <>
            <div className={"spotlight"} />
            <div className={"welcome-text"}>
            <h2>welcome<h2--emphasise>.</h2--emphasise></h2>
            </div>
            <img className={'cover-image'}
                src="https://m.media-amazon.com/images/M/MV5BNzQxNTIyODAxMV5BMl5BanBnXkFtZTgwNzQyMDA3OTE@._V1_.jpg"
                alt="blurred movie poster"
                />
            {/*<div className={"welcome-poster"} />*/}

        </>
    );
}
export default homepage;

window.addEventListener("DOMContentLoaded", () => {
    const spotlight = document.querySelector('.spotlight');
    let spotlightSize = 'transparent 160px, rgba(0, 0, 0, 0.60) 200px)';

    window.addEventListener('mousemove', e => updateSpotlight(e));
    function updateSpotlight(e) {
        spotlight.style.backgroundImage = `radial-gradient(circle at ${e.pageX / window.innerWidth * 100}% ${e.pageY / window.innerHeight * 100}%, ${spotlightSize}`;

    }
});
