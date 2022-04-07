import React, { useState, useEffect, useContext } from "react";
import { Outlet, useNavigate, useParams } from "react-router";
import {
	Autocomplete,
	Avatar,
	Box,
	Chip,
	Dialog,
	DialogActions,
	DialogContent,
	DialogContentText,
	DialogTitle,
	Grid,
	Stack,
	TextField,
} from "@mui/material";
import { FaCrown } from "react-icons/fa";
import "../styling/components/ClubDetail.css";
import ThemeButton from "./core/ThemeButton";
import { themes } from "../resources/data/MovieThemes";
import AuthContext from "../components/helper/AuthContext";

function ClubDetail() {
	const [showBannedMembers, setBannedMembers] = useState(false);
	const [showDeleteClubDialog, setDeleteClubDialog] = useState(false);
	const [edit, setEdit] = useState(true);
	const [isMember, setIsMember] = useState(false);
	const [isOrganiser, setIsOrganiser] = useState(false);
	const [members, setMembers] = useState([]);
	const [owner, setOwner] = useState([]);
	const [club, setClub] = useState([]);
	const [myClubData, setMyClubData] = useState([]);
	const [banned, setBanned] = useState([]);
	const [user1, setUser1] = useState("");
	const [isOwner, setIsOwner] = useState(false);
	const [theme, setTheme] = useState("");


    const [clubNameError, setClubNameError] = useState(false);
	const [clubDescriptionError, setClubDescriptionError] = useState(false);
	const [clubThemeError, setClubThemeError] = useState(false);

	const [clubNameErrorText, setClubNameErrorText] = useState("");
	const [clubDescriptionErrorText, setClubDescriptionErrorText] = useState("");
	const [clubThemeErrorText, setClubThemeErrorText] = useState("");


	let { clubID } = useParams();
	let { user, authTokens } = useContext(AuthContext);

	const onChange = (e) => {
		setClub((prevData) => ({
			...prevData,
			[e.target.name]: e.target.value,
		}));
	};

	const handleChange = (event, value) => {
		setTheme(value.theme)
		setClub((fieldData) => ({
			...fieldData,
			theme: theme,
		}));
		// console.log(array[0])
	};

    let resetErrorState = () => {
		setClubNameError(false);
		setClubDescriptionError(false);
		setClubThemeError(false);
	};

    let errorHandler = (e, data) => {
		e.preventDefault();
		if (Object.keys(data).includes("club_name")) {
			setClubNameError(true);
			setClubNameErrorText("Error:" + data.club_name);
		}
		if (Object.keys(data).includes("mission_statement")) {
			setClubDescriptionError(true);
			setClubDescriptionErrorText("Error:" + data.mission_statement);
		}
		if (Object.keys(data).includes("theme")) {
			setClubThemeError(true);
			setClubThemeErrorText("Error:" + data.theme);
		}
	};

	let getClub = async (e) => {
		let response = await fetch("http://127.0.0.1:8000/club/" + clubID + "/", {
			method: "GET",
			headers: {
				"Content-Type": "application/json",
				Authorization: "Bearer " + String(authTokens.access),
			},
		});
		let data = await response.json();
		setClub(data);
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
        if(response.status === 200){
            setMembers(data);
            data.find((member) => member.username === user.username)
                ? setIsMember(true)
                : setIsMember(false);
        }
	};

	let getClubOwner = async (e) => {
		let response = await fetch(
			"http://127.0.0.1:8000/club_owner/" + clubID + "/",
			{
				method: "GET",
				headers: {
					"Content-Type": "application/json",
					Authorization: "Bearer " + String(authTokens.access),
				},
			}
		);
		let data = await response.json();
		data.find((owner) => owner.username === user.username)
			? setIsOwner(true)
			: setIsOwner(false);
		setOwner(data);
	};

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
		console.log(data);
		setMyClubData(data);
	};

	let getBannedMembers = async (e) => {
		let response = await fetch(
			"http://127.0.0.1:8000/banned_member_list/" + clubID + "/",
			{
				method: "GET",
				headers: {
					"Content-Type": "application/json",
					Authorization: "Bearer " + String(authTokens.access),
				},
			}
		);
		let data = await response.json();
		setBanned(data);
	};

	let joinClub = async () => {
		let response = await fetch(
			"http://127.0.0.1:8000/join_club/" + clubID + "/",
			{
				method: "POST",
				headers: {
					"Content-Type": "application/json",
					Authorization: "Bearer " + String(authTokens.access),
				},
			}
		);
		await response.json();
		if (response.status === 200) {
			setIsMember(true);
			getClubMembers();
			getMembershipData();
		}
	};

	let leaveClub = async () => {
		let response = await fetch(
			"http://127.0.0.1:8000/leave_club/" + clubID + "/",
			{
				method: "POST",
				headers: {
					"Content-Type": "application/json",
					Authorization: "Bearer " + String(authTokens.access),
				},
			}
		);
		await response.json();
		if (response.status === 200) {
			setIsMember(false);
			alert("You have left this club!");
		}
	};

	let editClub = async (e) => {
        e.preventDefault();
        resetErrorState();
		let response = await fetch(
			"http://127.0.0.1:8000/edit_club/" + clubID + "/",
			{
				method: "PUT",
				body: JSON.stringify(club),
				headers: {
					"Content-Type": "application/json",
					Authorization: "Bearer " + String(authTokens.access),
				},
			}
		);
		let data = await response.json();
        if (response.status === 200) {
		setClub(data);
        } else {
            errorHandler(e, data);
        }
	};

	let banMember = async (memberID) => {
		console.log(memberID);
		let response = await fetch(
			"http://127.0.0.1:8000/ban_member/" + clubID + "/" + memberID + "/",
			{
				method: "PUT",
				body: JSON.stringify(user1),
				headers: {
					"Content-Type": "application/json",
					Authorization: "Bearer " + String(authTokens.access),
				},
			}
		);
		let data = await response.json();
	};

	let unbanMember = async (memberID) => {
		let response = await fetch(
			"http://127.0.0.1:8000/unban_member/" + clubID + "/" + memberID + "/",
			{
				method: "PUT",
				body: JSON.stringify(user1),
				headers: {
					"Content-Type": "application/json",
					Authorization: "Bearer " + String(authTokens.access),
				},
			}
		);
		await response.json();
	};

	let deleteClub = async () => {
		let response = await fetch(
			"http://127.0.0.1:8000/delete_club/" + clubID + "/",
			{
				method: "DELETE",
				headers: {
					"Content-Type": "application/json",
					Authorization: "Bearer " + String(authTokens.access),
				},
			}
		);
		await response.json();
	};

	useEffect(() => {
		getClubMembers();
		getClubOwner();
		getMembershipData();
		getBannedMembers();
		getClub();
		myClubData.find(
			(val) => val.club_id === clubID && val.is_organiser === true
		)
			? setIsOrganiser(true)
			: setIsOrganiser(false);
	}, []);

	const toggleBannedView = () => {
		setBannedMembers(!showBannedMembers);
	};

	const openDeleteClubDialog = () => {
		setDeleteClubDialog(true);
	};

	const closeDeleteClubDialog = () => {
		setDeleteClubDialog(false);
	};

	const handleClubDelete = () => {
		closeDeleteClubDialog();
		deleteClub();
	};

	const handleBan = (id) => {
		banMember(id);
	};

	const handleUnBan = (id) => {
		console.log("User Un-Banned");
		unbanMember(id);
	};

	const navigate = useNavigate();

	const handleUserClick = (ID) => {
		navigate(`${ID}`, { replace: false });
	};

	const handleBannedUserClick = (id) => {
		console.log("User Clicked");
	};

	function UserDisplay() {
		if (showBannedMembers === false) {
			return (
				<>
					{owner.map((user, index) => {
						return (
							<Chip
								key={index}
								label={user.first_name + " " + user.last_name + " "}
								icon={<FaCrown />}
								onClick={() => handleUserClick(user.id)}
								sx={{ mr: 1, mt: 1 }}
							/>
						);
					})}
					{members.map((user, index) => {
						return (
							<Chip
								key={index}
								label={user.first_name + " " + user.last_name + " "}
								avatar={
									<Avatar
										src={user.iconImage}
										alt={user.first_name + " " + user.last_name}
									/>
								}
								onDelete={isOwner ? () => handleBan(user.id) : undefined}
								onClick={() => handleUserClick(user.id)}
								sx={{ mr: 1, mt: 1 }}
							/>
						);
					})}
				</>
			);
		} else {
			return (
				<>
					{banned.map((user, index) => {
						return (
							<Chip
								key={index}
								label={user.first_name + " " + user.last_name}
								avatar={
									<Avatar
										src={user.iconImage}
										alt={user.first_name + " " + user.last_name}
									/>
								}
								onDelete={() => handleUnBan(user.id)}
								onClick={handleBannedUserClick(user.id)}
								sx={{ mr: 1, mt: 1 }}
							/>
						);
					})}
				</>
			);
		}
	}

	return (
		<Grid
			container
			justifyContent={"center"}
			direction={"row"}
			alignItems={"stretch"}
			spacing={2}
			maxHeight={290}
		>
			<Grid item xs={12}>
				<Box padding={1} className={"home-page-sub-title"}>
					<h4 className={"sub-title-text"}>{club.club_name}</h4>
				</Box>
			</Grid>

			<Grid
				item
				xs={6}
				maxHeight={"inherit"}
				sx={{ display: "flex", flexDirection: "column" }}
			>
				<div className={"home-page-card-background"}>
					<Grid container padding={2}>
						<Grid item xs={12}>
							<h5 className={"home-page-card-title"}>
								{showBannedMembers ? "banned users" : "members"}
							</h5>
						</Grid>

						<Grid item xs={12} overflow={"auto"}>
							<UserDisplay style={{ overflow: "auto" }} />
						</Grid>
					</Grid>
				</div>
			</Grid>

			<Grid item xs={3} sx={{ display: "flex", flexDirection: "column" }}>
				<Stack spacing={2} sx={{ height: "27%" }}>
					<Dialog
						open={showDeleteClubDialog}
						onClose={closeDeleteClubDialog}
						aria-labelledby="alert-dialog-title"
						aria-describedby="alert-dialog-description"
					>
						<DialogTitle id="alert-dialog-title">
							<h4>
								delete this club
								<h4--emphasise>?</h4--emphasise>
							</h4>
						</DialogTitle>

						<DialogContent>
							<DialogContentText id="alert-dialog-description">
								<h6>this club will be deleted and all associated data</h6>
							</DialogContentText>
						</DialogContent>

						<DialogActions>
							<ThemeButton
								onClick={handleClubDelete}
								text={"delete"}
								style={"primary"}
							/>
							<ThemeButton onClick={closeDeleteClubDialog} text={"cancel"} />
						</DialogActions>
					</Dialog>

					{!isMember && !isOwner && (
						<ThemeButton
							text={"join"}
							style={"primary"}
							onClick={() => joinClub()}
						/>
					)}

					{isMember && !isOwner && (
						<ThemeButton
							text={"leave"}
							style={"primary"}
							onClick={() => leaveClub()}
						/>
					)}

					{isOwner && (
						<ThemeButton
							text={"delete"}
							style={"primary"}
							onClick={openDeleteClubDialog}
						/>
					)}

					{isOwner && (
						<ThemeButton
							text={showBannedMembers ? "members" : "banned"}
							style={"normal"}
							onClick={toggleBannedView}
						/>
					)}
				</Stack>
			</Grid>
			{isOwner && (
				<Grid item xs={3} sx={{ display: "flex", flexDirection: "column" }}>
					<Stack spacing={2} sx={{ height: "100%" }}>
						<TextField
							required
                            error={clubNameError}
                            helperText={clubNameErrorText}
							name={"club_name"}
							label={"club name"}
							value={club.club_name}
							InputLabelProps={{
								shrink: true,
							}}
							onChange={(e) => onChange(e)}
						/>

						<TextField
							required
                            error={clubDescriptionError}
                            helperText={clubDescriptionErrorText}
							name={"mission_statement"}
							label={"club description"}
							value={club.mission_statement}
							InputLabelProps={{
								shrink: true,
							}}
							onChange={(e) => onChange(e)}
						/>

						<Autocomplete
							required
							id="tags-standard"
							name={"theme"}
							options={themes}
							getOptionLabel={(option) => option.theme || ""}
							value={theme}
							// InputLabelProps={{
							// 	shrink: true,
							// }}
							onChange={handleChange}
							filterSelectedOptions
							renderInput={(params) => (
								<TextField
									{...params}
									spacing={6}
									id={"outlined-basic"}
									label={"theme"}
									name={"theme"}
									type={"text"}
									variant={"outlined"}
                                    error={clubThemeError}
                                    helperText={clubThemeErrorText}
									multiline
								/>
							)}
						/>

						<ThemeButton text={"edit"} onClick={editClub} />
					</Stack>
				</Grid>
			)}

			<Grid item xs={12}>
				<Outlet />
			</Grid>
		</Grid>
	);
}

export default ClubDetail;
