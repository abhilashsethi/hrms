import {
	ContactPhone,
	DevicesOther,
	AssignmentTurnedIn,
	PendingActions,
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
import { UpcomingLeaves } from "components/core";
import { useState, MouseEvent } from "react";
import MeetingStats from "./MeetingStats";
import MeetingAnalytics from "components/analytics/MeetingAnalytics";
import TaskOverview from "components/analytics/TaskOverview";
import MeetingDonutChart from "components/analytics/MeetingDonutChart";

const MeetingDashBoard = () => {
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
				<div className="w-full px-4 ">
					<Grid container spacing={2}>
						{cards?.map((item) => (
							<Grid key={item?.id} item lg={3}>
								<div className="group deals-card h-56 bg-white w-full p-8 flex flex-col rounded-xl shadow-xl justify-between">
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
											<MenuItem onClick={handleClose}>All Meetings</MenuItem>
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
				</div>
				{/* <div className="w-1/4 p-2 rounded-xl shadow-xl flex flex-col gap-3">
					{stats.map((item) => (
						<div
							key={item?.id}
							className="h-40 w-full border-2 rounded-xl py-4 px-6 flex flex-col justify-between tracking-wide"
						>
							<div className="flex justify-between items-center">
								<span className="text-theme font-semibold">
									Upcoming Meetings
								</span>
								<span className="font-semibold text-emerald-600">+10%</span>
							</div>
							<span className="text-xl font-bold">10</span>
							<div>
								<LinearProgress variant="determinate" value={20} />
								<span className="text-sm pt-6">Overall Meetings 218</span>
							</div>
						</div>
					))}

					<MeetingStats />
				</div> */}
			</div>
			<div className="grid grid-cols-12 content-between gap-6  m-5 !mb-6">
				<div className="col-span-12 pt-9 w-full  gap-5 md:col-span-12 lg:col-span-7 !border-grey-500 rounded-xl !shadow-xl">
					<MeetingAnalytics text="Projects Overview" type="line" />
				</div>
				<div className="col-span-12 pt-9 w-full flex flex-col justify-center gap-5 md:col-span-12 lg:col-span-5 !border-gray-500 rounded-xl !shadow-xl">
					<MeetingDonutChart text="Meeting Overview" type="donut" />
				</div>
			</div>
		</>
	);
};

export default MeetingDashBoard;

const cards = [
	{
		id: 1,
		icon: (
			<ContactPhone
				fontSize="large"
				className="text-theme group-hover:text-white"
			/>
		),
		count: "34",
		title: "Total Meeting",
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
		title: "On Going Meetings",
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
		title: "Finished Meetings",
	},
	{
		id: 4,
		icon: (
			<DevicesOther
				fontSize="large"
				className="text-theme group-hover:text-white"
			/>
		),
		count: "34",
		title: "Other",
	},
];

const stats = [
	{
		id: 1,
		title: "Upcoming Meetings",
		growth: "+10%",
		value: "10",
		sub: "Overall Meetings 218",
	},
	{
		id: 2,
		title: "Pending Meetings",
		growth: "+10%",
		value: "10",
		sub: "Overall Meetings 218",
	},
	{
		id: 3,
		title: "Dome Meetings",
		growth: "+10%",
		value: "10",
		sub: "Overall Meetings 218",
	},
];
