import { createContext, useState, useEffect, useContext } from "react";
import jwt_decode from "jwt-decode";
import useFetch from "../hooks/useFetch";
import { useNavigate } from "react-router-dom";
import AuthContext from "./AuthContext";
import { alignProperty } from "@mui/material/styles/cssUtils";
import EventContext from "./EventContext";

const MovieContext = createContext();

export default MovieContext;

export const MovieProvider = ({ children }) => {
	let { user } = useContext(AuthContext);
	let { trainMeetingRecommendation } = useContext(EventContext)
	let api = useFetch;

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
		let { response, data } = await api(`/watched_list/`, "GET");
		if (response.status === 200) {
			setWatchedMovies(data);
		}
	};

	let addToWatchedList = async (id) => {
		let { response, data } = await api(`/add_watched_movie/${id}`, "POST", {
			movie: id,
			user: user.user_id,
		});
	};

	let editRating = async (id) => {
		let { response, data } = await api(`/edit_rating/${id}`, "PUT", {
			user: user.user_id,
			movie: id,
			score: rating.score,
		});
		if (response.status === 200) {
			setRating(data);
		} else {
			setRating({ user: user.user_id, movie: id, score: 0.0 });
			console.log(rating.score);
		}
	};

	let getRating = async (id) => {
		let { response, data } = api(`/get_rating/${id}`, "GET");
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
		let { response, data } = api(`/rec_movies/`, "GET");
		if (response.status === 200) {
			setRecommendedMovies(data);
		} else {
			alert("Something went wrong");
		}
	};

	let trainMovieRecommendation = async () => {
		let { response, data } = api(`/train/movie/`, "GET");
	};

	let AddRating = async (id, ratingScore) => {
		let { response, data } = await api(`/add_rating/${id}`, "POST", {
			user: user.user_id,
			movie: id,
			score: ratingScore,
		});
		if (response.status === 200) {
			setRating(data);
		}
		trainMovieRecommendation();
		trainMeetingRecommendation();
	};

	

	let contextData = {
		movie: movie,
		rating: rating,
		recommendedMovies: recommendedMovies,
		watchedMovies: watchedMovies,

		setMovie: setMovie,
		setRating: setRating,
		setRecommendedMovies: setRecommendedMovies,
		setWatchedMovies: setWatchedMovies,
		getWatchedMovies: getWatchedMovies,
		addToWatchedList: addToWatchedList,
		getRating: getRating,
		editRating: editRating,
		getRecommendedMovies: getRecommendedMovies,
		AddRating: AddRating,
	};

	return (
		<MovieContext.Provider value={contextData}>
			{children}
		</MovieContext.Provider>
	);
};
