import ButtonAdd from "../ButtonAdd";
import Amount from "../Amount";
import { formatNumber } from "../../helpers/number";
function RegisterTransactions() {
	return (
		<div className='flex flex-col'>
			<div className='h-80 w-full overflow-y-auto text-textColor flex'>
				<div className='h-fit flex-col mx-auto w-11/12 mt-3 flex'>
					<div className=''>
						<div className='flex justify-between'>
							<span className='font-bold  text-xl'>
								Їжа та напої
							</span>
							<Amount sign='-' className='!text-xl'>
								{formatNumber(2130)}
							</Amount>
						</div>
						<span className='text-md font-light'>
							23 транзакції
						</span>
					</div>
				</div>
			</div>
			<ButtonAdd />
		</div>
	);
}

export default RegisterTransactions;
