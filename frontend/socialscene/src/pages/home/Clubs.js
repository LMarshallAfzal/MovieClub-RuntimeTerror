import React, { useCallback, useState, useContext, useEffect } from "react";
import {
	Box,
	Grid,
	List,
	ListItem,
	Paper,
	Stack,
	TextField,
} from "@mui/material";
import { Outlet, useHistory } from "react-router-dom";
import "../../styling/pages/Clubs.css";
import FormButton from "../../components/FormButton";
import ClubListing from "../../components/ClubListing";
import { DummyClubData } from "../data/DummyClubsData";
import { useNavigate } from "react-router";
import AuthContext from "../../components/helper/AuthContext";
import HomePageTitle from "../../components/HomePageTitle";

function Clubs() {
	const navigate = useNavigate();
	const createNewClub = useCallback(
		() => navigate("clubs/new", { replace: false }),
		[navigate]
	);
	const [myClubData, setMyClubData] = useState([]);
	const [userMembershipData, setUserMembershipData] = useState([]);
	const [recommendedClubData, setRecommendedClubData] = useState([]);
	let { user, authTokens } = useContext(AuthContext);

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

	let getMemData = async (e) => {
		let response = await fetch(
			"http://127.0.0.1:8000/mem/" + user.user_id + "/",
			{
				method: "GET",
				headers: {
					"Content-Type": "application/json",
					Authorization: "Bearer " + String(authTokens.access),
				},
			}
		);
		let data = await response.json();
		setUserMembershipData(data);
		
	};

	let getRecommendedClubs = async (e) => {
		let response = await fetch("http://127.0.0.1:8000/rec_clubs/", {
			method: "GET",
			headers: {
				"Content-Type": "application/json",
				Authorization: "Bearer " + String(authTokens.access),
			},
		});
		let data = await response.json();
		setRecommendedClubData(data);
	};

	useEffect((e) => {
		getMembershipData();
		getMemData();
		getRecommendedClubs();
	}, []);

    console.log(userMembershipData);


	return (
		<>
			<HomePageTitle title={"clubs"} />
			<Grid
				container
				justifyContent={"center"}
				direction={"row"}
				alignItems={"flex-start"}
				padding={2}
				spacing={2}
			>
				<Grid item xs={10}>
					<TextField
						className={"search-bar"}
						id={"outlined-basic"}
						label={"search"}
						variant={"outlined"}
					/>
				</Grid>
				<Grid item xs={2}>
					<FormButton
						className={"create-button"}
						text={"create"}
						onClick={createNewClub}
					/>
				</Grid>
				<Grid item xs={12}>
					<div className={"home-page-card-background"}>
						<Grid container direction={"row"} padding={2}>
							<Grid item xs={12}>
								<h5 className={"home-page-card-title"}>your clubs</h5>
							</Grid>
							<Grid item xs={12}>
								<Stack direction={"row"} overflow={"auto"}>
									{myClubData.map((club) => {
										if (
											club.club_members.includes(userMembershipData[0].user)
										) {
											return (
												<ListItem>
													<ClubListing
														clubName={club.club_name}
														isMember={true}
														iconImage={club.iconImage}
														description={club.mission_statement}
														isOrganiser={userMembershipData[0].is_organiser}
														memberRole={userMembershipData[0].role}
														clubTheme={club.theme}
														ID={club.id}
													/>
												</ListItem>
											);
										} else {
											return (
												<>
													Not a member of any clubs
													
												</>
											);
										}
									})}
								</Stack>
							</Grid>
						</Grid>
					</div>
				</Grid>
				<Grid item xs={12}>
					<div className={"home-page-card-background"}>
						<Grid container direction={"row"} padding={2}>
							<Grid item xs={12}>
								<h5 className={"home-page-card-title"}>recommended</h5>
							</Grid>
							<Grid item xs={12}>
								<Stack direction={"row"} overflow={"auto"}>
									{recommendedClubData.map((club) => {
										if (
											!club.club_members.includes(userMembershipData[0].user)
										) {
											return (
												<ListItem>
													<ClubListing
														clubName={club.club_name}
														isMember={false}
														iconImage={club.iconImage}
														description={club.mission_statement}
														isOrganiser={null}
														memberRole={null}
														clubTheme={club.theme}
														ID={club.id}
													/>
												</ListItem>
											);
										} else {
											return <></>;
										}
									})}
								</Stack>
							</Grid>
						</Grid>
					</div>
				</Grid>
				<Grid item xs={12}>
					<Outlet />
				</Grid>
			</Grid>
		</>
	);
}

export default Clubs;
