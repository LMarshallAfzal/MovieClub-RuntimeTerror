import React, { useContext, useEffect, useState } from "react";
import {
	Card,
	CardActionArea,
	CardMedia,
	Grid,
	Rating,
	Stack,
	TextField,
	Tooltip,
} from "@mui/material";
import { useParams } from "react-router";
import "../styling/components/EventCreate.css";
import ThemeButton from "./core/ThemeButton";
import AuthContext from "./helper/AuthContext";
import placeHolder from "../resources/images/empty_movie_poster.png";
import { useNavigate } from "react-router-dom";
import axios from "axios";


import useFetch from "./helper/useFetch";


function EventCreate() {
	let day = new Date();
	let nextDay = new Date(day);
	let tomorrow = nextDay.setDate(day.getDate() + 2);
	let { user, authTokens } = useContext(AuthContext);
	let api = useFetch();

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

	const [recommendedMovies, setRecommendedMovies] = useState([]);
	const [selectedMovie, setSelectedMovie] = useState("");
	const [selectedMovieTitle, setSelectedMovieTitle] = useState("");
	const [meetingData, setMeetingData] = useState({
		club: "",
		movie: "",
		organiser: "",
		meeting_title: "",
		date: "",
		start_time: "",
		end_time: "",
		description: "",
		meeting_link: "",
	});

	const navigate = useNavigate();


	const {
		club,
		movie,
		organiser,
		meeting_title,
		date,
		start_time,
		end_time,
		description,
		meeting_link,
	} = meetingData;

	let { clubID } = useParams();

	const onChange = (e) => {
		setMeetingData((fieldData) => ({
			...fieldData,
			[e.target.name]: e.target.value,
		}));
	};

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
		if (Object.keys(data).includes("meeting_date")) {
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
		if (Object.keys(data).includes("duration")) {
			setStartTimeError(true);
			setStartTimeErrorText("Duration of meeting must be greater than 1 hour!");
			setEndTimeError(true);
			setEndTimeErrorText("Duration of meeting must be greater than 1 hour!")
		}


	};

	let getRecommendedMovies = async () => {
		// trainMeetingRecommendation();
		let response = await fetch(
			"http://127.0.0.1:8000/rec_meeting/" + clubID + "/",
			{
				method: "GET",
				headers: {
					"Content-type": "application/json; charset=UTF-8",
					Authorization: "Bearer " + String(authTokens.access),
				},
			}
		);
		let data = await response.json();
		for (let index = 0; index < data.length; ++index) {
			let movie = data[index];
			movie["poster"] = getMovieAPIData(movie).Poster
			console.log(movie.poster)
		}
		setRecommendedMovies(data);
		console.log(recommendedMovies)
	};

	let createMeeting = async (e) => {
		e.preventDefault();
		let response = await fetch(
			"http://127.0.0.1:8000/create_meeting/" + clubID + "/",
			{
				method: "POST",
				body: JSON.stringify({
					club: clubID,
					movie: selectedMovie,
					organiser: user.user_id,
					meeting_title: meetingData.meeting_title,
					date: meetingData.date,
					start_time: meetingData.start_time,
					end_time: meetingData.end_time,
					description: meetingData.description,
					meeting_link: meetingData.meeting_link,
				}),
				headers: {
					"Content-type": "application/json; charset=UTF-8",
					Authorization: "Bearer " + String(authTokens.access),
				},
			}
		);
		let data = await response.json();
		if (response.status === 201) {
			setMeetingData(data);
			navigate(`/home/discussion/${clubID}`);
		} else {
			errorHandler(response.data);
		}
	};

	let getMovieTitle = async (id) => {
		let { response, data } = await api(`/get_movie/${id}/`, "GET");
		if (response.status === 200) {
			setSelectedMovie(id);
			setSelectedMovieTitle(data.title);
		}
	};

	let getMovieAPIData = async (movie) => {
		axios
			.get(`http://www.omdbapi.com/?i=tt${movie.imdb_id}&apikey=199b93be`)
			.then((res) => {
				return res.data;
			});
	};


	useEffect(() => {
		getRecommendedMovies();
	}, []);


	return (
		<div className={"home-page-card-background"}>
			<Grid container padding={2} spacing={2}>
				<Grid item xs={12}>
					<h5 className={"home-page-card-title"}>new event:</h5>
				</Grid>

				<Grid item xs={12}>
					<Grid
						container
						direction="row"
						justifyContent="space-evenly"
						alignItems="stretch"
					>
						{recommendedMovies.map((movie) => {

							return (


								<Grid item xs={2}>
									<Card sx={{ flexDirection: "column", height: "100%" }}>
										<CardMedia
											component="img"
											height="140"
											image={"https://img.omdbapi.com/?i=tt" + movie.imdb_id + "&h=600&apikey=199b93be"}
										/>
										<CardActionArea
											sx={{ flexDirection: "column", height: "100%" , justifyContent: "center",alignItems: "right"}}
											onClick={() => getMovieTitle(movie.id)}
										>

											<Grid
												container
												direction={"column"}
												alignItems={"center"}
												textAlign={"center"}
											>


												<Tooltip title={movie.title} placement="top-start">
													<h6 className={"new-event-movie-text"} sx={{ justifyContent: "center",alignItems: "center",textAlign : "center"}}>
														{movie.title}
													</h6>
												</Tooltip>
											</Grid>
										</CardActionArea>
									</Card>
								</Grid>
							);
						})}
					</Grid>
				</Grid>

				<Grid item xs={6}>
					<Stack spacing={2}>
						<TextField
							error={titleError}
							helperText={titleErrorText}
							fullWidth
							required
							placeholder={"event title"}
							label={"title"}
							name={"meeting_title"}
							value={meeting_title}
							onChange={(e) => onChange(e)}
						/>

						<TextField
							error={descriptionError}
							helperText={descriptionErrorText}
							fullWidth
							required
							placeholder={"short event description"}
							label={"description"}
							name={"description"}
							value={description}
							onChange={(e) => onChange(e)}
						/>

						<TextField
							fullWidth
							disabled
							required
							label={"movie"}
							name={"movie"}
							value={selectedMovieTitle}
							onChange={(e) => onChange(e)}
						/>
					</Stack>
				</Grid>

				<Grid item xs={6}>
					<Stack spacing={2}>
						<TextField
							error={dateError}
							helperText={dateErrorText}
							fullWidth
							required
							label={"date"}
							type={"date"}
							name={"date"}
							value={date}
							defaultValue={tomorrow}
							onChange={(e) => onChange(e)}
							InputLabelProps={{ shrink: true }}
						/>

						<TextField
							error={startTimeError}
							helperText={startTimeErrorText}
							fullWidth
							label={"start"}
							type={"time"}
							name={"start_time"}
							value={start_time}
							defaultValue={"17:00"}
							onChange={(e) => onChange(e)}
							InputLabelProps={{ shrink: true }}
							inputProps={{ step: 300 }}
						/>

						<TextField
							error={endTimeError}
							helperText={endTimeErrorText}
							fullWidth
							label={"end"}
							type={"time"}
							name={"end_time"}
							value={end_time}
							defaultValue={"18:00"}
							onChange={(e) => onChange(e)}
							InputLabelProps={{ shrink: true }}
							inputProps={{ step: 300 }}
						/>
					</Stack>
				</Grid>

				<Grid item xs={12}>
					<TextField
						error={meetingLinkError}
						helperText={meetingLinkErrorText}
						fullWidth
						required
						placeholder={"the event link"}
						label={"link"}
						name={"meeting_link"}
						value={meeting_link}
						onChange={(e) => onChange(e)}
					/>
				</Grid>

				<Grid item xs={12}>
					<ThemeButton
						text={"create"}
						style={"primary"}
						onClick={(e) => {
							createMeeting(e);
						}}
					/>
				</Grid>
			</Grid>
		</div>
	);
}

export default EventCreate;
