import React, {useCallback, useState} from "react";
import {Collapse, Grid, ListItem, Stack} from "@mui/material";
import EnterButton from "./EnterButton";
import "../styling/components/ClubSelector.css";
import {DummyClubData} from "../pages/data/DummyClubsData";
import FormButton from "./FormButton";
import TextButton from "./TextButton";
import {useNavigate} from "react-router-dom";


function ClubSelector() {
    const navigate = useNavigate();
    const [showClubs, setShowClubs] = useState(true);

    const toggleShowClubs = () => {
        setShowClubs(!showClubs);
    }

    function navigateAndToggle(props){
        setShowClubs(!showClubs)
        navigate(props)
    }


    return (

       <Grid item xs={12}>
                <div className={"home-page-card-background"}>

                    <Grid container direction={"row"} padding={2}>

                        <Grid item xs={11}>
                            <h5 className={"home-page-card-title"}>your clubs</h5>
                        </Grid>

                        <Grid item xs={1} justifyItems={"flex-end"}>
                            <TextButton text={showClubs ? "close" : "open"} onClick={toggleShowClubs}/>
                        </Grid>

                        <Grid item xs={12}>

                            <Collapse in={showClubs}>

                                <Stack direction={"row"} className={"club-card-list-frame"}>
                                    {DummyClubData.map((club) => club.isMember === true && (
                                        <ListItem sx={{width: 'auto',p: 1}}>
                                            <div className={"club-selector-listing"}>
                                                <Grid container padding={2} alignItems={"center"}>

                                                    <Grid item xs={8}>
                                                        <h4>{club.clubName}</h4>
                                                    </Grid>

                                                    <Grid item xs={4}>
                                                        <EnterButton
                                                            text={"view"}
                                                            onClick={() => navigateAndToggle(`/home/discussion/${club.ID}`)}
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
