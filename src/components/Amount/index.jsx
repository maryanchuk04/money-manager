function Amount({ children, className = "", sign = "" }) {
	return (
		<div
			className={`font-bold text-2xl md:text-lg xs:text-base text-textColor ${className}`}>
			{sign}₴{children}
		</div>
	);
}

export default Amount;
