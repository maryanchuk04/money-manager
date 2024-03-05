import { useState, useEffect } from "react";
import Info from "./components/Info";
import TrackerActions from "./components/TrackerActions";
import RegisterTransactions from "./components/RegisterTransactions";
import Tab from "./components/Tab";
import Dialog from "./components/Dialog";
import InputWrapper from "./components/InputWrapper";
import Button from "./components/Button";

function App() {
	const [tab, setTab] = useState("actions");
	const [name, setName] = useState("");
	const [editName, setEditName] = useState("");
	const [isOpenDialog, setIsOpenDialog] = useState(true);

	const actionButtonClick = () => {
		setTab("actions");
	};

	const registerButtonClick = () => {
		setTab("register");
	};

	const renderContentTabs = () => {
		switch (tab) {
			case "actions":
				return <TrackerActions />;
			case "register":
				return <RegisterTransactions />;

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
		//e.preventDefault();
		setIsOpenDialog(false);
	};

	const submitName = () => {
		localStorage.setItem("userName", JSON.stringify(editName));
		setName(editName);
		setIsOpenDialog(false);
	};

	useEffect(() => {
		if (localStorage.getItem("userName")) {
			setIsOpenDialog(false);
			setName(JSON.parse(localStorage.getItem("userName")));
			setEditName(JSON.parse(localStorage.getItem("userName")));
		}
	}, []);

	return (
		<div className='min-h-screen max-h-fit w-full flex bg-[#1C1F24]'>
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
			<div className='w-5/12 mx-auto flex flex-col'>
				<div className='text-textColor text-4xl mt-5 mb-5'>
					<span>Привіт, </span>
					<span className='relative'>
						{name}
						<i
							onClick={editButtonClick}
							className='fa-regular fa-pen-to-square absolute -top-1 -right-5 text-xl text-[#AAADAD] cursor-pointer'></i>
					</span>
					<span className='ml-10'>👋</span>
				</div>
				<Info />
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
				{/* <TrackerActions /> */}
			</div>
		</div>
	);
}

export default App;
