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
	FormControlLabel

} from "@mui/material";
import { Link } from 'react-router-dom'

import "../styling/components/EventDetail.css";
import { useParams } from "react-router";
import ThemeButton from "./core/ThemeButton";
import MovieWatchRateDialog from "./helper/MovieWatchRateDialog";
import moviePoster from "../resources/images/empty_movie_poster.png";
import AuthContext from "./helper/AuthContext";
import useFetch from "./helper/useFetch";
import {MovieDataAPI} from "./helper/MovieDataAPI";


function EventDetail() {
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

	

	let getUser = useCallback(
		async (id) => {
			let { response, data } = await api(`/user/${id}/`, "GET");
			if (response.status === 200) {
				setOrganiser(data);
				return data;
			}
		},
		[]
	);

	useEffect(() => {
		getMembershipData();
		getMeetingData(clubID);
		console.log(myMeetingData.movie);
		//getMovie(myMeetingData.movie);
		console.log(myMeetingData.organiser);
		//getUser(myMeetingData.organiser);
		// getRecommendedMovies()
	}, [clubID]);

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
		let { response, data } = await api(`/get_user_joined_clubs/${user.user_id}/`, "GET");
		if (response.status === 200) {
			setMyClubData(data);
			if (data.is_organiser) {
				setIsOrganiser(true);
			}
		}
	};

	const movieAPIData = MovieDataAPI(specificMovie.imdb_id);

	let addToWatchedList = async (id) => {
		await api(`/add_watched_movie/${id}/`, "POST", {
			movie: id,
			user: user.user_id,
		});
	};

	let deleteMeeting = async (id) => {
		let { response, data } = await api(`/cancel_meeting/${id}/`, "DELETE");
		if (response.status === 200) {
			return data;
		}
	};

	let getMeetingData = async (id) => {
		let { response, data } = await api(`/get_club_upcoming_meeting/${id}/`, "GET");
		if (response.status === 200) {
			console.log(data.meeting_link)
			setMyMeetingData(data);
			getMovie(data.movie);
			getUser(data.organiser);
			console.log(data.attendees);
			for (const element of data.attendees) {
				if (element === user.user_id) {
					setIsAttending(true);
				}
			}

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
		let { response, data } = await api(`/edit_meeting/${clubID}/`, "PUT", {
			meeting_title: e.target.meeting_title.value,
			description: e.target.description.value,
			date: e.target.date.value,
			start_time: e.target.start_time.value,
			end_time: e.target.end_time.value,
			meeting_link: "placeholder",
		});
		if (response.status === 200) {
			setMyMeetingData(data);
		}
	};

	let attendMeeting = async () => {
		let { response, data } = await api(`/attend_meeting/${clubID}/`, "PUT", {
			user: user.user_id,
			meeting: myMeetingData.meeting_id,
		});
		if (response.status === 200) {
			setIsAttending(true);
		}
	}

	let leaveMeeting = async () => {
		let { response, data } = await api(`/leave_meeting/${clubID}/`, "PUT", {
			user: user.user_id,
			meeting: myMeetingData.meeting_id,
		});
		if (response.status === 200) {
			setIsAttending(false);
		}
	}

	function toggleAttending() {
		if (isAttending === true) {
			leaveMeeting();
		} else {
			attendMeeting();
		}

	};

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
		if (organiser === user) {
			// replace with organiser condition
			return (
				<ThemeButton
					text={edit ? "save" : "edit"}
					style={edit ? "primary" : "normal"}
					onClick={edit ? handleSave : openEdit}
				/>
			);
		} else {
			return <ThemeButton text={"edit"} style={"disabled"} />;
		}
	}

	function EventDeleteButton() {
		if (organiser === user) {
			// replace with organiser condition
			return (
				<ThemeButton
					text={"delete"}
					onClick={() => {
						deleteMeeting(clubID);
					}}
					style={"primary"}
				/>
			);
		} else {
			return <ThemeButton text={"delete"} style={"disabled"} />;
		}
	}



	function EventFields() {
		if (edit === false) {
			return (
				<Stack spacing={2}>
					<TextField
						fullWidth
						disabled
						label={"title"}
						value={myMeetingData.meeting_title}
						InputProps={{ readOnly: true }}
					/>

					<TextField
						fullWidth
						disabled
						label={"description"}
						value={myMeetingData.description}
						InputProps={{ readOnly: true }}
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

					<FormControlLabel control={<Checkbox
						checked={isAttending}
						onChange={(e) => toggleAttending()}


					/>} label="Mark as attending" />
				</Stack>
			);
		} else {
			return (
				<Stack spacing={2}>

					<TextField
						fullWidth
						required
						placeholder={"event title"}
						label={"title"}
						name={"meeting_title"}
						value={myMeetingData.meeting_title}
						defaultValue={myMeetingData.meeting_title}
						onChange={(e) => onChange(e)}
					/>

					<TextField
						fullWidth
						required
						placeholder={"short event description"}
						label={"description"}
						name={"description"}
						value={myMeetingData.description}
						defaultValue={myMeetingData.description}
						onChange={(e) => onChange(e)}
					/>

					<TextField
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
				</Stack>
			);
		}
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

				<Grid item xs={2}>
					{/*<RoundButton text={event.hasStarted ? "attend" : "join"} linkTo={"/https://zoom.us"}/>*/}
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
											// value={movie.rating}
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
											<Chip
												// label={club.clubName} // get club name
												sx={{ mr: 1, mt: 1 }}
											/>
										</Divider>
									</Grid>
									<Grid item xs={4}>
										<Avatar
											sx={{ width: 1, height: 1 }}
											src={organiser.iconImage}
										/>
									</Grid>
									<Grid item xs={8}>

										<h6 className={"show-event-organiser-title"}>organiser</h6>
										<h5>{organiser.first_name}</h5>
										<h5>{organiser.last_name}</h5>
									</Grid>
									<Grid item xs={12}>
										<EventFields />
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
											src={user.iconImage}
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
							<MovieWatchRateDialog
								movie={specificMovie}
								isOpen={showPrompt}
								onClose={closePrompt}
								data={promptData}
							/>
							{/* <MovieWatchRateDialog movie={props.movie} isOpen={showPrompt} onClose={closePrompt} data={promptData}/> */}
							<ThemeButton
								text={"watch"}
								style={"primary"}
								onClick={() => {
									setPromptData(specificMovie);
									setShowPrompt(true);
								}}
							/>
						</Grid>

						<Grid item xs={3}>
							<ThemeButton text={"join"} onClick={(e) => {
								e.preventDefault();
								window.location.href = myMeetingData.meeting_link;
							}} />
						</Grid>

						<Grid item xs={3}>
							<EventEditButton />
						</Grid>

						<Grid item xs={3}>
							<EventDeleteButton />
						</Grid>
					</Grid>
				</Grid>
			</Grid>
		</div>
	);
}

export default EventDetail;
