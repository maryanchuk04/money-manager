import React, { useState, useEffect } from "react";
import ButtonAdd from "../ButtonAdd";
import GroupTransaction from "./components/GroupTransaction";

function RegisterTransactions({
	registerTransactions,
	actionButtonClick,
	deleteTransactions,
}) {
	const [groupedTransactions, setGroupedTransactions] = useState([]);

	useEffect(() => {
		const grouped = registerTransactions.reduce((result, transaction) => {
			const { tag, type, ...rest } = transaction;

			const existingGroup = result.find(
				(group) => group.tag === tag && group.type === type
			);

			if (existingGroup) {
				existingGroup.items.push(rest);
			} else {
				result.push({ tag, type, items: [rest] });
			}

			return result;
		}, []);

		setGroupedTransactions(grouped);
	}, [registerTransactions]);

	return (
		<div className='flex flex-col'>
			<div className='h-80 w-full overflow-y-auto text-textColor flex'>
				<div className='h-fit flex-col mx-auto w-11/12 mt-3 flex pt-5'>
					{groupedTransactions.map((group, groupIndex) => (
						<GroupTransaction
							group={group}
							key={groupIndex}
							deleteTransactions={deleteTransactions}
						/>
					))}
				</div>
			</div>
			<ButtonAdd onClick={actionButtonClick} />
		</div>
	);
}

export default RegisterTransactions;
