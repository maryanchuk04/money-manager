import { useState } from "react";
import { ErrorMessage, Field, Form, Formik } from "formik";
import InputWrapper from "../../components/InputWrapper";
import Button from "../../components/Button";
import { registrationValidationSchema } from "../../validations/registration.schema";
import { apiClient } from "../../app/apiClient";
import { useNavigate } from "react-router-dom";
import { encrypt } from "../../utils/encryption";
import { showSuccessNotif, showErrorNotif } from "../../utils/notify";
import { Link } from "react-router-dom";

function SignUp() {
	const [isLoading, setIsLoading] = useState(false);
	const navigate = useNavigate();
	const initialValues = {
		email: "",
		password: "",
		confirmPassword: "",
		name: "",
	};

	const signIn = async (values) => {
		const { email, password, name } = values;
		try {
			setIsLoading(true);
			const response = await apiClient.post("users/signup", {
				email: email,
				password: password,
				name: name,
			});

			navigate("/");

			const { data } = response;
			const encryptedId = encrypt(data.id);
			localStorage.setItem("userId", JSON.stringify({ id: encryptedId }));
		} catch (error) {
			// Handle error
			const { data } = error.response;

			showErrorNotif(data.message);
		} finally {
			setIsLoading(false);
		}
	};

	return (
		<div className='h-[100vh] w-full flex bg-background'>
			<Formik
				initialValues={initialValues}
				validationSchema={registrationValidationSchema}
				onSubmit={signIn}>
				{(formik) => (
					<Form className='w-5/12 h-4/6 m-auto p-2 flex flex-col bg-backgroundForm rounded-xl'>
						<div className='w-10/12 m-auto flex flex-col h-[90%] justify-between'>
							<h2 className='text-3xl text-center text-textColor'>
								Ласкаво просимо
							</h2>
							<div>
								<Field
									type='text'
									inputName='email'
									name='email'
									labelValue='Введіть email'
									as={InputWrapper}
								/>
								<ErrorMessage
									className='text-red-600 text-xs'
									name='email'
									component='span'
								/>
							</div>
							<div className='my-3'>
								<Field
									type='text'
									inputName='name'
									name='name'
									labelValue='Введіть ім`я'
									as={InputWrapper}
								/>
								<ErrorMessage
									className='text-red-600 text-xs'
									name='name'
									component='span'
								/>
							</div>
							<div className='my-3'>
								<Field
									type='password'
									inputName='password'
									name='password'
									labelValue='Введіть пароль'
									as={InputWrapper}
								/>
								<ErrorMessage
									className='text-red-600 mb-2 text-xs'
									name='password'
									component='span'
								/>
							</div>
							<div className='my-3'>
								<Field
									type='password'
									inputName='confirmPassword'
									name='confirmPassword'
									labelValue='Повторіть пароль'
									as={InputWrapper}
								/>
								<ErrorMessage
									className='text-red-600 text-xs'
									name='confirmPassword'
									component='span'
								/>
							</div>
							<Button
								isLoading={isLoading}
								type='submit'
								//isDisabled={!formik.isValid}>
							>
								Підтвердити
							</Button>
							<Link
								to='/sign-in'
								className='w-full text-center text-[#A48BA6] hover:text-textColor font-light'>
								В мене вже є акаунт
							</Link>
						</div>
					</Form>
				)}
			</Formik>
		</div>
	);
}

export default SignUp;
