import React, {useCallback} from "react";
import {Grid, ListItem, Stack, TextField} from "@mui/material";
import {Outlet} from "react-router-dom";
import "../../styling/pages/Clubs.css";
import ThemeButton from "../../components/core/ThemeButton";
import ClubCard from "../../components/ClubCard";
import {DummyClubData} from "../../resources/data/DummyClubsData";
import {useNavigate} from "react-router";
import HomepageTitle from "../../components/HomepageTitle";

function Clubs() {

    const navigate = useNavigate();
    const createNewClub = useCallback(() => navigate('clubs/new', {replace: false}), [navigate]);

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
                           label={"search"}
                           variant={"outlined"}/>
            </Grid>

            <Grid item xs={2}>
                <ThemeButton className={"create-button"}
                             text={"create"}
                             onClick={createNewClub}
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
                                {DummyClubData.map((club) => club.isMember === true && (
                                    <ListItem sx={{width: 'auto',p:1}}>

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
                                {DummyClubData.map((club) => club.isMember === false && (
                                    <ListItem sx={{width: 'auto',p: 1}}>

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
