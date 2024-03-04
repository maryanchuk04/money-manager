function Button({ children, type = "button" }) {
	return (
		<button
			type={type}
			className='bg-formItemsBackground rounded-xl border-none outline-none text-textColor px-3 py-1 h-10 text-xl cursor-pointer hover:bg-[#150C16]'>
			{children}
		</button>
	);
}

export default Button;
