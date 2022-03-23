import React from "react";
import {Grid, ListItem, Stack} from "@mui/material";
import EnterButton from "./EnterButton";
import "../styling/components/ClubSelector.css";
import {DummyClubData} from "../pages/data/DummyClubsData";



function ClubSelector() {
    return (

       <Grid item xs={12}>
                <div className={"club-selector-background"}>
                    <h4 className={"home-page-card-title"}>your clubs:</h4>

                    <Stack direction={"row"}
                           className={"club-card-list-frame"}
                    >
                        {DummyClubData.map((club) =>
                            club.isMember === true && (
                                <ListItem sx={{width: 'auto'}}>
                                <div className={"club-selector-listing"}>
                                    <Grid container
                                          spacing={1}
                                          padding={1}
                                    >
                                        <Grid item xs={8}>
                                            <h4>{club.clubName}</h4>
                                        </Grid>

                                        <Grid item xs={4}>
                                            <EnterButton
                                                text={"view"}
                                                linkTo={`/home/discussion/${club.ID}`}
                                            />
                                        </Grid>
                                    </Grid>
                                </div>
                                </ListItem>
                                )
                        )}
                    </Stack>
                </div>
            </Grid>
    );
}

export default ClubSelector;
