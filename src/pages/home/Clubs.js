import React, { useContext, useEffect, useState } from "react";
import { Collapse, Grid, ListItem, Stack, TextField } from "@mui/material";
import { Outlet } from "react-router-dom";
import "../../styling/pages/Clubs.css";
import ThemeButton from "../../components/core/ThemeButton";
import ClubCard from "../../components/ClubCard";
import AuthContext from "../../components/helper/AuthContext";
import useFetch from "../../components/helper/useFetch";
import TextButton from "../../components/core/TextButton";
import HomepageCard from "../../components/helper/HomepageCard";

function Clubs() {
	let {user} = useContext(AuthContext);
	let api = useFetch();

	const [myClubData, setMyClubData] = useState([]);
	const [recommendedClubs, setRecommendedClubs] = useState([]);
	const [allClubs, setAllClubs] = useState([]);

	let getMembershipData = async (e) => {
		let { response, data } = await api(
			`/get_user_joined_clubs/${user.user_id}`,
			"GET"
		);
		if (response.status === 200) {
			setMyClubData(data);
		}
	};

	let getRecommendedClubs = async (e) => {
		let { response, data } = await api(`/rec_clubs/`, "GET");
		if (response.status === 200) {
			setRecommendedClubs(data);
		}
	};

	let getAllClubs = async () => {
		let { response, data } = await api(`/clubs/`, "GET");
		if (response.status === 200) {
			setAllClubs(data);
		}
	};

	const [openSearch, setOpenSearch] = useState(false);

	const toggleSearch = () => {
		setOpenSearch(!openSearch);
	};

	const openSearchAuto = (text) => {
		text === "" ? setOpenSearch(false) : setOpenSearch(true);
		text.length < 3 ? setOpenSearch(false) : setOpenSearch(true);
	};

	const [searchValue, setSearchValue] = useState("");

	useEffect(() => {
		getMembershipData();
		getRecommendedClubs();
		getAllClubs();
	}, [user.user_id]);


	return (
		<Grid
			container
			justifyContent={"center"}
			direction={"row"}
			alignItems={"flex-start"}
			padding={2}
			spacing={2}
		>
			<Grid item xs={12}>
				<TextField
					className={"search-bar"}
					id={"outlined-basic"}
					data-testid={"search-bar"}
					inputProps={{ "data-testid": "content-input" }}
					label={"search"}
					variant={"outlined"}
					onChange={(event) => {
						setSearchValue(event.target.value);
						if (event.target.value.length > 2) {
							openSearchAuto(event.target.value);
						}
					}}
					InputProps={{
						endAdornment: (
							<TextButton
								text={openSearch ? "close" : "open"}
								onClick={toggleSearch}
								style={{ textAlign: "right" }}
							/>
						),
					}}
				/>
				<Collapse in={openSearch}>
					<HomepageCard title={"search result"}>
						<Grid item xs={12}>
							<Stack
								direction={"row"}
								spacing={2}
								maxHeight={200}
								sx={{ overflowX: "auto", overflowY: "hidden" }}
							>
								{allClubs
									.filter((club) => {
										if (searchValue.length > 2) {
											if (
												club.club_name
													.toLowerCase()
													.includes(searchValue.toLowerCase())
											) {
												return club;
											}
										}
									})
									.map((club, index) => {
										return (
											<ClubCard
												clubName={club.club_name}
												iconImage={club.iconImage}
												description={club.mission_statement}
												clubTheme={club.theme}
												ID={club.id}
											/>
										);
									})}
							</Stack>
						</Grid>
					</HomepageCard>
				</Collapse>
			</Grid>

			<Grid item xs={12}>
				<ThemeButton
					className={"create-button"}
					text={"create club"}
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
										<ClubCard
											clubName={club.club_name}
											iconImage={club.iconImage}
											description={club.mission_statement}
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
										<ClubCard
											clubName={club.club_name}
											iconImage={club.iconImage}
											description={club.mission_statement}
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
