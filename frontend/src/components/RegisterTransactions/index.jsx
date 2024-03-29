import React, { useState, useEffect } from "react";
import ButtonAdd from "../ButtonAdd";
import Transaction from "./components/Transaction";
import { formatUkrainianDateTime } from "../../helpers/date";

function RegisterTransactions({
	transactions,
	actionButtonClick,
	deleteTransactions,
}) {
	const [transactionsByDay, setTransactionsByDay] = useState({});

	useEffect(() => {
		const sortedTransactions = [...transactions].sort(
			(a, b) => new Date(b.date) - new Date(a.date)
		);

		const groupedTransactions = {};

		sortedTransactions.forEach((transaction) => {
			const date = new Date(transaction.date);
			const day = date.getDate();
			const month = date.toLocaleString("default", { month: "long" });
			const year = date.getFullYear();
			const formattedDate = `${day} ${month} ${year}`;

			if (!groupedTransactions[formattedDate]) {
				groupedTransactions[formattedDate] = [];
			}

			groupedTransactions[formattedDate].push(transaction);
		});

		setTransactionsByDay(groupedTransactions);
	}, [transactions]);

	return (
		<div className='flex flex-col'>
			<div className='h-80 w-full overflow-y-auto text-textColor flex'>
				<div className='h-fit flex-col mx-auto w-11/12 mt-3 flex pt-5'>
					{Object.keys(transactionsByDay).map((date) => (
						<div key={date} className=''>
							<div className='w-full'>
								<p className='text-lg text-center italic'>
									{date}
								</p>
							</div>
							{transactionsByDay[date].map((transaction) => (
								<Transaction
									transaction={transaction}
									key={transaction.id}
									deleteTransactions={deleteTransactions}
								/>
							))}
						</div>
					))}
				</div>
			</div>
			<ButtonAdd onClick={actionButtonClick} />
		</div>
	);
}

export default RegisterTransactions;
