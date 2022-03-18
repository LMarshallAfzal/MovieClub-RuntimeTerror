import React from "react";
import {Box, Grid, List, ListItem, Paper, Stack, TextField} from "@mui/material";
import {Outlet} from "react-router-dom";
import "../styling/pages/Clubs.css";
import FormButton from "../components/FormButton";
import ClubListing from "../components/ClubListing";
import icon1 from "../styling/example icons/club1.png"
import icon2 from "../styling/example icons/club2.png"
import icon3 from "../styling/example icons/club3.png"
import icon4 from "../styling/example icons/club4.png"
import icon5 from "../styling/example icons/club5.png"
import icon6 from "../styling/example icons/club6.png"
import icon7 from "../styling/example icons/club7.png"


function clubs() {
    const DummyClubData = [
        {ID: 1, clubName: "Some Club", isMember: false, iconImage: icon3, description: "some people in a club", isOrganiser: false, clubTheme: "action", memberRole: ""},
        {ID: 2, clubName: "Terminators", isMember: false, iconImage: icon4, description: "ARNOLD", isOrganiser: false, clubTheme: "adventure", memberRole: ""},
        {ID: 3, clubName: "runtimeTerror", isMember: false, iconImage: icon5, description: "the boys hangout", isOrganiser: false, clubTheme: "X-Rated", memberRole: ""},
        {ID: 4, clubName: "Another Club", isMember: false, iconImage: icon6, description: "horror and action", isOrganiser: false, clubTheme: "rom-com", memberRole: ""},
        {ID: 5, clubName: "modern movies", isMember: false, iconImage: icon7, description: "classics with new films", isOrganiser: false, clubTheme: "black & white", memberRole: ""},
        {ID: 6, clubName: "Movie Club", isMember: true, iconImage: icon1, description: "the main club", isOrganiser: false, clubTheme: "cartoon", memberRole: "MEMBER"},
        {ID: 7, clubName: "Horror Hoes", isMember: true, iconImage: icon2, description: "horror films", isOrganiser: true, clubTheme: "horror", memberRole: "OWNER"}
    ]

    return (
        <Grid
            container
            justifyContent={"center"}
            direction={"row"}
            alignItems={"flex-start"}
            spacing={2}
        >
            <Grid item xs={12}>
                <div className={"home-page-title"}>
                    <h3>clubs<h3--emphasise>.</h3--emphasise></h3>
                </div>
            </Grid>
            <Grid item xs={10}>
                <TextField
                    className={"search-bar"}
                    id={"outlined-basic"}
                    label={"search"}
                    variant={"outlined"}
                />
            </Grid>

            <Grid item xs={2}>
                <FormButton
                    className={"create-button"}
                    text={"create"}
                />
            </Grid>

            <Grid item xs={12}>
                <div className={"club-card-background"}>
                    <h4 className={"club-card-heading"}>your clubs:</h4>

                    <Stack direction={"row"}
                          spacing={0}
                          className={"club-card-list-frame"}
                    >
                        {DummyClubData.map((club) => {
                            if (club.isMember === true) {
                                return (
                                    <ListItem>
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
                                    )
                            } else {
                                return (
                                    <></>
                                )
                            }
                        }
                        )}
                    </Stack>
                </div>
            </Grid>

            <Grid item xs={12}>
                <div className={"club-card-background"}>
                    <h4 className={"club-card-heading"}>recommended clubs:</h4>

                    <Stack direction={"row"}
                          spacing={0}
                          className={"club-card-list-frame"}
                    >
                        {DummyClubData.map((club) => {
                            if (club.isMember === false) {
                                return (
                                    <ListItem>
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
                                    )
                            } else {
                                return (
                                    <></>
                                )
                            }
                        }
                        )}
                    </Stack>
                </div>
            </Grid>

            <Grid item xs={12}>
                    <Outlet/>
            </Grid>
        </Grid>
    );
}

export default clubs;
