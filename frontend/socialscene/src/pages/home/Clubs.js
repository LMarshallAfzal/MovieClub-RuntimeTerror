import React, {useCallback, useState, useContext, useEffect} from "react";
import {Box, Grid, List, ListItem, Paper, Stack, TextField} from "@mui/material";
import {Outlet, useHistory} from "react-router-dom";
import "../../styling/pages/Clubs.css";
import FormButton from "../../components/FormButton";
import ClubListing from "../../components/ClubListing";
import {DummyClubData} from "../data/DummyClubsData";
import {useNavigate} from "react-router";
import AuthContext from "../../components/helper/AuthContext";



function Clubs() {

    const navigate = useNavigate();
    const createNewClub = useCallback(() => navigate('clubs/new', {replace: false}), [navigate]);
    const [myClubData, setMyClubData] = useState([]);
    const [userMembershipData, setUserMembershipData] = useState([]);
    const [recommendedClubData, setRecommendedClubData] = useState([]);
    let {user, authTokens} = useContext(AuthContext);

    let getMembershipData = async (e) => {
        let response = await fetch('http://127.0.0.1:8000/memberships/' + user.user_id +'/', {
            method:'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + String(authTokens.access)
            }
        })
        let data = await response.json()
        setMyClubData(data)
        console.log(myClubData)
    }

    let getMemData = async (e) => {
        let response = await fetch('http://127.0.0.1:8000/mem/' + user.user_id +'/', {
            method:'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + String(authTokens.access)
            }
        })
        let data = await response.json()
        setUserMembershipData(data)
        console.log(userMembershipData)
    }

    

    let getRecommendedClubs = async (e) => {
        let response = await fetch('http://127.0.0.1:8000/rec/clubs', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + String(authTokens.access)
            }
        })
        let data = await response.json()
        // console.log(data)
        setRecommendedClubData(data)
    }


    useEffect((e) => { 
        getMembershipData()
        getMemData()
        getRecommendedClubs()
    },[])



    return (
        <Grid container
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
                    onClick={createNewClub}
                />
            </Grid>

            <Grid item xs={12}>
                <div className={"club-card-background"}>
                    <h4 className={"club-card-heading"}>your clubs:</h4>

                    <Stack direction={"row"}
                           spacing={0}
                           className={"club-card-list-frame"}
                    >
                        {console.log(myClubData)}
                        {console.log(userMembershipData)}
                        {myClubData.map((club) => {
                            if (club.club_members.includes(userMembershipData[0].user)) {
                                return (
                                    <ListItem
                                    >
                                    <ClubListing
                                        clubName={club.club_name}
                                        // isMember={club.isMember}
                                        iconImage={club.iconImage}
                                        description={club.mission_statement}
                                        // isOrganiser={club.isOrganiser}
                                        memberRole={userMembershipData.role}
                                        clubTheme={club.theme}
                                        clubID={club.id}
                                    />
                                    </ListItem>)
                            } else {
                                return (
                                    <>
                                        Not a member of any clubs
                                        {/* {console.log(val.id)}
                                        {console.log(memData.club)} */}

                                    </>
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
                        {recommendedClubData.map((club) => {
                            // if (club.isMember === false) {
                                return (
                                    <ListItem>
                                    <ClubListing
                                        clubName={club.club_name}
                                        // isMember={club.isMember}
                                        // iconImage={club.iconImage}
                                        // description={club.description}
                                        // isOrganiser={club.isOrganiser}
                                        // memberRole={club.memberRole}
                                        // clubTheme={club.clubTheme}
                                        // ID={club.ID}
                                    />
                                    </ListItem>
                                    )
                            // } else {
                            //     return (
                            //         <></>
                            //     )
                            // }
                        })}
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
