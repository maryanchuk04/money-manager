import { useState } from "react";
import InputWrapper from "../InputWrapper";
import Select from "../Select";
import Button from "../Button";
import uuid from "react-uuid";
import ButtonAdd from "../ButtonAdd";
import Popover from "../Popover";
import { useEffect } from "react";

function TrackerActions({ setRegisterTransactions }) {
	const [operation, setOperation] = useState({
		id: "",
		description: "",
		amount: "",
		type: "",
		tag: "",
		date: "",
	});
	const [tags, setTags] = useState([]);
	const [isOpenPopoverAddTag, setIsOpenPopoverAddTag] = useState(false);
	const [isOpenPopoverDeleteTag, setIsOpenPopoverDeleteTag] = useState(false);
	const [newTag, setNewTag] = useState("");
	const [deleteTagText, setDeleteTagText] = useState("");

	const setDescription = ({ target }) => {
		const { value } = target;
		setOperation((prevOperation) => ({
			...prevOperation,
			description: value,
		}));
	};

	const setAmount = ({ target }) => {
		const { value } = target;
		setOperation((prevOperation) => ({
			...prevOperation,
			amount: parseFloat(value) || 0,
		}));
	};

	const setDate = ({ target }) => {
		const { value } = target;
		setOperation((prevOperation) => ({
			...prevOperation,
			date: value,
		}));
	};

	const setType = ({ target }) => {
		const { value } = target;
		setOperation((prevOperation) => ({
			...prevOperation,
			type: value,
		}));
	};

	const setTag = ({ target }) => {
		const { value } = target;
		setOperation((prevOperation) => ({
			...prevOperation,
			tag: value,
		}));
	};

	const clearStateOperation = () => {
		setOperation({
			description: "",
			amount: "",
			type: "",
			tag: "",
			date: "",
		});
	};

	const addOperationsToRegister = (e) => {
		e.preventDefault();
		setRegisterTransactions((prev) => [
			...prev,
			{ ...operation, id: uuid() },
		]);
		clearStateOperation();
	};

	const handleSetNewTag = ({ target }) => {
		const { value } = target;
		setNewTag(value);
	};

	const handleSetDeleteTagText = ({ target }) => {
		const { value } = target;
		setDeleteTagText(value);
	};

	const togglePopoverAddTag = () => {
		setIsOpenPopoverAddTag(!isOpenPopoverAddTag);
		setNewTag("");
		setIsOpenPopoverDeleteTag(false);
	};
	const togglePopoverDeleteTag = () => {
		setIsOpenPopoverDeleteTag(!isOpenPopoverDeleteTag);
		setDeleteTagText("");
		setIsOpenPopoverAddTag(false);
	};

	const addTad = () => {
		if (newTag.trim()) setTags([...tags, newTag.trim()]);
		togglePopoverAddTag();
		setNewTag("");
	};

	const deleteTag = () => {
		if (deleteTagText.trim())
			setTags(tags.filter((item) => item !== deleteTagText.trim()));
		togglePopoverDeleteTag();
		setNewTag("");
	};
	const cancelClick = () => {
		clearStateOperation();
	};

	useEffect(() => {
		if (localStorage.getItem("tags"))
			setTags(JSON.parse(localStorage.getItem("tags")));
	}, []);

	useEffect(() => {
		if (tags.length > 0) localStorage.setItem("tags", JSON.stringify(tags));
	}, [tags]);

	return (
		<div className='w-full flex flex-col mt-5 cursor-pointer'>
			<form
				onSubmit={addOperationsToRegister}
				className='w-11/12 mx-auto bg-backgroundForm rounded-t-xl h-full flex mt-2'>
				<div className='w-10/12 mx-auto flex flex-col'>
					<div className='mt-4'>
						<InputWrapper
							labelValue='Опис'
							inputName='description'
							value={operation.description}
							onChange={setDescription}
						/>
					</div>
					<div className='mt-4'>
						<InputWrapper
							labelValue='Кількість'
							inputName='amount'
							value={operation.amount}
							onChange={setAmount}
							required
						/>
					</div>
					<div className='mt-4'>
						<InputWrapper
							labelValue='Дата'
							inputName='date'
							value={operation.date}
							onChange={setDate}
							type='date'
							required
						/>
					</div>
					<Select
						options={["Надходження", "Витрата"]}
						placeholder='Виберіть тип'
						onChange={setType}
						selected={operation.type}
						required={true}
					/>
					<div className='flex items-center w-full justify-between'>
						<div className='w-9/12'>
							<Select
								options={tags}
								placeholder='Виберіть тег'
								onChange={setTag}
								selected={operation.tag}
								required={true}
							/>
						</div>
						<div className='mb-0 ml-4 relative flex items-center h-fit w-fit mt-auto'>
							<ButtonAdd
								onClick={togglePopoverAddTag}
								className='!h-10 !w-10 !mb-0 hover:bg-formItemsBackground'
							/>
							{isOpenPopoverAddTag && (
								<Popover>
									<div className='w-11/12 m-auto flex-col'>
										<InputWrapper
											labelValue='Новий тег:'
											inputName='new-tag'
											onChange={handleSetNewTag}
											value={newTag}
										/>
										<div className='flex mt-2 gap-4 justify-evenly'>
											<Button
												onClick={togglePopoverAddTag}
												className='!text-base !border-2 !py-0 w-10 border-textColor flex items-center justify-center'>
												<i className='fa-solid fa-xmark'></i>
											</Button>
											<Button
												onClick={addTad}
												className='!text-base !border-2 !py-0 px-1 w-10  border-textColor flex items-center justify-center'>
												<i className='fa-solid fa-check'></i>
											</Button>
										</div>
									</div>
								</Popover>
							)}
						</div>
						<div className='relative ml-4 mx-auto mt-auto mb-0'>
							<button
								type='button'
								onClick={togglePopoverDeleteTag}
								className='rounded-full h-10 w-10 flex items-center justify-center text-textColor text-2xl bg-[#704E71] hover:bg-formItemsBackground border-none outline-none cursor-pointer'>
								<i className='text-sm fa-solid fa-trash-can'></i>
							</button>
							{isOpenPopoverDeleteTag && (
								<Popover>
									<div className='w-11/12 m-auto flex-col'>
										<InputWrapper
											labelValue='Видалити тег:'
											inputName='delete-tag'
											onChange={handleSetDeleteTagText}
											value={deleteTagText}
										/>
										<div className='flex mt-2 gap-4 justify-evenly'>
											<Button
												onClick={togglePopoverDeleteTag}
												className='!text-base !border-2 !py-0 w-10 border-textColor flex items-center justify-center'>
												<i className='fa-solid fa-xmark'></i>
											</Button>
											<Button
												onClick={deleteTag}
												className='!text-base !border-2 !py-0 px-1 w-10 border-textColor flex items-center justify-center'>
												<i className='fa-solid fa-check'></i>
											</Button>
										</div>
									</div>
								</Popover>
							)}
						</div>
					</div>
					<div className='mb-2 mt-5 flex mx-auto gap-5'>
						<Button onClick={cancelClick}>Відмінити</Button>
						<Button type='submit'>Підтвердити</Button>
					</div>
				</div>
			</form>
		</div>
	);
}

export default TrackerActions;
