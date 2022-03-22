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



    let getMembershipData = async (e) => {
        let response = await fetch('http://127.0.0.1:8000/memberships/' + user.user_id +'/', {
            method:'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + String(authTokens.access)
            }
        })
        let data = await response.json()
        // console.log(data)
        setMyClubData(data)
    }

    useEffect((e) => { 
        getMembershipData()
    },[])

    let { clubID } = useParams();

    function ClubButton() {
        // if (props.isMember === true) {
            return (
                <EnterButton
                    text={"info"}
                    linkTo={`/home/clubs/${props.clubID}`}/>
            )
        // } else {
        //         return (
        //             <EnterButton
        //                 text={"join"}
        //                 linkTo={`/home/clubs/${props.clubID}`}/>
        //         )
        //     }
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
                             {/*for (users in club) map {*/}
                             {/*   <Avatar alt="Club Name" src={club.icon}*/}
                             {/*}*/}
                             <Avatar alt="Remy Sharp" src={icon5}  />
                             <Avatar alt="Travis Howard" src={icon2} />
                             <Avatar alt="Cindy Baker" src={icon3} />
                             <Avatar alt="Agnes Walker" src={icon4} />
                             <Avatar alt="Trevor Henderson" src="" />
                         </AvatarGroup>
                     </Stack>
                 </Grid>
             </Grid>
         </div>
    );
}

export default ClubListing;

