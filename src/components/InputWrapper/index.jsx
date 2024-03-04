function InputWrapper({ value = "", inputName = "", labelValue }) {
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
				name={inputName}
			/>
		</div>
	);
}

export default InputWrapper;
