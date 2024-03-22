import { useState } from "react";
import { formatNumber } from "../../../../helpers/number";
import Amount from "../../../Amount";
import { TransactionType } from "../../../../utils/enumTransactions";
import Transaction from "../Transaction";

function GroupTransaction({ group, deleteTransactions }) {
	const [isAccordion, setIsAccordion] = useState(false);

	function calculateTotalAmount(items) {
		return items.reduce(
			(total, item) => total + parseFloat(item.amount),
			0
		);
	}

	const toggleAccordion = () => {
		setIsAccordion(!isAccordion);
	};

	return (
		<div className='flex flex-col'>
			<div className='flex flex-col'>
				<div className=''>
					<div className='flex justify-between'>
						<span className='font-bold  text-xl'>{group.tag}</span>
						<Amount
							sign={
								group.type === TransactionType.EXPENCE
									? "-"
									: group.type === TransactionType.INCOME &&
									  "+"
							}
							className='!text-xl'>
							{formatNumber(calculateTotalAmount(group.items))}
						</Amount>
					</div>
					<div className='flex justify-between'>
						<span className='text-md font-light'>
							{group.items.length} транзакції
						</span>
						<button
							onClick={toggleAccordion}
							className='border-none outline-none text-mg bg-transparent text-textColor'>
							Всі транзакції
							{!isAccordion ? (
								<i className='ml-3 fa-solid fa-chevron-down'></i>
							) : (
								<i className='ml-3 fa-solid fa-chevron-up'></i>
							)}
						</button>
					</div>
				</div>
				{isAccordion && (
					<div className='flex flex-col'>
						{group.items.map((transaction, index) => (
							<Transaction
								sign={
									group.type === TransactionType.EXPENCE
										? "-"
										: group.type ===
												TransactionType.INCOME && "+"
								}
								deleteTransactions={deleteTransactions}
								transaction={transaction}
								key={index}
							/>
						))}
					</div>
				)}
			</div>
			<div className='h-[1px] my-3 rounded-md w-full bg-transaprent'></div>
		</div>
	);
}

export default GroupTransaction;
