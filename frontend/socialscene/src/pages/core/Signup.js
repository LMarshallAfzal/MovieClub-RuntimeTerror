import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../../styling/pages/Signup.css";
import HeadingCircle from "../../components/HeadingCircle";
import {
	Autocomplete,
	Grid,
	Stack,
	TextField,
	InputAdornment,
	OutlinedInput,
	FormControl,
	InputLabel,
	FormHelperText,
} from "@mui/material";
import ThemeButton from "../../components/core/ThemeButton";
import CsrfToken from "../../components/helper/CsrfToken";
import { themes } from "../../resources/data/MovieThemes";
import TextButton from "../../components/core/TextButton";
import useFetch from "../../components/helper/useFetch";

export const Signup = () => {
	const [passwordVisibility, togglePasswordVisibility] = useState(false);
	const navigate = useNavigate();
	let api = useFetch();
	let [signupCredentials, setSignupCredentials] = useState({
		username: "",
		first_name: "",
		last_name: "",
		email: "",
		bio: "",
		preferences: "",
		password: "",
		password_confirmation: "",
	});

	const {
		username,
		first_name,
		last_name,
		email,
		bio,
		preferences,
		password,
		password_confirmation,
	} = signupCredentials;

	const [usernameError, setUsernameError] = useState(false);
	const [firstNameError, setFirstNameError] = useState(false);
	const [lastNameError, setLastNameError] = useState(false);
	const [emailError, setEmailError] = useState(false);
	const [bioError, setBioError] = useState(false);
	const [preferencesError, setPreferencesError] = useState(false);
	const [passwordError, setPasswordError] = useState(false);
	const [passwordConfirmationError, setPasswordConfirmationError] =
		useState(false);
	const [errorUsernameText, setUsernameErrorText] = useState("");
	const [errorFirstNameText, setFirstNameErrorText] = useState("");
	const [errorLastNameText, setLastNameErrorText] = useState("");
	const [errorEmailText, setEmailErrorText] = useState("");
	const [errorBioText, setBioErrorText] = useState("");
	const [errorPreferencesText, setPreferencesErrorText] = useState("");
	const [errorPasswordText, setPasswordErrorText] = useState("");
	const [errorPasswordConfirmationText, setPasswordConfirmationErrorText] =
		useState("");

	const onChange = (e) => {
		setSignupCredentials((fieldData) => ({
			...fieldData,
			[e.target.name]: e.target.value,
		}));
	};

	const handleChange = (event, value) => {
		let array = [];
		value.map((val) => {
			array.push(val.theme);
		});
		setSignupCredentials((fieldData) => ({
			...fieldData,
			preferences: array,
		}));
	};

	let resetErrorState = () => {
		setUsernameError(false);
		setFirstNameError(false);
		setLastNameError(false);
		setEmailError(false);
		setBioError(false);
		setPreferencesError(false);
		setPasswordError(false);
		setPasswordConfirmationError(false);
		setUsernameErrorText("");
		setFirstNameErrorText("");
		setLastNameErrorText("");
		setEmailErrorText("");
		setBioErrorText("");
		setPreferencesErrorText("");
		setPasswordErrorText("");
		setPasswordConfirmationErrorText("");
	};

	let errorHandler = (e, data) => {
		e.preventDefault();
		if (Object.keys(data).includes("username")) {
			setUsernameError(true);
			setUsernameErrorText("Error:" + data.username);
		}
		if (Object.keys(data).includes("first_name")) {
			setFirstNameError(true);
			setFirstNameErrorText("Error:" + data.first_name);
		}
		if (Object.keys(data).includes("last_name")) {
			setLastNameError(true);
			setLastNameErrorText("Error:" + data.last_name);
		}
		if (Object.keys(data).includes("email")) {
			setEmailError(true);
			setEmailErrorText("Error:" + data.email);
		}
		if (Object.keys(data).includes("bio")) {
			setPreferencesError(true);
			setBioErrorText("Error:" + data.bio);
		}
		if (Object.keys(data).includes("preferences")) {
			setPreferencesError(true);
			setPreferencesErrorText("Error:" + data.preferences);
		}
		if (Object.keys(data).includes("password")) {
			setPasswordError(true);
			setPasswordErrorText("Error:" + data.password);
		}
		if (Object.keys(data).includes("password_confirmation")) {
			setPasswordConfirmationError(true);
			setPasswordConfirmationErrorText("Error:" + data.password_confirmation);
		}
	};

	let submitSignupForm = async (e) => {
		e.preventDefault();
		resetErrorState();
		let response = await fetch("http://127.0.0.1:8000/sign_up/", {
			method: "POST",
			body: JSON.stringify({
				username: signupCredentials.username,
				first_name: signupCredentials.first_name,
				last_name: signupCredentials.last_name,
				email: signupCredentials.email,
				bio: signupCredentials.bio,
				preferences: signupCredentials.preferences,
				password: signupCredentials.password,
				password_confirmation: signupCredentials.password_confirmation,
			}),
			headers: {
				"Content-Type": "application/json",
			},
		});
		let data = await response.json();
		if (response.status === 201) {
			navigate("/login/");
		} else {
			errorHandler(e, data);
		}
	};

	return (
		<Grid container direction={"row"} className={"signup-grid"} spacing={2}>
			<CsrfToken />

			<Grid item xs={6} width={1}>
				<HeadingCircle title={"sign up"} data-testid="signup-circle" />
			</Grid>

			<Grid item xs={6}>
				<form onSubmit={submitSignupForm} className={"signup-form"}>
					<Stack
						sx={{ width: "60%" }}
						className={"signup-form-stack"}
						spacing={2}
					>
						<TextField
							inputProps={{ "data-testid": "username" }}
							error={usernameError}
							fullWidth
							required
							placeholder={"choose a username"}
							helperText={errorUsernameText}
							id={"outlined-required"}
							label={"username"}
							name={"username"}
							type={"text"}
							value={username}
							onChange={(e) => onChange(e)}
						/>
						<TextField
							inputProps={{ "data-testid": "first_name" }}
							error={firstNameError}
							fullWidth
							required
							placeholder={"your first name"}
							helperText={errorFirstNameText}
							id={"outlined-required"}
							label={"first name"}
							name={"first_name"}
							type={"text"}
							value={first_name}
							onChange={(e) => onChange(e)}
						/>
						<TextField
							inputProps={{ "data-testid": "last_name" }}
							error={lastNameError}
							fullWidth
							required
							placeholder={"your last name"}
							helperText={errorLastNameText}
							id={"outlined-required"}
							label={"last name"}
							name={"last_name"}
							type={"text"}
							value={last_name}
							onChange={(e) => onChange(e)}
						/>
						<TextField
							inputProps={{ "data-testid": "email" }}
							error={emailError}
							fullWidth
							required
							placeholder={"example@socialscene.co.uk"}
							helperText={errorEmailText}
							id={"outlined-required"}
							label={"email"}
							name={"email"}
							type={"email"}
							value={email}
							onChange={(e) => onChange(e)}
						/>
						<TextField
							inputProps={{ "data-testid": "bio" }}
							error={bioError}
							fullWidth
							helperText={errorBioText}
							id={"outlined-basic"}
							placeholder={"short personal description"}
							label={"bio"}
							name={"bio"}
							type={"text"}
							multiline
							rows={6}
							value={bio}
							onChange={(e) => onChange(e)}
						/>

						<Autocomplete
							multiple
							required
							data-testid="autocomplete"
							id="tags-standard"
							options={themes}
							getOptionLabel={(option) => option.theme}
							filterSelectedOptions
							className={"signup-form-row"}
							onChange={handleChange}
							fullWidth
							renderInput={(params) => (
								<TextField
									{...params}
									inputProps={{
										...params.inputProps,
										"data-testid": "preferences",
									}}
									error={preferencesError}
									fullWidth
									helperText={errorPreferencesText}
									id={"outlined-required"}
									placeholder={"select your favourite themes"}
									label={"preferences"}
									name={"preferences"}
									type={"text"}
								/>
							)}
						/>
						<FormControl fullWidth variant={"outlined"}>
							<InputLabel htmlFor={"outlined-adornment-password"}>
								password
							</InputLabel>
							<OutlinedInput
								inputProps={{ "data-testid": "password" }}
								error={passwordError}
								fullWidth
								required
								autoComplete="new-password"
								id={"outlined-adornment-password"}
								label={"password"}
								name={"password"}
								type={passwordVisibility ? "text" : "password"}
								value={password}
								onChange={(e) => onChange(e)}
								endAdornment={
									<InputAdornment position="end">
										<TextButton
											onClick={() =>
												togglePasswordVisibility(!passwordVisibility)
											}
											text={passwordVisibility ? "hide" : "show"}
											type={"button"}
											style={{ marginTop: "-20px" }}
										/>
									</InputAdornment>
								}
							/>
							{passwordError ? (
								<FormHelperText error>
									{errorPasswordText}
								</FormHelperText>
							) : null}
						</FormControl>
						<FormControl fullWidth variant={"outlined"}>
							<InputLabel htmlFor={"outlined-adornment-password"}>
								confirm
							</InputLabel>
							<OutlinedInput
								inputProps={{ "data-testid": "password_confirmation" }}
								error={passwordError}
								fullWidth
								helperText={errorPasswordText}
								required
								autoComplete="new-password"
								id={"outlined-adornment-password"}
								label={"confirm"}
								name={"password_confirmation"}
								type={passwordVisibility ? "text" : "password"}
								value={password_confirmation}
								onChange={(e) => onChange(e)}
								endAdornment={
									<InputAdornment position="end">
										<TextButton
											onClick={() =>
												togglePasswordVisibility(!passwordVisibility)
											}
											text={passwordVisibility ? "hide" : "show"}
											style={{ marginTop: "-20px" }}
										/>
									</InputAdornment>
								}
							/>
							{passwordError ? (
								<FormHelperText error>
									{errorPasswordText}
								</FormHelperText>
							) : null}
						</FormControl>

						<div style={{ width: "100%" }}>
							<ThemeButton style={"primary"} type="submit" text={"sign up"} />
						</div>
					</Stack>
				</form>
			</Grid>
		</Grid>
	);
};

export default Signup;
