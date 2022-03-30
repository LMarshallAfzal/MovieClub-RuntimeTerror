import React, { useState, useContext, useEffect } from "react";
import {
	Card,
	CardActionArea,
	CardHeader,
	CardMedia,
	Grid,
	Rating,
	Stack,
	TextField,
	Tooltip,
	Typography,
} from "@mui/material";
import { useParams } from "react-router";
import "../styling/components/NewEventForm.css";
import { dummyRecommendedMovies } from "../pages/data/DummyRecommendedMovies";
import FormButton from "./FormButton";
import moviePoster from "../styling/images/empty_movie_poster.png";
import AuthContext from "./helper/AuthContext";

function NewEvent() {
	let day = new Date();
	let nextDay = new Date(day);
	let tomorrow = nextDay.setDate(day.getDate() + 2);
	let { user, authTokens } = useContext(AuthContext);

	const [recommendedMovies, setRecommendedMovies] = useState([]);
	const [selectedMovie, setSelectedMovie] = useState("");
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

    const {club, movie, organiser, meeting_title, date, start_time, end_time, description, meeting_link} = meetingData;

	let { clubID } = useParams();

    const onChange = (e) => {
        setMeetingData(fieldData => ({...fieldData, [e.target.name]: e.target.value}));
    };

	let trainMeetingRecommendation = async () => {
		let response = await fetch("http://127.0.0.1:8000/train/meeting/", {
			method: "GET",
			headers: {
				"Content-Type": "application/json; charset=UTF-8",
				Authorization: "Bearer " + String(authTokens.access),
			},
		});
		await response.json();
	};

	let getRecommendedMovies = async () => {
		trainMeetingRecommendation();
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
		setRecommendedMovies(data);
	};

    let createMeeting = async (e) => {
        e.preventDefault();
        let response = await fetch("http://127.0.0.1:8000/create_meeting/" + clubID + "/", {
            method: "POST",
            body: JSON.stringify({
                "club": clubID,
                "movie": selectedMovie,
                "organiser": user.user_id,
                "meeting_title": meetingData.meeting_title,
                "date": meetingData.date,
                "start_time": meetingData.start_time,
                "end_time": meetingData.end_time,
                "description": meetingData.description,
                "meeting_link": "placeholder link",
            }),
            headers: {
                "Content-type": "application/json; charset=UTF-8",
                Authorization: "Bearer " + String(authTokens.access),
            },
        });
        let data = await response.json();
        setMeetingData(data);
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
										<CardActionArea
											sx={{ flexDirection: "column", height: "100%" }}
											onClick={() => setSelectedMovie(movie.id)}
										>
											<CardMedia
												component={"img"}
												alt={movie.title}
												image={moviePoster}
											/>

											<Grid
												container
												direction={"column"}
												alignItems={"center"}
												textAlign={"center"}
											>
												<Rating
													readOnly
													sx={{ fontSize: "1.2em" }}
													name={"read-only"}
													value={movie.rating}
												/>

												<Tooltip title={movie.title} placement="top-start">
													<h6 className={"new-event-movie-text"}>
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
							id={"outlined"}
							label={"title:"}
                            name={"meeting_title"}
							placeholder={"event title"}
                            value={meeting_title}
                            onChange={e => onChange(e)}

						/>
						<TextField
							id={"outlined"}
							label={"description:"}
                            name={"description"}
							placeholder={"short event description"}
                            value={description}
                            onChange={e => onChange(e)}
						/>
						<TextField
							disabled
							id="outlined-disabled"
							label="movie:"
                            name={"movie"}
							value={selectedMovie}
                            onChange={e => onChange(e)}
						/>
					</Stack>
				</Grid>
				<Grid item xs={6}>
					<Stack spacing={2}>
						<TextField
							id="date"
							label="date:"
                            name={"date"}
							type="date"
							defaultValue={tomorrow}
                            value={date}
                            onChange={e => onChange(e)}
							fullWidth
							InputLabelProps={{
								shrink: true,
							}}
						/>
						<TextField
							id="time"
							label="start:"
                            name={"start_time"}
							type="time"
							defaultValue="17:00"
                            value={start_time}
                            onChange={e => onChange(e)}
							InputLabelProps={{
								shrink: true,
							}}
							inputProps={{ step: 300 }}
							fullWidth
						/>
						<TextField
							id="time"
							label="end:"
                            name={"end_time"}
							type="time"
							defaultValue="18:00"
                            value={end_time}
                            onChange={e => onChange(e)}
							InputLabelProps={{
								shrink: true,
							}}
							inputProps={{ step: 300 }}
							fullWidth
						/>
					</Stack>
				</Grid>
				<Grid item xs={12}>
					<FormButton 
                        text={"create"} 
                        style={"primary"}
                        onClick={(e) => {createMeeting(e)}} 
                    />
				</Grid>
			</Grid>
		</div>
	);
}

export default NewEvent;
