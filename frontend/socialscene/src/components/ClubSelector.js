import React, {useContext, useEffect, useState} from "react";
import {Collapse, Grid, ListItem, Stack} from "@mui/material";
import RoundButton from "./core/RoundButton";
import "../styling/components/ClubSelector.css";
import TextButton from "./core/TextButton";
import {useNavigate} from "react-router-dom";
import AuthContext from "../components/helper/AuthContext";

function ClubSelector() {
    let {user, authTokens} = useContext(AuthContext);
    const navigate = useNavigate();
    const [showClubs, setShowClubs] = useState(true);
    const [myClubData, setMyClubData] = useState([]);
    const [errorText, setErrorText] = useState("");
    const [error, setError] = useState(false);

    const toggleShowClubs = () => {
        setShowClubs(!showClubs);
    };

    function navigateAndToggle(props) {
        setShowClubs(!showClubs);
        navigate(props);
    }

    let errorHandler = (data) => {
        if (Object.keys(data).includes(0)) {
            setError(true);
            setErrorText(data);
        }
    };

    let getMembershipData = async () => {
        let response = await fetch(
            "http://127.0.0.1:8000/get_user_joined_clubs/" + user.user_id + "/",
            {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: "Bearer " + String(authTokens.access),
                },
            }
        );
        let data = await response.json();
        console.log(data);
        if (response.status === 200) {
            setMyClubData(data);
        } else {
            errorHandler(data);
        }
    };

    useEffect(() => {
        getMembershipData();
    }, []);

    return (
        <Grid item xs={12}>
            <div className={"home-page-card-background"}>
                <Grid container direction={"row"} padding={2}>
                    <Grid item xs={11}>
                        <h5 className={"home-page-card-title"}>your clubs</h5>
                    </Grid>
                    <Grid item xs={1}>
                        <TextButton
                            text={showClubs ? "close" : "open"}
                            onClick={toggleShowClubs}
                            style={{textAlign: "right"}}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <Collapse in={showClubs}>
                            <Stack direction={"row"} overflow={"auto"}>
                                {myClubData.map((club) => (
                                    <ListItem sx={{width: "auto", p: 1}}>
                                        <div className={"club-selector-listing"}>
                                            <Grid container padding={2} spacing={1} alignItems={"center"}>
                                                <Grid item xs={9}>
                                                    <h4 style={{
                                                        whiteSpace: "nowrap",
                                                        overflow: "hidden"
                                                    }}>{club.club_name}</h4>
                                                </Grid>
                                                <Grid item xs={3}>
                                                    <RoundButton
                                                        text={"view"}
                                                        onClick={() =>
                                                            navigateAndToggle(`/home/discussion/${club.id}`)
                                                        }
                                                    />
                                                </Grid>
                                            </Grid>
                                        </div>
                                    </ListItem>
                                ))}
                            </Stack>
                        </Collapse>
                    </Grid>
                </Grid>
            </div>
        </Grid>
    );
}

export default ClubSelector;
