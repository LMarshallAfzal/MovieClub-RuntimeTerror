import React, { useContext, useEffect, useState } from "react";
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
	Alert,
} from "@mui/material";
import CheckIcon from "@mui/icons-material/Check";
import { FaCrown } from "react-icons/fa";
import "../styling/components/ClubDetail.css";
import ThemeButton from "./core/ThemeButton";
import { themes } from "../resources/data/MovieThemes";
import AuthContext from "../components/helper/AuthContext";
import HomepageCard from "./helper/HomepageCard";
import useFetch from "../components/helper/useFetch";

function ClubDetail() {
	const [showBannedMembers, setBannedMembers] = useState(false);
	const [showDeleteClubDialog, setDeleteClubDialog] = useState(false);
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
	const [alert, setAlert] = useState(false);

	const [clubNameError, setClubNameError] = useState(false);
	const [clubDescriptionError, setClubDescriptionError] = useState(false);
	const [clubThemeError, setClubThemeError] = useState(false);

	const [clubNameErrorText, setClubNameErrorText] = useState("");
	const [clubDescriptionErrorText, setClubDescriptionErrorText] = useState("");
	const [clubThemeErrorText, setClubThemeErrorText] = useState("");

	let { clubID } = useParams();
	let api = useFetch();
	let { user, authTokens } = useContext(AuthContext);

	const onChange = (e) => {
		setClub((prevData) => ({
			...prevData,
			[e.target.name]: e.target.value,
		}));
	};

	const handleChange = (event, value) => {
		let edit = themes.find((theme) => theme.theme === value.theme);
		setTheme(edit);
		setClub((fieldData) => ({
			...fieldData,
			theme: value.theme,
		}));
	};


	let resetErrorState = () => {
		setClubNameError(false);
		setClubDescriptionError(false);
		setClubThemeError(false);
	};

	let errorHandler = (e, data) => {
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
		let {response, data} = await api(`/club/${clubID}/`, "GET");
		if(response.status === 200) {
			setClub(data);
			setTheme(themes.find((theme) => theme.theme === data.theme));
		}
	}

	let getClubMembers = async (e) => {
		let {response, data} = await api(`/club_members/${clubID}/`, "GET");
		if(response.status === 200) {
			setMembers(data);
			data.find((member) => member.username === user.username)
				? setIsMember(true)
				: setIsMember(false);
		}
	}

	let getClubOwner = async (e) => {
		let {response, data} = await api(`/club_owner/${clubID}/`, "GET");
		if(response.status === 200) {
			data.find((owner) => owner.username === user.username)
				? setIsOwner(true)
				: setIsOwner(false);
			setOwner(data);
		}
	}

	let getMembershipData = async (e) => {
		let {response, data} = await api(`/get_user_joined_clubs/${user.user_id}`, "GET");
		if(response.status === 200) {
			setMyClubData(data);
		}
	}

	let getBannedMembers = async (e) => {
		let {response, data} = await api(`/banned_member_list/${clubID}/`, "GET");
		if(response.status === 200) {
			setBanned(data);
		}
	}

	let joinClub = async () => {
		let {response} = await api(`/join_club/${clubID}/`, "POST");
		if(response.status === 201) {
			setIsMember(true);
			getClubMembers();
			getMembershipData();
		}
	}

	let leaveClub = async () => {
		let {response} = await api(`/leave_club/${clubID}/`, "POST");
		if(response.status === 201) {
			setIsMember(false);
			alert("You have left this club!");
		}
	}

	let banMember = async (memberID) => {
		let {response, data} = await api(`/ban_member/${clubID}/${memberID}/`, "PUT", user1);
		if(response.status === 200) {
			setBanned(data);
		}
	}

	let unbanMember = async (memberID) => {
		await api(`/unban_member/${clubID}/${memberID}/`, "PUT", user1);
	};

	let deleteClub = async () => {
		await api(`/delete_club/${clubID}/`, "DELETE");
	};

	let editClub = async (e) => {
		resetErrorState();
		let {response, data} = await api(`/edit_club/${clubID}/`, "PUT", club);
		if(response.status === 200) {
			setClub(data);
			setAlert(true)
		} else {
			errorHandler(e, data);
		}
	};

	useEffect(() => {
		getClubMembers();
		getClubOwner();
		getMembershipData();
		getBannedMembers();
		getClub();
		setAlert(false);
		myClubData.find(
			(val) => val.club_id === clubID && val.is_organiser === true
		)
			? setIsOrganiser(true)
			: setIsOrganiser(false);
	}, [clubID]);

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
		unbanMember(id);
	};

	const navigate = useNavigate();

	const handleUserClick = (ID) => {
		navigate(`${ID}`, { replace: false });
	};

	const handleBannedUserClick = (id) => {};

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
										src={user.gravatar}
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
			return banned.map((user, index) => {
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
			});
		}
	}

	const [edit, setEdit] = useState(false);

	const handleEditClub = () => {
		editClub();
	};

	function ClubEdit() {
		if (isOwner) {
			return (
				<>
					{alert ? (
						<Alert icon={<CheckIcon fontSize="inherit" />} severity="success">
							Successfully edited {club.club_name}!
						</Alert>
					) : (
						<></>
					)}
					<TextField
						required
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
						filterSelectedOptions
						value={theme}
						// InputLabelProps={{
						// 	shrink: true,
						// }}
						onChange={(event, value) => handleChange(event, value)}
						renderInput={(params) => (
							<TextField
								{...params}
								spacing={6}
								id={"outlined-basic"}
								label={"theme"}
								name={"theme"}
								type={"text"}
								variant={"outlined"}
								// multiline
							/>
						)}
					/>
				</>
			);
		} else {
			return (
				<>
					<TextField
						fullWidth
						disabled
						label={"club name"}
						value={club.club_name}
						InputProps={{ readOnly: true }}
					/>

					<TextField
						fullWidth
						disabled
						label={"club description"}
						value={club.mission_statement}
						InputProps={{ readOnly: true }}
					/>

					<Autocomplete
						disabled
						options={themes}
						getOptionLabel={(option) => option.theme || ""}
						defaultValue={club.theme}
						value={club.theme}
						InputProps={{ readOnly: true }}
						InputLabelProps={{
							shrink: true,
						}}
						onChange={(e) => onChange(e)}
						filterSelectedOptions
						disableCloseOnSelect
						renderInput={(params) => (
							<TextField
								{...params}
								spacing={6}
								id={"outlined-basic"}
								label={"theme"}
								name={"theme"}
								type={"text"}
								variant={"outlined"}
								multiline
								disabled
							/>
						)}
					/>
				</>
			);
		}
	}

	const cardHeight = 325;

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

			<Grid item xs={6} height={cardHeight}>
				<HomepageCard title={showBannedMembers ? "banned users" : "members"}>
					<Box maxHeight={cardHeight - 80} overflow={"auto"}>
						<UserDisplay />
					</Box>
				</HomepageCard>
			</Grid>

			<Grid item xs={3} height={cardHeight}>
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

					<ThemeButton
						text={"join"}
						style={!isMember && !isOwner ? "primary" : "disabled"}
						onClick={() => joinClub()}
					/>

					<ThemeButton
						text={"leave"}
						style={isMember && !isOwner ? "primary" : "disabled"}
						onClick={() => leaveClub()}
					/>

					<ThemeButton
						text={"delete"}
						style={isOwner ? "primary" : "disabled"}
						onClick={openDeleteClubDialog}
					/>

					<ThemeButton
						text={showBannedMembers ? "members" : "banned"}
						style={isOwner ? "normal" : "disabled"}
						onClick={toggleBannedView}
					/>
				</Stack>
			</Grid>

			<Grid item xs={3} height={cardHeight}>
				<Stack spacing={2} sx={{ height: "100%" }}>
					<ClubEdit />

					{isOwner ? (
						<ThemeButton text={"edit"} onClick={handleEditClub} />
					) : (
						<ThemeButton text={"edit"} style={"disabled"} />
					)}
				</Stack>
			</Grid>

			<Grid item xs={12}>
				<Outlet />
			</Grid>
		</Grid>
	);
}

export default ClubDetail;
