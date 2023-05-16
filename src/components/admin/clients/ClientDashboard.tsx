import {
	AccountTreeRounded,
	People,
	PlaylistAddCheckCircleRounded,
} from "@mui/icons-material";
import { Grid } from "@mui/material";
import { useState, MouseEvent } from "react";
import { ClientLineCharts } from "components/analytics";
import ClientBarGraph from "components/analytics/ClientBarGraph";
import { useFetch } from "hooks";
import { Client } from "types";
import { useRouter } from "next/router";
import { CUSTOMER, HANDSHAKE, INACTIVE } from "assets/dashboard_Icons";

const ClientDashboard = () => {
	const { data: clientData, isLoading } = useFetch<Client>(`clients/dashboard`);

	console.log("ksakckack", clientData);
	return (
		<>
			<div className="flex gap-2 py-4">
				<div className="w-full px-4 ">
					<Grid container spacing={2}>
						{cards?.map((item) => (
							<Grid key={item?.id} item lg={3}>
								<div
									className={`hover:scale-105 cursor-pointer transition duration-500 ease-in-out w-full tracking-wide ${item?.color} shadow-lg rounded-xl p-4 flex justify-between items-center h-36 `}
								>
									<div className="flex flex-col items-start gap-5">
										<p className="text-lg font-medium text-center text-white">
											{item?.title}
										</p>
										<div className="flex justify-center items-center">
											{item?.icon}
										</div>
									</div>

									<p className="text-2xl font-semibold text-white">
										{item?.count}
									</p>
								</div>
							</Grid>
						))}
					</Grid>
					<div className="grid grid-cols-12 content-between gap-6  m-5 !mb-6">
						<div className="col-span-12 pt-9 w-full  gap-5 md:col-span-12 lg:col-span-8 !border-grey-500 rounded-xl !shadow-xl">
							<p className="text-lg text-center font-bold">Client Strength</p>
							{/* <ClientMultiDataChart text="Client Strength" type="bar" /> */}
							<ClientBarGraph
								series={[
									{
										name: "ACTIVE CLIENTS",
										data: [44, 55, 41, 37, 56],
									},
									{
										name: "INACTIVE CLIENTS",
										data: [32, 32, 33, 22, 23],
									},
									{
										name: "BLOCKED CLIENTS",
										data: [10, 22, 8, 15, 13],
									},
								]}
								categories={["2022", "2021", "2020", "2019", "2018"]}
								colors={["#5B50A1", "#C43C5C", "#E97451"]}
								title=""
								barHeight={360}
							/>
						</div>
						<div className="col-span-12 pt-9 w-full gap-5 md:col-span-12 lg:col-span-4 !border-grey-500 rounded-xl !shadow-xl">
							<p className="text-center text-lg font-bold">
								Unblock/Block Report
							</p>
							<ClientLineCharts text="" type="donut" />
						</div>
					</div>
				</div>
			</div>
		</>
	);
};

export default ClientDashboard;

const cards = [
	{
		id: 1,
		// icon: <People fontSize="large" className="!text-white text-5xl" />,
		icon: <img src={HANDSHAKE.src} className="w-16" alt="" />,
		count: "34",
		title: "Total Clients",
		color: "bg-gradient-to-br from-blue-600 to-cyan-400",
	},
	{
		id: 2,
		icon: <img src={CUSTOMER.src} className="w-16" alt="" />,

		count: "20",
		title: "Active Clients",
		color: "bg-gradient-to-br from-green-500 to-emerald-400",
	},
	{
		id: 3,
		// icon: (
		// 	<PlaylistAddCheckCircleRounded
		// 		fontSize="large"
		// 		className="!text-white text-5xl"
		// 	/>
		// ),
		icon: <img src={INACTIVE.src} className="w-12" alt="" />,
		count: "18",
		title: "Inactive Clients",
		color: "bg-gradient-to-br from-orange-500 to-yellow-400",
	},
	{
		id: 4,
		icon: (
			<PlaylistAddCheckCircleRounded
				fontSize="large"
				className="!text-white text-5xl"
			/>
		),
		count: "10",
		title: "Blocked Clients",
		color: "bg-gradient-to-br from-[#ff5874] to-[#ff8196]",
	},
];
