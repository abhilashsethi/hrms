import PanelLayout from "layouts/panel";
import { AdminBreadcrumbs, HeadText } from "components/core";
import { EmployeeDetails } from "components/admin";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction"; // needed for dayClick
import { BarChart, Check, Close } from "@mui/icons-material";
import { useFetch } from "hooks";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import moment from "moment";
import { Button } from "@mui/material";
import Link from "next/link";

const EmployeeProfile = () => {
	const [activeMonth, setActiveMonth] = useState();
	console.log(activeMonth);
	const router = useRouter();
	const [attendances, setAttendances] = useState<any>([]);
	function renderEventContent(eventInfo: any) {
		return (
			<>
				<span
					className={`flex items-center px-4 py-1 border-[1px] justify-center font-semibold ${
						eventInfo.event.title === "PRESENT"
							? `bg-emerald-200 text-green-500 border-green-400`
							: `bg-red-200 text-red-500 border-red-400`
					}`}
				>
					{eventInfo.event.title === "PRESENT" ? (
						<Check fontSize="small" />
					) : (
						<Close fontSize="small" />
					)}
					{eventInfo.event.title === "PRESENT" ? "PRESENT" : "ABSENT"}
				</span>
				{eventInfo.event.title === "PRESENT" && (
					<div className="flex flex-col">
						<span>
							IN TIME :
							{moment(eventInfo.event.extendedProps.inTime).format("hh:mm A")}
						</span>
						<span>
							OUT TIME :
							{moment(eventInfo.event.extendedProps.outTime).format("hh:mm A")}
						</span>
					</div>
				)}
			</>
		);
	}
	const { data: attendanceData, isLoading } = useFetch<any>(
		`attendances/${router?.query?.id}`
	);
	useEffect(() => {
		let reqData = attendanceData?.map((item: any) => {
			return {
				...item,
				title: "PRESENT",
				date: `${moment(item?.date).format("YYYY-MM-DD")}`,
			};
		});
		setAttendances(reqData);
	}, [attendanceData]);

	const links = [
		{ id: 1, page: "Employees", link: "/admin/employees" },
		{
			id: 2,
			page: "Employee Profile",
			link: `/admin/employees/employee-profile?id=${router?.query?.id}`,
		},
	];

	return (
		<PanelLayout title="User Profile - SY HR MS">
			<section className="md:px-8 px-2 mx-auto">
				<div className="pb-4">
					<AdminBreadcrumbs links={links} />
				</div>
				<EmployeeDetails />
				{/* <CardHead /> */}
				{/* <ProfileTabs /> */}
				{isLoading ? null : (
					<div className="flex gap-3">
						<div className="w-full">
							<div className="mb-4 flex justify-between">
								<HeadText title="Month wise attendance" />
								<Link
									href={`/admin/employees/attendance-report?empId=${router?.query?.id}`}
								>
									<Button
										variant="contained"
										className="!bg-theme"
										startIcon={<BarChart />}
									>
										VIEW REPORT
									</Button>
								</Link>
							</div>
							<FullCalendar
								plugins={[dayGridPlugin, interactionPlugin]}
								initialView="dayGridMonth"
								weekends={true}
								eventContent={renderEventContent}
								events={attendances}
								datesSet={(dateInfo: any) =>
									setActiveMonth(dateInfo?.view?.currentStart?.getMonth())
								}
							/>
						</div>
					</div>
				)}
			</section>
		</PanelLayout>
	);
};

export default EmployeeProfile;

// const attendance = [
//   { title: "PRESENT", date: "2023-04-03" },
//   { title: "ABSENT", date: "2023-04-04" },
//   { title: "PRESENT", date: "2023-04-05" },
// ];
