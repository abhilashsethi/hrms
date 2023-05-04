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
	Typography,
} from "@mui/material";
import ICONS from "assets/icons";
import {
	ProgressBarDealsDashboard,
	ProjectBarGraph,
	ProjectsPieChart,
	ProjectsRadialBar,
} from "components/analytics";
import { useFetch } from "hooks";
import { useState, MouseEvent } from "react";
import { Projects } from "types";

const ProjectDashBoard = () => {
	const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
	const open = Boolean(anchorEl);
	const handleClick = (event: MouseEvent<HTMLButtonElement>) => {
		setAnchorEl(event.currentTarget);
	};
	const handleClose = () => {
		setAnchorEl(null);
	};

	const { data: projectData, mutate } = useFetch<Projects[]>(`projects`);
	console.log(projectData);

	return (
		<>
			<div className="flex gap-2 py-4">
				<div className="w-3/4 px-4 ">
					<Grid container spacing={2}>
						{cards?.map((item) => (
							<Grid key={item?.id} item lg={3}>
								<div className="border-4 border-b-theme hover:scale-105 transition duration-300 ease-in-out h-28 bg-white w-full p-2 flex flex-col rounded-xl shadow-xl justify-between cursor-pointer">
									<div className="flex justify-end">
										<IconButton size="small" onClick={handleClick}>
											<ICONS.More />
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
									<div className="flex justify-around items-center">
										<div>{item?.icon}</div>
										<span className="text-xl text-theme font-semibold">
											{item?.count}
										</span>
									</div>
									<span className="font-semibold text-center tracking-wide text-sm">
										{item?.title}
									</span>
								</div>
							</Grid>
						))}
					</Grid>
					<div className="grid grid-cols-12 content-between gap-6  m-5 !mb-6">
						<div className="px-2 col-span-12 pt-9 w-full flex flex-col justify-center gap-2 md:col-span-12 lg:col-span-6 !border-gray-500 rounded-xl !shadow-xl">
							<ProgressBarDealsDashboard />
						</div>
						<div className="px-2 col-span-12 pt-9 w-full flex flex-col justify-center gap-2 md:col-span-12 lg:col-span-6 !border-gray-500 rounded-xl !shadow-xl">
							<p className="text-lg font-bold text-center">Total Projects</p>
							<ProjectsRadialBar
								className="w-full"
								type="radialBar"
								radialLabel={["Received", "Ongoing", "Completed", "Delivered"]}
								radialSeries={[75, 65, 45, 87]}
								totalReturn={557}
								title=""
							/>
						</div>
					</div>
				</div>
				<div className="w-1/4 p-2 rounded-xl shadow-xl flex flex-col justify-around cursor-pointer">
					{stats.map((item) => (
						<div
							key={item?.id}
							className="h-32 w-full border-2 rounded-xl py-4 px-6 flex flex-col justify-between tracking-wide hover:scale-95 transition duration-200 ease-in-out"
						>
							<div className="flex justify-between items-center">
								<Typography className={`text-theme font-semibold`}>
									{item?.title}
								</Typography>
								<span className="font-semibold text-emerald-600">+10%</span>
							</div>
							<span className="text-xl font-bold">10</span>
							<div>
								<LinearProgress
									variant="determinate"
									color={item?.color as any}
									value={20}
								/>
								<span className="text-sm pt-6">Overall Projects 218</span>
							</div>
						</div>
					))}
				</div>
			</div>
			<div className="grid grid-cols-12 content-between gap-6  m-5 !mb-6">
				<div className="col-span-12 pt-9 w-full  gap-5 md:col-span-12 lg:col-span-7 !border-grey-500 rounded-xl !shadow-xl">
					<p className="text-lg text-center font-bold">
						Yearly Project Overview
					</p>
					<ProjectBarGraph
						series={[
							{
								name: "ONGOING",
								data: [44, 55, 41, 37, 56],
							},
							{
								name: "COMPLETED",
								data: [32, 32, 33, 22, 23],
							},
							{
								name: "DELIVERED",
								data: [10, 22, 8, 15, 13],
							},
						]}
						categories={["2022", "2021", "2020", "2019", "2018"]}
						colors={["#5B50A1", "#C43C5C", "#E97451"]}
						title=""
						barHeight={360}
					/>
				</div>
				<div className="col-span-12 pt-9 w-full flex flex-col justify-center gap-5 md:col-span-12 lg:col-span-5 !border-gray-500 rounded-xl !shadow-xl">
					<p className="text-lg text-center font-bold">Weekly Overview</p>
					<ProjectsPieChart
						title={""}
						pieSeries={[24, 65, 35, 78, 56, 23, 46]}
						pieLabel={[
							"Sunday",
							"Monday",
							"Tuesday",
							"Wednesday",
							"Thursday",
							"Friday",
							"Saturday",
						]}
					/>
				</div>
			</div>
		</>
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
		color: "primary",
	},
	{
		id: 2,
		title: "On Going Projects",
		growth: "+10%",
		value: "10",
		sub: "Overall Projects 218",
		color: "secondary",
	},
	{
		id: 3,
		title: "Completed Projects",
		growth: "+10%",
		value: "10",
		sub: "Overall Projects 218",
		color: "success",
	},
	{
		id: 4,
		title: "Cancelled Projects",
		growth: "+10%",
		value: "10",
		sub: "Overall Projects 218",
		color: "warning",
	},
];

const project_Arr = [
	{
		_id: "1",
		icon: "/admin/project/connect_project.png",
		title: "Connect",
		description: "Projects in YardCrm.",
	},
	{
		_id: "2",
		icon: "/admin/project/track_project.png",
		title: "Track",
		description: "Stay on top of your tasks.",
	},
	{
		_id: "3",
		icon: "/admin/project/deliver_project.png",
		title: "Deliver",
		description: "Execute customer projects on time.",
	},
];
