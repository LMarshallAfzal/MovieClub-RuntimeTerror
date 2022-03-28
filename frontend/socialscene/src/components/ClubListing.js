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
    let { clubID } = useParams();
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

    let getClubMembers = async (e) => {
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
        // e.preventDefault()

        // refreshPage(false)

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

    function refreshPage(value) {
        window.location.reload(value);
      }


    useEffect((e) => { 
        getMembershipData()
        getClubMembers()
    },[])


    function ClubButton() {
        if (props.isMember === "M") {
            return (
                <EnterButton
                    text={"info"}
                    onClick={() => {getClubMembers()}}
                    linkTo={`/home/clubs/${props.ID}`}

                />
            )
        } else {
                return (
                    <EnterButton
                        text={"join"}
                        linkTo={`/home/clubs/${props.ID}`}
                    />
                )
            }
        }

    function ClubChip() {
        if (props.isMember === true) {
            if (props.isOrganiser === true) {
                return (
                    <EnterButton text={"create meeting"} linkTo={`/home/discussion/${props.ID}/new`} />
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
         <Link className={"club-listing"} to={`/home/clubs/${props.ID}`}>
             <Grid container spacing={1} padding={1}>

                 <Grid item xs={4}>
                     <Stack spacing={1} alignItems={"center"} justifyContent={"center"}>
                         <Avatar
                             alt={props.clubName}
                             src={props.iconImage}
                             sx={{width: 1, height:1}}
                         />

                         <ClubButton />
                     </Stack>
                 </Grid>

                 <Grid item xs={8}>
                     <Stack spacing={1}>

                         <h4 className={"club-listing-club-name"}>{props.clubName}<h4--emphasise>.</h4--emphasise></h4>

                         <h6>{props.description}</h6>

                         <ClubChip/>

                         <AvatarGroup max={4} className={"club-listing-avatars"}>
                             {clubMembers.map((user) => {
                                return <Avatar alt={user.username} src={icon5}/>
                             })}
                         </AvatarGroup>
                         </Stack>
                 </Grid>
             </Grid>
         </Link>
    );
}

export default ClubListing;

