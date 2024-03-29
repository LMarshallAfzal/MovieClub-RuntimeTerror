import React, { useContext, useEffect, useState } from "react";
import "../styling/components/ClubDiscussion.css";
import { useParams } from "react-router";
import {
	Avatar,
	Box,
	Divider,
	FormControl,
	Grid,
	TextField,
	Typography,
} from "@mui/material";
import ThemeButton from "./core/ThemeButton";
import TextButton from "./core/TextButton";
import { Outlet } from "react-router-dom";
import AuthContext from "./helper/AuthContext";
import useFetch from "./helper/useFetch";

function ClubDiscussion() {
	let { user, authTokens } = useContext(AuthContext);
	let [message, setMessage] = useState("");
	let api = useFetch();

	const [defaultMessage, setDefaultMessage] = useState("");
	const [userData, setUserData] = useState("");
	const [dateTime, setDateTime] = useState(new Date(Date.now()));
	const [myClubData, setMyClubData] = useState([]);
	const [messages, setMessages] = useState([]);
	const [myClub, setClub] = useState([]);
	const [timeInterval, setTimeInterval] = useState(0);
	const [isOwner,setIsOwner] = useState(false);
	const [hasMeeting,setHasMeeting] = useState(false)

	setTimeout(() => {
		setTimeInterval(timeInterval + 1);
	}, 2000);

	let { clubID } = useParams();


	useEffect(() => {
		getClubMessages();
		getMembershipData();
		getClub();
		getClubOwner();
		getUpcomingMeeting();
		updateMeeting();

	}, [timeInterval]);



	console.log(myClubData);


	const onChange = (e, newDateTime) => {
		e.preventDefault();
		setMessage((fieldData) => ({
			...fieldData,
			[e.target.name]: e.target.value,
		}));
		setDateTime(newDateTime);
	};

	let getMembershipData = async () => {
		let { response, data } = await api(`/get_user_joined_clubs/${user.user_id}/`, "GET");
		if (response.status === 200) {
			setMyClubData(data);
		}
	};

	let getClubMessages = async (e) => {
		let { response, data } = await api(`/message_forum/${clubID}/`, "GET");
		if (response.status === 200) {
			setMessages(data);
			console.log(data)


		}
	};

	let getClubOwner = async (e) => {
		let {response, data} = await api(`/club_owner/${clubID}/`, "GET");
		if(response.status === 200) {
			data.find((owner) => owner.username === user.username)
				? setIsOwner(true)
				: setIsOwner(false);
		}
	}


	let sendClubMessages = async (id) => {
		let { response } = await api(`/write_message/${id}/`, "POST", {
			sender: user.username,
			club: myClub.id,
			message: message.message,
			timestamp: dateTime,
		});
		if (response.status === 200) {
			getClubMessages();
		}
	};

	let getClub = async (e) => {
		let { response, data } = await api(`/club/${clubID}/`, "GET");
		if (response.status === 200) {
			setClub(data);
		}
	};

	let getUpcomingMeeting = async (e) => {
		let { response, data } = await api(`/get_club_upcoming_meeting/${clubID}/`, "GET");
		if (response.status === 200) {
			setHasMeeting(true)}
		}

	let updateMeeting = async () => {
		let { response } = await api(`/set_meeting_complete/${clubID}/`, "GET");
		if (response.status === 200) {
			setHasMeeting(false)
		}
		}
	



	return (
		<Grid container spacing={2}>
			<Grid item xs={10}>
				<Box padding={1} className={"home-page-sub-title"}>
					<h4 className={"sub-title-text"}>{myClub.club_name}</h4>
				</Box>
			</Grid>

			<Grid item xs={2}>
				<ThemeButton
					className={"create-button"}
					text={"create"}
					linkTo={"new"}
					style={!isOwner || hasMeeting ? "disabled":"primary"}
				/>
			</Grid>

			<Grid item xs={7}>
				<Outlet />
			</Grid>

			<Grid item xs={5}>
				<div className={"home-page-card-background"}>
					<Grid container padding={2} spacing={2}>
						<Grid item xs={12}>
							<h5 className={"home-page-card-title"}>messages</h5>
						</Grid>

						<Grid item xs={12}>
							<Box maxHeight={600} sx={{ overflowY: "auto" }}>

								{messages.map((val) => {

									return (
										<>
											<Divider variant="middle">{val.time}</Divider>
											<div style={{ padding: "10px" }}>
												<Grid container direction={"row"}>
													<Grid item>
														<div
															style={{
																alignSelf: "center",
																width: "40px",
																padding: "10px",
															}}
														>
															<Avatar
																src={val.sender_gravatar}
																sx={{ width: "100%", height: "100%" }}
															/>
														</div>
													</Grid>
													<Grid item>
														<Typography
															sx={{ fontSize: 15 }}
															color="text.secondary"
														>
															{val.sender}
														</Typography>
														<Typography sx={{ fontSize: 20 }} variant="body2">
															{val.message}
														</Typography>
														<Typography sx={{ fontSize: 15 }} variant="body2">
															{val.timestamp.slice(11, 16) +
																" | " +
																val.timestamp.slice(8, 10) +
																"/" +
																val.timestamp.slice(5, 7) +
																"/" +
																val.timestamp.slice(0, 4)}
														</Typography>
													</Grid>
												</Grid>
											</div>
										</>
									);
								})}
							</Box>
						</Grid>

						<Grid item xs={12}>
							<FormControl fullWidth>
								<TextField
									multiline
									className="text-field"
									label="message"
									name="message"
									value={message.message}
									placeholder={"say something nice"}
									variant="outlined"
									onChange={(e, dateTime) => onChange(e, dateTime)}
									InputProps={{
										endAdornment: (
											<TextButton
												onClick={() => { sendClubMessages(clubID); message.message = "" }}
												text={"send"}
												style={{ textAlign: "right" }}
											/>
										),
									}}
								/>
							</FormControl>
						</Grid>
					</Grid>
				</div>
			</Grid>
		</Grid>
	);
}

export default ClubDiscussion;