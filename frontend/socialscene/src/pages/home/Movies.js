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
import MovieContext from "../../components/helper/context/MovieContext";
import FormButton from "../../components/FormButton";
import HomePageTitle from "../../components/HomePageTitle";
import TextButton from "../../components/TextButton";

const Movies = () => {
	let {
		// movie,
		// rating,
		recommendedMovies,
		watchedMovies,
		// setMovie,
		setRating,
		//setRecommendedMovies,
		// setWatchedMovies,
		getWatchedMovies,
		addToWatchedList,
		// getRating,
		getRecommendedMovies,
		AddRating,
	} = useContext(MovieContext);
	const [openSearch, setOpenSearch] = React.useState(false);

	const toggleSearch = () => {
		setOpenSearch(!openSearch);
	};

	const openSearchCollapse = () => {
		setOpenSearch(true);
	};

	useEffect(() => {
		getRecommendedMovies();
		getWatchedMovies();
	}, []);

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

															<Stack
																spacing={1}
																padding={1}
																alignItems={"center"}
															>
																<Rating
																	name="simple-controlled"
																	sx={{ fontSize: "1.2em" }}
																	precision={0.5}
																	max={5}
																	// onChange={(event, newValue) => (this.setState({score: newValue, onChange: this.fetchAddRating(movie.id)}))}
																/>

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

													<Stack spacing={1} padding={1} alignItems={"center"}>
														<Rating
															name="simple-controlled"
															sx={{ fontSize: "1.2em" }}
															precision={0.5}
															max={5}
															// onChange={(event, newValue) => (this.setState({score: newValue, onChange: this.fetchAddRating(movie.id)}))}
														/>

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
													<Stack spacing={1} padding={1} alignItems={"center"}>
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

													<Stack spacing={1} padding={1} alignItems={"center"}>
														<Rating
															name="simple-controlled"
															sx={{ fontSize: "1.2em" }}
															precision={0.5}
															max={5}
															// onChange={(event, newValue) => (this.setState({score: newValue, onChange: this.fetchAddRating(movie.id)}))}
														/>

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
