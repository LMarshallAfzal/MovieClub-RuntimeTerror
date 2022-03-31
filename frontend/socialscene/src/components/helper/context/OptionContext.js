import { createContext, useState, useEffect, useContext } from "react";
import useFetch from "../hooks/useFetch";

const OptionContext = createContext();

export default OptionContext;

export const OptionProvider = ({ children }) => {
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
		let { response, data } = await api("/change_password/", "PUT", {
			old_password: passwordData.old_password,
			new_password: passwordData.new_password,
			new_password_confirmation: passwordData.new_password_confirmation,
		});
		if (response.status === 200) {
			setPasswordData(data);
			alert("You have successfully changed you password");
		} else {
			errorHandler(e, data);
		}
	};

	let contextData = {
		passwordData: passwordData,
		setPasswordData: setPasswordData,
		oldPasswordError: oldPasswordError,
		newPasswordError: newPasswordError,
		newPasswordConfirmationError: newPasswordConfirmationError,
		errorOldPasswordText: errorOldPasswordText,
		errorNewPasswordText: errorNewPasswordText,
		errorNewPasswordConfirmationText: errorNewPasswordConfirmationText,
		submitChangePasswordForm: submitChangePasswordForm,
	};

	return (
		<OptionContext.Provider value={contextData}>
			{children}
		</OptionContext.Provider>
	);
};
