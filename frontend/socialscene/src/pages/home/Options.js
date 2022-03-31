import React, { useEffect, useState, useContext } from "react";
import { Box, Grid, Stack, TextField } from "@mui/material";
import "../../styling/pages/Options.css";
import FormButton from "../../components/FormButton";
import HomePageTitle from "../../components/HomePageTitle";
import OptionContext from "../../components/helper/context/OptionContext";

const Options = () => {
	let {
		passwordData,
		setPasswordData,
		oldPasswordError,
		newPasswordError,
		newPasswordConfirmationError,
		errorOldPasswordText,
		errorNewPasswordText,
		errorNewPasswordConfirmationText,
		submitChangePasswordForm,
	} = useContext(OptionContext);

	const onChange = (e) => {
		setPasswordData((fieldData) => ({
			...fieldData,
			[e.target.name]: e.target.value,
		}));
	};
	return (
		<>
			<HomePageTitle title={"options"} />

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
									<TextField
										error={oldPasswordError}
										helperText={errorOldPasswordText}
										required
										fullWidth
										id={"outlined-basic"}
										label={"current"}
										name={"old_password"}
										type={"password"}
										variant={"outlined"}
										value={passwordData.old_password}
										onChange={(e) => onChange(e)}
									/>

									<TextField
										error={newPasswordError}
										helperText={errorNewPasswordText}
										required
										fullWidth
										id={"outlined-basic"}
										label={"new"}
										name={"new_password"}
										type={"password"}
										variant={"outlined"}
										value={passwordData.password_confirmation}
										onChange={(e) => onChange(e)}
									/>

									<TextField
										error={newPasswordConfirmationError}
										helperText={errorNewPasswordConfirmationText}
										required
										fullWidth
										id={"outlined-basic"}
										label={"confirm"}
										name={"new_password_confirmation"}
										type={"password"}
										variant={"outlined"}
										value={passwordData.new_password_confirmation}
										onChange={(e) => onChange(e)}
									/>

									<FormButton
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

				<Grid item xs={6}>
					<div className={"home-page-card-background"}>
						<Grid container direction={"row"} padding={2}>
							<Grid item xs={11}>
								<h5 className={"home-page-card-title"}>notifications</h5>
							</Grid>
						</Grid>
					</div>
				</Grid>
			</Grid>
		</>
	);
};

export default Options;
