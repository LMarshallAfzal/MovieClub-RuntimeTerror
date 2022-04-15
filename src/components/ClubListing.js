import React, {useContext, useEffect, useState} from "react";
import {useParams} from "react-router";
import {Avatar, AvatarGroup, Chip, Grid, Stack} from "@mui/material";
import icon5 from "../resources/images/example icons/icon5.jpeg";
import "../styling/components/ClubListing.css";
import EnterButton from "./core/RoundButton";
import {Link} from "react-router-dom";
import AuthContext from "../components/helper/AuthContext";
import useFetch from "./helper/useFetch";

function ClubListing(props) {
    let {clubID} = useParams();
    let {user, authTokens} = useContext(AuthContext);
    const [myClubData, setMyClubData] = useState([]);
    const [clubMembers, setClubMembers] = useState([]);

	let api = useFetch();


	let getMembershipData = async () => {
		let {response, data} = await api(`/get_user_joined_clubs/${user.user_id}/`, "GET");
		if (response.status === 200) {
			setMyClubData(data);
		}
	};

	let getClubMembers = async () => {
		let response = await api(`/club_members/${clubID}/`, "GET");
		if (response.status === 200) {
			setClubMembers(response.data);
		}
	};

	let joinClub = async (event, id) => {
		let {response, data} = await api(`/join_club/${id}/`, "POST", {user_id: user.user_id});
		if (response.status === 201) {
			setMyClubData(data);
		}
	};

	function ClubButton() {
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
                if (props.memberRole === "M") {
                    return <Chip label={"Member"} />;
                }
                else if (props.memberRole === "O") {
                    return <Chip label={"Owner"} />;
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
