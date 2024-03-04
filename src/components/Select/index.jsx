import Option from "./components/Option";
function Select({ options = [], placeholder = "" }) {
	return (
		<select
			name=''
			id=''
			className='h-10 rounded-xl text-textColor mt-8 text text-xl bg-formItemsBackground px-2'>
			<option hidden>{placeholder}</option>
			{options?.map((option, index) => (
				<Option key={index}>{option}</Option>
			))}
		</select>
	);
}

export default Select;
