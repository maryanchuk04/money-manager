import { useState } from "react";
import Info from "./components/Info";
import TrackerActions from "./components/TrackerActions";
import RegisterTransactions from "./components/RegisterTransactions";
import Tab from "./components/Tab";

function App() {
	const [tab, setTab] = useState("actions");
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
	return (
		<div className='min-h-screen max-h-fit w-full flex bg-[#1C1F24]'>
			<div className='w-5/12 mx-auto flex flex-col'>
				<div className='text-textColor text-4xl mt-5 mb-5'>
					<span>Привіт, </span>
					<span>Діма</span>
					<span> 👋</span>
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
