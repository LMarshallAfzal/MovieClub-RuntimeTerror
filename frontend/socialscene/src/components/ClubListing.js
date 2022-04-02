import React, { useContext, useState, useEffect } from "react";
import { useParams } from "react-router";
import { Avatar, AvatarGroup, Box, Chip, Grid, Stack } from "@mui/material";
import icon5 from "../resources/images/example icons/icon5.jpeg";
import icon2 from "../resources/images/example icons/icon2.jpeg";
import icon3 from "../resources/images/example icons/icon3.jpeg";
import icon4 from "../resources/images/example icons/icon4.jpeg";
// import "../styling/components/ClubListing.css";
import EnterButton from "./core/RoundButton";
import { Link } from "react-router-dom";
import AuthContext from "../components/helper/AuthContext";

function ClubListing(props) {
	let { clubID } = useParams();
	let { user, authTokens } = useContext(AuthContext);
	const [myClubData, setMyClubData] = useState([]);
	const [clubMembers, setClubMembers] = useState([]);

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
		setMyClubData(data);
	};

	let getClubMembers = async (e) => {
		let response = await fetch(
			"http://127.0.0.1:8000/club_members/" + clubID + "/",
			{
				method: "GET",
				headers: {
					"Content-Type": "application/json",
					Authorization: "Bearer " + String(authTokens.access),
				},
			}
		);
		let data = await response.json();
		setClubMembers(data);
	};

    let joinClub = async (event, id) => {
        let response = await fetch('http://127.0.0.1:8000/join_club/' + id +'/', {
            method:'POST',
            body: JSON.stringify(user.user_id, props.clubID),
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + String(authTokens.access)
            }
        })
        let data = await response.json()
        

    }

	function ClubButton() {
        // console.table(props)
        if (props.isMember === "M") {
            return (
                <EnterButton
                    text={"info"}
                    linkTo={`/home/clubs/${props.clubID}`}
                />
            )
        } else {
                return (
                    <EnterButton
                        text={"join"}
                        onClick={joinClub(props.clubID)}
                    />
                )
            }
        }

    useEffect((e) => {
        getMembershipData()
        getClubMembers(e, props.clubID)
    },[])
	function ClubChip() {
		if (props.isMember) {
			if (props.isOrganiser) {
				return (
					<EnterButton
						text={"create meeting"}
						linkTo={`/home/discussion/${props.ID}/new`}
					/>
				);
			} else {
                if (props.memberRole === "M") {
                    return <Chip label={"Member"} />;
                }
                else if (props.memberRole === "O") {
                    return <Chip label={"Organiser"} />;
                }
				return <Chip label={"Banned member"} />;
			}
		} else {
			return <Chip label={props.clubTheme} />;
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
							sx={{ width: 1, height: 1 }}
						/>

    
						<ClubButton />
					</Stack>
				</Grid>

				<Grid item xs={8}>
					<Stack spacing={1}>
						<h4 className={"club-listing-club-name"}>
							{props.clubName}
							<h4--emphasise>.</h4--emphasise>
						</h4>

						<h6>{props.description}</h6>

						<ClubChip />

						<AvatarGroup max={4} className={"club-listing-avatars"}>
							{clubMembers.map((user) => {
								return <Avatar alt={user.username} src={icon5} />;
							})}
						</AvatarGroup>
					</Stack>
				</Grid>
			</Grid>
		</Link>
	);
}

export default ClubListing;
