import { ClipLoader } from "react-spinners";

function SpinnerWrapper() {
	return (
		<div className='w-full h-[100vh] flex items-center justify-center'>
			<ClipLoader color='#F3F7F7' size={80} className='m-auto' />
		</div>
	);
}

export default SpinnerWrapper;
