import { useState } from "react";
import { ErrorMessage, Field, Form, Formik } from "formik";
import InputWrapper from "../../components/InputWrapper";
import Button from "../../components/Button";
import { apiClient } from "../../app/apiClient";
import { useNavigate } from "react-router-dom";
import { encrypt } from "../../utils/encryption";
import { loginValidationSchema } from "../../validations/login.schema";
import { showErrorNotif } from "../../utils/notify";
import { Link } from "react-router-dom";

function SignIn() {
	const [isLoading, setIsLoading] = useState(false);
	const navigate = useNavigate();
	const initialValues = {
		email: "",
		password: "",
	};

	const signIn = async (values) => {
		try {
			setIsLoading(true);
			const response = await apiClient.post("auth/login", values);

			const { data } = response;
			const encryptedId = encrypt(data.id);
			localStorage.setItem("userId", JSON.stringify({ id: encryptedId }));
			navigate("/");
		} catch (error) {
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
				validationSchema={loginValidationSchema}
				onSubmit={signIn}>
				{(formik) => (
					<Form className='w-5/12 h-3/6 m-auto p-2 flex flex-col bg-backgroundForm rounded-xl'>
						<div className='w-10/12 m-auto flex flex-col h-[90%] justify-between'>
							<h2 className='text-3xl text-center text-textColor'>
								З поверненням
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

							<Button
								isLoading={isLoading}
								type='submit'
								//isDisabled={!formik.isValid}>
							>
								Підтвердити
							</Button>
							<Link
								to='/sign-up'
								className='w-full text-center text-[#A48BA6] hover:text-textColor font-light'>
								В мене немає акаунту
							</Link>
						</div>
					</Form>
				)}
			</Formik>
		</div>
	);
}

export default SignIn;
