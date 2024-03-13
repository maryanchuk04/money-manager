function ButtonAdd({ onClick, className }) {
	return (
		<button
			type='button'
			onClick={onClick}
			className={`rounded-full h-20 w-20 mx-auto text-textColor text-2xl bg-[#704E71] hover:bg-[#503851] border-none outline-none cursor-pointer mb-3 mt-auto ${className}`}>
			+
		</button>
	);
}

export default ButtonAdd;
