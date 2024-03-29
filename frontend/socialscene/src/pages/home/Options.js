import React, { useContext, useState, useEffect } from "react";
import {
	Checkbox,
	FormControl,
	FormControlLabel,
	Grid,
	InputAdornment,
	InputLabel,
	OutlinedInput,
	Stack,
	Alert,
} from "@mui/material";
import CheckIcon from "@mui/icons-material/Check";
import "../../styling/pages/Options.css";
import AuthContext from "../../components/helper/AuthContext";
import ThemeButton from "../../components/core/ThemeButton";
import NotificationsNoneIcon from "@mui/icons-material/NotificationsNone";
import NotificationsActiveIcon from "@mui/icons-material/NotificationsActive";
import TextButton from "../../components/core/TextButton";
import useFetch from "../../components/helper/useFetch";

const Options = () => {
	const [passwordVisibility, togglePasswordVisibility] = useState(false);
    const [alert, setAlert] = useState(false);
	const [passwordData, setPasswordData] = useState({
		old_password: "",
		new_password: "",
		new_password_confirmation: "",
	});

	let api = useFetch();

	const [oldPasswordError, setOldPasswordError] = useState(false);
	const [newPasswordError, setNewPasswordError] = useState(false);
	const [newPasswordConfirmationError, setNewPasswordConfirmationError] =
		useState(false);
	const [errorOldPasswordText, setOldPasswordErrorText] = useState("");
	const [errorNewPasswordText, setNewPasswordErrorText] = useState("");
	const [
		errorNewPasswordConfirmationText,
		setNewPasswordConfirmationErrorText,
	] = useState("");

	const onChange = (e) => {
		setPasswordData((fieldData) => ({
			...fieldData,
			[e.target.name]: e.target.value,
		}));
	};

    useEffect(() => {
        setAlert(false);
    }, []);

	let resetErrorState = () => {
		setOldPasswordError(false);
		setNewPasswordError(false);
		setNewPasswordConfirmationError(false);

		setOldPasswordErrorText("");
		setNewPasswordErrorText("");
		setNewPasswordConfirmationErrorText("");
	};

	let errorHandler = (e, data) => {
		e.preventDefault();
		if (Object.keys(data).includes("old_password")) {
			setOldPasswordError(true);
			setOldPasswordErrorText(data.old_password);
		}
		if (Object.keys(data).includes("new_password")) {
			setNewPasswordError(true);
			setNewPasswordErrorText(data.new_password);
		}
		if (Object.keys(data).includes("new_password_confirmation")) {
			setNewPasswordConfirmationError(true);
			setNewPasswordConfirmationErrorText(data.new_password_cofirmation);
		}
		if (Object.keys(data).includes("non_field_errors")) {
			setNewPasswordError(true);
			setNewPasswordErrorText(data.non_field_errors);
			setNewPasswordConfirmationError(true);
			setNewPasswordConfirmationErrorText(data.non_field_errors);
		}
	};

	let submitChangePasswordForm = async (e) => {
		e.preventDefault();
		resetErrorState();
		let {data, response} = await api("/change_password/", "PUT", {
			old_password: passwordData.old_password,
			new_password: passwordData.new_password,
			new_password_confirmation: passwordData.new_password_confirmation,
		});
		if (response.status === 200) {
			setPasswordData(data);
			setAlert(true);
		} else {
			errorHandler(e, data);
		}
	};

	return (
		<Grid container direction={"row"} spacing={2} padding={2}>
			<Grid item xs={6}>
				<form
					onSubmit={submitChangePasswordForm}
					className={"home-page-card-background"}
				>
					<Grid container padding={2} spacing={2}>
						<Grid item xs={12}>
							<h5 className={"home-page-card-title"}>change password:</h5>
						</Grid>

						<Grid item xs={12}>
							<Stack spacing={2} height={"100%"}>
								{alert ? (
									<Alert
										icon={<CheckIcon fontSize="inherit" />}
										severity="success"
									>
										Successfully changed your your profile!
									</Alert>
								) : (
									<></>
								)}
								<FormControl fullWidth variant={"outlined"}>
									<InputLabel htmlFor={"outlined-adornment-password"}>
										current
									</InputLabel>
									<OutlinedInput
										error={oldPasswordError}
										fullWidth
										helperText={errorOldPasswordText}
										placeholder={"your current password"}
										required
										autoComplete="none"
										label={"current"}
										name={"old_password"}
										type={passwordVisibility ? "text" : "password"}
										value={passwordData.old_password}
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
								</FormControl>

								<FormControl fullWidth variant={"outlined"}>
									<InputLabel htmlFor={"outlined-adornment-password"}>
										new
									</InputLabel>
									<OutlinedInput
										error={newPasswordError}
										fullWidth
										helperText={errorNewPasswordText}
										placeholder={"choose a new password"}
										required
										autoComplete="new-password"
										label={"new"}
										name={"new_password"}
										type={passwordVisibility ? "text" : "password"}
										value={passwordData.password_confirmation}
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
								</FormControl>

								<FormControl fullWidth variant={"outlined"}>
									<InputLabel htmlFor={"outlined-adornment-password"}>
										confirm
									</InputLabel>
									<OutlinedInput
										error={newPasswordConfirmationError}
										fullWidth
										helperText={errorNewPasswordConfirmationText}
										required
										autoComplete="new-password"
										placeholder={"re-enter your new password"}
										label={"confirm"}
										name={"new_password_confirmation"}
										type={passwordVisibility ? "text" : "password"}
										value={passwordData.new_password_confirmation}
										onChange={(e) => onChange(e)}
										endAdornment={
											<InputAdornment position="end">
												<TextButton
													onClick={() =>
														togglePasswordVisibility(!passwordVisibility)
													}
													data-testid={"password-visibility"}
													text={passwordVisibility ? "hide" : "show"}
													style={{ marginTop: "-20px" }}
												/>
											</InputAdornment>
										}
									/>
								</FormControl>

								<ThemeButton
									text={"submit"}
									onClick={submitChangePasswordForm}
									type="submit"
									style={"primary"}
								/>
							</Stack>
						</Grid>
					</Grid>
				</form>
			</Grid>
		</Grid>
	);
};

export default Options;
