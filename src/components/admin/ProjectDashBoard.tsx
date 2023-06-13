import { LinearProgress, Typography } from "@mui/material";
import {
	COMPLETED_PROJECT,
	ON_GOING_PROJECT,
	PENDING_PROJECT,
	PROJECT,
} from "assets/dashboard_Icons";
import {
	ProgressBarDealsDashboard,
	ProjectBarGraph,
	ProjectsPieChart,
	ProjectsRadialBar,
} from "components/analytics";
import { DashboardCard } from "components/core";
import { useFetch } from "hooks";
import { MouseEvent, useEffect, useState } from "react";

const ProjectDashBoard = () => {
	const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
	const [reqData, setReqData] = useState<any>([]);
	const open = Boolean(anchorEl);
	const handleClick = (event: MouseEvent<HTMLButtonElement>) => {
		setAnchorEl(event.currentTarget);
	};
	const handleClose = () => {
		setAnchorEl(null);
	};

	const { data: projectData, mutate } = useFetch<any>(
		`projects/dashboard/details`
	);
	console.log(projectData?.yearWiseProjectCounts);

	useEffect(() => {
		const demo = projectData?.yearWiseProjectCounts?.map((item: any) => {
			return {
				status: item?.year ? item?.year : "Not mentioned",
				data: [item?.data[0]?.count ? item?.data[0]?.count : 0],
			};
		});
		setReqData(demo);
	}, [projectData?.yearWiseProjectCounts]);

	const cards = [
		{
			id: 1,
			img: PROJECT.src,
			count: projectData?.totalProjects || 0,
			title: "Total Project",
			bg: "from-blue-500 to-blue-300",
		},
		{
			id: 2,
			img: ON_GOING_PROJECT.src,
			count: projectData?.totalOngoingProjects || 0,
			bg: "from-yellow-500 to-yellow-300",
			title: "On Going Projects",
		},
		{
			id: 3,
			img: COMPLETED_PROJECT.src,
			count: projectData?.totalFinishedProjects || 0,
			bg: "from-emerald-500 to-emerald-300",
			title: "Finished Projects",
		},
		{
			id: 4,
			img: PENDING_PROJECT.src,
			count: projectData?.totalPendingProject || 0,
			bg: "from-purple-500 to-purple-300",
			title: "Pending",
		},
	];

	console.log(reqData);

	return (
		<>
			<div className="flex gap-2 py-4">
				<div className="w-3/4 px-4 ">
					<DashboardCard data={cards} />
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
						// series={}
						series={reqData ? reqData : []}
						categories={projectData?.yearWiseProjectCounts?.map(
							(item: any) => item?.data[0]?.year
						)}
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
