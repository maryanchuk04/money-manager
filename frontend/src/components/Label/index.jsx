function Label({ children, className }) {
	return (
		<span
			className={`uppercase text-md md:text-xs xs:text-xs font-light text-textColor ${className}`}>
			{children}
		</span>
	);
}

export default Label;
