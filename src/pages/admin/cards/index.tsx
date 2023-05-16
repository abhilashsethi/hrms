import CardsAreaChart from "components/analytics/CardsAreaChart";
import CardStatus from "components/analytics/CardStatus";
import { AdminBreadcrumbs, DashboardCard } from "components/core";
import PanelLayout from "layouts/panel";
import { Grid } from "@mui/material";
import { useFetch } from "hooks";
import {
	AssignmentTurnedIn,
	Block,
	ContactPhone,
	CreditCardRounded,
	CreditScore,
	DevicesOther,
	PendingActions,
	QrCodeScanner,
} from "@mui/icons-material";
import Link from "next/link";
import { Card } from "types";
import {
	CARDICON1,
	CARDICON2,
	CARDICON3,
	CARDICON4,
} from "assets/dashboard_Icons";

const Cards = () => {
	const { data: cardData, mutate } = useFetch<Card[]>(`cards`);
	// console.log(cardData);

	const cards1 = [
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
					<div className="flex gap-2 py-4">
						<DashboardCard data={cards} />
					</div>
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

const cards = [
	{
		id: 1,
		icon: <ContactPhone className="text-theme" />,
		count: "34",
		title: "Total Cards",
		img: CARDICON1.src,
		bg: "from-blue-500 to-blue-300",
	},
	{
		id: 2,
		icon: <PendingActions className="text-theme" />,
		count: "20",
		title: "Cards Assigned",
		bg: "from-yellow-500 to-yellow-300",
		img: CARDICON2.src,
	},
	{
		id: 3,
		icon: <AssignmentTurnedIn className="text-theme" />,
		count: "10",
		title: "Blocked Cards",
		bg: "from-emerald-500 to-emerald-300",
		img: CARDICON3.src,
	},
	{
		id: 4,
		icon: <DevicesOther className="text-theme" />,
		count: "18",
		title: "Scanned Cards",
		bg: "from-purple-500 to-purple-300",
		img: CARDICON4.src,
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
