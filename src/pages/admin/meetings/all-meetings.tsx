import {
	DateRange,
	GridViewRounded,
	Send,
	TableRowsRounded,
} from "@mui/icons-material";
import {
	Button,
	Card,
	IconButton,
	MenuItem,
	Modal,
	TextField,
} from "@mui/material";
import { MeetingsColumn, MeetingsGrid } from "components/admin";
import {
	AdminBreadcrumbs,
	FiltersContainer,
	Loader,
	SkeletonLoader,
} from "components/core";
import { UploadEmployData } from "components/dialogues";
import PanelLayout from "layouts/panel";
import moment from "moment";
import { useRef, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { DateRangePicker } from "materialui-daterange-picker";
import { useFetch } from "hooks";
import { MeetingTypes } from "types";

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
	const [currentRange, setcurrentRange] = useState<{
		startDate?: string | null;
		endDate?: string | null;
	}>({
		startDate: null,
		endDate: null,
	});
	const dateRef = useRef<any>();
	const [pageNumber, setPageNumber] = useState<number | null>(1);
	const [dateRange, setDateRange] = useState({
		startDate: moment().toDate(),

		endDate: moment().toDate(),
	});
	console.log(new Date(dateRange.startDate).toISOString());
	console.log(new Date(dateRange.endDate).toISOString());

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

	const [meetingPerson, setMeetingPerson] = useState<string | null>(null);
	const [meetingStatus, setMeetingStatus] = useState<string | null>(null);
	const [selectDate, setSelectDate] = useState<string | null>(null);
	const {
		data: meetingData,
		mutate,
		isLoading,
	} = useFetch<MeetingTypes>(
		`meetings?page=${pageNumber}&limit=8${
			meetingPerson ? `&meetingPersonName=${meetingPerson}` : ""
		}${meetingStatus ? `&status=${meetingStatus}` : ""}${
			selectDate ? `&date=${selectDate}` : ""
		}${currentRange?.startDate ? `&startDate=${currentRange?.startDate}` : ""}${
			currentRange?.endDate ? `&endDate=${currentRange?.endDate}` : ""
		}`
	);
	console.log(meetingData);

	// console.log(currentRange?.startDate);

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
							className="dashboard-card-shadow w-[60%] border-t-4 border-b-4 border-t-theme border-b-theme !p-6"
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
									// disabled={!currentRange?.startDate || !currentRange?.endDate}
									variant="contained"
									className="!bg-emerald-500 hover:scale-95 transition duration-200"
									onClick={() => {
										setcurrentRange({
											startDate: new Date(dateRange.startDate).toISOString(),
											endDate: new Date(dateRange.endDate).toISOString(),
										});
										handleInfoCloseModal();
									}}
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
						</div>
					</div>
					<FiltersContainer>
						<div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
							<TextField
								fullWidth
								size="small"
								id="employeeName"
								placeholder="Member Name"
								name="employeeName"
								onChange={(e) => setMeetingPerson(e.target.value)}
							/>
							<TextField
								fullWidth
								select
								label="Select Status"
								size="small"
								value={meetingStatus}
								onChange={(e) => setMeetingStatus(e?.target?.value)}
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
								value={moment(selectDate).format("YYYY-MM-DD")}
								onChange={(e) => {
									setSelectDate(new Date(e.target.value).toISOString());
									console.log(new Date(e.target.value).toISOString());
								}}
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
						</div>
					</FiltersContainer>

					{/* {isGrid ? (
						<MeetingsGrid data={meetingData?.meetings} mutate={mutate} />
					) : (
						<MeetingsColumn />
					)} */}

					{isGrid ? (
						<>
							{isLoading && <SkeletonLoader />}
							<MeetingsGrid data={meetingData?.meetings} mutate={mutate} />
						</>
					) : (
						<>
							{isLoading && <Loader />}
							<MeetingsColumn data={meetingData?.meetings} mutate={mutate} />
						</>
					)}
				</section>
			</PanelLayout>
		</>
	);
};

export default AllMeetings;

const status = [
	{ id: 1, value: "Ongoing" },
	{ id: 2, value: "InPipeline" },
	{ id: 3, value: "QuotationSent" },
	{ id: 3, value: "Closed" },
];

const links = [
	{ id: 1, page: "Meetings", link: "/admin/meetings" },
	{ id: 2, page: "All Meetings", link: "/admin/meetings/all-meetings" },
];
