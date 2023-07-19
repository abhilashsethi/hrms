import {
	Construction,
	Diversity2,
	ExitToApp,
	Groups3,
	MeetingRoom,
	People,
	PlaylistAddCheckCircleRounded,
	QrCodeScannerRounded,
	SupportAgent,
} from "@mui/icons-material";
import { Avatar, Grid, LinearProgress, Radio, Tooltip } from "@mui/material";
import { CardAsset } from "assets/home";
import {
	GuestBarChart,
	GuestDonutChart,
	ProjectOverview,
	TaskOverview,
} from "components/analytics";
import { NoDatas, PhotoViewer } from "components/core";
import { useAuth, useFetch } from "hooks";
import moment from "moment";
import Link from "next/link";
import { Leave } from "types";

const AdminDashboard = () => {
	const { user } = useAuth();
	const { data: projectDetails } = useFetch<any>(`projects/dashboard/details`);
	const { data: leaveData } = useFetch<Leave[]>(
		`leaves?${user?.id ? `userId=${user?.id}` : ""}`
	);
	const { data: projectData } = useFetch<any>(
		`clients/get/all/projects/${user?.id}`
	);
	const { data: leaveAll } = useFetch<any>(`leaves/all?orderBy=createdAt:asc`);
	console.log(leaveAll);

	const cards = [
		{
			id: 1,
			icon: <People fontSize="medium" className="text-theme" />,
			count: "34",
			title: "Total Employees",
			color: "bg-[#bbcbff]",
			link: "/admin/employees/all-employees",
		},
		{
			id: 2,
			icon: <QrCodeScannerRounded fontSize="medium" className="text-theme" />,
			count: "12",
			title: "Scanned Cards",
			color: "bg-[#b9e9fd]",
			link: "/admin/cards/scanned",
		},
		{
			id: 3,
			icon: (
				<PlaylistAddCheckCircleRounded
					fontSize="medium"
					className="text-theme "
				/>
			),
			count: "30",
			title: "Today's Attendance",
			color: "bg-[#f6c8ff]",
			link: "/admin/attendances/today",
		},
		{
			id: 4,
			icon: <People fontSize="medium" className="text-theme" />,
			count: "43",
			title: "Projects",
			color: "bg-[#feb76f]",
			link: "/admin/projects/all-projects",
		},
	];
	const project_cards = [
		{
			id: 1,
			title: "Total Projects",
			value: projectDetails?.totalProjects,
		},
		{
			id: 1,
			title: "Completed Projects",
			value: projectDetails?.totalFinishedProjects,
		},
	];
	const task_status = [
		{
			id: 1,
			title: "Completed Task",
			value: projectDetails?.totalFinishedProjects,
			color: "secondary",
		},
		{
			id: 2,
			title: "Inprogress Tasks",
			value: projectDetails?.totalOngoingProjects,
			color: "warning",
		},
		{
			id: 3,
			title: "On Hold Tasks",
			value: projectDetails?.totalOnHoldProjects,
			color: "success",
		},
		{
			id: 4,
			title: "Pending Tasks",
			value: projectDetails?.totalPendingProject,
			color: "error",
		},
	];

	return (
		<>
			<div className="flex gap-2 py-4 md:flex-row flex-col">
				<div className="md:w-3/4 px-4 w-full">
					<Grid
						container
						spacing={{
							xs: 1,
							sm: 2,
							md: 2,
						}}
					>
						{cards?.map((item, index) => (
							<Grid key={item?.id} item lg={3} md={6} sm={12} xs={12}>
								<Link href={item?.link}>
									<div
										className={`h-40 ${item?.color} w-full p-4 flex flex-col rounded-xl shadow-xl cursor-pointer hover:scale-105 transition duration-500 ease-in-out relative overflow-hidden`}
									>
										<img
											className="absolute right-[-35px] top-[-12px] h-24 object-contain"
											src={CardAsset.src}
											alt=""
										/>
										<div className="bg-white h-12 w-12 rounded-lg flex items-center justify-center">
											{item?.icon}
										</div>
										<span className="text-lg mt-6">{item?.count}</span>
										<span className="font-semibold tracking-wide text-sm ">
											{item?.title}
										</span>
									</div>
								</Link>
							</Grid>
						))}
						<div className="w-full mt-5">
							<p className="font-semibold text-lg pb-5 ml-5">Quick Access</p>{" "}
							<div className="flex justify-between px-8 flex-wrap">
								{Quick_Access?.map((item, index) => {
									return (
										<Tooltip key={index} title={item?.title}>
											<Link
												href={item?.link}
												// onClick={item?.onClick}
												className="w-24 h-24 rounded-full group flex justify-start items-center hover:scale-105 ease-in-out transition-all duration-400 cursor-pointer !text-blue-600 flex-col gap-2"
											>
												<div
													className={`p-2 w-12 h-12 flex justify-center items-center ${item?.color} shadow-lg rounded-md transition-all ease-in-out duration-200`}
												>
													<span>{item?.icon}</span>
												</div>
												<p className="text-xs text-center font-semibold">
													{item?.title}
												</p>
											</Link>
										</Tooltip>
									);
								})}
							</div>
						</div>
					</Grid>
					<div className="grid grid-cols-12 content-between gap-6  m-5 !mb-6">
						{/* attandance section */}
						<div className="px-2 col-span-12 pt-9 w-full flex flex-col justify-center gap-2 md:col-span-12 lg:col-span-6 !border-gray-500 rounded-xl !shadow-xl">
							<p className="text-center font-semibold text-lg">
								Branch Wise Employee Strength
							</p>
							<GuestDonutChart
								labels={["Approved", "Pending", "Rejected"]}
								series={[3, 4, 10]}
								text=""
								type="pie"
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
						</div>
						{/* Project section */}
						<div className="px-2 col-span-12 w-full flex flex-col justify-center gap-2 md:col-span-12 lg:col-span-6 !border-gray-500 rounded-xl !shadow-xl">
							<div className="font-semibold text-lg pb-5">
								<p>Projects</p>
							</div>
							<div className="flex justify-between gap-3 mb-7">
								{project_cards?.map?.((item, i) => {
									return (
										<div
											key={i}
											className="hover:scale-95 transition duration-500 ease-in-out cursor-pointer border border-gray-600 text-center w-1/2 py-5 rounded-md bg-slate-200 shadow-lg"
										>
											<p className={`text-xs  font-bold`}>{item?.title}</p>
											<p className="text-md font-semibold">{item?.value}</p>
										</div>
									);
								})}
							</div>
							<div className="flex flex-col gap-3">
								{/* <div className="w-full border border-gray-200 rounded-xl flex">
									<p
										className={`bg-[#9c27b0] w-[40%] h-7 text-white flex items-center justify-center text-xs font-semibold rounded-l-xl`}
									>
										40%
									</p>
									<p
										className={`bg-[#ed6c02] w-[22%] h-7 text-white flex items-center justify-center text-xs font-semibold`}
									>
										22%
									</p>
									<p
										className={`bg-[#2e7d32] w-[24%] h-7 text-white flex items-center justify-center text-xs font-semibold`}
									>
										24%
									</p>
									<p
										className={`bg-[#d32f2f] w-[21%] h-7 text-white flex items-center justify-center text-xs font-semibold  rounded-r-xl`}
									>
										21%
									</p>
									<p className="bg-[#1976d2] w-[10%] h-7 text-white flex items-center justify-center text-xs font-semibold rounded-r-xl">
										10%
									</p>
								</div> */}
								{task_status?.map((item, i) => {
									return (
										<div className="flex justify-between items-center" key={i}>
											<div className="flex items-center px-2  ">
												{/* <Radio size="small" color={item?.color as any} /> */}
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
				<div className="md:w-1/4 w-full p-2 rounded-xl shadow-xl flex flex-col gap-3">
					<div className="px-2 col-span-12 bg-white w-full flex flex-col justify-center gap-2 md:col-span-12 lg:col-span-6 !border-gray-500 rounded-xl !shadow-xl">
						<div className="font-semibold pl-2 py-3 space-y-2">
							<p>Recent Leaves </p>
						</div>
						<div className="h-[20rem] overflow-scroll">
							{leaveAll?.length ? (
								<>
									{leaveAll?.slice(0, 4)?.map?.((item: any, i: any) => {
										return (
											<div key={i}>
												<div className="border border-1 shadow-lg rounded-lg p-5 mb-2">
													<div className="flex items-center gap-3">
														<PhotoViewer
															name={item?.user?.name}
															photo={item?.user?.photo}
															size="3.3rem"
														/>
														<div className="flex flex-col">
															<p className="font-medium text-sm">
																Name:{" "}
																<span className="font-semibold text-sm">
																	{item?.user?.name}
																</span>
															</p>
															<p className="font-medium text-sm">
																Id:{" "}
																<span className="font-semibold text-sm">
																	{item?.user?.employeeID}
																</span>
															</p>
														</div>
													</div>
													<div className="flex justify-between items-center mt-3">
														<div className="text-sm font-semibold ">
															<p>Leave Type</p>
															<p>{item?.type}</p>
														</div>
														<button
															className={`hover:scale-105 transition duration-500 ease-in-out text-xs font-medium ${
																item?.status === "Rejected"
																	? `text-red-700 bg-red-300`
																	: item?.status === "Pending"
																	? `text-yellow-700 bg-yellow-300`
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
								</>
							) : (
								<NoDatas title={"No Leave Taken"} />
							)}
						</div>
					</div>
					<div className="w-full px-2 py-4 bg-white !border-gray-500 rounded-xl !shadow-xl">
						<p className="text-lg font-bold text-center">Recent Projects</p>
						<div className="grid lg:grid-cols-2 grid-cols-1 lg:px-8 px-2 py-4 gap-4">
							{projectData?.length ? (
								projectData
									?.slice(0, 4)
									?.sort(
										(a: any, b: any) =>
											(new Date(b?.createdAt) as any) -
											(new Date(a?.createdAt) as any)
									)
									?.map((item: any) => (
										<Link
											href={`/admin/projects/project-details?id=${item?.id}`}
											key={item?.id}
										>
											<div
												className={`h-full w-full bg-slate-200 py-4 lg:px-5 px-2 flex flex-col gap-2 rounded-xl shadow-xl cursor-pointer hover:scale-105 transition duration-300 ease-in-out`}
											>
												<Tooltip title="Project Manager">
													<span className="flex w-full justify-center justify-items-center">
														<PhotoViewer />
													</span>
												</Tooltip>
												<span className="font-semibold text-center tracking-wide text-lg">
													{item?.name}
												</span>
												<div className="grid lg:grid-cols-2 gap-4 text-sm text-center font-semibold">
													<div className="flex flex-col gap-1 rounded-lg px-3 py-2 bg-gradient-to-b from-gray-900 via-purple-900 to-violet-600 text-white justify-center w-full">
														<span>Start Date</span>
														<span>
															{item?.endDate
																? moment(item?.endDate).format("ll")
																: "Not Specified"}
														</span>
													</div>
													<div className="flex flex-col gap-1 rounded-lg px-3 py-2 bg-gradient-to-b from-gray-900 via-purple-900 to-violet-600 text-white justify-center w-full">
														<span>End Date</span>
														<span>
															{item?.startDate
																? moment(item?.startDate).format("ll")
																: "Not Specified"}
														</span>
													</div>
												</div>
											</div>
										</Link>
									))
							) : (
								<NoDatas title={"No Recent Projects"} />
							)}
						</div>
					</div>
				</div>
			</div>
			<div className="grid grid-cols-12 content-between gap-6  m-5 !mb-6">
				<div className="col-span-12 pt-9 w-full  gap-5 md:col-span-12 lg:col-span-6 !border-grey-500 rounded-xl !shadow-xl">
					<p className="font-semibold text-lg text-center">Tender Overview</p>
					<GuestBarChart
						labels={[
							"Jan",
							"Feb",
							"Mar",
							"Apr",
							"May",
							"Jun",
							"Jul",
							"Aug",
							"Sep",
							"Oct",
							"Nov",
							"Dec",
						]}
						data={[23, 8, 10, 10, 20, 10, 15, 23, 14, 8, 10, 9]}
						type="bar"
						text=""
					/>
				</div>
				<div className="col-span-12 pt-9 w-full flex flex-col justify-center gap-5 md:col-span-12 lg:col-span-6 !border-gray-500 rounded-xl !shadow-xl">
					<p className="font-semibold text-lg text-center">Task Overview</p>
					<TaskOverview text="" type="donut" />
				</div>
			</div>
		</>
	);
};

export default AdminDashboard;

const Quick_Access = [
	{
		id: 1,
		icon: <ExitToApp fontSize="medium" className="text-white" />,
		title: "Leaves",
		color: "bg-[#673ab7]",
		link: "/admin/leaves/all-leaves",
	},
	{
		id: 2,
		icon: <Groups3 fontSize="medium" className="text-white" />,
		title: "Roles",
		color: "bg-[#e91e63]",
		link: "/admin/roles/all-roles",
	},
	{
		id: 3,
		icon: <Diversity2 fontSize="medium" className="text-white" />,
		title: "Departments",
		color: "bg-[#ff9800]",
		link: "/admin/department/all-department",
	},
	{
		id: 4,
		icon: <MeetingRoom fontSize="medium" className="text-white" />,
		title: "Meetings",
		color: "bg-[#00bcd4]",
		link: "/admin/meetings/all-meetings",
	},
	{
		id: 5,
		icon: <People fontSize="medium" className="text-white" />,
		title: "Clients",
		color: "bg-[#607d8b]",
		link: "/admin/clients/all-clients",
	},
	{
		id: 6,
		icon: <Construction fontSize="medium" className="text-white" />,
		title: "Technologies",
		color: "bg-[#3f51b5]",
		link: "/admin/technologies/all-technologies",
	},
	{
		id: 7,
		icon: <SupportAgent fontSize="medium" className="text-white" />,
		title: "Support",
		color: "bg-[#4caf50]",
		link: "/admin/support",
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
