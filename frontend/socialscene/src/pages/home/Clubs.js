import React, {useCallback} from "react";
import {Grid, ListItem, Stack, TextField} from "@mui/material";
import {Outlet} from "react-router-dom";
import "../../styling/pages/Clubs.css";
import FormButton from "../../components/FormButton";
import ClubListing from "../../components/ClubListing";
import {DummyClubData} from "../data/DummyClubsData";
import {useNavigate} from "react-router";

function Clubs() {

    const navigate = useNavigate();
    const createNewClub = useCallback(() => navigate('clubs/new', {replace: false}), [navigate]);

    return (
        <Grid container
            justifyContent={"center"}
            direction={"row"}
            alignItems={"flex-start"}
            spacing={2}>

            <Grid item xs={12}>
                <div className={"home-page-title"}>
                    <h3>clubs<h3--emphasise>.</h3--emphasise></h3>
                </div>
            </Grid>

            <Grid item xs={10}>
                <TextField className={"search-bar"}
                    id={"outlined-basic"}
                    label={"search"}
                    variant={"outlined"}/>
            </Grid>

            <Grid item xs={2}>
                <FormButton className={"create-button"}
                    text={"create"}
                    onClick={createNewClub}
                />
            </Grid>

            <Grid item xs={12}>
                <div className={"home-page-card-background"}>
                    <h4 className={"home-page-card-title"}>your clubs:</h4>

                    <Stack direction={"row"}
                           spacing={0}
                           className={"club-card-list-frame"}>

                        {DummyClubData.map((club) =>
                            club.isMember === true && (
                                <ListItem sx={{width: 'auto'}}>

                                <ClubListing
                                    clubName={club.clubName}
                                    isMember={club.isMember}
                                    iconImage={club.iconImage}
                                    description={club.description}
                                    isOrganiser={club.isOrganiser}
                                    memberRole={club.memberRole}
                                    clubTheme={club.clubTheme}
                                    ID={club.ID}
                                />
                                </ListItem>
                                ))}
                    </Stack>
                </div>
            </Grid>

            <Grid item xs={12}>
                <div className={"home-page-card-background"}>
                    <h4 className={"home-page-card-title"}>recommended clubs:</h4>

                    <Stack direction={"row"}
                          spacing={0}
                          className={"club-card-list-frame"}>

                        {DummyClubData.map((club) =>
                            club.isMember === false && (
                                <ListItem sx={{width: 'auto'}}>

                                <ClubListing
                                    clubName={club.clubName}
                                    isMember={club.isMember}
                                    iconImage={club.iconImage}
                                    description={club.description}
                                    isOrganiser={club.isOrganiser}
                                    memberRole={club.memberRole}
                                    clubTheme={club.clubTheme}
                                    ID={club.ID}
                                />
                                </ListItem>
                            ))}
                    </Stack>
                </div>
            </Grid>

            <Grid item xs={12}>

                <Outlet/>
            </Grid>
        </Grid>
    );
}

export default Clubs;
