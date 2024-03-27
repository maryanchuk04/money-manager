import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const showSuccessNotif = (message) => {
	showSuccess(message);
};

export const showErrorNotif = (message) => {
	showError(message);
};

const showSuccess = (message, autoClose = 4000) => {
	toast.success(message, { ...defaultToastOptions, autoClose });
};

const showError = (message, autoClose = 4000) => {
	toast.error(message, { ...defaultToastOptions, autoClose });
};

const defaultToastOptions = {
	position: "top-center",
	hideProgressBar: false,
	closeOnClick: true,
	pauseOnHover: true,
	draggable: true,
	progress: undefined,
	theme: "light",
};
