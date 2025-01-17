import { LinearProgress, Typography } from "@mui/material";
import {
	COMPLETED_PROJECT,
	ON_GOING_PROJECT,
	PENDING_PROJECT,
	PROJECT,
} from "assets/dashboard_Icons";
import {
	GuestDonutChart,
	ProjectBarGraph,
	ProjectsRadialBar,
} from "components/analytics";
import { DashboardCard } from "components/core";
import { useFetch } from "hooks";
import { MouseEvent, useEffect, useState } from "react";

const ProjectDashBoard = () => {
	const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
	const [reqData, setReqData] = useState([]);
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
	console.log(projectData);
	useEffect(() => {
		const demo = projectData?.yearWiseProjectCounts?.map((item: any) => {
			return {
				name: item?.status ? item?.status : "Not mentioned",
				data: [item?.data[0]?.count ? item?.data[0]?.count : 0],
			};
		});

		setReqData(demo);
	}, [projectData?.yearWiseProjectCounts, projectData?.totalProjects]);

	const cards = [
		{
			id: 1,
			img: PROJECT.src,
			count: projectData?.totalProjects || 0,
			title: "Total Project",
			bg: "from-blue-500 to-blue-300",
			className: "h-[9rem]",
			link: "/admin/projects/all-projects",
		},
		{
			id: 2,
			img: ON_GOING_PROJECT.src,
			count: projectData?.totalOngoingProjects || 0,
			bg: "from-yellow-500 to-yellow-300",
			className: "h-[9rem]",
			link: "/admin/projects/all-projects",
			title: "On Going Projects",
		},
		{
			id: 3,
			img: COMPLETED_PROJECT.src,
			count: projectData?.totalFinishedProjects || 0,
			bg: "from-emerald-500 to-emerald-300",
			className: "h-[9rem]",
			link: "/admin/projects/all-projects",
			title: "Completed Projects",
		},
		{
			id: 4,
			img: PENDING_PROJECT.src,
			count: projectData?.totalPendingProject || 0,
			bg: "from-purple-500 to-purple-300",
			className: "h-[9rem]",
			link: "/admin/projects/all-projects",
			title: "Pending",
		},
	];
	const stats = [
		{
			id: 5,
			title: "Total Projects",
			// growth: "+10%",
			value: projectData?.totalProjects,
			sub: projectData?.totalProjects,
			color: "warning",
		},
		{
			id: 1,
			title: "Completed Projects",
			// growth: "+10%",
			value: projectData?.totalFinishedProjects,
			sub: projectData?.totalProjects,
			color: "primary",
		},
		{
			id: 2,
			title: "On Hold Projects",
			// growth: "+10%",
			value: projectData?.totalOnHoldProjects,
			sub: projectData?.totalProjects,
			color: "secondary",
		},
		{
			id: 3,
			title: "On Going Projects",
			// growth: "+10%",
			value: projectData?.totalOngoingProjects,
			sub: projectData?.totalProjects,
			color: "success",
		},
		{
			id: 4,
			title: "Pending Projects",
			// growth: "+10%",
			value: projectData?.totalPendingProject,
			sub: projectData?.totalProjects,
			color: "warning",
		},
	];

	return (
		<>
			<div className="flex md:flex-row flex-col gap-2 py-4">
				<div className="md:w-3/4 px-4">
					<DashboardCard data={cards} />
					<div className="grid grid-cols-12 content-between gap-6  md:m-5 !mb-6">
						<div className="px-2 col-span-12 pt-9 w-full flex flex-col justify-center gap-2 md:col-span-12 lg:col-span-6 !border-gray-500 rounded-xl !shadow-xl">
							{/* <ProgressBarDealsDashboard /> */}
							<p className="text-lg text-center font-bold">
								Yearly Project Overview
							</p>
							<ProjectBarGraph
								// series={}
								series={reqData ? reqData : []}
								categories={
									projectData?.yearWiseProjectCounts?.length
										? projectData?.yearWiseProjectCounts?.map((item: any) =>
												item?.data?.map((item: any) => item?.year)
										  )[0]
										: []
								}
								colors={["#5B50A1", "#C43C5C", "#E97451"]}
								title=""
								barHeight={360}
							/>
						</div>

						<div className="px-2 col-span-12 py-9 w-full flex flex-col justify-center gap-2 md:col-span-12 lg:col-span-6 !border-gray-500 rounded-xl !shadow-xl">
							<p className="text-lg font-bold text-center">Total Projects</p>
							{projectData?.totalProjects && (
								<GuestDonutChart
									labels={["Completed", "On Going", "Pending", "On Hold"]}
									series={[
										projectData?.totalFinishedProjects,
										projectData?.totalOngoingProjects,
										projectData?.totalPendingProject,
										projectData?.totalOnHoldProjects,
									]}
									text=""
									type="donut"
									colors={[
										"#cddc39",
										"#a855f7",
										"#03a9f4",
										"#ef4444",
										"#3f51b5",
										"#e91e63",
										"#00bcd4",
										"#ffeb3b",
										"#76ff03",
										"#2962ff",
									]}
								/>
							)}
						</div>
					</div>
				</div>
				<div className="md:w-1/4 p-2 rounded-xl shadow-xl flex flex-col justify-around cursor-pointer">
					{stats.map((item) => (
						<div
							key={item?.id}
							className="h-32 w-full border-2 rounded-xl py-4 px-6 flex flex-col justify-between tracking-wide hover:scale-95 transition duration-200 ease-in-out"
						>
							<div className="flex justify-between items-center">
								<Typography className={`text-theme font-semibold`}>
									{item?.title}
								</Typography>
								{/* <span className="font-semibold text-emerald-600">+10%</span> */}
							</div>
							<span className="text-xl font-bold">{item?.value}</span>
							<div>
								<LinearProgress
									variant="determinate"
									color={item?.color as any}
									value={item?.value}
								/>
								<span className="text-sm pt-6">
									Overall Projects {projectData?.totalProjects}
								</span>
							</div>
						</div>
					))}
				</div>
			</div>
		</>
	);
};

export default ProjectDashBoard;
