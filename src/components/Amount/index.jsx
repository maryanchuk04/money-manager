function Amount({ children, className, sign = "" }) {
	return (
		<div className={`font-bold text-2xl text-textColor ${className}`}>
			{sign}₴{children}
		</div>
	);
}

export default Amount;
