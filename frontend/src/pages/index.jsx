import MainPage from "./MainPage";
import SignUp from "./SignUp";
import SignIn from "./SignIn";

export const routes = [
	{
		path: "/",
		element: <MainPage />,
	},
	{
		path: "sign-up",
		element: <SignUp />,
	},
	{
		path: "sign-in",
		element: <SignIn />,
	},
];
