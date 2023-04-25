import { Groups, HowToReg, MoreVert, PersonOff } from "@mui/icons-material";
import { Grid, IconButton, Menu, MenuItem } from "@mui/material";
import DailyAttendance from "components/analytics/DailyAttendance";
import React from "react";

const AttendanceDashBoard = () => {
	const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
	const open = Boolean(anchorEl);
	const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
		setAnchorEl(event.currentTarget);
	};
	const handleClose = () => {
		setAnchorEl(null);
	};
	return (
		<>
			<div className="flex gap-2 py-4">
				<div className="w-3/4 px-4 ">
					<Grid container spacing={2}>
						{cards?.map((item) => (
							<Grid key={item?.id} item lg={4}>
								<div className="group card1 h-36 bg-white w-full p-2 flex flex-col rounded-xl shadow-xl justify-between cursor-pointer">
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
											<MenuItem onClick={handleClose}>All Users</MenuItem>
											<MenuItem onClick={handleClose}>View Dashboard</MenuItem>
										</Menu>
									</div>
									<div className="flex justify-around items-center">
										<div>{item?.icon}</div>
										<span className="text-xl text-theme font-semibold group-hover:text-white">
											{item?.count}
										</span>
									</div>
									<span className="group-hover:text-white text-theme font-semibold text-center tracking-wide text-lg">
										{item?.title}
									</span>
								</div>
							</Grid>
						))}
					</Grid>
					<div className="grid grid-cols-12 content-between gap-6  m-5 !mb-6">
						<div className="col-span-12 pt-9 w-full  gap-5 md:col-span-12 lg:col-span-12 !border-grey-500 rounded-xl !shadow-xl">
							<DailyAttendance text="Attendance" type="area" />
						</div>
					</div>
				</div>
				<div className="w-1/4 p-3 bg-white rounded-xl shadow-xl flex flex-col gap-3">
					<h1 className="mt-2 font-bold text-theme">Attendance</h1>
					<div className="h-40 w-full border-2 rounded-xl py-4 px-6 flex tracking-wide">
						<div className="w-1/2 border-r-2 h-full flex flex-col gap-3 justify-center items-center">
							<span className="text-lg font-semibold text-theme">21</span>
							<span className="w-1/2 text-center font-semibold">
								Total Present
							</span>
						</div>
						<div className="w-1/2 h-full flex flex-col gap-3 justify-center items-center">
							<span className="text-lg font-semibold text-theme">10</span>
							<span className="w-1/2 text-center font-semibold">
								Total Absent
							</span>
						</div>
					</div>
				</div>
			</div>
			{/* <div className="grid grid-cols-12 content-between gap-6  m-5 !mb-6">
				<div className="col-span-12 pt-9 w-full  gap-5 md:col-span-12 lg:col-span-7 !border-grey-500 rounded-xl !shadow-xl">
					<RolewiseStrength text="Role-wise Strength" type="bar" />
				</div>
				<div className="col-span-12 pt-9 w-full flex flex-col justify-center gap-5 md:col-span-12 lg:col-span-5 !border-gray-500 rounded-xl !shadow-xl">
					<GenderRation text="Employee Gender Ratio" type="donut" />
				</div>
			</div> */}
		</>
	);
};

export default AttendanceDashBoard;

const cards = [
	{
		id: 1,
		icon: (
			<HowToReg
				fontSize="large"
				className="text-theme text-[3rem] group-hover:text-white shadow-xl rounded-lg"
			/>
		),
		count: "34",
		title: "Today Present",
	},
	{
		id: 2,
		icon: (
			<PersonOff
				fontSize="large"
				className="text-theme text-[3rem] group-hover:text-white shadow-xl rounded-lg"
			/>
		),
		count: "10",
		title: "Today Absent",
	},
	{
		id: 3,
		icon: (
			<Groups
				fontSize="large"
				className="text-theme text-[3rem] group-hover:text-white shadow-xl rounded-lg"
			/>
		),
		count: "44",
		title: "Total Employees",
	},
];
