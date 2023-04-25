import {
	Block,
	CreditCardRounded,
	CreditScore,
	QrCodeScanner,
} from "@mui/icons-material";
import { Grid } from "@mui/material";
import CardStatus from "components/analytics/CardStatus";
import AttendanceReport from "components/analytics/AttendanceReport";
import { AdminBreadcrumbs } from "components/core";
import PanelLayout from "layouts/panel";

const Cards = () => {
	return (
		<PanelLayout title="Cards Dashboard - SY HR MS">
			<section className="px-8 py-4">
				<AdminBreadcrumbs links={links} />
				<div className="mt-4">
					<Grid container spacing={2}>
						{cards?.map((item) => (
							<Grid key={item?.id} item lg={3}>
								<div className="deals-card group hover:bg-theme transition duration-500 ease-in-out w-full tracking-wide  h-full bg-white shadow-lg rounded-xl p-4 flex flex-col gap-2 justify-center items-center">
									<div className=" flex justify-center items-center">
										{/* <CreditCardRounded
											fontSize="large"
											className="text-theme group-hover:text-white"
										/> */}
										{item?.icon}
									</div>
									<p className="text-base font-semibold text-center group-hover:text-white">
										{item?.title}
									</p>
									<p className="text-lg font-bold text-gray-600 group-hover:text-white">
										{item?.value}
									</p>
								</div>
							</Grid>
						))}
					</Grid>
				</div>
				<div className="grid grid-cols-12 content-between gap-6  m-5 !mb-6">
					<div className="col-span-12 pt-9 w-full  gap-5 md:col-span-12 lg:col-span-7 !border-grey-500 rounded-xl !shadow-xl">
						<AttendanceReport text="Repairs Report" type="bar" />
					</div>
					<div className="col-span-12 pt-9 w-full flex flex-col justify-center gap-5 md:col-span-12 lg:col-span-5 !border-gray-500 rounded-xl !shadow-xl">
						<CardStatus text="" type="donut" />
					</div>
				</div>
			</section>
		</PanelLayout>
	);
};

export default Cards;

const links = [{ id: 1, page: "Cards", link: "/admin/cards" }];

const cards = [
	{
		id: 1,
		title: "Total Cards",
		value: "12",
		icon: (
			<CreditCardRounded
				fontSize="large"
				className="text-theme group-hover:text-white"
			/>
		),
	},
	{
		id: 2,
		title: "Cards Assigned",
		value: "1",
		icon: (
			<CreditScore
				fontSize="large"
				className="text-theme  group-hover:text-white"
			/>
		),
	},
	{
		id: 3,
		title: "Blocked Cards",
		value: "2",
		icon: (
			<Block fontSize="large" className="text-theme group-hover:text-white" />
		),
	},
	{
		id: 4,
		title: "Scanned Cards",
		value: "4",
		icon: (
			<QrCodeScanner
				fontSize="large"
				className="text-theme group-hover:text-white"
			/>
		),
	},
];

const leave_status = [
	{
		id: 1234,
		name: "Abhilash",
		date: "4 May 2023",
		status: "Pending",
	},
	{
		id: 1234,
		name: "Abhilash",
		date: "4 May 2023",
		status: "Approved",
	},
	{
		id: 1234,
		name: "Abhilash",
		date: "4 May 2023",
		status: "Approved",
	},
	{
		id: 1234,
		name: "Abhilash",
		date: "4 May 2023",
		status: "Approved",
	},
];

const project_cards = [
	{
		id: 1,
		title: "Total Projects",
		value: 385,
	},
	{
		id: 1,
		title: "Completed Projects",
		value: 85,
	},
];

const task_status = [
	{
		id: 1,
		title: "Completed Task",
		value: 166,
		color: "secondary",
	},
	{
		id: 2,
		title: "Inprogress Tasks",
		value: 115,
		color: "warning",
	},
	{
		id: 3,
		title: "On Hold Tasks",
		value: 31,
		color: "success",
	},
	{
		id: 4,
		title: "Pending Tasks",
		value: 47,
		color: "error",
	},
	{
		id: 5,
		title: "Review Tasks",
		value: 5,
		color: "primary",
	},
];
