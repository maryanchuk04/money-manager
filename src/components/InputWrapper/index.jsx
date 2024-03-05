function InputWrapper({
	value = "",
	inputName = "",
	labelValue,
	placeholder = "",
	onChange,
	required = false,
}) {
	return (
		<div className='flex flex-col mt-4'>
			<label
				className='text-[#A48BA6] mb-2 font-light text-sm'
				htmlFor={inputName}>
				{labelValue}
			</label>
			<input
				className='border-0 outline-none border-textColor border-b-2 bg-transparent text-textColor text-xl'
				type='text'
				id={inputName}
				value={value}
				placeholder={placeholder}
				onChange={onChange}
				name={inputName}
				required={required}
			/>
		</div>
	);
}

export default InputWrapper;
