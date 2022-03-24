import React, {useContext, useState, useEffect} from "react";
import {useParams} from "react-router";
import {Avatar, AvatarGroup, Box, Chip, Grid, Stack} from "@mui/material";
import icon5 from "../styling/images/example icons/icon5.jpeg"
import icon2 from "../styling/images/example icons/icon2.jpeg"
import icon3 from "../styling/images/example icons/icon3.jpeg"
import icon4 from "../styling/images/example icons/icon4.jpeg"
import "../styling/components/ClubListing.css";
import EnterButton from "./EnterButton";
import {Link} from "react-router-dom";
import AuthContext from "../components/helper/AuthContext";


function ClubListing(props) {
    let {user, authTokens} = useContext(AuthContext);
    const [myClubData, setMyClubData] = useState([]);
    const [clubMembers, setClubMembers] = useState([]);



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
    }

    let getClubMembers = async (clubId) => {
        let response = await fetch('http://127.0.0.1:8000/club_members/' + clubId +'/', {
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

    // let joinClub = async (clubId) => {
    //     let response = await fetch('http://127.0.0.1:8000/join_club/' + clubId +'/', {
    //         method:'POST',
    //         headers: {
    //             'Content-Type': 'application/json',
    //             'Authorization': 'Bearer ' + String(authTokens.access)
    //         }
    //     })
    //     let data = await response.json()
    // }


    useEffect((e) => { 
        getMembershipData()
        getClubMembers(props.clubID)
    },[])

    let { clubID } = useParams();

    function ClubButton() {
        if (props.isMember === "M") {
            return (
                <EnterButton
                    text={"info"}
                    linkTo={`/home/clubs/${clubID}`}
                />
            )
        } else {
                return (
                    <EnterButton
                        text={"join"}
                        // onClick={joinClub(props.clubID)}
                        linkTo={`/home/clubs/${clubID}`}
                    />
                )
            }
        }

    function ClubChip() {
        if (props.isMember === true) {
            if (props.isOrganiser === true) {
                return (
                    <EnterButton text={"create meeting"} linkTo={"/home"} />
                )
            } else {
                return (
                    <Chip label={props.memberRole} />
                )
            }
        } else {
            return (
                    <Chip label={props.clubTheme} />
            )
        }
    }


    return (
         <div className={"club-listing"}>
             <Grid container
                   spacing={2}>

                 <Grid item
                       xs={5}>
                     <Stack className={"club-listing-left-stack"}>
                         <div className={"club-listing-image"}>
                         <Avatar
                             alt={props.clubName}
                             src={props.iconImage}
                             sx={{width: "100%", height: "100%"}}
                         />
                         </div>
                         <div className={"club-listing-button"}>
                           <ClubButton />
                         </div>
                     </Stack>
                 </Grid>

                 <Grid item
                       xs={7}>
                     <Stack className={"club-listing-right-stack"}>
                         <Stack className={"club-listing-text"}
                                spacing={2}
                         >
                             <h4 className={"club-listing-club-name"}>{props.clubName}<h4--emphasise>.</h4--emphasise></h4>
                             <h6>{props.description}</h6>
                             <div className={"club-listing-club-chip"}>
                                 <ClubChip  />
                             </div>
                         </Stack>
                         <AvatarGroup max={4} className={"club-listing-avatars"}>
                             {clubMembers.map((user) => {
                                return <Avatar alt={user.username} src={icon5}/>
                             })}
                         </AvatarGroup>
                     </Stack>
                 </Grid>
             </Grid>
         </div>
    );
}

export default ClubListing;

