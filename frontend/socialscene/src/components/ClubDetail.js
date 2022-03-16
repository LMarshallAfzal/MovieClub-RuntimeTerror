import React from "react";
import {useParams} from "react-router";


function ClubDetail() {
    let { clubID } = useParams();

    return (
        <>
            <h4>Club {clubID}</h4>
        </>
    );
}

export default ClubDetail;