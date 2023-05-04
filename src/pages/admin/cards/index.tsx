import CardsAreaChart from "components/analytics/CardsAreaChart";
import CardStatus from "components/analytics/CardStatus";
import { AdminBreadcrumbs } from "components/core";
import PanelLayout from "layouts/panel";
import { Grid } from "@mui/material";
import { useFetch } from "hooks";
import {
	Block,
	CreditCardRounded,
	CreditScore,
	QrCodeScanner,
} from "@mui/icons-material";
import Link from "next/link";
import { Card } from "types";

const Cards = () => {
	const { data: cardData, mutate } = useFetch<Card[]>(`cards`);
	// console.log(cardData);

	const cards = [
		{
			id: 1,
			title: "Total Cards",
			value: cardData?.length,
			icon: (
				<CreditCardRounded
					fontSize="large"
					className="text-theme group-hover:text-white"
				/>
			),
		},
		{
			id: 2,
			title: "Cards Assigned",
			value: cardData?.filter((item) => item?.userId)?.length,
			icon: (
				<CreditScore
					fontSize="large"
					className="text-theme group-hover:text-white"
				/>
			),
		},
		{
			id: 3,
			title: "Blocked Cards",
			value: cardData?.filter((item) => item?.isBlocked === true)?.length || 0,
			icon: (
				<Block fontSize="large" className="text-theme group-hover:text-white" />
			),
		},
		{
			id: 4,
			title: "Scanned Cards",
			value: cardData?.length,
			icon: (
				<QrCodeScanner
					fontSize="large"
					className="text-theme group-hover:text-white"
				/>
			),
		},
	];

	return (
		<PanelLayout title="Cards Dashboard - SY HR MS">
			<section className="px-8 py-4">
				<AdminBreadcrumbs links={links} />
				<div className="mt-4">
					<Grid container spacing={2}>
						{cards?.map((item) => (
							<Grid key={item?.id} item lg={3}>
								<div className="group hover:bg-theme hover:border-b-0 cursor-pointer transition duration-500 ease-in-out w-full tracking-wide h-32 bg-white shadow-lg rounded-xl p-4 flex flex-col gap-2 justify-center items-center border-4 border-b-theme">
									<div className="flex justify-center items-center">
										{item?.icon}
									</div>
									<p className="text-base font-semibold text-center group-hover:text-white">
										{item?.title}
									</p>
									<p className="text-lg font-bold text-gray-600 group-hover:text-white">
										{item?.value}
									</p>
								</div>
							</Grid>
						))}
					</Grid>
				</div>
				<div className="grid grid-cols-12 content-between gap-6  m-5 !mb-6">
					<div className="col-span-12 pt-9 w-full  gap-5 md:col-span-12 lg:col-span-7 !border-grey-500 rounded-xl !shadow-xl">
						<CardsAreaChart text="Repairs Report" type="area" />
					</div>
					<div className="col-span-12 pt-9 w-full flex flex-col justify-center gap-5 md:col-span-12 lg:col-span-5 !border-gray-500 rounded-xl !shadow-xl">
						<p className="text-lg font-bold text-center">Scanned Users</p>
						<CardStatus text="" type="donut" />
					</div>
				</div>
			</section>
		</PanelLayout>
	);
};

export default Cards;

const links = [{ id: 1, page: "Cards", link: "/admin/cards" }];

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

const project_cards = [
	{
		id: 1,
		title: "Total Projects",
		value: 385,
	},
	{
		id: 1,
		title: "Completed Projects",
		value: 85,
	},
];

const task_status = [
	{
		id: 1,
		title: "Completed Task",
		value: 166,
		color: "secondary",
	},
	{
		id: 2,
		title: "Inprogress Tasks",
		value: 115,
		color: "warning",
	},
	{
		id: 3,
		title: "On Hold Tasks",
		value: 31,
		color: "success",
	},
	{
		id: 4,
		title: "Pending Tasks",
		value: 47,
		color: "error",
	},
	{
		id: 5,
		title: "Review Tasks",
		value: 5,
		color: "primary",
	},
];
