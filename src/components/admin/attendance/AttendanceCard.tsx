import { Groups, HowToReg, PersonOff } from "@mui/icons-material";
import { Grid } from "@mui/material";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import { useEffect, useState } from "react";
import { HeadText, UpcomingLeaves } from "components/core";
import { useFetch } from "hooks";
import moment from "moment";
import EmployeeAllAttendance from "../EmployeeAllAttendance";
interface Props {
	allData?: any;
	absentData?: any;
	presentData?: any;
}
const AttendanceDashBoard = ({ allData, absentData, presentData }: Props) => {
	const [attendances, setAttendances] = useState([]);
	function renderEventContent(eventInfo: any) {
		return (
			<>
				{eventInfo.event.title === "PRESENT" && (
					<div className="flex flex-col">
						<div className="flex justify-center bg-green-300 text-green-600">
							<span className="font-semibold">PRESENT</span> :{" "}
							{eventInfo?.event?.extendedProps?.present}
						</div>
						<div className="flex justify-center bg-red-300 text-red-600">
							<span className="font-semibold">ABSENT</span> :{" "}
							{eventInfo?.event?.extendedProps?.absent}
						</div>
					</div>
				)}
			</>
		);
	}

	const [currentMonth, setCurrentMonth] = useState("");
	const { data: attendanceData } = useFetch<any>(
		`attendances/get-by-month?month=${currentMonth}`
	);
	useEffect(() => {
		let reqData = attendanceData?.map((item: any) => {
			return {
				...item,
				date: `${moment(item?.date).format("YYYY-MM-DD")}`,
				title: "PRESENT",
				present: item?.present,
				absent: item?.absent,
			};
		});
		const myData = reqData?.filter((item: any) => item?.present);
		setAttendances(myData);
	}, [attendanceData]);

	const cards = [
		{
			id: 1,
			icon: (
				<HowToReg
					fontSize="large"
					className="text-theme group-hover:text-white shadow-xl rounded-lg"
				/>
			),
			count: `${presentData?.length ? presentData?.length : `0`}`,
			title: "Today Present",
		},
		{
			id: 2,
			icon: (
				<PersonOff
					fontSize="large"
					className="text-theme group-hover:text-white shadow-xl rounded-lg"
				/>
			),
			count: `${absentData?.length ? absentData?.length : `0`}`,
			title: "Today Absent",
		},
		{
			id: 3,
			icon: (
				<Groups
					fontSize="large"
					className="text-theme group-hover:text-white shadow-xl rounded-lg"
				/>
			),
			count: `${allData?.length ? allData?.length : `0`}`,
			title: "Total Employees",
		},
	];

	return (
		<>
			<div className="grid lg:grid-cols-3 gap-4">
				<div className="lg:col-span-2">
					<div className="grid lg:grid-cols-3 gap-4 py-4">
						{cards?.map((item) => (
							<div
								key={item?.id}
								className="hover:scale-105 bg-white transition duration-300 ease-in-out border-2 border-b-theme h-28 w-full p-2 flex flex-col rounded-xl shadow-xl justify-between cursor-pointer"
							>
								<div className="flex justify-around items-center">
									<div>{item?.icon}</div>
								</div>
								<span className="pt-2 text-theme font-semibold text-center tracking-wide text-md">
									{item?.title}
								</span>
								<span className="text-xl text-theme text-center font-semibold ">
									{item?.count}
								</span>
							</div>
						))}
					</div>
					<div className="mt-6">
						<div className="mb-4">
							<HeadText title="Month-wise attendance" />
						</div>
						<div className="bg-white p-4 rounded-lg shadow-xl">
							<FullCalendar
								plugins={[dayGridPlugin]}
								initialView="dayGridMonth"
								weekends={true}
								eventContent={renderEventContent}
								events={attendances}
								datesSet={(dateInfo: any) =>
									setCurrentMonth(dateInfo?.view?.currentStart?.getMonth())
								}
							/>
						</div>
					</div>
				</div>
				<div className="">
					<EmployeeAllAttendance />
					<UpcomingLeaves />
				</div>
			</div>
		</>
	);
};

export default AttendanceDashBoard;
