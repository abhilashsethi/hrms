import { MeetingAnalytics, MeetingDonutChart } from "components/analytics";
import {
	ContactPhone,
	DevicesOther,
	AssignmentTurnedIn,
	PendingActions,
} from "@mui/icons-material";
import { DashboardCard } from "components/core";
import {
	MEETINGICON,
	MEETINGICON2,
	MEETINGICON3,
	MEETINGICON4,
} from "assets/dashboard_Icons";

const MeetingDashBoard = () => {
	return (
		<>
			<div className="flex gap-2 py-4">
				<DashboardCard data={cards} />
			</div>
			<div className="grid grid-cols-12 content-between gap-6  m-5 !mb-6">
				<div className="col-span-12 pt-9 w-full  gap-5 md:col-span-12 lg:col-span-7 !border-grey-500 rounded-xl !shadow-xl">
					<p className="font-bold text-lg text-center">Meeting Overview</p>
					<MeetingAnalytics
						series={[
							{
								name: "Upcoming Meetings",
								type: "column",
								data: [23, 11, 22, 27, 13, 22, 37, 21, 44, 22, 30, 30],
							},
							{
								name: "Completed Meetings",
								type: "area",
								data: [44, 55, 41, 67, 22, 43, 21, 41, 56, 27, 43, 42],
							},
							{
								name: "Others",
								type: "line",
								data: [30, 25, 36, 30, 45, 35, 64, 52, 59, 36, 39, 20],
							},
						]}
						text=""
						type="line"
					/>
				</div>
				<div className="col-span-12 pt-9 w-full flex flex-col justify-center gap-5 md:col-span-12 lg:col-span-5 !border-gray-500 rounded-xl !shadow-xl">
					<p className="font-bold text-lg text-center">Meeting Details</p>
					<MeetingDonutChart text="" type="donut" />
				</div>
			</div>
		</>
	);
};

export default MeetingDashBoard;

const cards = [
	{
		id: 1,
		icon: <ContactPhone className="text-theme" />,
		count: "34",
		title: "Total Meetings",
		img: MEETINGICON.src,
		bg: "from-blue-500 to-blue-300",
	},
	{
		id: 2,
		icon: <PendingActions className="text-theme" />,
		count: "20",
		title: "Upcoming Meetings",
		bg: "from-yellow-500 to-yellow-300",
		img: MEETINGICON2.src,
	},
	{
		id: 3,
		icon: <AssignmentTurnedIn className="text-theme" />,
		count: "10",
		title: "Completed Meetings",
		bg: "from-emerald-500 to-emerald-300",
		img: MEETINGICON3.src,
	},
	{
		id: 4,
		icon: <DevicesOther className="text-theme" />,
		count: "18",
		title: "Total Meeting Locations",
		bg: "from-purple-500 to-purple-300",
		img: MEETINGICON4.src,
	},
];

const stats = [
	{
		id: 1,
		title: "Upcoming Meetings",
		growth: "+10%",
		value: "10",
		sub: "Overall Meetings 218",
	},
	{
		id: 2,
		title: "Pending Meetings",
		growth: "+10%",
		value: "10",
		sub: "Overall Meetings 218",
	},
	{
		id: 3,
		title: "Dome Meetings",
		growth: "+10%",
		value: "10",
		sub: "Overall Meetings 218",
	},
];
