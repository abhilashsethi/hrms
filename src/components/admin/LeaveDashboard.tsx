import {
	ContentPasteGo,
	AssignmentTurnedIn,
	PendingActions,
	Pending,
	MoreVert,
	Sick,
	Schedule,
} from "@mui/icons-material";
import {
	Grid,
	IconButton,
	LinearProgress,
	Menu,
	MenuItem,
} from "@mui/material";
import RoleBarChart from "components/analytics/RoleBarChart";
import RoleDonutChart from "components/analytics/RoleDonutChart";
import TaskOverview from "components/analytics/TaskOverview";
import { useFetch } from "hooks";
import { useState, MouseEvent } from "react";

const LeaveDashboard = () => {
	const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
	const open = Boolean(anchorEl);
	const handleClick = (event: MouseEvent<HTMLButtonElement>) => {
		setAnchorEl(event.currentTarget);
	};
	const handleClose = () => {
		setAnchorEl(null);
	};

	const { data: roleData, mutate } = useFetch<any>(`roles`);
	console.log(roleData?.roles);

	const cards = [
		{
			id: 1,
			icon: (
				<ContentPasteGo
					fontSize="large"
					className="text-theme group-hover:text-white"
				/>
			),
			count: roleData?.roles?.length,
			title: "Total Leaves",
		},
		{
			id: 2,
			icon: (
				<Sick fontSize="large" className="text-theme group-hover:text-white" />
			),
			count: "34",
			title: "Sick Leave",
		},
		{
			id: 3,
			icon: (
				<Schedule
					fontSize="large"
					className="text-theme group-hover:text-white"
				/>
			),
			count: "34",
			title: "Paid Leave",
		},
		{
			id: 4,
			icon: (
				<Pending
					fontSize="large"
					className="text-theme group-hover:text-white"
				/>
			),
			count: "34",
			title: "Casual Leave",
		},
	];

	return (
		<>
			<div className="flex gap-2 py-4">
				<div className="w-full px-4 ">
					<Grid container spacing={2}>
						{cards?.map((item) => (
							<Grid key={item?.id} item lg={3}>
								<div className="group card1 h-36 bg-white w-full p-2 flex flex-col rounded-xl shadow-xl justify-between cursor-pointer">
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
									<div className="flex justify-around items-center">
										<div>{item?.icon}</div>
										<span className="text-xl text-theme font-semibold group-hover:text-white">
											{item?.count}
										</span>
									</div>
									<span className="group-hover:text-white text-theme font-semibold text-center tracking-wide text-lg">
										{item?.title}
									</span>
								</div>
							</Grid>
						))}
					</Grid>
				</div>
				{/* <div className="w-1/4 p-2 rounded-xl shadow-xl flex flex-col gap-3">
					{stats.map((item) => (
						<div
							key={item?.id}
							className="h-40 w-full border-2 rounded-xl py-4 px-6 flex flex-col justify-between tracking-wide"
						>
							<div className="flex justify-between items-center">
								<span className="text-theme font-semibold">Upcoming Roles</span>
								<span className="font-semibold text-emerald-600">+10%</span>
							</div>
							<span className="text-xl font-bold">10</span>
							<div>
								<LinearProgress variant="determinate" value={20} />
								<span className="text-sm pt-6">Overall Roles 218</span>
							</div>
						</div>
					))}
				</div> */}
			</div>
			<div className="grid grid-cols-12 content-between gap-6  m-5 !mb-6">
				<div className="px-2 col-span-12 pt-9 w-full flex flex-col justify-center gap-2 md:col-span-12 lg:col-span-7 !border-gray-500 rounded-xl !shadow-xl">
					<p className="font-bold text-lg text-center">Department Overview</p>
					<RoleBarChart type="bar" text="" />
				</div>
				<div className="col-span-12 w-full flex flex-col justify-center md:col-span-12 lg:col-span-5 !border-gray-500 rounded-xl !shadow-xl">
					<p className="text-lg font-bold text-center">Department Details</p>
					<RoleDonutChart text="" type="donut" />
				</div>
			</div>
		</>
	);
};

export default LeaveDashboard;

const stats = [
	{
		id: 1,
		title: "On Going Roles",
		growth: "+10%",
		value: "10",
		sub: "Overall Roles 218",
	},
	{
		id: 2,
		title: "Finished Roles",
		growth: "+10%",
		value: "10",
		sub: "Overall Roles 218",
	},
	{
		id: 3,
		title: "Others",
		growth: "+10%",
		value: "10",
		sub: "Overall Roles 218",
	},
];
