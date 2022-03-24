import React, {useContext, useState, useEffect} from "react";
import {useParams} from "react-router";
import {Avatar, Box, Chip, Grid, ListItem, Stack, TextField} from "@mui/material";
import "../styling/components/ClubDetail.css";
import FormButton from "./FormButton";
import {DummyClubData} from "../pages/data/DummyClubsData";
import ClubListing from "./ClubListing";
import {DummyClubMemberData} from "../pages/data/DummyClubMemberData";
import AuthContext from "../components/helper/AuthContext";



function ClubDetail() {
    // const [open, setOpen] = React.useState(false);

    let { clubID } = useParams();
    let {user, authTokens} = useContext(AuthContext);
    const [clubMembers, setClubMembers] = useState([]);
    let [recommendedClubData, setRecommendedClubData] = useState([]);
    let [myClubData, setMyClubData] = useState([]);
    const [wantedClub, setWantedClub] = useState([]);


    let getMembershipData = async (e) => {
        // e.preventDefault()
        let response = await fetch('http://127.0.0.1:8000/memberships/' + user.user_id +'/', {
            method:'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + String(authTokens.access)
            }
        })
        let data = await response.json()
        setMyClubData(data)
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
        setRecommendedClubData(data)
    }

    // let club = (myClubData.find(obj => obj.ID === clubID)) || (recommendedClubData.find(obj => obj.ID === clubID));
    let getSpecifiedClub = async () => {
        for(let i=0; recommendedClubData.length > i; i++) {
            if(recommendedClubData[i].id === clubID) {
                setWantedClub(recommendedClubData[i].id)
                // console.log("passed")
            }
            else { 
                console.log("failed")
            }
        }    
        for(let i=0; myClubData.length > i; i++) {
            if(myClubData[i].id === clubID) {
                setWantedClub(myClubData[i].id)
                // console.log("passed")                
            } 
            else { 
                console.log("failed")
            } 
        }
    }    

    const handleDelete = () => {
        console.log("User Deleted");

    //    Snackbar here
    }

    const handleUserClick = () => {
        console.log("User Clicked");
    }

    let getClubMembers = async () => {
        // getSpecifiedClub()
        let response = await fetch('http://127.0.0.1:8000/club_members/' + clubID +'/', {
            method:'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + String(authTokens.access)
            }
        })
        let data = await response.json()
        setClubMembers(data)
        console.log(clubMembers)
    }

    let joinClub = async () => {
        let response = await fetch('http://127.0.0.1:8000/join_club/' + clubID +'/', {
            method:'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + String(authTokens.access)
            }
        })
        let data = await response.json()
    }

    let leaveClub = async () => {
        let response = await fetch('http://127.0.0.1:8000/leave_club/' + clubID +'/', {
            method:'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + String(authTokens.access)
            }
        })
        let data = await response.json()
    }

    useEffect(() => {
        getSpecifiedClub()
        getMembershipData()
        getRecommendedClubs()
        getClubMembers(wantedClub.id)

    },[])

    return (
        <Grid
        container
        justifyContent={"center"}
        direction={"row"}
        alignItems={"flex-start"}
        spacing={2}
        >
            <Grid item xs={12}>
                <h4 className={"club-detail-heading"}>{wantedClub.clubName}</h4>
            </Grid>

            <Grid item xs={6}>
                <div className={"club-detail-background"}>
                    <h4 className={"club-member-heading"}>members:</h4>

                    <Box sx={{ flexDirection: 'row',
                        flexWrap: 'wrap',
                        padding:'10px'

                    }}
                    >
                        {clubMembers.map((user) => {
                            return (
                                <Chip
                                    label={user.username}
                                    avatar={
                                    <Avatar
                                        src={user.iconImage}
                                        alt={user.username}
                                    />}
                                    onDelete={handleDelete}
                                    onClick={handleUserClick}
                                 />
                            )
                        })}
                    </Box>
                </div>
            </Grid>
            <Grid item xs={3}>
                <Stack spacing={2}>
                    <TextField
                        id="outlined"
                        label="club name"
                        defaultValue={wantedClub.club_name}
                    />
                    <TextField
                        id="outlined"
                        label="club description"
                        defaultValue={wantedClub.mission_statement}
                    />
                    <TextField
                        id="outlined"
                        label="club theme"
                        defaultValue={wantedClub.theme}
                    />
                    <FormButton text={"save"}/>
                </Stack>
            </Grid>
            <Grid item xs={3}>
                <Stack spacing={2}>
                    <FormButton text={"create"}/>
                    <FormButton 
                        text={"join"}
                        // onClick={joinClub(props.clubID)}
                    />
                    <FormButton 
                        text={"leave"}
                        // onClick={leaveClub(props.clubID)}
                    />
                    <FormButton 
                        text={"delete"}
                        // onClick={deleteClub(props.clubID)}
                    />

                </Stack>

            </Grid>

        </Grid>
    )
}

export default ClubDetail;