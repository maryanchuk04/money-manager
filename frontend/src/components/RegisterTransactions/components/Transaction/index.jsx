import Amount from "../../../Amount";
import { formatUkrainianDateTime } from "../../../../helpers/date";

function Transaction({ transaction, deleteTransactions }) {
	return (
		<div className='flex flex-col mt-3'>
			<div className='flex flex-col w-full'>
				<div className='flex justify-between'>
					<span>
						{transaction.description
							? transaction.description
							: "Без опису"}
					</span>
					<button
						onClick={() => {
							deleteTransactions(transaction._id);
						}}
						className='border-none outline-none text-mg bg-transparent text-textColor'>
						<i className='fa-solid fa-trash-can'></i>
					</button>
				</div>
				<div className='flex w-full justify-between'>
					<Amount
						className='!text-sm'
						sign={
							transaction.type === "Надходження"
								? "+"
								: transaction.type === "Витрата" && "-"
						}>
						{transaction.amount}
					</Amount>
					{/* <span className='text-textColor text-sm italic'>
						{formatUkrainianDateTime(transaction.date)}
					</span> */}
				</div>
			</div>
			<div className='h-[1px] my-3 rounded-md w-full bg-[#4C3A4C]'></div>
		</div>
	);
}

export default Transaction;
