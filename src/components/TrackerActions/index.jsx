import InputWrapper from "../InputWrapper";
import Select from "../Select";
import Button from "../Button";

function TrackerActions() {
	return (
		<div className='w-full flex flex-col mt-5 cursor-pointer'>
			<form className='w-11/12 mx-auto bg-[#472D48] rounded-t-xl h-96 flex mt-12'>
				<div className='w-10/12 mx-auto flex flex-col'>
					<InputWrapper labelValue='Опис' inputName='description' />
					<InputWrapper labelValue='Кількість' inputName='amount' />
					<Select
						options={["Надходження", "Витрата"]}
						placeholder='Виберіть тип'
					/>
					<Select
						options={["Зарплата", "Їжа"]}
						placeholder='Виберіть тег'
					/>
					<div className='mt-5 flex mx-auto gap-5'>
						<Button>Відмінити</Button>
						<Button>Підтвердити</Button>
					</div>
				</div>
			</form>
		</div>
	);
}

export default TrackerActions;
