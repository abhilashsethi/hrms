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
import { useState, MouseEvent } from "react";

const ProjectDashBoard = () => {
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
										<MenuItem onClick={handleClose}>All Projects</MenuItem>
										<MenuItem onClick={handleClose}>View Dashboard</MenuItem>
									</Menu>
								</div>
								<div>{item?.icon}</div>
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
					<div className="px-2 col-span-12 pt-9 w-full flex flex-col justify-center gap-2 md:col-span-12 lg:col-span-6 !border-gray-500 rounded-xl !shadow-xl"></div>
				</div>
			</div>
			<div className="w-1/4 p-2 rounded-xl shadow-xl flex flex-col gap-3">
				{stats.map((item) => (
					<div
						key={item?.id}
						className="h-40 w-full border-2 rounded-xl py-4 px-6 flex flex-col justify-between tracking-wide"
					>
						<div className="flex justify-between items-center">
							<span className="text-theme font-semibold">{item?.title}</span>
							<span className="font-semibold text-emerald-600">+10%</span>
						</div>
						<span className="text-xl font-bold">10</span>
						<div>
							<LinearProgress variant="determinate" value={20} />
							<span className="text-sm pt-6">Overall Projects 218</span>
						</div>
					</div>
				))}
			</div>
		</div>
	);
};

export default ProjectDashBoard;

const cards = [
	{
		id: 1,
		icon: (
			<ContentPasteGo
				fontSize="large"
				className="text-theme group-hover:text-white"
			/>
		),
		count: "34",
		title: "Total Project",
	},
	{
		id: 2,
		icon: (
			<PendingActions
				fontSize="large"
				className="text-theme group-hover:text-white"
			/>
		),
		count: "34",
		title: "On Going Projects",
	},
	{
		id: 3,
		icon: (
			<AssignmentTurnedIn
				fontSize="large"
				className="text-theme group-hover:text-white"
			/>
		),
		count: "34",
		title: "Finished Projects",
	},
	{
		id: 4,
		icon: (
			<Pending fontSize="large" className="text-theme group-hover:text-white" />
		),
		count: "34",
		title: "Other",
	},
];

const stats = [
	{
		id: 1,
		title: "Upcoming Projects",
		growth: "+10%",
		value: "10",
		sub: "Overall Projects 218",
	},
	{
		id: 2,
		title: "On Going Projects",
		growth: "+10%",
		value: "10",
		sub: "Overall Projects 218",
	},
	{
		id: 3,
		title: "Completed Projects",
		growth: "+10%",
		value: "10",
		sub: "Overall Projects 218",
	},
];
