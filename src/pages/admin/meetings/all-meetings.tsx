import {
	Add,
	ChevronLeftRounded,
	ChevronRightRounded,
	DateRange,
	GridViewRounded,
	InsertInvitationRounded,
	Search,
	Send,
	TableRowsRounded,
	Upload,
} from "@mui/icons-material";
import {
	Button,
	Card,
	IconButton,
	MenuItem,
	Modal,
	TextField,
} from "@mui/material";
import {
	EmployeesColumn,
	EmplyeesGrid,
	MeetingsColumn,
	MeetingsGrid,
} from "components/admin";
import { AdminBreadcrumbs } from "components/core";
import { UploadEmployData } from "components/dialogues";
import PanelLayout from "layouts/panel";
import moment from "moment";
import { useRef, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { DateRangePicker } from "materialui-daterange-picker";

const style = {
	position: "absolute" as "absolute",
	top: "50%",
	left: "50%",
	transform: "translate(-50%, -50%)",
	width: 600,
	// height: 600,
	bgcolor: "background.paper",
	// border: "2px solid #000",
	borderRadius: "10px",
	boxShadow: 24,
	p: 4,
};

const AllMeetings = () => {
	const dateRef = useRef<any>();
	const [dateRange, setDateRange] = useState({
		startDate: moment().toDate(),

		endDate: moment().toDate(),
	});

	const [open, setOpen] = useState(true);

	const [openInfoModal, setOpenInfoModal] = useState(false);
	const handleInfoOpen = () => {
		setOpenInfoModal(true);
	};
	const handleInfoCloseModal = () => setOpenInfoModal(false);

	const toggle = () => setOpen(!open);
	const [selectedDate, setSelectedDate] = useState<any>(new Date());
	const [isGrid, setIsGrid] = useState(true);
	const [isUpload, setIsUpload] = useState(false);
	const [value, setValue] = useState("Web Developer");
	const handleChange = (event: any) => {
		setValue(event.target.value);
	};
	function handleDateChange(date: any) {
		setSelectedDate(date);
		console.log(date);
	}
	return (
		<>
			<PanelLayout title="Meetings - Admin Panel">
				<section className="px-8">
					<Modal
						open={openInfoModal}
						onClose={handleInfoCloseModal}
						aria-labelledby="modal-modal-title"
						aria-describedby="modal-modal-description"
					>
						<Card
							sx={style}
							className="dashboard-card-shadow w-[50%] border-t-4 border-b-4 border-t-theme border-b-theme !p-6"
						>
							<p className="text-center text-lg font-semibold pb-2">
								Select Date Range
							</p>
							<DateRangePicker
								wrapperClassName="date-range-picker-wrapper"
								closeOnClickOutside={true}
								open={open}
								toggle={toggle}
								onChange={(range: any) => setDateRange(range)}
								// definedRanges={[
								// 	{ label: "Today", startDate: new Date(), endDate: new Date() },
								// 	{
								// 		label: "Yesterday",
								// 		startDate: moment().subtract(1, "day").toDate(),
								// 		endDate: moment().subtract(1, "day").toDate(),
								// 	},
								// 	{
								// 		label: "Last 7 Days",
								// 		startDate: moment().subtract(7, "days").toDate(),
								// 		endDate: moment().toDate(),
								// 	},
								// 	{
								// 		label: "Last 15 Days",
								// 		startDate: moment().subtract(15, "days").toDate(),
								// 		endDate: moment().toDate(),
								// 	},
								// 	{
								// 		label: "Last 30 Days",
								// 		startDate: moment().subtract(30, "days").toDate(),
								// 		endDate: moment().toDate(),
								// 	},
								// 	{
								// 		label: "This Month",
								// 		startDate: moment().startOf("month").toDate(),
								// 		endDate: moment().endOf("month").toDate(),
								// 	},
								// 	{
								// 		label: "Last Month",
								// 		startDate: moment()
								// 			.subtract(1, "month")
								// 			.startOf("month")
								// 			.toDate(),
								// 		endDate: moment()
								// 			.subtract(1, "month")
								// 			.endOf("month")
								// 			.toDate(),
								// 	},
								// 	{
								// 		label: "Last 365 Days",
								// 		startDate: moment().subtract(365, "days").toDate(),
								// 		endDate: moment().toDate(),
								// 	},
								// ]}
							/>
							<div className="flex justify-end mt-3 ">
								<Button
									endIcon={<Send />}
									variant="contained"
									className="!bg-emerald-500 hover:scale-95 transition duration-200"
								>
									Submit
								</Button>
							</div>
						</Card>
					</Modal>

					<UploadEmployData
						open={isUpload}
						handleClose={() => setIsUpload(false)}
					/>
					<div className="flex justify-between items-center py-4">
						<AdminBreadcrumbs links={links} />
						<div className="flex gap-4 items-center">
							<div className="flex gap-1">
								<IconButton onClick={() => setIsGrid(true)} size="small">
									<div
										className={` p-2 rounded-md grid place-items-center transition-all ease-in-out duration-500 ${
											isGrid && `border-2 border-theme`
										}`}
									>
										<GridViewRounded className={`${isGrid && `!text-theme`}`} />
									</div>
								</IconButton>
								<IconButton onClick={() => setIsGrid(false)} size="small">
									<div
										className={` p-2 rounded-md grid place-items-center transition-all ease-in-out duration-500 ${
											!isGrid && `border-2 border-theme`
										}`}
									>
										<TableRowsRounded
											className={`${!isGrid && `!text-theme`}`}
										/>
									</div>
								</IconButton>
							</div>
							<div className="flex gap-3 items-center">
								<ChevronLeftRounded />
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
											className="hidden"
										/>
									</div>
								</div>
								<ChevronRightRounded />
							</div>
						</div>
					</div>
					<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
						<TextField
							fullWidth
							size="small"
							id="employeeName"
							placeholder="Employee Name"
							name="employeeName"
						/>
						<TextField
							fullWidth
							select
							label="Select Status"
							size="small"
							value={value}
							onChange={handleChange}
						>
							{status.map((option) => (
								<MenuItem key={option.id} value={option.value}>
									{option.value}
								</MenuItem>
							))}
						</TextField>
						<TextField
							fullWidth
							size="small"
							id="date"
							placeholder="Select Date"
							name="date"
							type="date"
						/>
						<Button
							onClick={() => handleInfoOpen()}
							fullWidth
							startIcon={<DateRange />}
							variant="contained"
							className="!bg-theme"
						>
							Select Date Range
						</Button>
						<Button
							fullWidth
							startIcon={<Search />}
							variant="contained"
							className="!bg-theme"
						>
							Search
						</Button>
					</div>

					{isGrid ? <MeetingsGrid /> : <MeetingsColumn />}
				</section>
			</PanelLayout>
		</>
	);
};

export default AllMeetings;

const status = [
	{ id: 1, value: "Completed" },
	{ id: 2, value: "On Progress" },
	{ id: 3, value: "Cancelled" },
];

const links = [
	{ id: 1, page: "Meetings", link: "/admin/meetings" },
	{ id: 2, page: "All Meetings", link: "/admin/meetings/all-meetings" },
];
