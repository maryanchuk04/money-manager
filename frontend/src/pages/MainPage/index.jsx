import { useState, useEffect } from "react";
import Info from "../../components/Info";
import TrackerActions from "../../components/TrackerActions";
import RegisterTransactions from "../../components/RegisterTransactions";
import Tab from "../../components/Tab";
import Dialog from "../../components/Dialog";
import InputWrapper from "../../components/InputWrapper";
import Button from "../../components/Button";
import { useNavigate } from "react-router-dom";

function MainPage() {
	const [tab, setTab] = useState("actions");
	const [name, setName] = useState("");
	const [editName, setEditName] = useState("");
	const [isOpenDialog, setIsOpenDialog] = useState(false);
	const [registerTransactions, setRegisterTransactions] = useState([]);
	const navigate = useNavigate();
	const actionButtonClick = () => {
		setTab("actions");
	};

	const registerButtonClick = () => {
		setTab("register");
	};

	const deleteTransactions = (id) => {
		setRegisterTransactions(
			registerTransactions.filter((item) => item.id !== id)
		);
	};

	useEffect(() => {
		if (!localStorage.getItem("userId")) {
			navigate("/sign-up");
		}
	}, []);

	const renderContentTabs = () => {
		switch (tab) {
			case "actions":
				return (
					<TrackerActions
						setRegisterTransactions={setRegisterTransactions}
					/>
				);
			case "register":
				return (
					<RegisterTransactions
						registerTransactions={registerTransactions}
						actionButtonClick={actionButtonClick}
						deleteTransactions={deleteTransactions}
					/>
				);

			default:
				return <></>;
		}
	};

	const changeName = ({ target }) => {
		const { value } = target;
		setEditName(value);
	};

	const editButtonClick = () => {
		setIsOpenDialog(true);
	};

	const closeDialog = () => {
		setIsOpenDialog(false);
	};

	const submitName = () => {
		localStorage.setItem("email", JSON.stringify(editName));
		setName(editName);
		setIsOpenDialog(false);
	};

	useEffect(() => {
		if (localStorage.getItem("email")) {
			setIsOpenDialog(false);
			setName(JSON.parse(localStorage.getItem("email")));
			setEditName(JSON.parse(localStorage.getItem("email")));
		} else {
			setIsOpenDialog(true);
		}
		if (localStorage.getItem("data")) {
			setRegisterTransactions(JSON.parse(localStorage.getItem("data")));
		}
		document.body.style.height = `${window.innerHeight}px`;
	}, []);

	useEffect(() => {
		if (registerTransactions.length > 0)
			localStorage.setItem("data", JSON.stringify(registerTransactions));
	}, [registerTransactions]);

	const logOut = () => {
		localStorage.removeItem("userId");
		navigate("/sign-in");
	};

	return (
		<div className='md:min-h-dvh 3xl:min-h-dvh md:max-h-fit 3xl:max-h-fit w-full bg-background'>
			{isOpenDialog && (
				<Dialog>
					<form
						onSubmit={submitName}
						className='w-72 h-32 flex flex-col'
						action=''>
						<InputWrapper
							labelValue="Ім'я"
							placeholder="Введіть ваше ім'я"
							value={editName}
							onChange={changeName}
							required></InputWrapper>
						<div className='flex'>
							{name && (
								<Button
									onClick={closeDialog}
									className='mt-5 w-fit mx-auto px-5'>
									Cancel
								</Button>
							)}
							<Button
								type='submit'
								className='mt-5 w-fit mx-auto px-5'>
								Submit
							</Button>
						</div>
					</form>
				</Dialog>
			)}
			<div className='w-5/12 h-full md:w-11/12 mx-auto flex flex-col justify-between'>
				<div className='text-textColor md:text-3xl flex justify-between xs:text-xl text-4xl md:mt-4 md:mb-4 mt-5 mb-5'>
					<div className=''>
						<span>Привіт, </span>
						<span className='relative'>
							{name}
							{` `}
							<i
								onClick={editButtonClick}
								className='fa-regular fa-pen-to-square absolute -top-1 md:static xs:text-base xs:ml-2 -right-5 text-xl text-[#AAADAD] cursor-pointer'></i>
						</span>
						<span className='ml-10'>👋</span>
					</div>
					<button
						onClick={logOut}
						className='border-none outline-none'>
						<i className='fa-solid fa-right-from-bracket'></i>
					</button>
				</div>
				<Info registerTransactions={registerTransactions} />
				<div className='w-full h-30 flex mt-5'>
					<Tab
						onClick={actionButtonClick}
						className={
							tab === "actions" &&
							"!text-textColor !border-textColor"
						}>
						Операції
					</Tab>
					<Tab
						onClick={registerButtonClick}
						className={
							tab === "register" &&
							"!text-textColor !border-textColor"
						}>
						Журнал
					</Tab>
				</div>
				{renderContentTabs()}
			</div>
		</div>
	);
}

export default MainPage;
