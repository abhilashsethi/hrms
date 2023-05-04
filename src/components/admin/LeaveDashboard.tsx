import { LeaveBarChart, LeaveDonutChart } from "components/analytics";
import {
	Grid,
	IconButton,
	LinearProgress,
	Menu,
	MenuItem,
} from "@mui/material";
import { useState, MouseEvent } from "react";
import { useFetch } from "hooks";
import {
	ContentPasteGo,
	Pending,
	MoreVert,
	Sick,
	Schedule,
} from "@mui/icons-material";

const LeaveDashboard = () => {
	const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
	const open = Boolean(anchorEl);
	const handleClick = (event: MouseEvent<HTMLButtonElement>) => {
		setAnchorEl(event.currentTarget);
	};
	const handleClose = () => {
		setAnchorEl(null);
	};

	const cards = [
		{
			id: 1,
			icon: <ContentPasteGo fontSize="large" className="text-theme " />,
			count: "10",
			title: "Total Leaves",
		},
		{
			id: 2,
			icon: <Sick fontSize="large" className="text-theme " />,
			count: "34",
			title: "Sick Leave",
		},
		{
			id: 3,
			icon: <Schedule fontSize="large" className="text-theme " />,
			count: "34",
			title: "Paid Leave",
		},
		{
			id: 4,
			icon: <Pending fontSize="large" className="text-theme " />,
			count: "34",
			title: "Casual Leave",
		},
	];

	return (
		<>
			<div className="flex gap-2 py-4">
				<div className="w-3/4 px-4 ">
					<Grid container spacing={2}>
						{cards?.map((item) => (
							<Grid key={item?.id} item lg={3}>
								<div className="border-2 border-b-theme hover:scale-105 transition duration-500 ease-in-out h-36 bg-white w-full p-2 flex flex-col rounded-xl shadow-xl justify-between cursor-pointer">
									<div className="flex justify-end">
										<IconButton size="small" onClick={handleClick}>
											<MoreVert className="" />
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
										<div>
											{item?.icon}
											<span className="font-semibold tracking-wide text-sm">
												{item?.title}
											</span>
										</div>
										<span className="text-xl text-theme font-semibold">
											{item?.count}
										</span>
									</div>
									<span className="font-semibold tracking-wide text-sm">
										{item?.title}
									</span>
								</div>
							</Grid>
						))}
					</Grid>
				</div>
				<div className="w-1/4 p-2 rounded-xl shadow-xl flex flex-col justify-center gap-3">
					<div className="flex justify-around items-center gap-2 ">
						<div className="border border-gray-400 px-4 py-6 rounded-xl cursor-pointer hover:scale-95 transition duration-200 ease-in-out eas">
							<div className="flex justify-between items-center gap-3">
								<span className="text-theme font-semibold">Today Present</span>
								<span className="font-semibold text-emerald-600">+70%</span>
							</div>
							<LinearProgress variant="determinate" value={70} />
						</div>
						<div className="border border-gray-400 px-4 py-6 rounded-xl cursor-pointer hover:scale-95 transition duration-200 ease-in-out">
							<div className="flex justify-between items-center gap-3">
								<span className="text-theme font-semibold">Today Absent</span>
								<span className="font-semibold text-emerald-600">+30%</span>
							</div>
							<LinearProgress variant="determinate" value={40} />
						</div>
					</div>
				</div>
			</div>
			<div className="grid grid-cols-12 content-between gap-6  m-5 !mb-6">
				<div className="px-2 col-span-12 pt-9 w-full flex flex-col justify-center gap-2 md:col-span-12 lg:col-span-7 !border-gray-500 rounded-xl !shadow-xl">
					<p className="font-bold text-lg text-center">Leave Overview</p>
					<LeaveBarChart type="bar" text="" />
				</div>
				<div className="col-span-12 w-full flex flex-col justify-center md:col-span-12 lg:col-span-5 !border-gray-500 rounded-xl !shadow-xl">
					<p className="text-lg font-bold text-center">Leave Details</p>
					<LeaveDonutChart text="" type="donut" />
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
];
