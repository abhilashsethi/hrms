import {
	DailyAttendance,
	GenderRation,
	RolewiseStrength,
} from "components/analytics";
import { Grid, IconButton, Menu, MenuItem } from "@mui/material";
import { UpcomingLeaves } from "components/core";
import { useState, MouseEvent } from "react";
import ICONS from "assets/icons";
import { useFetch } from "hooks";
import {
	AccountTreeRounded,
	DoNotTouchRounded,
	MoreVert,
	People,
	PlaylistAddCheckCircleRounded,
} from "@mui/icons-material";
import { User } from "types";
import Link from "next/link";

const EmployDashboard = () => {
	const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
	const open = Boolean(anchorEl);
	const handleClick = (event: MouseEvent<HTMLButtonElement>) => {
		setAnchorEl(event.currentTarget);
	};
	const handleClose = () => {
		setAnchorEl(null);
	};

	const { data: employeeData, mutate } = useFetch<User[]>(`users`);
	// console.log(employeeData);

	const cards = [
		{
			id: 1,
			icon: <People fontSize="large" className="text-theme" />,
			count: employeeData?.length,
			route: "/admin/employees/all-employees",
			title: "Total Employees",
		},
		{
			id: 2,
			icon: <AccountTreeRounded fontSize="large" className="text-theme" />,
			count:
				employeeData?.filter((item) => item?.isBlocked === false)?.length || 0,
			route: "",
			title: "Active Employees",
		},
		{
			id: 3,
			icon: (
				<PlaylistAddCheckCircleRounded
					fontSize="large"
					className="text-theme"
				/>
			),
			route: "",
			count: employeeData?.filter((item) => item?.isBlocked)?.length || 0,
			title: "Inactive Employees",
		},
		{
			id: 4,
			icon: <DoNotTouchRounded fontSize="large" className="text-theme" />,
			count:
				employeeData?.filter((item) => item?.isOfficeAccessGranted)?.length ||
				0,
			route: "",
			title: "Total Office Access",
		},
	];

	return (
		<>
			<div className="flex gap-2 py-4">
				<div className="w-2/3 px-4 ">
					<Grid container spacing={2}>
						{cards?.map((item) => (
							<Grid key={item?.id} item lg={3}>
								<Link href={item?.route && item?.route}>
									<div className="cursor-pointer hover:scale-105 transition duration-500 ease-in-out h-56 bg-white w-full p-8 flex flex-col rounded-xl shadow-xl justify-between border-b-4 border-theme">
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
												<MenuItem onClick={handleClose}>
													View Dashboard
												</MenuItem>
											</Menu>
										</div>
										<div>{item?.icon}</div>
										<span className="text-lg">{item?.count}</span>
										<span className="font-semibold tracking-wide text-sm">
											{item?.title}
										</span>
									</div>
								</Link>
							</Grid>
						))}
					</Grid>
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
							<span className="text-lg font-semibold text-theme">21</span>
							<span className="w-1/2 text-center font-semibold">
								Total Tasks
							</span>
						</div>
						<div className="w-1/2 h-full flex flex-col gap-3 justify-center items-center">
							<span className="text-lg font-semibold text-theme">21</span>
							<span className="w-1/2 text-center font-semibold">
								Pending Tasks
							</span>
						</div>
					</div>
					<UpcomingLeaves />
				</div>
			</div>
			<div className="grid grid-cols-12 content-between gap-6 mx-5 -mt-7 !mb-6">
				<div className="col-span-12 pt-9 w-full  gap-5 md:col-span-12 lg:col-span-7 !border-grey-500 rounded-xl !shadow-xl">
					<p className="text-lg font-bold text-center">Role-wise Strength</p>
					<RolewiseStrength text="" type="bar" />
				</div>
				<div className="col-span-12 pt-9 w-full flex flex-col justify-center gap-5 md:col-span-12 lg:col-span-5 !border-gray-500 rounded-xl !shadow-xl">
					<p className="text-lg font-bold text-center">Employee Gender Ratio</p>
					<GenderRation text="" type="donut" />
				</div>
			</div>
		</>
	);
};

export default EmployDashboard;
