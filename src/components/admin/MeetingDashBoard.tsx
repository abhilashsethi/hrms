import { MeetingAnalytics, MeetingDonutChart } from "components/analytics";
import { Grid, IconButton, Menu, MenuItem } from "@mui/material";
import { useState, MouseEvent } from "react";
import {
	ContactPhone,
	DevicesOther,
	AssignmentTurnedIn,
	PendingActions,
	MoreVert,
} from "@mui/icons-material";
import { useFetch } from "hooks";

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
								<div className="hover:scale-105 transition duration-500 ease-in-out bg-white w-full p-2 flex flex-col rounded-xl shadow-xl justify-between cursor-pointer border-4 border-b-theme">
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
											<MenuItem onClick={handleClose}>All Users</MenuItem>
											<MenuItem onClick={handleClose}>View Dashboard</MenuItem>
										</Menu>
									</div>
									<div className="flex justify-around items-center pb-3">
										<div className="w-16">{item?.icon}</div>

										{/* <div>
										<img className="w-16" src="/department.png" alt="" />
									</div> */}
										<span className="text-xl text-theme font-semibold ">
											{item?.count}
										</span>
									</div>
									<span className=" text-theme font-semibold text-center tracking-wide text-md">
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
					<p className="font-bold text-lg text-center">Meeting Overview</p>
					<MeetingAnalytics text="" type="line" />
				</div>
				<div className="col-span-12 pt-9 w-full flex flex-col justify-center gap-5 md:col-span-12 lg:col-span-5 !border-gray-500 rounded-xl !shadow-xl">
					<p className="font-bold text-lg text-center">Meeting Details</p>
					<MeetingDonutChart text="" type="donut" />
				</div>
			</div>
		</>
	);
};

export default MeetingDashBoard;

const cards = [
	{
		id: 1,
		icon: <ContactPhone fontSize="large" className="text-theme" />,
		count: "34",
		title: "Total Meetings",
	},
	{
		id: 2,
		icon: <PendingActions fontSize="large" className="text-theme" />,
		count: "34",
		title: "Upcoming Meetings",
	},
	{
		id: 3,
		icon: <AssignmentTurnedIn fontSize="large" className="text-theme" />,
		count: "34",
		title: "Completed Meetings",
	},
	{
		id: 4,
		icon: <DevicesOther fontSize="large" className="text-theme" />,
		count: "34",
		title: "Others",
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
