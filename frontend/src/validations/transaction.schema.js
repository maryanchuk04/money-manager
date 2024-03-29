import * as Yup from "yup";

export const transactionValidationSchema = Yup.object({
	amount: Yup.mixed()
		.test("is-number", "Поле може містити тільки цифри", (value) =>
			/^\d+(\.\d+)?$/.test(value)
		)
		.required("Поле обов'язкове для заповнення"),
	description: Yup.string().required("Поле обов'язкове для заповнення"),
	date: Yup.string().required("Поле обов'язкове для заповнення"),
});
