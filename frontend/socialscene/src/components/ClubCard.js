import React, {useContext, useEffect, useState} from "react";
import {useParams} from "react-router";
import {Avatar, AvatarGroup, Checkbox, Chip, FormControlLabel, Grid, Stack} from "@mui/material";
import icon5 from "../resources/images/example icons/icon5.jpeg"
import "../styling/components/ClubCard.css";
import RoundButton from "./core/RoundButton";
import {Link} from "react-router-dom";
import AuthContext from "../components/helper/AuthContext";
import NotificationsNoneIcon from "@mui/icons-material/NotificationsNone";
import NotificationsActiveIcon from "@mui/icons-material/NotificationsActive";

function ClubCard(props) {
    let {clubID} = useParams();
    let {user, authTokens} = useContext(AuthContext);
    const [clubData, setClubData] = useState([]);
    const [members, setMembers] = useState([]);

    let getMembershipData = async (e) => {
		let response = await fetch(
			"http://127.0.0.1:8000/get_user_joined_clubs/" + user.user_id + "/",
			{
				method: "GET",
				headers: {
					"Content-Type": "application/json",
					Authorization: "Bearer " + String(authTokens.access),
				},
			}
		);
		let data = await response.json();
        if(response.status === 200) {
		    setClubData(data);
        }
	};

    let getClubMembers = async (e) => {
		let response = await fetch(
			"http://127.0.0.1:8000/club_members/" + props.ID + "/",
			{
				method: "GET",
				headers: {
					"Content-Type": "application/json",
					Authorization: "Bearer " + String(authTokens.access),
				},
			}
		);
		let data = await response.json();
        if(response.status === 200){
		    setMembers(data);
        }
	};

    useEffect(() => {
        getMembershipData();
        getClubMembers();
    }, []);

    function ClubButton() {
            return (
                <RoundButton
                    text={"info"}
                    linkTo={`/home/clubs/${props.ID}`}
                    onClick={getClubMembers}
                />

            )
    }

    function ClubChip() {
        if (props.isMember === "M") {

            if (props.isOrganiser) {
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
                            src={require("../resources/images/club icons/" + props.clubTheme + ".png")} //Add error handling to this
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

                        <h6 style={{
                            whiteSpace: "nowrap",
                            overflow: "hidden"
                        }}>{props.description}</h6>

                        <ClubChip/>

                        <Grid container spacing={1} alignItems={"flex-start"}>
                            <Grid item xs={10} alignItems={"flex-start"}>
                                <AvatarGroup max={4} className={"club-listing-avatars"}>
                                    {members.map((user) => {
                                        return <Avatar alt={user.username} src={icon5}/>;
                                    })}
                                </AvatarGroup>
                            </Grid>
                            <Grid item xs={2}>
                                <FormControlLabel
                                    value="end"
                                    control={<Checkbox icon={<NotificationsNoneIcon/>}
                                                       checkedIcon={<NotificationsActiveIcon/>} color="primary"/>}
                                    label={""}/>
                            </Grid>
                        </Grid>

                    </Stack>
                </Grid>
            </Grid>
        </Link>
    );
}

export default ClubCard;
