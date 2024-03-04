import Label from "../Label";
import Amount from "../Amount";
import { formatNumber } from "../../helpers/number";

function Info() {
	return (
		<div className='w-full h-60 bg-[#704E71] rounded-xl flex'>
			<div className='h-4/6 w-10/12 m-auto flex flex-col'>
				<div className='h-3/6 w-full flex flex-col'>
					<Label className='!text-xl'>Баланс</Label>
					<Amount className='!text-4xl'>{formatNumber(10000)}</Amount>
				</div>
				<div className='h-3/6 w-full flex'>
					<div className='flex flex-col justify-end'>
						<Label>Доходи</Label>
						<Amount sign='+'>{formatNumber(10000)}</Amount>
					</div>
					<div className='ml-8 flex flex-col justify-end'>
						<Label>Витрати</Label>
						<Amount sign='-'>{formatNumber(10000)}</Amount>
					</div>
				</div>
			</div>
		</div>
	);
}

export default Info;
