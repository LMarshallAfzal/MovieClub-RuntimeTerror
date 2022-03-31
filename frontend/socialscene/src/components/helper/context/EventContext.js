import { createContext, useState, useEffect, useContext } from "react";
import jwt_decode from "jwt-decode";
import useFetch from "../hooks/useFetch";
import { useNavigate } from "react-router-dom";
import AuthContext from "./AuthContext";

const EventContext = createContext();

export default EventContext;

export const EventProvider = ({ children }) => {
	let { user } = useContext(AuthContext);
	let day = new Date();
	let nextDay = new Date(day);
	let tomorrow = nextDay.setDate(day.getDate() + 2);
	let api = useFetch();

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

	let trainMeetingRecommendation = async () => {
		let { response, data } = await api(`/train/meeting/`, "GET");
	};

	let getRecommendedMovies = async (clubId) => {
		trainMeetingRecommendation();
		let { response, data } = await api(`/rec_meeting/${clubId}`, "GET");
		if (response === 200) {
			setRecommendedMovies(data);
		}
	};

	let createMeeting = async (e, clubId) => {
		e.preventDefault();
		let { response, data } = await api(`/create_meeting/${clubId}/`, "POST", {
			club: clubId,
			movie: selectedMovie,
			organiser: user.user_id,
			meeting_title: meetingData.meeting_title,
			date: meetingData.date,
			start_time: meetingData.start_time,
			end_time: meetingData.end_time,
			description: meetingData.description,
			meeting_link: "placeholder link",
		});
		if (response.status === 200) {
			setMeetingData(data);
		}
	};

	let contextData = {
		recommendedMovies: recommendedMovies,
		selectedMovie: selectedMovie,
		meetingData: meetingData,
		tomorrow: tomorrow,

		setSelectedMovie: setSelectedMovie,
		setMeetingData: setMeetingData,
		getRecommendedMovies: getRecommendedMovies,
		createMeeting: createMeeting,
		trainMeetingRecommendation: trainMeetingRecommendation,
	};

	return (
		<EventContext.Provider value={contextData}>
			{children}
		</EventContext.Provider>
	);
};
