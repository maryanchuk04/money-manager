function Button({
	children,
	type = "button",
	className = "",
	onClick,
	isLoading = false,
	isDisabled = false,
}) {
	return (
		<button
			type={type}
			disabled={isDisabled}
			onClick={onClick}
			className={`bg-formItemsBackground rounded-xl xs:text-sm border-0 disabled:cursor-not-allowed outline-none text-textColor px-3 py-1 h-10 text-xl cursor-pointer hover:bg-[#150C16] ${className}`}>
			{isLoading ? "Обробка..." : children}
		</button>
	);
}

export default Button;
