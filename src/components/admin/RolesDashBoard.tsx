import {
	ContentPasteGo,
	AssignmentTurnedIn,
	PendingActions,
	Pending,
	MoreVert,
} from "@mui/icons-material";
import {
	Grid,
	IconButton,
	LinearProgress,
	Menu,
	MenuItem,
} from "@mui/material";
import ICONS from "assets/icons";
import ProjectOverview from "components/analytics/ProjectOverview";
import RoleBarChart from "components/analytics/RoleBarChart";
import { useState, MouseEvent } from "react";

const RolesDashBoard = () => {
	const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
	const open = Boolean(anchorEl);
	const handleClick = (event: MouseEvent<HTMLButtonElement>) => {
		setAnchorEl(event.currentTarget);
	};
	const handleClose = () => {
		setAnchorEl(null);
	};
	return (
		<div className="flex gap-2 py-4">
			<div className="w-3/4 px-4 ">
				<Grid container spacing={2}>
					{cards?.map((item) => (
						<Grid key={item?.id} item lg={3}>
							<div className="h-56 bg-white w-full p-8 flex flex-col rounded-xl shadow-xl justify-between border-b-4 border-theme hover:scale-105 cursor-pointer transition duration-500 ease-in-out">
								<div className="flex justify-end">
									<IconButton size="small" onClick={handleClick}>
										<MoreVert />
									</IconButton>
									<Menu
										anchorEl={anchorEl}
										open={open}
										onClose={handleClose}
										MenuListProps={{
											"aria-labelledby": "basic-button",
										}}
									>
										<MenuItem onClick={handleClose}>All Roles</MenuItem>
										<MenuItem onClick={handleClose}>View Dashboard</MenuItem>
									</Menu>
								</div>
								<div>{item?.icon}</div>
								<span className="text-lg">{item?.count}</span>
								<span className="font-semibold tracking-wide text-sm">
									{item?.title}
								</span>
							</div>
						</Grid>
					))}
				</Grid>
				<div className="grid grid-cols-12 content-between gap-6  m-5 !mb-6">
					<div className="px-2 col-span-12 pt-9 w-full flex flex-col justify-center gap-2 md:col-span-12 lg:col-span-12 !border-gray-500 rounded-xl !shadow-xl">
						<RoleBarChart type="bar" text="Role Overview" />
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
			</div>
		</div>
	);
};

export default RolesDashBoard;

const cards = [
	{
		id: 1,
		icon: <ContentPasteGo fontSize="large" className="text-theme" />,
		count: "34",
		title: "Total Roles",
	},
	{
		id: 2,
		icon: <PendingActions fontSize="large" className="text-theme" />,
		count: "34",
		title: "On Going Roles",
	},
	{
		id: 3,
		icon: <AssignmentTurnedIn fontSize="large" className="text-theme" />,
		count: "34",
		title: "Finished Roles",
	},
	{
		id: 4,
		icon: <Pending fontSize="large" className="text-theme" />,
		count: "34",
		title: "Other",
	},
];

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
