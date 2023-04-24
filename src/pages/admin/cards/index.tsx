import {
	Block,
	CreditCardRounded,
	CreditScore,
	QrCodeScanner,
} from "@mui/icons-material";
import { Avatar, Grid, Radio } from "@mui/material";
import ICONS from "assets/icons";
import CardStatus from "components/analytics/CardStatus";
import AttendanceReport from "components/analytics/AttendanceReport";
import UserRole from "components/analytics/UserRole";
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
					{/* attandance section */}
					<div className="px-2 col-span-12 pt-9 w-full flex flex-col justify-center gap-2 md:col-span-12 lg:col-span-4 !border-gray-500 rounded-xl !shadow-xl">
						<div className="font-semibold pl-2 py-3 space-y-2">
							<p>
								Total Present :{" "}
								<span className="p-[1px] rounded-md text-green-700 bg-green-300">
									50
								</span>
							</p>
							<p>
								Total Absent :{" "}
								<span className="p-[1px] rounded-md text-red-700 bg-red-300">
									06
								</span>
							</p>
						</div>
						<div className="h-[20rem] overflow-scroll">
							{leave_status?.map?.((item, i) => {
								return (
									<div key={i}>
										<div className="border border-1 rounded-lg p-5 mb-2">
											<div className="flex items-center gap-3">
												<Avatar />
												<div className="flex flex-col">
													<p className="font-medium text-sm">
														Name:{" "}
														<span className="font-semibold text-sm">
															{item?.name}
														</span>
													</p>
													<p className="font-medium text-sm">
														Id:{" "}
														<span className="font-semibold text-sm">
															{item?.id}
														</span>
													</p>
												</div>
											</div>
											<div className="flex justify-between items-center mt-3">
												<div className="text-sm font-semibold ">
													<p>Leave Date</p>
													<p>{item?.date}</p>
												</div>
												<button
													className={`hover:scale-105 transition duration-500 ease-in-out text-xs font-medium ${
														item?.status === "Pending"
															? `text-red-700 bg-red-300`
															: `text-green-700 bg-green-300`
													} p-1 h-7 rounded-lg text-center`}
												>
													{item?.status}
												</button>
											</div>
										</div>
									</div>
								);
							})}
						</div>

						{/* <button className="w-1/4 p-1 mb-3 hover:scale-105 transition duration-500 ease-in-out rounded-lg m-auto border border-1 bg-slate-400 text-sm font-semibold">
							Load More
						</button> */}
					</div>
					{/* Project section */}
					<div className="px-2 col-span-12 w-full flex flex-col justify-center gap-2 md:col-span-12 lg:col-span-4 !border-gray-500 rounded-xl !shadow-xl">
						<div className="font-semibold text-lg pb-5">
							<p>Projects</p>
						</div>
						<div className="flex justify-between gap-3 mb-7">
							{project_cards?.map?.((item, i) => {
								return (
									<div className="border border-gray-600 text-center w-1/2 py-5 rounded-md bg-slate-200 shadow-lg">
										<p className="text-xs font-bold">{item?.title}</p>
										<p className="text-md font-semibold">{item?.value}</p>
									</div>
								);
							})}
						</div>
						<div className="flex flex-col gap-3">
							<div className="w-full border border-gray-200 rounded-xl flex">
								<p className="bg-[#9c27b0] w-[30%] h-7 text-white flex items-center justify-center text-xs font-semibold rounded-l-xl">
									30%
								</p>
								<p className="bg-[#ed6c02] w-[22%] h-7 text-white flex items-center justify-center text-xs font-semibold">
									22%
								</p>
								<p className="bg-[#2e7d32] w-[24%] h-7 text-white flex items-center justify-center text-xs font-semibold">
									24%
								</p>
								<p className="bg-[#d32f2f] w-[21%] h-7 text-white flex items-center justify-center text-xs font-semibold">
									21%
								</p>
								<p className="bg-[#1976d2] w-[10%] h-7 text-white flex items-center justify-center text-xs font-semibold rounded-r-xl">
									10%
								</p>
							</div>
							{task_status?.map((item, i) => {
								return (
									<div className="flex justify-between items-center" key={i}>
										<div className="flex items-center">
											<Radio size="small" color={item?.color as any} />
											<p className="font-semibold">{item?.title}</p>
										</div>
										<p className="font-bold">{item?.value}</p>
									</div>
								);
							})}
						</div>
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
