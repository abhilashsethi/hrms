import { RoleBarChart, RoleDonutChart } from "components/analytics";
import { Grid, IconButton, Menu, MenuItem } from "@mui/material";
import { useState, MouseEvent } from "react";
import { useFetch } from "hooks";
import {
	ContentPasteGo,
	AssignmentTurnedIn,
	PendingActions,
	Pending,
	MoreVert,
} from "@mui/icons-material";

const RolesDashBoard = () => {
	const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
	const open = Boolean(anchorEl);
	const handleClick = (event: MouseEvent<HTMLButtonElement>) => {
		setAnchorEl(event.currentTarget);
	};
	const handleClose = () => {
		setAnchorEl(null);
	};

	const { data: roleData, mutate } = useFetch<any>(`roles`);
	console.log(roleData?.roles);

	const cards = [
		{
			id: 1,
			icon: (
				<ContentPasteGo
					fontSize="large"
					className="text-theme group-hover:text-white"
				/>
			),
			count: roleData?.roles?.length,
			title: "Total Roles",
		},
		{
			id: 2,
			icon: <PendingActions fontSize="large" className="text-theme" />,
			count: "34",
			title: "Developer",
		},
		{
			id: 3,
			icon: <AssignmentTurnedIn fontSize="large" className="text-theme" />,
			count: "34",
			title: "HR",
		},
		{
			id: 4,
			icon: <Pending fontSize="large" className="text-theme" />,
			count: "34",
			title: "Sales Executive",
		},
	];

	return (
		<>
			<div className="flex gap-2 py-4">
				<div className="w-full px-4 ">
					<Grid container spacing={2}>
						{cards?.map((item) => (
							<Grid key={item?.id} item lg={3}>
								<div className="border-4 border-b-theme h-32 bg-white w-full p-2 flex flex-col rounded-xl shadow-xl justify-between cursor-pointer hover:scale-105 transition duration-500 ease-in-out">
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
									<div className="flex justify-around items-center">
										<div>{item?.icon}</div>
										<span className="text-xl text-theme font-semibold">
											{item?.count}
										</span>
									</div>
									<span className=" text-theme font-semibold text-center tracking-wide text-lg">
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
					<p className="font-bold text-lg text-center">Role Overview</p>
					<RoleBarChart type="bar" text="" />
				</div>
				<div className="col-span-12 w-full flex flex-col justify-center md:col-span-12 lg:col-span-5 !border-gray-500 rounded-xl !shadow-xl">
					<p className="text-lg font-bold text-center">Role Details</p>
					<RoleDonutChart text="" type="donut" />
				</div>
			</div>
		</>
	);
};

export default RolesDashBoard;

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
