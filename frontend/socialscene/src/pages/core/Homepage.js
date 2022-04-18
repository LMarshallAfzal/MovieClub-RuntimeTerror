import React,{ useEffect,useState} from "react";
import "../../styling/pages/Homepage.css";


window.addEventListener("DOMContentLoaded", () => {
    const spotlight = document.querySelector('.spotlight');
    let spotlightSize = 'transparent 160px, rgba(0, 0, 0, 0.60) 200px)';

    window.addEventListener('mousemove', e => updateSpotlight(e));

    function updateSpotlight(e) {
        spotlight.style.backgroundImage = `radial-gradient(circle at ${e.pageX / window.innerWidth * 100}% ${(e.pageY - 90) / (window.innerHeight - 90) * 100}%, ${spotlightSize}`;

    }
});

const Homepage = () => {
    return (
        <>
            <div className={"spotlight"}/>
            <div className={"welcome-text"}>
                <h2>welcome
                    <h2--emphasise>.</h2--emphasise>
                </h2>
            </div>
            <img className={'cover-image'}
                 src={"https://c1.wallpaperflare.com/preview/690/334/551/theatre-curtain-theater-red-curtain.jpg"}
                 alt="blurred movie poster"
            />
            <div className={"welcome-poster"}/>

        </>
    );
}
export default Homepage;
