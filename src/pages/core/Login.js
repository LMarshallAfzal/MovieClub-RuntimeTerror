import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../../styling/pages/Login.css";
import HeadingCircle from "../../components/HeadingCircle";
import {
	FormControl,
	Grid,
	InputAdornment,
	InputLabel,
	OutlinedInput,
	Stack,
	TextField,
} from "@mui/material";
import ThemeButton from "../../components/core/ThemeButton";
import CsrfToken from "../../components/helper/CsrfToken";
import AuthContext from "../../components/helper/AuthContext";
import TextButton from "../../components/core/TextButton";

export function Login() {
	const [passwordVisibility, togglePasswordVisibility] = useState(false);

	let {
		loginUser,
		loginCredentials,
		setLoginCredentials,
		usernameError,
		passwordError,
		errorUsernameText,
		errorPasswordText,
	} = useContext(AuthContext);

	const { username, password } = loginCredentials;

	// useEffect(() => {
	//     loginUser()
	// }, [])

	const onChange = (e) => {
		setLoginCredentials((fieldData) => ({
			...fieldData,
			[e.target.name]: e.target.value,
		}));
	};

	return (
		<Grid container direction={"row"} className={"login-grid"} spacing={2}>
			<CsrfToken />

			<Grid item xs={6} width={1}>
				<HeadingCircle title={"log in"} data-testid="login-circle" />
			</Grid>

			<Grid item xs={6}>
				<form onSubmit={loginUser} className={"login-form"}>
					<Stack
						sx={{ width: "60%" }}
						className={"login-form-stack"}
						spacing={2}
					>
						<TextField
							data-testid="username-field"
							error={usernameError}
							helperText={errorUsernameText}
							fullWidth
							required
							id={"outlined-required"}
							label={"username"}
							name={"username"}
							type={"text"}
							value={username}
							onChange={(e) => onChange(e)}
						/>

						<FormControl fullWidth variant={"outlined"}>
							<InputLabel htmlFor={"outlined-adornment-password"}>
								password
							</InputLabel>
							<OutlinedInput
								error={passwordError}
								fullWidth
								helperText={errorPasswordText}
								required
								autoComplete="current-password"
								id={"outlined-adornment-password"}
								label={"password"}
								name={"password"}
								data-testid="password-field"
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
											style={{ marginTop: "-20px" }}
										/>
									</InputAdornment>
								}
							/>
						</FormControl>

						<div style={{ width: "100%" }}>
							<Grid container direction={"row"} spacing={2}>
								<Grid item xs={4}>
									<ThemeButton
										type="submit"
										text={"log in"}
										onClick={loginUser}
										style={"primary"}
									/>
								</Grid>

								<Grid item xs={8}>
									<ThemeButton type="submit" text={"forgot password"} />
								</Grid>
							</Grid>
						</div>
					</Stack>
				</form>
			</Grid>
		</Grid>
	);
}

export default Login;
