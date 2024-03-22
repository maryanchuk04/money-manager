function Option({ children, value }) {
	return (
		<option value={value}>
			{children}
			<button className='border-none outline-none text-mg bg-transparent text-textColor'>
				<i class='fa-solid fa-trash-can'></i>
			</button>
		</option>
	);
}

export default Option;
