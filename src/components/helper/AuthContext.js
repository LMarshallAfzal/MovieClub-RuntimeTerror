import React,{createContext, useState, useEffect, useContext } from "react";
import jwt_decode from "jwt-decode";
import { useNavigate } from "react-router-dom";

const AuthContext = createContext();

export default AuthContext;

export const AuthProvider = ({ children }) => {
	let [authTokens, setAuthTokens] = useState(
		localStorage.getItem("authTokens")
			? JSON.parse(localStorage.getItem("authTokens"))
			: null
	);
	let [user, setUser] = useState(() =>
		localStorage.getItem("authTokens")
			? jwt_decode(localStorage.getItem("authTokens"))
			: null
	);
	let [loading, setLoading] = useState(true);
	let [loginCredentials, setLoginCredentials] = useState({
		username: "",
		password: "",
	});
	const navigate = useNavigate();
	const baseUrl = "https://social-scene.herokuapp.com";

	const [usernameError, setUsernameError] = useState(false);
	const [passwordError, setPasswordError] = useState(false);
	const [errorUsernameText, setUsernameErrorText] = useState("");
	const [errorPasswordText, setPasswordErrorText] = useState("");

	let resetErrorState = () => {
		setUsernameError(false);
		setPasswordError(false);
	};

	let errorHandler = (e, data) => {
		e.preventDefault();
		if (Object.keys(data).includes("username")) {
			setUsernameError(true);
			setUsernameErrorText(data.username);
		}
		if (Object.keys(data).includes("password")) {
			setPasswordError(true);
			setPasswordErrorText(data.password);
		}
		if (Object.keys(data).includes("detail")) {
			setUsernameError(true);
			setUsernameErrorText(data.detail);
			setPasswordError(true);
			setPasswordErrorText(data.detail);
		}
	};
	

	let loginUser = async (e) => {
		e.preventDefault();
		resetErrorState();
		console.log("Form submitted", e);
		let response = await fetch(`${baseUrl}/token/`, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({
				username: loginCredentials.username,
				password: loginCredentials.password,
			}),
		});
		let data = await response.json();
		if (response.status === 200) {
			setAuthTokens(data);
			setUser(jwt_decode(data.access));
			localStorage.setItem("authTokens", JSON.stringify(data));
			navigate("/home/");
		} else {
			errorHandler(e, data);
		}
	};

	let logoutUser = () => {
		setAuthTokens(null);
		setUser(null);
		localStorage.removeItem("authTokens");
		navigate("/logout");
	};

	let updateToken = async () => {
		let response = await fetch(`${baseUrl}/token/refresh/`, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({ refresh: authTokens.refresh }),
		});

		let data = await response.json();

		if (response.status === 200) {
			setAuthTokens(data);
			setUser(jwt_decode(data.access));
			localStorage.setItem("authTokens", JSON.stringify(data));
		} else {
			logoutUser();
		}

		if (loading) {
			setLoading(false);
		}
	};

	let contextData = {
		user: user,
		authTokens: authTokens,
		loginCredentials: loginCredentials,
		usernameError: usernameError,
		passwordError: passwordError,
		errorUsernameText: errorUsernameText,
		errorPasswordText: errorPasswordText,
		setLoginCredentials: setLoginCredentials,
		loginUser: loginUser,
		logoutUser: logoutUser,
	};

	useEffect(() => {
		if (loading) {
			updateToken();
		}

		let fourMinutes = 1000 * 60 * 4;

		let interval = setInterval(() => {
			if (authTokens) {
				updateToken();
			}
		}, fourMinutes);
		return () => clearInterval(interval);
	}, [authTokens, loading]);

	return (
		<AuthContext.Provider value={contextData}>{children}</AuthContext.Provider>
	);
};
