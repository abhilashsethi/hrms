import {
	Block,
	CreditCardRounded,
	CreditScore,
	QrCodeScanner,
} from "@mui/icons-material";
import { Avatar, Grid } from "@mui/material";
import ICONS from "assets/icons";
import CardStatus from "components/analytics/CardStatus";
import AttendanceReport from "components/analytics/AttendanceReport";
import UserRole from "components/analytics/UserRole";
import { AdminBreadcrumbs } from "components/core";
import PanelLayout from "layouts/panel";

const Cards = () => {
	return (
		<PanelLayout title="Cards Dashboard - SY HR MS">
			<section className="px-8 py-4">
				<AdminBreadcrumbs links={links} />
				<div className="mt-4">
					<Grid container spacing={2}>
						{cards?.map((item) => (
							<Grid key={item?.id} item lg={3}>
								<div className="deals-card group hover:bg-theme transition duration-500 ease-in-out w-full tracking-wide  h-full bg-white shadow-lg rounded-xl p-4 flex flex-col gap-2 justify-center items-center">
									<div className=" flex justify-center items-center">
										{/* <CreditCardRounded
											fontSize="large"
											className="text-theme group-hover:text-white"
										/> */}
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
						<AttendanceReport text="Repairs Report" type="bar" />
					</div>
					<div className="col-span-12 pt-9 w-full flex flex-col justify-center gap-5 md:col-span-12 lg:col-span-5 !border-gray-500 rounded-xl !shadow-xl">
						<CardStatus text="Patient's Gender Ratio" type="donut" />
					</div>
					{/* card section */}
					<div className="px-2 col-span-12 pt-9 w-full flex flex-col justify-center gap-2 md:col-span-12 lg:col-span-4 !border-gray-500 rounded-xl !shadow-xl">
						<div className="font-semibold pl-2 py-3 space-y-2">
							<p>
								Total Present :{" "}
								<span className="p-[1px] rounded-md text-green-700 bg-green-300">
									50
								</span>
							</p>
							<p>
								Total Absent :{" "}
								<span className="p-[1px] rounded-md text-red-700 bg-red-300">
									06
								</span>
							</p>
						</div>
						<div className="border border-1 rounded-lg p-5 mb-2">
							<div className="flex items-center gap-3">
								<Avatar />
								<div className="flex flex-col">
									<p className="font-medium text-sm">
										Name:{" "}
										<span className="font-semibold text-sm">Abhilash</span>
									</p>
									<p className="font-medium text-sm">
										Id: <span className="font-semibold text-sm">1234</span>
									</p>
								</div>
							</div>
							<div className="flex justify-between items-center mt-3">
								<div className="text-sm font-semibold ">
									<p>Leave Date</p>
									<p>4 May 2023</p>
								</div>
								<button className="hover:scale-105 transition duration-500 ease-in-out text-xs font-medium text-red-700 bg-red-300 p-1 h-7 rounded-lg text-center">
									Pending
								</button>
							</div>
						</div>
						<div className="border border-1 rounded-lg p-5 mb-2">
							<div className="flex items-center gap-3">
								<Avatar />
								<div className="flex flex-col">
									<p className="font-medium text-sm">
										Name:{" "}
										<span className="font-semibold text-sm">Abhilash</span>
									</p>
									<p className="font-medium text-sm">
										Id: <span className="font-semibold text-sm">1234</span>
									</p>
								</div>
							</div>
							<div className="flex justify-between items-center mt-3">
								<div className="text-sm font-semibold ">
									<p>Leave Date</p>
									<p>4 May 2023</p>
								</div>
								<button className="hover:scale-105 transition duration-500 ease-in-out text-xs font-medium text-green-700 bg-green-300 p-1 h-7 rounded-lg text-center">
									Approved
								</button>
							</div>
						</div>
						<button className="w-1/4 p-1 mb-3 hover:scale-105 transition duration-500 ease-in-out rounded-lg m-auto border border-1 bg-slate-400 text-sm font-semibold">
							Load More
						</button>
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
		title: "Total Cards",
		value: "12",
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
		value: "1",
		icon: (
			<CreditScore
				fontSize="large"
				className="text-theme  group-hover:text-white"
			/>
		),
	},
	{
		id: 3,
		title: "Blocked Cards",
		value: "2",
		icon: (
			<Block fontSize="large" className="text-theme group-hover:text-white" />
		),
	},
	{
		id: 4,
		title: "Scanned Cards",
		value: "4",
		icon: (
			<QrCodeScanner
				fontSize="large"
				className="text-theme group-hover:text-white"
			/>
		),
	},
];
