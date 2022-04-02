import React from "react";
import {Grid, ListItem, Stack, TextField} from "@mui/material";
import {Outlet} from "react-router-dom";
import "../../styling/pages/Clubs.css";
import ThemeButton from "../../components/core/ThemeButton";
import ClubCard from "../../components/ClubCard";
import {DummyClubData} from "../../resources/data/DummyClubsData";

function Clubs() {

    return (
        <Grid container
              justifyContent={"center"}
              direction={"row"}
              alignItems={"flex-start"}
              padding={2}
              spacing={2}>

            <Grid item xs={10}>
                <TextField className={"search-bar"}
                           id={"outlined-basic"}
                           data-testid={"search-bar"}
                           inputProps={{"data-testid": "content-input"}}
                           label={"search"}
                           variant={"outlined"}/>
            </Grid>

            <Grid item xs={2}>
                <ThemeButton className={"create-button"}
                             text={"create"}
                             linkTo={"clubs/new"}
                />
            </Grid>

            <Grid item xs={12}>
                <div className={"home-page-card-background"}>
                    <Grid container direction={"row"} padding={2}>

                        <Grid item xs={12}>
                            <h5 className={"home-page-card-title"}>your clubs</h5>
                        </Grid>

                        <Grid item xs={12}>
                            <Stack direction={"row"}
                                   overflow={"auto"}
                            >
                                {DummyClubData.map((club, index) => club.isMember === true && (
                                    <ListItem key={index} sx={{width: 'auto', p: 1}}>

                                        <ClubCard
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
                        </Grid>
                    </Grid>
                </div>
            </Grid>

            <Grid item xs={12}>
                <div className={"home-page-card-background"}>
                    <Grid container direction={"row"} padding={2}>

                        <Grid item xs={12}>
                            <h5 className={"home-page-card-title"}>recommended</h5>
                        </Grid>

                        <Grid item xs={12}>
                            <Stack direction={"row"}
                                   overflow={"auto"}>
                                {DummyClubData.map((club, index) => club.isMember === false && (
                                    <ListItem key={index} sx={{width: 'auto', p: 1}}>

                                        <ClubCard
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
                        </Grid>
                    </Grid>
                </div>
            </Grid>

            <Grid item xs={12}>

                <Outlet/>
            </Grid>
        </Grid>
    );
}

export default Clubs;
