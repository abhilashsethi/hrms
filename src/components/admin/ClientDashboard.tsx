import {
	AccountTreeRounded,
	People,
	PlaylistAddCheckCircleRounded,
} from "@mui/icons-material";
import { Grid } from "@mui/material";
import { useState, MouseEvent } from "react";
import {
	ClientLineCharts,
	ClientMultiDataChart,
	ClientPolarAreaCharts,
} from "components/analytics";
import ClientBarGraph from "components/analytics/ClientBarGraph";

const ClientDashboard = () => {
	const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
	const open = Boolean(anchorEl);
	const handleClick = (event: MouseEvent<HTMLButtonElement>) => {
		setAnchorEl(event.currentTarget);
	};
	const handleClose = () => {
		setAnchorEl(null);
	};

	return (
		<>
			<div className="flex gap-2 py-4">
				<div className="w-full px-4 ">
					<Grid container spacing={2}>
						{cards?.map((item) => (
							<Grid key={item?.id} item lg={3}>
								<div className="hover:scale-105 cursor-pointer transition duration-500 ease-in-out w-full tracking-wide h-full bg-white shadow-lg rounded-xl p-4 flex flex-col gap-2 justify-center items-center border-4 border-b-theme">
									<div className=" flex justify-center items-center">
										{item?.icon}
									</div>
									<p className="text-base font-semibold text-center">
										{item?.title}
									</p>
									<p className="text-lg font-bold text-gray-600">
										{item?.count}
									</p>
								</div>
							</Grid>
						))}
					</Grid>
					<div className="grid grid-cols-12 content-between gap-6  m-5 !mb-6">
						<div className="col-span-12 pt-9 w-full  gap-5 md:col-span-12 lg:col-span-8 !border-grey-500 rounded-xl !shadow-xl">
							{/* <ClientMultiDataChart text="Client Strength" type="bar" /> */}
							<ClientBarGraph
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
								title="Client Strength"
								barHeight={360}
							/>
						</div>
						<div className="col-span-12 pt-9 w-full gap-5 md:col-span-12 lg:col-span-4 !border-grey-500 rounded-xl !shadow-xl">
							<ClientLineCharts text="Unblock/Block Report" type="donut" />
						</div>
					</div>
				</div>
			</div>
			<div className="grid grid-cols-12 content-between gap-6  m-5 !mb-6">
				<div className="col-span-12 pt-9 w-full  gap-5 md:col-span-12 lg:col-span-7 !border-grey-500 rounded-xl !shadow-xl">
					<ClientMultiDataChart text="Client Strength" type="bar" />
				</div>
				<div className="col-span-12 pt-9 w-full flex flex-col justify-center gap-5 md:col-span-12 lg:col-span-5 !border-gray-500 rounded-xl !shadow-xl">
					<ClientPolarAreaCharts text="Contact Ratio" type="polarArea" />
				</div>
			</div>
		</>
	);
};

export default ClientDashboard;

const cards = [
	{
		id: 1,
		icon: <People fontSize="large" className="text-theme" />,
		count: "34",
		title: "Total Clients",
	},
	{
		id: 2,
		icon: <AccountTreeRounded fontSize="large" className="text-theme" />,
		count: "34",
		title: "Active Clients",
	},
	{
		id: 3,
		icon: (
			<PlaylistAddCheckCircleRounded fontSize="large" className="text-theme" />
		),
		count: "34",
		title: "Inactive Clients",
	},
	{
		id: 4,
		icon: (
			<PlaylistAddCheckCircleRounded fontSize="large" className="text-theme" />
		),
		count: "34",
		title: "Blocked Clients",
	},
];
