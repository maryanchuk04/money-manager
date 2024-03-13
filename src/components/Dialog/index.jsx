import { useEffect, useRef } from "react";
import { createPortal } from "react-dom";

const portalRoot = document.getElementById("portal-root") || document.body;

export default function Dialog({ children, className = "", handleClose }) {
	const elRef = useRef(document.createElement("div"));

	useEffect(() => {
		portalRoot.appendChild(elRef.current);

		return () => {
			portalRoot.removeChild(elRef.current);
		};
	}, []);

	return createPortal(
		<div
			onClick={handleClose}
			className='w-screen bg-black/70 z-50 h-full md:h-full fixed top-0 left-0 flex'>
			<div
				onClick={(e) => e.stopPropagation()}
				className={`rounded-md relative m-auto z-50 border-[1px] border-textColor bg-[#0d0d0d] bg- p-5 w-fit h-fit flex ${className}`}>
				{children}
			</div>
		</div>,
		elRef.current
	);
}
