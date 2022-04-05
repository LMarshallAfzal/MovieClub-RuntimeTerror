import React, {useState, useEffect, useContext} from "react";
import {useParams} from "react-router";
import {Avatar, AvatarGroup, Chip, Grid, Stack} from "@mui/material";
import icon5 from "../resources/images/example icons/icon5.jpeg"
import icon2 from "../resources/images/example icons/icon2.jpeg"
import icon3 from "../resources/images/example icons/icon3.jpeg"
import icon4 from "../resources/images/example icons/icon4.jpeg"
import "../styling/components/ClubCard.css";
import RoundButton from "./core/RoundButton";
import {Link} from "react-router-dom";
import AuthContext from "../components/helper/AuthContext";

function ClubCard(props) {
    let {clubID} = useParams();
    let {user, authTokens} = useContext(AuthContext);
    const [clubData, setClubData] = useState([]);
    const [members, setMembers] = useState([]);

    let getMembershipData = async (e) => {
		let response = await fetch(
			"http://127.0.0.1:8000/memberships/" + user.user_id + "/",
			{
				method: "GET",
				headers: {
					"Content-Type": "application/json",
					Authorization: "Bearer " + String(authTokens.access),
				},
			}
		);
		let data = await response.json();
		setClubData(data);
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
		setMembers(data);
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
        console.log(props)
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
                            src={require("../resources/images/club icons/" + props.clubTheme + ".png")}
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
                            {members.map((user) => {
								return <Avatar alt={user.username} src={icon5} />;
							})}
                        </AvatarGroup>
                    </Stack>
                </Grid>
            </Grid>
        </Link>
    );
}

export default ClubCard;
