import Label from "../Label";
import Amount from "../Amount";
import { formatNumber } from "../../helpers/number";
import { TransactionType } from "../../utils/enumTransactions";
import { currentMonth, currentYear } from "../../utils/monthYear";

function Info({ registerTransactions }) {
	const calculateBalance = () => {
		return registerTransactions.reduce((total, transaction) => {
			const amount = parseFloat(transaction.amount) || 0;
			return transaction.type === TransactionType.EXPENCE
				? total - amount
				: total + amount;
		}, 0);
	};

	const calculateIncome = () => {
		return registerTransactions.reduce((total, transaction) => {
			const amount = parseFloat(transaction.amount) || 0;
			return transaction.type === TransactionType.INCOME
				? total + amount
				: total;
		}, 0);
	};

	const calculateExpenses = () => {
		return registerTransactions.reduce((total, transaction) => {
			const amount = parseFloat(transaction.amount) || 0;
			return transaction.type === TransactionType.EXPENCE
				? total + amount
				: total;
		}, 0);
	};

	const balance = calculateBalance();
	const income = calculateIncome();
	const expenses = calculateExpenses();

	return (
		<div className='w-full h-60 xs:h-36 md:h-44 bg-[#704E71] rounded-xl flex'>
			<div className='h-4/6 w-10/12 m-auto flex flex-col'>
				<div className='h-3/6 w-full flex justify-between xs:mb-3'>
					<div className='flex flex-col '>
						<Label className='!text-xl xs:!text-base md:!text-base'>
							Баланс
						</Label>
						<Amount className='!text-4xl xs:!text-xl md:!text-2xl'>
							{formatNumber(balance)}
						</Amount>
					</div>
				</div>
				<div className='h-3/6 w-full flex'>
					<div className='flex flex-col justify-end'>
						<Label>Доходи</Label>
						<Amount sign='+'>{formatNumber(income)}</Amount>
					</div>
					<div className='ml-8 flex flex-col justify-end'>
						<Label>Витрати</Label>
						<Amount sign='-'>{formatNumber(expenses)}</Amount>
					</div>
				</div>
			</div>
		</div>
	);
}

export default Info;
