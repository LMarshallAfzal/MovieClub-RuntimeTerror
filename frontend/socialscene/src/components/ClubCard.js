import React from "react";
import {useParams} from "react-router";
import {Avatar, AvatarGroup, Chip, Grid, Stack} from "@mui/material";
import icon5 from "../resources/images/example icons/icon5.jpeg"
import icon2 from "../resources/images/example icons/icon2.jpeg"
import icon3 from "../resources/images/example icons/icon3.jpeg"
import icon4 from "../resources/images/example icons/icon4.jpeg"
import "../styling/components/ClubCard.css";
import RoundButton from "./core/RoundButton";
import {Link} from "react-router-dom";

function ClubCard(props) {
    let {clubID} = useParams();

    function ClubButton() {
        if (props.isMember === true) {
            return (
                <RoundButton
                    text={"info"}
                    linkTo={`/home/clubs/${props.ID}`}/>
            )
        } else {
            return (
                <RoundButton
                    text={"join"}
                    linkTo={`/home/clubs/${props.ID}`}/>
            )
        }
    }

    function ClubChip() {
        if (props.isMember === true) {
            
            if (props.isOrganiser === true) {
                return (
                    <RoundButton text={"create meeting"} linkTo={"/home/discussion"}/>
                )
            } else {
                return (
                    <Chip label={props.memberRole}/>
                )
            }
        } else {
            return (
                <Chip label={props.clubTheme}/>
            )
        }
    }


    return (
        <Link className={"club-listing"} to={`/home/clubs/${props.ID}`}>
            <Grid container spacing={3} padding={2}>

                <Grid item xs={4}>
                    <Stack spacing={2} alignItems={"center"} justifyContent={"center"}>
                        <Avatar
                            alt={props.clubName}
                            src={props.iconImage}
                            sx={{width: 1, height: 1}}
                        />
                        <ClubButton/>
                    </Stack>
                </Grid>

                <Grid item xs={8}>
                    <Stack spacing={1}>

                        <h4 className={"club-listing-club-name"}>{props.clubName}
                            <h4--emphasise>.</h4--emphasise>
                        </h4>

                        <h6>{props.description}</h6>

                        <ClubChip/>

                        <AvatarGroup max={4} className={"club-listing-avatars"}>
                            {/*for (users in club) map {*/}
                            {/*   <Avatar alt="Club Name" src={club.icon}*/}
                            {/*}*/}
                            <Avatar alt="Remy Sharp" src={icon5}/>
                            <Avatar alt="Travis Howard" src={icon2}/>
                            <Avatar alt="Cindy Baker" src={icon3}/>
                            <Avatar alt="Agnes Walker" src={icon4}/>
                            <Avatar alt="Trevor Henderson" src=""/>
                        </AvatarGroup>
                    </Stack>
                </Grid>
            </Grid>
        </Link>
    );
}

export default ClubCard;

