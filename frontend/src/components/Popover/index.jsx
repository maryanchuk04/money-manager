import { useRef, useEffect } from "react";

function Popover({ children, handleClose }) {
	const componentRef = useRef(null);

	const handleClickOutside = (event) => {
		if (
			componentRef.current &&
			!componentRef.current.contains(event.target)
		) {
			handleClose();
		}
	};

	useEffect(() => {
		document.addEventListener("click", handleClickOutside);
		return () => {
			document.removeEventListener("click", handleClickOutside);
		};
	}, []);

	return (
		<div
			ref={componentRef}
			className='absolute w-40 h-32 bg-formItemsBackground transform -translate-x-1/2 left-1/2 border-2 border-textColor bottom-[65px] right-0 rounded-md'>
			{children}
			<div className='w-0 h-0 -bottom-5 left-1/2 transform flex -translate-x-1/2 border-l-[15px] border-l-transparent border-t-[25px] items-center border-t-formItemsBackground border-r-[15px] border-r-transparent absolute'></div>
		</div>
	);
}

export default Popover;
