function Tab({ children, onClick, className }) {
	return (
		<button
			onClick={onClick}
			className={`w-1/2 border-0 sm:text-xl outline-none text-[#4C3A4C]  border-[#4C3A4C] hover:text-textColor hover:border-textColor text-2xl text-center border-b-2  pb-2  ${className}`}>
			{children}
		</button>
	);
}

export default Tab;
