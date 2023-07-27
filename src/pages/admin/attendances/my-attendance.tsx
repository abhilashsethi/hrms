import { InsertInvitationRounded } from "@mui/icons-material";
import { IconButton } from "@mui/material";
import { AttendanceGrid } from "components/admin/attendance";
import { AdminBreadcrumbs, Loader, LoaderAnime } from "components/core";
import { addDays } from "date-fns";
import { useAuth, useFetch } from "hooks";
import PanelLayout from "layouts/panel";
import moment from "moment";
import { useRef, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
interface MyDateRef {
	current: HTMLInputElement | null;
	setOpen: (value: boolean) => void;
}

const MyAttendance = () => {
	const [selectedDate, setSelectedDate] = useState(new Date());
	const [status, setStatus] = useState("all");
	const { user } = useAuth();
	const dateRef = useRef<MyDateRef>({
		current: null,
		setOpen: (value: boolean) => {},
	});
	function handleDateChange(date: any) {
		setSelectedDate(date);
	}
	const links =
		user?.role?.name == "CEO" || user?.role?.name == "HR"
			? [
					{ id: 1, page: "Attendances", link: "/admin/attendances" },
					{
						id: 2,
						page: "Datewise",
						link: "/admin/attendances/today",
					},
			  ]
			: [
					// {
					// 	id: 2,
					// 	page: "My Attendance",
					// 	link: "/admin/attendances/today",
					// },
			  ];
	const {
		data: attendance,
		isLoading,
		pagination,
		mutate,
	} = useFetch<any>(
		`attendances/${selectedDate.toISOString().slice(0, 10)}/${status}?${
			user?.id ? `&userId=${user?.id}` : ""
		}`
	);

	const tomorrow = addDays(new Date(), 1);
	const disabledDates = [];
	for (let i = 0; i < 365; i++) {
		disabledDates.push(addDays(tomorrow, i));
	}
	return (
		<PanelLayout title="Today Attendance - Admin Panel">
			<section className="px-8 py-4">
				<div className="mt-4 lg:flex justify-between">
					<AdminBreadcrumbs links={links} />
					<div className="lg:flex gap-4 items-center">
						{/* -----------------Date select section---------------- */}
						<div className="md:flex gap-3 items-center">
							{/* <ChevronLeftRounded /> */}
							<div className="tracking-wide flex gap-4 items-center font-semibold">
								{moment(selectedDate).format("ll")}
								<IconButton onClick={() => dateRef?.current?.setOpen(true)}>
									<InsertInvitationRounded className="!cursor-pointer" />
								</IconButton>
								<div className="">
									<DatePicker
										ref={dateRef as any}
										selected={selectedDate}
										onChange={handleDateChange}
										dateFormat="dd/MM/yyyy"
										// isClearable
										showYearDropdown
										excludeDates={disabledDates}
										className="hidden"
									/>
								</div>
							</div>
							{/* <ChevronRightRounded /> */}
						</div>
					</div>
				</div>

				<section>
					{isLoading ? (
						<Loader />
					) : (
						<>
							<AttendanceGrid data={attendance} mutate={mutate} />
						</>
					)}
					{attendance?.length === 0 ? <LoaderAnime /> : null}
				</section>
			</section>
		</PanelLayout>
	);
};

export default MyAttendance;
