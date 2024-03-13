import React, { useState } from "react";

const CustomSelector = ({ options, onSelect }) => {
	const [selectedOption, setSelectedOption] = useState(null);

	const handleOptionSelect = (option) => {
		setSelectedOption(option);
		onSelect(option);
	};

	return (
		<div className='h-10 rounded-xl text-textColor mt-6 text text-xl bg-formItemsBackground px-2'>
			<ul>
				{options.map((option) => (
					<li
						key={option.value}
						onClick={() => handleOptionSelect(option)}
						className={option === selectedOption ? "selected" : ""}>
						{option.label}
					</li>
				))}
			</ul>
		</div>
	);
};

export default CustomSelector;
