import * as Yup from "yup";

export const loginValidationSchema = Yup.object({
	email: Yup.string().required("Email є обов'язковим полем"),
	password: Yup.string().required("Password is required"),
});
