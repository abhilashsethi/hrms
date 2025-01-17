import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction"; // needed for dayClick
import FullCalendar from "@fullcalendar/react";
import { BarChart, Check, Close } from "@mui/icons-material";
import { Button } from "@mui/material";
import { ProfileDetails } from "components/admin";
import { AdminBreadcrumbs, HeadText } from "components/core";
import { useAuth, useFetch } from "hooks";
import PanelLayout from "layouts/panel";
import moment from "moment";
import Link from "next/link";
import { useEffect, useState } from "react";
import { Attendance, AttendanceData, EventInfo } from "types";

const MyProfile = () => {
	const [activeMonth, setActiveMonth] = useState<Date | null>(null);
	const { user } = useAuth();
	const [isMobile, setIsMobile] = useState(false);
	const [monthName, setMonthName] = useState<number | null>();
	const [attendances, setAttendances] = useState<AttendanceData[]>([]);
	const { data: attendanceData, isLoading } = useFetch<Attendance[]>(
		`attendances/${user?.id}`
	);
	function renderEventContent(eventInfo: EventInfo) {
		return (
			<>
				<span
					className={`flex items-center px-4 py-1 border-[1px] justify-center font-semibold ${
						eventInfo.event.title === "PRESENT"
							? `bg-emerald-200 text-green-500 border-green-400`
							: `bg-red-200 text-red-500 border-red-400`
					}`}
				>
					<span className="md:block hidden">
						{eventInfo.event.title === "PRESENT" ? (
							<Check fontSize="small" />
						) : (
							<Close fontSize="small" />
						)}
						{eventInfo.event.title === "PRESENT" ? "PRESENT" : "ABSENT"}
					</span>
					{/* Mobile View start */}
					<span className="md:hidden px-2 block">
						{eventInfo.event?.extendedProps?.WFH
							? "WFH"
							: eventInfo.event.title === "PRESENT"
							? "P"
							: "A"}
					</span>
					{/* Mobile View end */}
				</span>
				{eventInfo.event.title === "PRESENT" && (
					<div className="md:flex flex-col hidden">
						{eventInfo.event?.extendedProps?.WFH ? (
							<>
								<span className="px-4 py-2 text-center">Work From Home.</span>
							</>
						) : (
							<>
								<span>
									IN TIME :
									{moment(eventInfo?.event?.extendedProps?.inTime).format(
										"hh:mm A"
									)}
								</span>
								<span>
									OUT TIME :
									{moment(eventInfo?.event?.extendedProps?.outTime).format(
										"hh:mm A"
									)}
								</span>
							</>
						)}
					</div>
				)}
			</>
		);
	}

	useEffect(() => {
		if (!attendanceData) return;
		// Filter and format the events based on the current month
		const currentMonthEvents = attendanceData
			.filter((item) => {
				const eventMonth = moment(item?.date).month();
				const currentMonth = moment(activeMonth).month();
				return eventMonth === currentMonth;
			})
			.map((item) => ({
				...item,
				title: "PRESENT",
				date: `${moment(item?.date).format("YYYY-MM-DD")}`,
			}));

		setAttendances(currentMonthEvents);
	}, [attendanceData, activeMonth]);

	const links = [
		{
			id: 2,
			page: "My Profile",
			link: `/admin/employees/my-profile`,
		},
	];
	const calendarClassName = "responsive-calendar";

	useEffect(() => {
		// Function to update the screen width state
		const updateScreenWidth = () => {
			setIsMobile(window.innerWidth < 768);
		};

		// Check if window is available (client-side) before adding the event listener
		if (typeof window !== "undefined") {
			updateScreenWidth();
			window.addEventListener("resize", updateScreenWidth); // Listen for window resize events
			return () => {
				window.removeEventListener("resize", updateScreenWidth); // Remove event listener to prevent memory leaks
			};
		}
	}, []);
	return (
		<PanelLayout title={`Employee Profile`}>
			<section className="md:px-8 px-2 py-4 mx-auto">
				<div className="pb-4 mt-4">
					<AdminBreadcrumbs links={links} />
				</div>
				<ProfileDetails />
				{isLoading ? null : (
					<div className="flex gap-3">
						<div className="w-full">
							<div className="mb-4 md:flex grid gap-2 justify-between">
								<HeadText title="Month wise attendance" />
								<Link
									href={`/admin/employees/attendance-report?empId=${user?.id}&month=${monthName}`}
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
							<div className={calendarClassName}>
								<FullCalendar
									plugins={[dayGridPlugin, interactionPlugin]}
									initialView="dayGridMonth"
									weekends={true}
									eventContent={renderEventContent}
									events={attendances}
									datesSet={(dateInfo) => {
										setActiveMonth(dateInfo?.view?.currentStart),
											setMonthName(dateInfo?.view?.currentStart?.getMonth());
									}}
								/>
							</div>
						</div>
					</div>
				)}
				{typeof window !== "undefined" && (
					<style>
						{`
            .fc-header-toolbar {
              flex-direction: ${isMobile ? "column" : "row"} !important;
            }
          `}
					</style>
				)}
			</section>
		</PanelLayout>
	);
};

export default MyProfile;
