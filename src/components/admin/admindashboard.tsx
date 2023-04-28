import {
	MoreVert,
	People,
	PlaylistAddCheckCircleRounded,
	QrCodeScannerRounded,
} from "@mui/icons-material";
import {
	Avatar,
	Grid,
	IconButton,
	LinearProgress,
	Menu,
	MenuItem,
	Radio,
} from "@mui/material";
import ICONS from "assets/icons";
import AttendanceReport from "components/analytics/AttendanceReport";
import CardStatus from "components/analytics/CardStatus";
import ProjectOverview from "components/analytics/ProjectOverview";
import RolewiseStrength from "components/analytics/RolewiseStrength";
import TaskOverview from "components/analytics/TaskOverview";
import { useState, MouseEvent } from "react";

const AdminDashboard = () => {
	const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
	const open = Boolean(anchorEl);
	const handleClick = (event: MouseEvent<HTMLButtonElement>) => {
		setAnchorEl(event.currentTarget);
	};
	const handleClose = () => {
		setAnchorEl(null);
	};
	return (
		<>
			<div className="flex gap-2 py-4">
				<div className="w-3/4 px-4 ">
					<Grid container spacing={2}>
						{cards?.map((item) => (
							<Grid key={item?.id} item lg={3}>
								<div className="deals-card h-56 bg-white w-full p-8 flex flex-col rounded-xl shadow-xl justify-between group">
									<div className="flex justify-end">
										<IconButton size="small" onClick={handleClick}>
											<MoreVert className="group-hover:text-white" />
										</IconButton>
										<Menu
											anchorEl={anchorEl}
											open={open}
											onClose={handleClose}
											MenuListProps={{
												"aria-labelledby": "basic-button",
											}}
										>
											<MenuItem onClick={handleClose}>All Users</MenuItem>
											<MenuItem onClick={handleClose}>View Dashboard</MenuItem>
										</Menu>
									</div>
									<div className="">{item?.icon}</div>
									<span className="text-lg group-hover:text-white">
										{item?.count}
									</span>
									<span className="font-semibold tracking-wide text-sm group-hover:text-white">
										{item?.title}
									</span>
								</div>
							</Grid>
						))}
					</Grid>
					<div className="grid grid-cols-12 content-between gap-6  m-5 !mb-6">
						{/* attandance section */}
						<div className="px-2 col-span-12 pt-9 w-full flex flex-col justify-center gap-2 md:col-span-12 lg:col-span-6 !border-gray-500 rounded-xl !shadow-xl">
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
						<div className="px-2 col-span-12 w-full flex flex-col justify-center gap-2 md:col-span-12 lg:col-span-6 !border-gray-500 rounded-xl !shadow-xl">
							<div className="font-semibold text-lg pb-5">
								<p>Projects</p>
							</div>
							<div className="flex justify-between gap-3 mb-7">
								{project_cards?.map?.((item, i) => {
									return (
										<div className="hover:scale-95 transition duration-500 ease-in-out cursor-pointer border border-gray-600 text-center w-1/2 py-5 rounded-md bg-slate-200 shadow-lg">
											<p className={`text-xs  font-bold`}>{item?.title}</p>
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
												<p className={`font-semibold`}>{item?.title}</p>
											</div>
											<p className="font-bold">{item?.value}</p>
										</div>
									);
								})}
							</div>
						</div>
					</div>
				</div>
				<div className="w-1/4 p-2 rounded-xl shadow-xl flex flex-col gap-3">
					{stats.map((item) => (
						<div
							key={item?.id}
							className="h-40 w-full border-2 rounded-xl py-4 px-6 flex flex-col justify-between tracking-wide"
						>
							<div className="flex justify-between items-center">
								<span className="text-theme font-semibold">New Employees</span>
								<span className="font-semibold text-emerald-600">+10%</span>
							</div>
							<span className="text-xl font-bold">10</span>
							<div>
								<LinearProgress variant="determinate" value={20} />
								<span className="text-sm pt-6">Overall Employees 218</span>
							</div>
						</div>
					))}
				</div>
			</div>
			<div className="grid grid-cols-12 content-between gap-6  m-5 !mb-6">
				<div className="col-span-12 pt-9 w-full  gap-5 md:col-span-12 lg:col-span-7 !border-grey-500 rounded-xl !shadow-xl">
					<ProjectOverview text="Projects Overview" type="bar" />
				</div>
				<div className="col-span-12 pt-9 w-full flex flex-col justify-center gap-5 md:col-span-12 lg:col-span-5 !border-gray-500 rounded-xl !shadow-xl">
					<TaskOverview text="Task Overview" type="donut" />
				</div>
			</div>
		</>
	);
};

export default AdminDashboard;

const cards = [
	{
		id: 1,
		icon: (
			<People fontSize="large" className="text-theme group-hover:text-white" />
		),
		count: "34",
		title: "Total Users",
	},
	{
		id: 2,
		icon: (
			<QrCodeScannerRounded
				fontSize="large"
				className="text-theme group-hover:text-white"
			/>
		),
		count: "34",
		title: "Scanned Cards",
	},
	{
		id: 3,
		icon: (
			<PlaylistAddCheckCircleRounded
				fontSize="large"
				className="text-theme group-hover:text-white"
			/>
		),
		count: "34",
		title: "Today's Attendance",
	},
	{
		id: 4,
		icon: (
			<People fontSize="large" className="text-theme group-hover:text-white" />
		),
		count: "34",
		title: "Other",
	},
];

const stats = [
	{
		id: 1,
		title: "New Employees",
		growth: "+10%",
		value: "10",
		sub: "Overall Employees 218",
	},
	{
		id: 2,
		title: "New Employees",
		growth: "+10%",
		value: "10",
		sub: "Overall Employees 218",
	},
	{
		id: 3,
		title: "New Employees",
		growth: "+10%",
		value: "10",
		sub: "Overall Employees 218",
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
