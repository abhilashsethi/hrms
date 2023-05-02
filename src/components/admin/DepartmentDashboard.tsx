import { MoreVert } from "@mui/icons-material";
import { Grid, IconButton, Menu, MenuItem } from "@mui/material";
import { RoleBarChart, RoleDonutChart } from "components/analytics";
import { useFetch } from "hooks";
import { useState, MouseEvent } from "react";

const DepartmentDashboard = () => {
	const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
	const open = Boolean(anchorEl);
	const handleClick = (event: MouseEvent<HTMLButtonElement>) => {
		setAnchorEl(event.currentTarget);
	};
	const handleClose = () => {
		setAnchorEl(null);
	};

	const { data: departmentData } = useFetch<any>(`departments`);
	console.log(departmentData);

	const { data: roleData, mutate } = useFetch<any>(`roles`);
	console.log(roleData?.roles);

	const cards = [
		{
			id: 1,
			icon: <img className="w-16" src="/department.png" alt="dept icon" />,
			count: departmentData?.departments?.length,
			title: "Total Departments",
		},
		{
			id: 2,
			icon: <img className="" src="/coding.png" alt="Developer icon" />,
			count: "34",
			title: "AI & ML Department",
		},
		{
			id: 3,
			icon: <img className="" src="/hr.png" alt="" />,
			count: "34",
			title: "Web Development",
		},
		{
			id: 4,
			icon: <img src="/application.png" alt="" />,
			count: "34",
			title: "Application Development",
		},
		{
			id: 5,
			icon: <img src="/it_management.png" alt="" />,
			count: "34",
			title: "IT Management",
		},
		{
			id: 6,
			icon: <img src="/financial.png" alt="" />,
			count: "34",
			title: "Accounts Management",
		},
		{
			id: 7,
			icon: <img src="/businessman.png" alt="" />,
			count: "34",
			title: "Sales Management",
		},
		{
			id: 8,
			icon: <img src="/manager.png" alt="" />,
			count: "34",
			title: "Manager",
		},
	];

	return (
		<>
			<div className="flex gap-2 py-4">
				<div className="w-full px-4 ">
					<Grid container spacing={2}>
						{cards?.map((item) => (
							<Grid key={item?.id} item lg={3}>
								<div className="group hover:scale-105 transition duration-500 ease-in-out bg-white w-full p-2 flex flex-col rounded-xl shadow-xl justify-between cursor-pointer">
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
									<div className="flex justify-around items-center pb-3">
										<div className="p-3 bg-theme rounded-full">
											<div className="w-16">{item?.icon}</div>
										</div>
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
								<span className="text-theme font-semibold">Upcoming Roles</span>
								<span className="font-semibold text-emerald-600">+10%</span>
							</div>
							<span className="text-xl font-bold">10</span>
							<div>
								<LinearProgress variant="determinate" value={20} />
								<span className="text-sm pt-6">Overall Roles 218</span>
							</div>
						</div>
					))}
				</div> */}
			</div>
			<div className="grid grid-cols-12 content-between gap-6  m-5 !mb-6">
				<div className="px-2 col-span-12 pt-9 w-full flex flex-col justify-center gap-2 md:col-span-12 lg:col-span-7 !border-gray-500 rounded-xl !shadow-xl">
					<p className="font-bold text-lg text-center">Department Overview</p>
					<RoleBarChart type="bar" text="" />
				</div>
				<div className="col-span-12 w-full flex flex-col justify-center md:col-span-12 lg:col-span-5 !border-gray-500 rounded-xl !shadow-xl">
					<p className="text-lg font-bold text-center">Department Details</p>
					<RoleDonutChart text="" type="donut" />
				</div>
			</div>
		</>
	);
};

export default DepartmentDashboard;

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
	{
		id: 3,
		title: "Others",
		growth: "+10%",
		value: "10",
		sub: "Overall Roles 218",
	},
];
