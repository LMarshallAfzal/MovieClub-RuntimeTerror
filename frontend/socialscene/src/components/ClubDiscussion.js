import React, {useCallback} from "react";
import "../styling/components/ClubDiscussion.css";
import {useParams, useNavigate} from "react-router";
import {DummyClubData} from "../pages/data/DummyClubsData";
import {Grid} from "@mui/material";
import FormButton from "./FormButton";

function ClubDiscussion() {

    let { clubID } = useParams();
    let club = DummyClubData.find(obj => obj.ID === clubID);

    const navigate = useNavigate();
    const createNewEvent = useCallback(() => navigate('discussion/new', {replace: false}), [navigate]);

    return(
        <Grid container
              spacing={2}>

            <Grid item xs={10}>
                <h4 className={"home-page-sub-section-heading"}>{club.clubName}:</h4>
            </Grid>

            <Grid item xs={2}>
                <FormButton className={"create-button"}
                    text={"create"}
                    onClick={createNewEvent}
                />
            </Grid>

            <Grid item xs={6}>
                <div className={"home-page-card-background"}>
                    <h4 className={"home-page-card-title"}>
                        events:
                    </h4>
                </div>
            </Grid>

            <Grid item xs={6}>
                <div className={"home-page-card-background"}>
                    <h4 className={"home-page-card-title"}>
                        chats:
                    </h4>
                </div>
            </Grid>
        </Grid>
    )
}

export default ClubDiscussion;