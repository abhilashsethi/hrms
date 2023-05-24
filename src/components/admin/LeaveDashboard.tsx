import {
	ContentPasteGo,
	MoreVert,
	Pending,
	Schedule,
	Sick,
} from "@mui/icons-material";
import {
	Grid,
	IconButton,
	LinearProgress,
	Menu,
	MenuItem,
} from "@mui/material";
import { LeaveBarChart, LeaveDonutChart } from "components/analytics";
import { useFetch } from "hooks";
import { MouseEvent, useState } from "react";

const LeaveDashboard = () => {
	const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
	const open = Boolean(anchorEl);
	const handleClick = (event: MouseEvent<HTMLButtonElement>) => {
		setAnchorEl(event.currentTarget);
	};
	const handleClose = () => {
		setAnchorEl(null);
	};

	const { data: leaveData, isLoading } = useFetch<any>(
		`leaves/dashboard/details`
	);
	// console.log(leaveData);

	const monthWiseLeaveDetails = leaveData?.leaves?.monthWiseLeaveList;

	const cards = [
		{
			id: 1,
			icon: <ContentPasteGo fontSize="large" className="text-theme " />,
			count: leaveData?.leaves?.totalLeaves
				? leaveData?.leaves?.totalLeaves
				: 0,
			title: "Total Leaves",
		},
		{
			id: 2,
			icon: <Sick fontSize="large" className="text-theme " />,
			count: leaveData?.leaves?.leaveTypesList[1]?._count,
			title: "Sick Leave",
		},
		{
			id: 4,
			icon: <Pending fontSize="large" className="text-theme " />,
			count: leaveData?.leaves?.leaveTypesList[0]?._count,
			title: "Casual Leave",
		},
	];

	return (
		<>
			<div className="flex gap-2 py-4">
				<div className="w-3/4 px-4 ">
					<Grid container spacing={2}>
						{cards?.map((item) => (
							<Grid key={item?.id} item lg={4}>
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
			</div>
			<div className="grid grid-cols-12 content-between gap-6  m-5 !mb-6">
				<div className="px-2 col-span-12 pt-9 w-full flex flex-col justify-center gap-2 md:col-span-12 lg:col-span-7 !border-gray-500 rounded-xl !shadow-xl">
					<p className="font-bold text-lg text-center">Leave Overview</p>
					<LeaveBarChart
						series={[
							{
								name: "Sick Leave",
								data: [44, 55, 57, 56, 61, 58, 63, 60, 66],
							},

							{
								name: "Casual Leave",
								data: [35, 41, 36, 26, 45, 48, 52, 53, 41],
							},
						]}
						categories={[
							"Feb",
							"Mar",
							"Apr",
							"May",
							"Jun",
							"Jul",
							"Aug",
							"Sep",
							"Oct",
						]}
						type="bar"
						text=""
					/>
				</div>
				<div className="col-span-12 w-full flex flex-col justify-center md:col-span-12 lg:col-span-5 !border-gray-500 rounded-xl !shadow-xl">
					<p className="text-lg font-bold text-center">Leave Details</p>
					<LeaveDonutChart
						series={[
							leaveData?.leaves?.leaveTypesList[1]?._count,
							leaveData?.leaves?.leaveTypesList[0]?._count,
						]}
						text=""
						type="donut"
						labels={["Sick Leave", "Casual Leave"]}
					/>
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
