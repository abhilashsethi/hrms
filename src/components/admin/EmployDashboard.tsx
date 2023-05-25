import {
	DailyAttendance,
	GenderRation,
	RolewiseStrength,
} from "components/analytics";
import { Grid, IconButton, Menu, MenuItem } from "@mui/material";
import { DashboardCard, UpcomingLeaves } from "components/core";
import { useState, MouseEvent } from "react";
import ICONS from "assets/icons";
import { useFetch } from "hooks";
import {
	AccountTreeRounded,
	AssignmentTurnedIn,
	ContactPhone,
	DevicesOther,
	DoNotTouchRounded,
	MoreVert,
	PendingActions,
	People,
	PlaylistAddCheckCircleRounded,
} from "@mui/icons-material";
import { Projects, User } from "types";
import Link from "next/link";
import {
	CARDICON1,
	CARDICON2,
	CARDICON3,
	CARDICON4,
} from "assets/dashboard_Icons";

const EmployDashboard = () => {
	const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
	const open = Boolean(anchorEl);
	const handleClick = (event: MouseEvent<HTMLButtonElement>) => {
		setAnchorEl(event.currentTarget);
	};
	const handleClose = () => {
		setAnchorEl(null);
	};
	const { data: cardDetails } = useFetch<{
		cards?: {
			scannedCards?: number | undefined;
			blockedCards?: number | undefined;
			cardsAssignedToEmployee?: number | undefined;
			cardsAssignedToGuest?: number | undefined;
		};
	}>(`cards/dashboard/details`);

	const { data: projectData } = useFetch<Projects[]>(`projects`);
	// console.log(projectData);

	const { data: employeeData, mutate } = useFetch<User[]>(`users`);
	// console.log(employeeData);

	const { data: employeeDetails } = useFetch<any>(`users/dashboard/details`);
	console.log(employeeDetails);
	const roleData = employeeDetails?.departmentWiseUsers;
	// const cards1 = [
	// 	{
	// 		id: 1,
	// 		icon: <People fontSize="large" className="text-theme" />,
	// 		count: employeeData?.length,
	// 		route: "/admin/employees/all-employees",
	// 		title: "Total Employees",
	// 	},
	// 	{
	// 		id: 2,
	// 		icon: <AccountTreeRounded fontSize="large" className="text-theme" />,
	// 		count:
	// 			employeeData?.filter((item) => item?.isBlocked === false)?.length || 0,
	// 		route: "",
	// 		title: "Active Employees",
	// 	},
	// 	{
	// 		id: 3,
	// 		icon: (
	// 			<PlaylistAddCheckCircleRounded
	// 				fontSize="large"
	// 				className="text-theme"
	// 			/>
	// 		),
	// 		route: "",
	// 		count: employeeData?.filter((item) => item?.isBlocked)?.length || 0,
	// 		title: "Inactive Employees",
	// 	},
	// 	{
	// 		id: 4,
	// 		icon: <DoNotTouchRounded fontSize="large" className="text-theme" />,
	// 		count:
	// 			employeeData?.filter((item) => item?.isOfficeAccessGranted)?.length ||
	// 			0,
	// 		route: "",
	// 		title: "Total Office Access",
	// 	},
	// ];
	const cards = [
		{
			id: 1,
			icon: <ContactPhone className="text-theme" />,
			count: employeeData?.length ? employeeData?.length : 0,
			title: "All Employees",
			img: CARDICON1.src,
			bg: "from-blue-500 to-blue-300",
			className: "h-40",
		},
		{
			id: 4,
			icon: <DevicesOther className="text-theme" />,
			count: cardDetails?.cards?.cardsAssignedToEmployee
				? cardDetails?.cards?.cardsAssignedToEmployee
				: 0,
			title: "Assigned to Cards",
			bg: "from-purple-500 to-purple-300",
			img: CARDICON4.src,
			className: "h-40",
		},
		{
			id: 2,
			icon: <PendingActions className="text-theme" />,
			count: employeeData?.filter((item) => item?.isBlocked)?.length || 0,
			title: "Blocked",
			bg: "from-yellow-500 to-yellow-300",
			img: CARDICON2.src,
			className: "h-40",
		},
		{
			id: 3,
			icon: <AssignmentTurnedIn className="text-theme" />,
			count:
				employeeData?.filter((item) => item?.isBlocked === false)?.length || 0,
			title: "Un-Blocked",
			bg: "from-emerald-500 to-emerald-300",
			img: CARDICON3.src,
			className: "h-40",
		},
	];

	return (
		<>
			<div className="flex gap-2 py-4">
				<div className="w-2/3 px-4 ">
					<div className="flex gap-2 py-4">
						<DashboardCard data={cards} />
					</div>

					<div className="grid grid-cols-12 content-between gap-10 m-5 !mb-6">
						<div className="col-span-12 pt-20 w-full  gap-5 md:col-span-12 lg:col-span-12 !border-grey-500 rounded-xl !shadow-xl">
							<DailyAttendance text="Employee's Report" type="area" />
						</div>
					</div>
				</div>
				<div className="w-1/3 p-3 bg-white rounded-xl shadow-xl flex flex-col gap-3">
					<h1 className="mt-2 font-bold text-theme">PROJECTS</h1>
					<div className="h-40 w-full border-2 rounded-xl py-4 px-6 flex tracking-wide">
						<div className="w-1/2 border-r-2 h-full flex flex-col gap-3 justify-center items-center">
							<span className="text-lg font-semibold text-theme">
								{projectData?.length ? projectData?.length : 0}
							</span>
							<span className="w-1/2 text-center font-semibold">
								Total Projects
							</span>
						</div>
						<div className="w-1/2 h-full flex flex-col gap-3 justify-center items-center">
							<span className="text-lg font-semibold text-theme">
								{projectData?.length
									? projectData?.filter((item) => item?.status === "Ongoing")
											?.length
									: 0}
							</span>
							<span className="w-1/2 text-center font-semibold">
								Projects Ongoing
							</span>
						</div>
					</div>
					<UpcomingLeaves data={employeeData} />
				</div>
			</div>
			<div className="grid grid-cols-12 content-between gap-6 mx-5 -mt-7 !mb-6">
				<div className="col-span-12 pt-9 w-full  gap-5 md:col-span-12 lg:col-span-7 !border-grey-500 rounded-xl !shadow-xl">
					<p className="text-lg font-bold text-center">Role-wise Strength</p>
					<RolewiseStrength
						series={[
							{
								name: "Strength",
								data: roleData?.length
									? roleData?.map((item: any) =>
											item?._count ? item?._count : 0
									  )
									: null,
							},
						]}
						categories={
							roleData?.length
								? roleData?.map((item: any) =>
										item?.name ? item?.name : "Not Specified"
								  )
								: null
						}
						text=""
						type="bar"
					/>
				</div>
				<div className="col-span-12  pt-9 w-full flex flex-col justify-center gap-5 md:col-span-12 lg:col-span-5 !border-gray-500 rounded-xl !shadow-xl">
					<p className="text-lg font-bold text-center">Employee Gender Ratio</p>
					<GenderRation
						genderData={employeeDetails?.groupByGender}
						text=""
						type="donut"
					/>
				</div>
			</div>
		</>
	);
};

export default EmployDashboard;
