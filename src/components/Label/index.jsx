function Label({ children, className }) {
	return (
		<span
			className={`uppercase text-md font-light text-textColor ${className}`}>
			{children}
		</span>
	);
}

export default Label;
