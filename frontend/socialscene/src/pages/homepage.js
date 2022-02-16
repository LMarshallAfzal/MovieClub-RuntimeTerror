import React from "react";

let background = "https://m.media-amazon.com/images/M/MV5BNzQxNTIyODAxMV5BMl5BanBnXkFtZTgwNzQyMDA3OTE@._V1_.jpg"

function homepage() {
    return (
        <div>
            <div className="cover-image" style={{ backgroundImage: `url(${background})` }}></div>
        </div>
        
        // <img
        //     className={'cover-image'}
        //     src="https://m.media-amazon.com/images/M/MV5BNzQxNTIyODAxMV5BMl5BanBnXkFtZTgwNzQyMDA3OTE@._V1_.jpg"
        //     alt="blurred movie poster"
        // />
    );
};



export default homepage;
