import {
	Close,
	FilterListRounded,
	InsertInvitationRounded,
} from "@mui/icons-material";
import {
	IconButton,
	MenuItem,
	Pagination,
	Stack,
	TextField,
	Tooltip,
} from "@mui/material";
import { AttendanceGrid, AttendanceList } from "components/admin/attendance";
import {
	AdminBreadcrumbs,
	GridAndList,
	Loader,
	LoaderAnime,
} from "components/core";
import { addDays } from "date-fns";
import { useAuth, useFetch } from "hooks";
import PanelLayout from "layouts/panel";
import moment from "moment";
import { useRef, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const MyAttendance = () => {
	const [isGrid, setIsGrid] = useState(true);
	const [pageNumber, setPageNumber] = useState<number>(1);
	const [selectedDate, setSelectedDate] = useState<any>(new Date());
	const [status, setStatus] = useState("all");
	const [order, setOrder] = useState<string | null>(null);
	const [userName, setUsername] = useState<string | null>(null);
	const [empId, setEmpId] = useState<string | null>(null);
	const { user } = useAuth();
	const dateRef = useRef<any>();
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
					{
						id: 2,
						page: "My Attendance",
						link: "/admin/attendances/today",
					},
			  ];
	const {
		data: attendance,
		isLoading,
		pagination,
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
								<IconButton onClick={() => dateRef.current.setOpen(true)}>
									<InsertInvitationRounded className="!cursor-pointer" />
								</IconButton>
								<div className="">
									<DatePicker
										ref={dateRef}
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
							<AttendanceGrid data={attendance} />
						</>
					)}
					{attendance?.length === 0 ? <LoaderAnime /> : null}
				</section>
			</section>
		</PanelLayout>
	);
};

export default MyAttendance;