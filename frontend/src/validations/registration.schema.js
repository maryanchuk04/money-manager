import * as Yup from "yup";

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export const registrationValidationSchema = Yup.object({
	email: Yup.string()
		.matches(emailRegex, "Введіть дійсну email адресу")
		.required("Email є обов'язковим полем"),
	name: Yup.string().required("Ім'я є обов'язковим полем"),
	password: Yup.string()
		.required("Password is required")
		.min(5, "Your password is too short.")
		.matches(/[a-zA-Z]/, "Password can only contain Latin letters."),
	confirmPassword: Yup.string()
		.required("Password is required")
		.oneOf([Yup.ref("password")], "Passwords must match"),
});
