import React from "react";
import {useParams} from "react-router";
import {Avatar, AvatarGroup, Box, Grid, Stack} from "@mui/material";
import icon5 from "../styling/example icons/icon5.jpeg"
import icon2 from "../styling/example icons/icon2.jpeg"
import icon3 from "../styling/example icons/icon3.jpeg"
import icon4 from "../styling/example icons/icon4.jpeg"
import "../styling/components/ClubListing.css";
import EnterButton from "./EnterButton";
import {Link} from "react-router-dom";

function ClubListing(props) {
    let { clubID } = useParams();

    function ClubButton() {
        if (props.isMember === true) {
            return (
                <EnterButton
                    text={"info"}
                    linkTo={`/home/clubs/${props.ID}`}/>
            )
        } else {
                return (
                    <EnterButton
                        text={"join"}
                        linkTo={`/home/clubs/${props.ID}`}/>
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
                         <div className={"club-listing-text"}>
                             <h4 className={"club-listing-club-name"}>{props.clubName}<h4--emphasise>.</h4--emphasise></h4>
                             <h6>{props.description}</h6>
                         </div>
                         <AvatarGroup max={4} className={"club-listing-avatars"}>
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

