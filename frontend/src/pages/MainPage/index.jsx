import { useState, useEffect } from "react";
import Info from "../../components/Info";
import TrackerActions from "../../components/TrackerActions";
import RegisterTransactions from "../../components/RegisterTransactions";
import Tab from "../../components/Tab";
import Dialog from "../../components/Dialog";
import Button from "../../components/Button";
import { useNavigate } from "react-router-dom";
import { apiClient } from "../../app/apiClient";
import SpinnerWrapper from "../../components/SpinnerWrapper";

function MainPage() {
	const [tab, setTab] = useState("actions");
	const [name, setName] = useState("");
	const [editName, setEditName] = useState("");
	const [userData, setUserData] = useState(null);
	const [isOpenDialog, setIsOpenDialog] = useState(false);
	const [transactions, setTransactions] = useState([]);
	const [isLoading, setIsLoading] = useState(true);
	const navigate = useNavigate();

	const actionButtonClick = () => {
		setTab("actions");
	};

	const registerButtonClick = () => {
		setTab("register");
	};

	const deleteTransactions = async (id) => {
		console.log(id);
		setTransactions(transactions.filter((item) => item._id !== id));
		await apiClient.delete(`users/${userData?._id}/transaction/${id}`);
	};

	const fetchUser = async () => {
		try {
			const { id } = JSON.parse(localStorage.getItem("userId"));

			const response = await apiClient.get(`/users/${id}`);
			const { data } = response;
			setName(data.name);
			setEditName(data.name);
			setUserData(data);
			setTransactions(data.transactions);
		} catch (error) {
		} finally {
			setIsLoading(false);
		}
	};

	const updateName = () => {
		if (editName !== name || !editName.trim()) {
			apiClient.put("users/update-user-name", {
				id: userData._id,
				name: editName,
			});
		}
	};

	const renderContentTabs = () => {
		switch (tab) {
			case "actions":
				return (
					<TrackerActions
						setTransactions={setTransactions}
						userId={userData?._id}
					/>
				);
			case "register":
				return (
					<RegisterTransactions
						transactions={transactions}
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
		setName(editName);
		setIsOpenDialog(false);
		updateName();
	};

	useEffect(() => {
		if (!localStorage.getItem("userId")) {
			navigate("/sign-up");
		}
		if (localStorage.getItem("userId")) fetchUser();

		document.body.style.height = `${window.innerHeight}px`;
	}, []);

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
						<div className='flex flex-col'>
							<label
								className='text-[#A48BA6] mb-2 font-light text-sm'
								htmlFor='editName'>
								{`Ім'я`}
							</label>
							<input
								className='border-0 outline-none border-textColor border-b-2 xs:text-sm bg-transparent placeholder:text-textColor text-textColor text-xl'
								type='text'
								id='editName'
								value={editName}
								placeholder="Введіть ваше ім'я"
								onChange={changeName}
								name='editName'
								required
							/>
						</div>
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
			{isLoading ? (
				<SpinnerWrapper />
			) : (
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
					<Info transactions={transactions} />
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
			)}
		</div>
	);
}

export default MainPage;
