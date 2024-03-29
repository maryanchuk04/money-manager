import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { routes } from "./pages";
const router = createBrowserRouter(routes);
import { ToastContainer } from "react-toastify";

function App() {
	return (
		<div className='w-full'>
			<RouterProvider router={router} />
			<ToastContainer />
		</div>
	);
}

export default App;
