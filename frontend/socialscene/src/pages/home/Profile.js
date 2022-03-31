import React, { useContext, useState, useEffect } from "react";
import "../../styling/pages/Profile.css";
import { Box, Stack, TextField, Button, Grid } from "@mui/material";
import FormButton from "../../components/FormButton";
import AuthContext from "../../components/helper/context/AuthContext";
import UserContext from "../../components/helper/context/UserContext";
import useFetch from "../../components/helper/hooks/useFetch";
import { optionUnstyledClasses } from "@mui/base";
import HomePageTitle from "../../components/HomePageTitle";

const Profile = () => {
	const {
		usernameError,
		firstNameError,
		lastNameError,
		emailError,
		bioError,
		preferencesError,
		errorUsernameText,
		errorFirstNameText,
		errorLastNameText,
		errorEmailText,
		errorBioText,
		errorPreferencesText,
		userData,
		setUserData,
		submitChangeProfileForm,
		getUserData,
	} = useContext(UserContext);

	const onChange = (e) => {
		setUserData((prevData) => ({
			...prevData,
			[e.target.name]: e.target.value,
		}));
	};

	useEffect(() => {
		getUserData();
	}, []);

	return (
		<>
			<HomePageTitle title={"profile"} />
			<Grid container direction={"row"} spacing={2} padding={2}>
				<Grid item xs={12}>
					<form onSubmit={submitChangeProfileForm}>
						<Stack spacing={2}>
							<TextField
								error={usernameError}
								helperText={errorUsernameText}
								required
								id={"outlined"}
								label={"username"}
								name={"username"}
								variant={"outlined"}
								value={userData.username}
								InputLabelProps={{
									shrink: true,
								}}
								onChange={(e) => onChange(e)}
							/>
							<TextField
								error={firstNameError}
								helperText={errorFirstNameText}
								required
								id={"outlined-basic"}
								label={"first name"}
								name={"first_name"}
								type={"text"}
								variant={"outlined"}
								value={userData.first_name}
								InputLabelProps={{
									shrink: true,
								}}
								onChange={(e) => onChange(e)}
							/>
							<TextField
								error={lastNameError}
								helperText={errorLastNameText}
								required
								id={"outlined-basic"}
								label={"last name"}
								name={"last_name"}
								type={"text"}
								variant={"outlined"}
								value={userData.last_name}
								InputLabelProps={{
									shrink: true,
								}}
								onChange={(e) => onChange(e)}
							/>
							<TextField
								error={emailError}
								helperText={errorEmailText}
								required
								id={"outlined-basic"}
								label={"email"}
								name={"email"}
								type={"email"}
								variant={"outlined"}
								value={userData.email}
								InputLabelProps={{
									shrink: true,
								}}
								onChange={(e) => onChange(e)}
							/>
							<TextField
								error={bioError}
								helperText={errorBioText}
								id={"outlined-multiline-static"}
								label={"bio"}
								name={"bio"}
								multiline
								rows={7.5}
								value={userData.bio}
								InputLabelProps={{
									shrink: true,
								}}
								onChange={(e) => onChange(e)}
							/>
							<TextField
								error={preferencesError}
								helperText={errorPreferencesText}
								required
								id={"outlined-multiline-static"}
								label={"preferences"}
								name={"preferences"}
								multiline
								rows={20}
								value={userData.preferences}
								InputLabelProps={{
									shrink: true,
								}}
								onChange={(e) => onChange(e)}
							/>
							<FormButton text={"save"} type={"submit"} style={"primary"} />
						</Stack>
					</form>
				</Grid>
			</Grid>
		</>
	);
};

export default Profile;
