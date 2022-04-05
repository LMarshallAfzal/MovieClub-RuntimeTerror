import React, { useState, useEffect, useContext } from "react";
import { Grid, ListItem, Stack, TextField } from "@mui/material";
import { Outlet } from "react-router-dom";
import "../../styling/pages/Clubs.css";
import ThemeButton from "../../components/core/ThemeButton";
import ClubCard from "../../components/ClubCard";
import { DummyClubData } from "../../resources/data/DummyClubsData";
import AuthContext from "../../components/helper/AuthContext";

function Clubs() {
	let { user, authTokens } = useContext(AuthContext);

	const [myClubData, setMyClubData] = useState([]);
	const [recommendedClubs, setRecommendedClubs] = useState([]);

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
		console.log(data.theme)
		setMyClubData(data);
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
		console.log(data)
		setRecommendedClubs(data);
	};

	useEffect(() => {
		getMembershipData();
		getRecommendedClubs();
	}, []);

	return (
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
					data-testid={"search-bar"}
					inputProps={{ "data-testid": "content-input" }}
					label={"search"}
					variant={"outlined"}
				/>
			</Grid>

			<Grid item xs={2}>
				<ThemeButton
					className={"create-button"}
					text={"create"}
					linkTo={"clubs/new"}
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
								{myClubData.map((club, index) => (
									<ListItem key={index} sx={{ width: "auto", p: 1 }}>
										{console.log(club.club_name)}
										<ClubCard
											clubName={club.club_name}
											// isMember={"N"}
											iconImage={club.iconImage}
											description={club.mission_statement}
											// isOrganiser={club.isOrganiser}
											// memberRole={club.memberRole}
											clubTheme={club.theme}
											ID={club.id}
										/>
									</ListItem>
								))}
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
								{recommendedClubs.map((club, index) => (
									<ListItem key={index} sx={{ width: "auto", p: 1 }}>
										{console.log(club.club_name)}
										<ClubCard
											clubName={club.club_name}
											// isMember={"N"}
											iconImage={club.iconImage}
											description={club.mission_statement}
											// isOrganiser={club.isOrganiser}
											// memberRole={club.memberRole}
											clubTheme={club.theme}
											ID={club.id}
										/>
									</ListItem>
								))}
							</Stack>
						</Grid>
					</Grid>
				</div>
			</Grid>

			<Grid item xs={12}>
				<Outlet />
			</Grid>
		</Grid>
	);
}

export default Clubs;
