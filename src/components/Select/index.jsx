import { useState, useEffect } from "react";
import Option from "./components/Option";

function Select({
	options = [],
	placeholder = "",
	required = false,
	selected,
	onChange,
}) {
	const [value, setValue] = useState(selected);

	useEffect(() => {
		setValue(selected);
	}, [selected]);

	return (
		<select
			name=''
			classNamePrefix='rounded-md'
			id=''
			onChange={(e) => {
				setValue(e.target.value);
				onChange(e);
			}}
			className='h-10 w-full rounded-xl text-textColor mt-6 text text-xl bg-formItemsBackground px-2'
			required={required}
			value={value}>
			<option className='none' hidden value=''>
				{placeholder}
			</option>
			{options?.map((option, index) => (
				<Option key={index} value={option}>
					{option}
				</Option>
			))}
		</select>
	);
}

export default Select;
