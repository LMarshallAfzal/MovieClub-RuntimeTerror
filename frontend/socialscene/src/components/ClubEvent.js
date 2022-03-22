import React from "react";
import "../styling/components/ClubEvent.css";
import {useParams} from "react-router";
import {DummyClubData} from "../pages/data/DummyClubsData";

function ClubEvent() {

    let { clubID } = useParams();
    let club = DummyClubData.find(obj => obj.ID === clubID);

    return(
        <h2>{club.clubName}</h2>
    )
}

export default ClubEvent;