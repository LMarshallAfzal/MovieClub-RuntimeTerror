import React, { createContext, useState, useEffect, useContext } from "react";
import useFetch from "./useFetch";
import { useNavigate } from "react-router-dom";
import AuthContext from "./AuthContext";


const UserContext = createContext();

export default UserContext;

export const UserProvider = ({ children }) => {
	let { user } = useContext(AuthContext)
	let api = useFetch;

	const [userData, setUserData] = useState("");
	const [myClubData, setMyClubData] = useState([]);

	const [usernameError, setUsernameError] = useState(false);
	const [firstNameError, setFirstNameError] = useState(false);
	const [lastNameError, setLastNameError] = useState(false);
	const [emailError, setEmailError] = useState(false);
	const [bioError, setBioError] = useState(false);
	const [preferencesError, setPreferencesError] = useState(false);

	const [errorUsernameText, setUsernameErrorText] = useState("");
	const [errorFirstNameText, setFirstNameErrorText] = useState("");
	const [errorLastNameText, setLastNameErrorText] = useState("");
	const [errorEmailText, setEmailErrorText] = useState("");
	const [errorBioText, setBioErrorText] = useState("");
	const [errorPreferencesText, setPreferencesErrorText] = useState("");

	const [membershipErrorText, setMembershipErrorText] = useState("");
	const [membershipError, setMembershipError] = useState(false);

	let resetErrorState = () => {
		setUsernameError(false);
		setFirstNameError(false);
		setLastNameError(false);
		setEmailError(false);
		setBioError(false);
		setPreferencesError(false);

		setUsernameErrorText("");
		setFirstNameErrorText("");
		setLastNameErrorText("");
		setEmailErrorText("");
		setBioErrorText("");
		setPreferencesErrorText("");
	};

	let errorHandler = (e, data) => {
		e.preventDefault();
		if (Object.keys(data).includes("username")) {
			setUsernameError(true);
			setUsernameErrorText(data.username);
		}
		if (Object.keys(data).includes("first_name")) {
			setFirstNameError(true);
			setFirstNameErrorText(data.first_name);
		}
		if (Object.keys(data).includes("last_name")) {
			setLastNameError(true);
			setLastNameErrorText(data.last_name);
		}
		if (Object.keys(data).includes("email")) {
			setEmailError(true);
			setEmailErrorText(data.email);
		}
		if (Object.keys(data).includes("bio")) {
			setPreferencesError(true);
			setBioErrorText(data.bio);
		}
		if (Object.keys(data).includes("preferences")) {
			setPreferencesError(true);
			setPreferencesErrorText(data.preferences);
		}
		if (Object.keys(data).includes(0)) {
			setMembershipError(true);
			setMembershipErrorText(data);
		}
	};

	let submitChangeProfileForm = async (e) => {
		e.preventDefault();
		resetErrorState();
		let { response, data } = await api(
			`/edit_profile/${user.user_id}/`,
			"PUT",
			{
				username: userData.username,
				first_name: userData.first_name,
				last_name: userData.last_name,
				email: userData.email,
				bio: userData.bio,
				preferences: userData.preferences,
			}
		);
		if (response.status === 200) {
			setUserData(data);
		} else {
			errorHandler(e, data);
		}
	};

	let getUserData = async () => {
		let { response, data } = await api("/user/", "GET");
		if (response.status === 200) {
			setUserData(data);
		}
	};

	// let getMembershipData = async () => {
	// 	let { response, data } = await api(
	// 		`/memberships/${user.user_id}/`,
	// 		"GET"
	// 	);
	// 	if (response.status === 200) {
	// 		setMyClubData(data);
	// 		console.log(myClubData)
	// 	} else {
	// 		errorHandler(data);
	// 	}
	// };

	// useEffect((e) => {
	// 	getMembershipData(e);
	// }, []);

	let contextData = {
		usernameError: usernameError,
		firstNameError: firstNameError,
		lastNameError: lastNameError,
		emailError: emailError,
		bioError: bioError,
		preferencesError: preferencesError,
		userData: userData,
		errorUsernameText: errorUsernameText,
		errorFirstNameText: errorFirstNameText,
		errorLastNameText: errorLastNameText,
		errorEmailText: errorEmailText,
		errorBioText: errorBioText,
		errorPreferencesText: errorPreferencesText,
		myClubData: myClubData,

		setUsernameError: setUsernameError,
		setFirstNameError: setFirstNameError,
		setLastNameError: setLastNameError,
		setEmailError: setEmailError,
		setBioError: setBioError,
		setPreferencesError: setPreferencesError,
		setUserData: setUserData,
		submitChangeProfileForm: submitChangeProfileForm,
		getUserData: getUserData,
		// getMembershipData: getMembershipData,
	};

	return (
		<UserContext.Provider value={contextData}>{children}</UserContext.Provider>
	);
};