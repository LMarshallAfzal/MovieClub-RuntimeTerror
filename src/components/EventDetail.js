import React, { useCallback, useContext, useEffect, useState } from "react";
import {
	Avatar,
	Box,
	Card,
	CardMedia,
	Chip,
	Divider,
	Grid,
	Rating,
	Stack,
	TextField,
	Tooltip,
	Checkbox,
	FormControlLabel,
	Typography,
	Alert,
} from "@mui/material";
import CheckIcon from "@mui/icons-material/Check";
import { Link } from "react-router-dom";

import "../styling/components/EventDetail.css";
import { useParams } from "react-router";
import ThemeButton from "./core/ThemeButton";
import MovieWatchRateDialog from "./helper/MovieWatchRateDialog";
import moviePoster from "../resources/images/empty_movie_poster.png";
import AuthContext from "./helper/AuthContext";
import useFetch from "./helper/useFetch";
import { MovieDataAPI } from "./helper/MovieDataAPI";

function EventDetail(props) {
	let { user, authTokens } = useContext(AuthContext);
	let api = useFetch();
	let { clubID } = useParams();

	const [myClubData, setMyClubData] = useState([]);
	const [myMeetingData, setMyMeetingData] = useState({});
	const [specificMovie, setSpecificMovie] = useState("");
	const [organiser, setOrganiser] = useState("");
	const [isOrganiser, setIsOrganiser] = useState(false);
	const [attendees, setAttendees] = useState([]);
	const [isAttending, setIsAttending] = useState(false);
	const [alert, setAlert] = useState(false);
	const [error, setError] = useState(false);
	const [errorText, setErrorText] = useState("");
	const [titleError, setTitleError] = useState(false);
	const [titleErrorText, setTitleErrorText] = useState("");
	const [descriptionError, setDescriptionError] = useState(false);
	const [descriptionErrorText, setDescriptionErrorText] = useState("");
	const [dateError, setDateError] = useState(false);
	const [dateErrorText, setDateErrorText] = useState("");
	const [startTimeError, setStartTimeError] = useState(false);
	const [startTimeErrorText, setStartTimeErrorText] = useState("");
	const [endTimeError, setEndTimeError] = useState(false);
	const [endTimeErrorText, setEndTimeErrorText] = useState("");
	const [meetingLinkError, setMeetingLinkError] = useState(false);
	const [meetingLinkErrorText, setMeetingLinkErrorText] = useState("");

	let resetErrorState = () => {
		setTitleError(false);
		setTitleErrorText("");
		setDescriptionError(false);
		setDescriptionErrorText("");
		setDateError(false);
		setDateErrorText("");
		setStartTimeError(false);
		setStartTimeErrorText("");
		setEndTimeError(false);
		setEndTimeErrorText("");
		setMeetingLinkError(false);
		setMeetingLinkErrorText("");
	};

	let errorHandler = (data) => {
		if (Object.keys(data).includes("meeting_title")) {
			setTitleError(true);
			setTitleErrorText(data.meeting_title);
		}
		if (Object.keys(data).includes("description")) {
			setDescriptionError(true);
			setDescriptionErrorText(data.description);
		}
		if (Object.keys(data).includes("date")) {
			setDateError(true);
			setDateErrorText(data.date);
		}
		if (Object.keys(data).includes("start_time")) {
			setStartTimeError(true);
			setStartTimeErrorText(data.start_time);
		}
		if (Object.keys(data).includes("end_time")) {
			setEndTimeError(true);
			setEndTimeErrorText(data.end_time);
		}
		if (Object.keys(data).includes("meeting_link")) {
			setMeetingLinkError(true);
			setMeetingLinkErrorText(data.meeting_link);
		}
		if (Object.keys(data).includes("non_field_errors")) {
			setDateError(true);
			setDateErrorText(data.non_field_errors);
		}
		if (Object.keys(data).includes("club_has_no_upcoming_meeting")) {
			setError(true);
			setErrorText("No upcoming meeting!");
		}
	};

	let getUser = useCallback(async (id) => {
		let { response, data } = await api(`/user/${id}/`, "GET");
		if (response.status === 200) {
			return data;
		}
	}, []);

	let getOwner = async () => {
		let { response, data } = await api(`/club_owner/${clubID}/`, "GET");
		if (response.status === 200) {
			setOrganiser(data[0]);
		}
	};

	useEffect(() => {
		getOwner();
		getMembershipData();
		getMeetingData(clubID);
		console.log("that thingy", error)
	}, [props, clubID]);

	useEffect(() => {
		async function fetchAttendees() {
			if (myMeetingData.attendees) {
				setAttendees(await Promise.all(myMeetingData.attendees.map(getUser)));
			}
		}

		fetchAttendees();
	}, [myMeetingData, getUser]);

	const onChange = (e) => {
		setMyMeetingData((fieldData) => ({
			...fieldData,
			[e.target.name]: e.target.value,
		}));
	};

	let getMembershipData = async (e) => {
		let { response, data } = await api(
			`/get_user_joined_clubs/${user.user_id}/`,
			"GET"
		);
		if (response.status === 200) {
			setMyClubData(data);
			if (data.is_organiser) {
				setIsOrganiser(true);
			}
		}
	};

	const movieAPIData = MovieDataAPI(specificMovie.imdb_id);

	let deleteMeeting = async (id) => {
		await api(`/cancel_meeting/${id}/`, "DELETE");
	};

	let getMeetingData = async (e, id) => {
		let { response, data } = await api(
			`/get_club_upcoming_meeting/${id}/`,
			"GET"
		);
		if (response.status === 200) {
			setMyMeetingData(data);
			getMovie(data.movie);
			getUser(data.organiser);
			for (const element of data.attendees) {
				if (element === user.user_id) {
					setIsAttending(true);
				}
			}
		} else {
			errorHandler(data);
		}
	};

	let getMovie = async (id) => {
		let { response, data } = await api(`/get_movie/${id}/`, "GET");
		if (response.status === 200) {
			setSpecificMovie(data);
		}
	};

	let editMeeting = async (e) => {
		e.preventDefault();
		resetErrorState();
		let { response, data } = await api(`/edit_meeting/${clubID}/`, "PUT", {
			meeting_title: myMeetingData.meeting_title,
			date: myMeetingData.date,
			start_time: myMeetingData.start_time,
			end_time: myMeetingData.end_time,
			description: myMeetingData.description,
			meeting_link: myMeetingData.meeting_link,
		});
		if (response.status === 200) {
			setMyMeetingData(data);
			setAlert(true);
		} else {
			errorHandler(data);
		}
	};

	let attendMeeting = async () => {
		let { response } = await api(`/attend_meeting/${clubID}/`, "PUT", {
			user: user.user_id,
			meeting: myMeetingData.meeting_id,
		});
		if (response.status === 200) {
			setIsAttending(true);
		}
	};

	let leaveMeeting = async () => {
		let { response } = await api(`/leave_meeting/${clubID}/`, "PUT", {
			user: user.user_id,
			meeting: myMeetingData.meeting_id,
		});
		if (response.status === 200) {
			setIsAttending(false);
		}
	};

	function toggleAttending() {
		if (isAttending === true) {
			leaveMeeting();
		} else {
			attendMeeting();
		}
	}

	console.log(myClubData);
	console.log(myMeetingData);
	console.log(specificMovie);

	let club = myClubData.find((obj) => obj.id === clubID);

	const [edit, setEdit] = useState(false);

	const [showPrompt, setShowPrompt] = useState(false);
	const [promptData, setPromptData] = useState("");

	const closePrompt = () => {
		setShowPrompt(false);
	};

	const openEdit = () => {
		setEdit(true);
	};

	const handleSave = () => {
		console.log("form submitted"); // substitute with edit meeting
		setEdit(false);
	};

	function EventEditButton() {
		console.log("organiser", organiser);
		if (organiser.id === user.user_id) {
			return (
				<ThemeButton
					text={"edit"}
					style={"primary"}
					onClick={(e) => editMeeting(e)}
				/>
			);
		} else {
			return <ThemeButton text={"edit"} style={"disabled"} />;
		}
	}

	function EventDeleteButton() {
		if (organiser.id === user.user_id) {
			return (
				<ThemeButton
					text={"delete"}
					onClick={() => {
						deleteMeeting(clubID);
						window.location.reload(false);
					}}
					style={"primary"}
				/>
			);
		} else {
			return <ThemeButton text={"delete"} style={"disabled"} />;
		}
	}

	function EventFields() {
		if (!(organiser.id === user.user_id)) {
			return (
				<Stack spacing={2}>
					<TextField
						fullWidth
						disabled
						label={"title"}
						value={myMeetingData.meeting_title}
						InputProps={{ readOnly: true }}
						InputLabelProps={{
							shrink: true,
						}}
					/>

					<TextField
						fullWidth
						disabled
						label={"description"}
						value={myMeetingData.description}
						InputProps={{ readOnly: true }}
						InputLabelProps={{
							shrink: true,
						}}
					/>

					<TextField
						fullWidth
						disabled
						label={"date"}
						type={"date"}
						value={myMeetingData.date}
						InputProps={{ readOnly: true }}
						InputLabelProps={{ shrink: true }}
					/>

					<TextField
						fullWidth
						disabled
						label={"start"}
						type={"time"}
						value={myMeetingData.start_time}
						InputProps={{ readOnly: true }}
						InputLabelProps={{ shrink: true }}
					/>

					<TextField
						fullWidth
						disabled
						label={"end"}
						type={"time"}
						value={myMeetingData.end_time}
						InputProps={{ readOnly: true }}
						InputLabelProps={{ shrink: true }}
					/>

					<FormControlLabel
						control={
							<Checkbox
								checked={isAttending}
								onChange={(e) => toggleAttending()}
							/>
						}
						label="Mark as attending"
					/>
				</Stack>
			);
		} else {
			return (
				<Stack spacing={2}>
					<TextField
						error={titleError}
						helperText={titleErrorText}
						fullWidth
						required
						placeholder={"event title"}
						label={"title"}
						name={"meeting_title"}
						value={myMeetingData.meeting_title}
						defaultValue={myMeetingData.meeting_title}
						onChange={(e) => onChange(e)}
						InputLabelProps={{
							shrink: true,
						}}
					/>

					<TextField
						error={descriptionError}
						helperText={descriptionErrorText}
						fullWidth
						required
						placeholder={"short event description"}
						label={"description"}
						name={"description"}
						value={myMeetingData.description}
						defaultValue={myMeetingData.description}
						onChange={(e) => onChange(e)}
						InputLabelProps={{
							shrink: true,
						}}
					/>

					<TextField
						error={dateError}
						helperText={dateErrorText}
						fullWidth
						required
						label={"date"}
						type={"date"}
						name={"date"}
						value={myMeetingData.date}
						defaultValue={myMeetingData.date}
						onChange={(e) => onChange(e)}
						InputLabelProps={{ shrink: true }}
					/>

					<TextField
						error={startTimeError}
						helperText={startTimeErrorText}
						fullWidth
						required
						label={"start"}
						type={"time"}
						name={"start_time"}
						value={myMeetingData.start_time}
						defaultValue={myMeetingData.start_time}
						onChange={(e) => onChange(e)}
						InputLabelProps={{ shrink: true }}
						inputProps={{ step: 300 }}
					/>

					<TextField
						error={endTimeError}
						helperText={endTimeErrorText}
						fullWidth
						required
						label={"end"}
						type={"time"}
						name={"end_time"}
						value={myMeetingData.end_time}
						defaultValue={myMeetingData.end_time}
						onChange={(e) => onChange(e)}
						InputLabelProps={{ shrink: true }}
						inputProps={{ step: 300 }}
					/>

					<TextField
						error={meetingLinkError}
						helperText={meetingLinkErrorText}
						fullWidth
						required
						label={"link"}
						type={"text"}
						name={"meeting_link"}
						value={myMeetingData.meeting_link}
						defaultValue={myMeetingData.meeting_link}
						onChange={(e) => onChange(e)}
						InputLabelProps={{ shrink: true }}
					/>

					<FormControlLabel
						control={
							<Checkbox
								checked={isAttending}
								onChange={(e) => toggleAttending()}
							/>
						}
						label="Mark as attending"
					/>
				</Stack>
			);
		}
	}
	if (error) {
		return (
			<div className={"home-page-card-background"}>
				<Grid container padding={2} spacing={2}>
					<Grid item xs={12}>
						<Typography variant="h4" align="center">
							{errorText}
						</Typography>
					</Grid>
				</Grid>
			</div>
		);
	}
	return (
		<div className={"home-page-card-background"}>
			<Grid container padding={2} spacing={2}>
				<Grid item xs={10}>
					<h5 className={"show-event-title"}>
						coming up:
						<span className={"show-event-title-movie"}>
							{" "}
							{myMeetingData.meeting_title}
						</span>
					</h5>
				</Grid>
				<Grid item xs={12}>
					<Grid container spacing={2}>
						<Grid item xs={6}>
							<Grid container spacing={2}>
								<Grid item xs={12}>
									<Card>
										<CardMedia
											component={"img"}
											alt={specificMovie.title}
											image={movieAPIData ? movieAPIData.Poster : moviePoster}
										/>

										<Stack spacing={1} padding={1} alignItems={"center"}>
											<Rating
												readOnly
												sx={{ fontSize: "1.2em" }}
												precision={0.5}
												name={"read-only"}
												value={
													movieAPIData
														? parseFloat(movieAPIData.imdbRating) / 2
														: 0
												}
											/>

											<Tooltip
												title={specificMovie.title}
												placement="top-start"
											>
												<h4 className={"new-event-movie-text"}>
													{specificMovie.title}
												</h4>
											</Tooltip>
										</Stack>
									</Card>
								</Grid>
							</Grid>
						</Grid>
						<Grid item xs={6}>
							<Stack
								spacing={2}
								sx={{ flexDirection: "column", height: "100%" }}
							>
								<Grid container spacing={2}>
									<Grid item xs={12}>
										<Divider>
											<Chip sx={{ mr: 1, mt: 1 }} />
										</Divider>
									</Grid>
									<Grid item xs={4}>
										<Avatar
											sx={{ width: 1, height: 1 }}
											src={organiser.gravatar}
										/>
									</Grid>
									<Grid item xs={8}>
										<h6 className={"show-event-organiser-title"}>organiser</h6>
										<h5>{organiser.first_name}</h5>
										<h5>{organiser.last_name}</h5>
									</Grid>
									<Grid item xs={12}>
										{alert ? (
											<Alert
												icon={<CheckIcon fontSize="inherit" />}
												severity="success"
											>
												Successfully edited meeting!
											</Alert>
										) : (
											<></>
										)}
										{EventFields()}
									</Grid>
								</Grid>
							</Stack>
						</Grid>
					</Grid>
				</Grid>

				<Grid item xs={12}>
					<Box
						sx={{ border: "1px solid black" }}
						maxHeight={200}
						overflow={"auto"}
						padding={1}
					>
						{attendees.map((user) => {
							return (
								<Chip
									label={user.first_name + " " + user.last_name}
									avatar={
										<Avatar
											src={user.gravatar}
											alt={user.first_name + " " + user.last_name}
										/>
									}
									sx={{ mr: 1, mt: 1 }}
									color={user.canAttend ? "primary" : "default"}
								/>
							);
						})}
					</Box>
				</Grid>

				<Grid item xs={12}>
					<Grid container spacing={2}>
						<Grid item xs={3}>
							<ThemeButton
								style={!isAttending ? "disabled" : "primary"}
								text={"join"}
								onClick={(e) => {
									e.preventDefault();
									window.open(myMeetingData.meeting_link, "_blank");
								}}
							/>
						</Grid>

						<Grid item xs={3}>
							{EventEditButton()}
						</Grid>

						<Grid item xs={3}>
							{EventDeleteButton()}
						</Grid>
					</Grid>
				</Grid>
			</Grid>
		</div>
	);
}

export default EventDetail;
