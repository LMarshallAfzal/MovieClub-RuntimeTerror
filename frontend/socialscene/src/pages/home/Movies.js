import React, { useState, useContext, useEffect } from "react";
import {
	Tooltip,
	IconButton,
	Box,
	Collapse,
	TextField,
	Grid,
	Typography,
	Rating,
	Stack,
	ListItem,
} from "@mui/material";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import { moviesWithPoster } from "../data/DummyMoviesData";
import SearchIcon from "@mui/icons-material/Search";
import CloseIcon from "@mui/icons-material/Close";
import "../../styling/pages/Movies.css";
import moviePoster from "../../styling/images/empty_movie_poster.png";
import AuthContext from "../../components/helper/AuthContext";
import FormButton from "../../components/FormButton";
import HomePageTitle from "../../components/HomePageTitle";
import TextButton from "../../components/TextButton";

const Movies = () => {
	let { user, authTokens } = useContext(AuthContext);
	const [movie, setMovie] = useState("");
	const [rating, setRating] = useState({
		user: user.user_id,
		movie: 0,
		score: null,
	});
	const [recommendedMovies, setRecommendedMovies] = useState([]);
	const [watchedMovies, setWatchedMovies] = useState([]);

	useEffect(() => {
		getRecommendedMovies();
		getWatchedMovies();
	}, []);

	let getWatchedMovies = async () => {
		let response = await fetch("http://127.0.0.1:8000/watched_list/", {
			method: "GET",
			headers: {
				"Content-Type": "application/json",
				Authorization: "Bearer " + authTokens.access,
			},
		});
		let data = await response.json();
		setWatchedMovies(data);
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

	let editRating = async (id) => {
		let response = await fetch(
			"http://127.0.0.1:8000/edit_rating/" + id + "/",
			{
				method: "PUT",
				body: JSON.stringify({
					user: user.user_id,
					movie: id,
					score: rating.score,
				}),
				headers: {
					"Content-type": "application/json; charset=UTF-8",
					Authorization: "Bearer " + String(authTokens.access),
				},
			}
		);
		let data = await response.json();
		if (response.status === 200) {
			setRating(data);
		} else {
			setRating({ user: user.user_id, movie: id, score: 0.0 });
			console.log(rating.score);
		}
	};

	let getRating = async (id) => {
		let response = await fetch("http://127.0.0.1:8000/get_rating/" + id + "/", {
			method: "GET",
			headers: {
				"Content-type": "application/json; charset=UTF-8",
				Authorization: "Bearer " + String(authTokens.access),
			},
		});
		let data = await response.json();
		if (response.status === 200) {
			setRating(data);
		} else if (response.status === 400) {
			setRating({ user: user.user_id, movie: id, score: 0.0 });
			console.log(rating.score);
		} else {
			setRating({ user: user.user_id, movie: id, score: 0.0 });
			console.log(rating.score);
		}
	};

	let getRecommendedMovies = async () => {
		let response = await fetch("http://127.0.0.1:8000/rec_movies/", {
			method: "GET",
			headers: {
				"Content-type": "application/json; charset=UTF-8",
				Authorization: "Bearer " + String(authTokens.access),
			},
		});
		// .catch(err => console.log(err))
		let data = await response.json();
		console.log(data);
		if (response.status === 200) {
			setRecommendedMovies(data);
		} else {
			alert("Something went wrong");
		}
	};

	let AddRating = async (id, ratingScore) => {
		let response1 = await fetch(
			"http://127.0.0.1:8000/add_rating/" + id + "/",
			{
				method: "POST",
				body: JSON.stringify({
					user: user.user_id,
					movie: id,
					score: ratingScore,
				}),
				headers: {
					"Content-Type": "application/json; charset=UTF-8",
					Authorization: "Bearer " + String(authTokens.access),
				},
			}
		);
		let data1 = await response1.json();
		setRating(data1);
		let response2 = await fetch("http://127.0.0.1:8000/train/movie/", {
			method: "GET",
			headers: {
				"Content-Type": "application/json; charset=UTF-8",
				Authorization: "Bearer " + String(authTokens.access),
			},
		});
		await response2.json();
		let response3 = await fetch("http://127.0.0.1:8000/train/meeting/", {
			method: "GET",
			headers: {
				"Content-Type": "application/json; charset=UTF-8",
				Authorization: "Bearer " + String(authTokens.access),
			},
		});
		await response3.json();
	};

	const [openSearch, setOpenSearch] = React.useState(false);

	const toggleSearch = () => {
		setOpenSearch(!openSearch);
	};

	const openSearchCollapse = () => {
		setOpenSearch(true);
	};

	const [searchValue, setSearchValue] = useState("");

	return (
		<>
			<HomePageTitle title={"movies"} />

			<Grid
				container
				justifyContent={"center"}
				alignItems={"flex-start"}
				spacing={2}
				padding={2}
			>
				<Grid item xs={12}>
					<TextField
						label={"search"}
						fullWidth
						value={searchValue}
						placeholder={"search for a movie"}
						onChange={(event) => {
							setSearchValue(event.target.value);
						}}
						InputProps={{
							endAdornment: (
								<TextButton
									text={openSearch ? "close" : "open"}
									onClick={toggleSearch}
								/>
							),
						}}
					/>
				</Grid>

				<Grid item xs={12}>
					<Collapse in={openSearch}>
						<div className={"home-page-card-background"}>
							<Grid container direction={"row"} padding={2} spacing={2}>
								<Grid item xs={12}>
									<h5 className={"home-page-card-title"}>search result</h5>
								</Grid>

								<Grid item xs={12}>
									<Grid
										container
										direction={"row"}
										spacing={2}
										alignItems={"center"}
									>
										{/* LIST OF ALL MOVIES */}
										{moviesWithPoster
											.filter((movie) => {
												if (
													movie.title
														.toLowerCase()
														.includes(searchValue.toLowerCase())
												) {
													return movie;
												}
											})
											.map((movie) => {
												return (
													<Grid item>
														<Card sx={{ width: 180 }}>
															<CardMedia
																component="img"
																image={moviePoster}
																alt={movie.title}
															/>

															<Stack paddingTop={1} alignItems={"center"}>
																<Rating
																	name="simple-controlled"
																	sx={{ fontSize: "1.2em" }}
																	precision={0.5}
																	max={5}
																// onChange={(event, newValue) => (this.setState({score: newValue, onChange: this.fetchAddRating(movie.id)}))}
																/>
															</Stack>

															<Stack
																spacing={1}
																padding={1}
																alignItems={"left"}
															>
																<Tooltip
																	title={movie.title}
																	placement="top-start"
																>
																	<Typography noWrap>{movie.title}</Typography>
																</Tooltip>

																<FormButton text={"watch"} />
															</Stack>
														</Card>
													</Grid>
												);
											})}
									</Grid>
								</Grid>
							</Grid>
						</div>
					</Collapse>
				</Grid>

				<Grid item xs={12}>
					<div className={"home-page-card-background"}>
						<Grid container direction={"row"} padding={2} spacing={2}>
							<Grid item xs={12}>
								<h5 className={"home-page-card-title"}>club movies</h5>
							</Grid>

							<Grid item xs={12}>
								<Stack direction={"row"} overflow={"auto"}>
									{moviesWithPoster.map((movie) => {
										return (
											<ListItem sx={{ p: 1 }}>
												<Card sx={{ width: 150 }}>
													<CardMedia
														component="img"
														sx={{ height: "100%" }}
														image={moviePoster}
														alt={movie.title}
													/>

													<Stack paddingTop={1} alignItems={"center"}>

														<Rating
															name="simple-controlled"
															sx={{ fontSize: "1.2em" }}
															precision={0.5}
															max={5}
														// onChange={(event, newValue) => (this.setState({score: newValue, onChange: this.fetchAddRating(movie.id)}))}
														/>
													</Stack>

													<Stack spacing={1} padding={1} alignItems={"left"}>


														<Tooltip title={movie.title} placement="top-start">
															<Typography noWrap>{movie.title}</Typography>
														</Tooltip>

														<Tooltip title={`From ${movie.club}`} placement="top-start">
															<Typography fontSize="10px" noWrap>{`From ${movie.club}`}</Typography>
														</Tooltip>

														<Tooltip title={`Due ${movie.deadline}`} placement="top-start">
															<Typography fontSize="10px" noWrap>{`Due ${movie.deadline}`}</Typography>
														</Tooltip>

														<FormButton text={"watch"} />
													</Stack>
												</Card>
											</ListItem>
										);
									})}
								</Stack>
							</Grid>
						</Grid>
					</div>
				</Grid>
				<Grid item xs={12}>
					<div className={"home-page-card-background"}>
						<Grid container direction={"row"} padding={2} spacing={2}>
							<Grid item xs={12}>
								<h5 className={"home-page-card-title"}>recommended</h5>
							</Grid>
							<Grid item xs={12}>
								<Stack direction={"row"} overflow={"auto"}>
									{recommendedMovies.map((movie) => {
										return (
											<ListItem sx={{ p: 1 }}>
												<Card sx={{ width: 150 }}>
													<CardMedia
														component="img"
														sx={{ height: "100%" }}
														image={moviePoster}
														alt={movie.title}
													/>

													<Stack paddingTop={1} alignItems={"center"}>

														<Rating
															name="simple-controlled"
															sx={{ fontSize: "1.2em" }}
															precision={0.5}
															max={5}
															onChange={(event, newValue) =>
																setRating({
																	score: newValue,
																	onChange: AddRating(movie.id, newValue),
																})
															}
														/>
													</Stack>

													<Stack spacing={1} padding={1} alignItems={"left"}>
														<Tooltip title={movie.title} placement="top-start">
															<Typography noWrap>{movie.title}</Typography>
														</Tooltip>
														<FormButton
															text={"watch"}
															onClick={() => {
																addToWatchedList(movie.id);
															}}
															onChange={() => {
																getRecommendedMovies();
															}}
														/>
													</Stack>
												</Card>
											</ListItem>
										);
									})}
								</Stack>
							</Grid>
						</Grid>
					</div>
				</Grid>
				<Grid item xs={12}>
					<div className={"home-page-card-background"}>
						<Grid container direction={"row"} padding={2} spacing={2}>
							<Grid item xs={12}>
								<h5 className={"home-page-card-title"}>watched</h5>
							</Grid>

							<Grid item xs={12}>
								<Stack direction={"row"} overflow={"auto"}>
									{watchedMovies.map((movie) => {
										return (
											<ListItem sx={{ p: 1 }}>
												<Card sx={{ width: 150 }}>
													<CardMedia
														component="img"
														sx={{ height: "100%" }}
														image={moviePoster}
														alt={movie.title}
													/>

													<Stack paddingTop={1} alignItems={"center"}>
														<Rating
															name="simple-controlled"
															sx={{ fontSize: "1.2em" }}
															precision={0.5}
															max={5}
														// onChange={(event, newValue) => (this.setState({score: newValue, onChange: this.fetchAddRating(movie.id)}))}
														/>
													</Stack>

													<Stack spacing={1} padding={1} alignItems={"left"}>
														<Tooltip title={movie.title} placement="top-start">
															<Typography noWrap>{movie.title}</Typography>
														</Tooltip>

														<FormButton text={"watch"} />
													</Stack>
												</Card>
											</ListItem>
										);
									})}
								</Stack>
							</Grid>
						</Grid>
					</div>
				</Grid>
			</Grid>
		</>
	);
};

export default Movies;
