function Button({ children, type = "button", className = "", onClick }) {
	return (
		<button
			type={type}
			onClick={onClick}
			className={`bg-formItemsBackground rounded-xl border-none outline-none text-textColor px-3 py-1 h-10 text-xl cursor-pointer hover:bg-[#150C16] ${className}`}>
			{children}
		</button>
	);
}

export default Button;
