import React, { useState, useContext, useEffect } from "react";
import {
	Autocomplete,
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
} from "@mui/material";
import "../styling/components/ShowEvent.css";
import { useParams } from "react-router";
import { DummyClubData } from "../pages/data/DummyClubsData";
import { DummyClubEventData } from "../pages/data/DummyClubEventData";
import { dummyRecommendedMovies } from "../pages/data/DummyRecommendedMovies";
import EnterButton from "./EnterButton";
import FormButton from "./FormButton";
import moviePoster from "../styling/images/empty_movie_poster.png";
import { DummyClubMemberData } from "../pages/data/DummyClubMemberData";
import AuthContext from "./helper/AuthContext";

function ShowEvent() {
	let { user, authTokens } = useContext(AuthContext);
	const [myClubData, setMyClubData] = useState([]);
	const [myMeetingData, setMyMeetingData] = useState("");
	const [specificMovie, setSpecificMovie] = useState("");
	const [organiser, setOrganiser] = useState("");
	let { clubID } = useParams();

	let getMembershipData = async () => {
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

	let addToWatchedList = async (id) => {
		let response = await fetch(
			"http://127.0.0.1:8000/add_watched_movie/" + id + "/",
			{
				method: "POST",
				body: JSON.stringify({ movie: id, user: user.user_id }),
				headers: {
					"Content-Type": "application/json",
					Authorization: "Bearer " + authTokens.access,
				},
			}
		);
	};

	let deleteMeeting = async (id) => {
		let response = await fetch("http://127.0.0.1:8000/cancel_meeting/" + id + "/", {
			method: "DELETE",
			headers: {
				"Content-Type": "application/json",
				Authorization: "Bearer " + authTokens.access,
			},
		});
		let data = await response.json();
		if (response.status === 200) {
			return data
		} else {
		}
	};

	let getMeetingData = async (id) => {
		let response = await fetch(
			"http://127.0.0.1:8000/get_club_upcoming_meeting/" + id + "/",
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
		setMyMeetingData(data);
	};

	let getUser = async (id) => {
		let response = await fetch("http://127.0.0.1:8000/user/" + id + "/", {
			method: "GET",
			headers: {
				"Content-Type": "application/json",
				Authorization: "Bearer " + String(authTokens.access),
			},
		});
		let data = await response.json();
		console.log(data);
		setOrganiser(data);
	};

	let getMovie = async (id) => {
		let response = await fetch("http://127.0.0.1:8000/get_movie/" + id + "/", {
			method: "GET",
			headers: {
				"Content-Type": "application/json",
				Authorization: "Bearer " + String(authTokens.access),
			},
		});
		let data = await response.json();
		console.log(data);
		setSpecificMovie(data);
	};

	let editMeeting = async (e) => {
        e.preventDefault();
        let response = await fetch("http://127.0.0.1:8000/edit_meeting/" + clubID + "/", {
            method: "PUT",
            body: JSON.stringify({
                "meeting_title": e.target.meeting_title.value,
				"description": e.target.description.value,
				"date": e.target.date.value,
				"start_time": e.target.end_time.value,
				"end_time": e.target.end_time.value,
				"meeting_link": "placeholder",
        	}),
			headers: {
                "Content-Type": "application/json",
                Authorization: "Bearer " + String(authTokens.access),
            },
		});
		let data = await response.json();
		if (response.status === 200) {
			console.log(data);
			setMyMeetingData(data);
		}
		
	};

	useEffect(() => {
		getMembershipData();
		getMeetingData(clubID);
		console.log(myMeetingData.movie);
		getMovie(myMeetingData.movie);
		console.log(myMeetingData.organiser);
		getUser(myMeetingData.organiser);
		// getRecommendedMovies()
	}, []);

	console.log(myClubData);
	console.log(myMeetingData);
	console.log(specificMovie);

	let club = myClubData.find((obj) => obj.id === clubID);
	// let event = myMeetingData.find(obj => obj.id === club.id);
	// let movie = recommendedMovies.find(obj => obj.id === myMeetingData.movie);
	// console.log(movie)
	// let organiser = DummyClubMemberData.find(obj => obj.ID === event.organiserID);

	const [edit, setEdit] = useState(false);

	const toggleEdit = () => {
		setEdit(!edit);
	};

	return (
		<div className={"home-page-card-background"}>
			<Grid container padding={2} spacing={2}>
				<Grid item xs={10}>
					<h5 className={"show-event-title"}>
						coming up:{" "}
						<span className={"show-event-title-movie"}>
							{myMeetingData.meeting_title}
						</span>
					</h5>
				</Grid>

				<Grid item xs={2}>
					{/* <EnterButton text={event.hasStarted ? "attend" : "join"} linkTo={"/https://zoom.us"}/> */}
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
											image={moviePoster}
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
												label={organiser.first_name + " " + organiser.last_name}
												avatar={
													<Avatar
														src={organiser.iconImage}
														alt={
															organiser.first_name + " " + organiser.last_name
														}
													/>
												}
												sx={{ mr: 1, mt: 1 }}
											/>
										</Divider>
									</Grid>

									<Grid item xs={4}>
										<Avatar
											sx={{ width: 1, height: 1 }}
											src={"organiser.iconImage"}
										/>
									</Grid>

									<Grid item xs={8}>
										<h6 className={"show-event-organiser-title"}>organiser:</h6>
										<h5>{organiser.first_name}</h5>
										<h5>{organiser.last_name}</h5>
									</Grid>

									<Grid item xs={12}>
										<TextField
											fullWidth
											id="outlined-read-only-input"
											label={"title:"}
											name={"meeting_title"}
											value={myMeetingData.title}
											InputProps={{ readOnly: true }}
										/>
									</Grid>

									<Grid item xs={12}>
										<TextField
											fullWidth
											id="outlined-read-only-input"
											label={"description:"}
											name={"description"}
											value={myMeetingData.description}
											InputProps={{ readOnly: true }}
										/>
									</Grid>

									<Grid item xs={12}>
										<TextField
											id="date"
											label="date:"
											type="date"
											name={"date"}
											value={myMeetingData.date}
											fullWidth
											InputProps={{ readOnly: true }}
											InputLabelProps={{ shrink: true }}
										/>
									</Grid>

									<Grid item xs={12}>
										<TextField
											id="time"
											label="start:"
											type="time"
											name={"start_time"}
											value={myMeetingData.start_time}
											fullWidth
											InputLabelProps={{ shrink: true }}
											InputProps={{ readOnly: true }}
										/>
									</Grid>

									<Grid item xs={12}>
										<TextField
											id="time"
											label="end:"
											type="time"
											name={"end_time"}
											value={myMeetingData.end_time}
											fullWidth
											InputLabelProps={{ shrink: true }}
											InputProps={{ readOnly: true }}
										/>
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
						{DummyClubMemberData.map((user) => {
							return (
								<Chip
									label={user.firstName + " " + user.lastName}
									avatar={
										<Avatar
											src={user.iconImage}
											alt={user.firstName + " " + user.lastName}
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
							<FormButton 
								text={"watched"} 
								style={"primary"} 
								onClick={() => {addToWatchedList(myMeetingData.movie)}}
							/>
						</Grid>

						<Grid item xs={3}>
							<FormButton text={"rate"} />
						</Grid>

						<Grid item xs={3}>
							<FormButton
								text={edit ? "save" : "edit"}
								style={edit ? "primary" : "normal"}
								onClick={toggleEdit}
								onChange={(e) => {editMeeting(e)}}
							/>
						</Grid>

						<Grid item xs={3}>
							<FormButton 
								text={"delete"}
								onClick={() => {deleteMeeting(clubID)}} 
							/>
						</Grid>
					</Grid>
				</Grid>
			</Grid>
		</div>
	);
}

export default ShowEvent;
