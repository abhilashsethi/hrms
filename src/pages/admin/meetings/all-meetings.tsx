import {
	Close,
	DateRange as DateRangeIcon,
	FilterListRounded,
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
	Pagination,
	Stack,
	TextField,
	Tooltip,
} from "@mui/material";
import { MeetingsColumn, MeetingsGrid } from "components/admin";
import {
	AdminBreadcrumbs,
	Loader,
	LoaderAnime,
	SkeletonLoader,
} from "components/core";
import { UploadEmployData } from "components/dialogues";
import PanelLayout from "layouts/panel";
import moment from "moment";
import { useRef, useState } from "react";
import "react-datepicker/dist/react-datepicker.css";
import { DateRangePicker } from "materialui-daterange-picker";
import { useFetch } from "hooks";
import { MEETING_DATA, MeetingTypes } from "types";
import { DateRange } from "@fullcalendar/core/internal";

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
	const [pageNumber, setPageNumber] = useState<number>(1);
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
	const [isGrid, setIsGrid] = useState(true);

	const [meetingPerson, setMeetingPerson] = useState<string | null>("");
	const [meetingStatus, setMeetingStatus] = useState<string | null>(null);
	const [selectDate, setSelectDate] = useState<string | null>(null);
	const {
		data: meetingData,
		mutate,
		isLoading,
		pagination,
	} = useFetch<MEETING_DATA[]>(
		`meetings?page=${pageNumber}&limit=6${
			meetingPerson ? `&meetingPersonName=${meetingPerson}` : ""
		}${meetingStatus ? `&status=${meetingStatus}` : ""}${
			selectDate ? `&date=${selectDate}` : ""
		}${currentRange?.startDate ? `&startDate=${currentRange?.startDate}` : ""}${
			currentRange?.endDate ? `&endDate=${currentRange?.endDate}` : ""
		}&orderBy=createdAt=asc`
	);
	console.log(meetingData);
	// console.log(currentRange);
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
								onChange={(range) =>
									range.endDate &&
									range.startDate &&
									setDateRange({
										endDate: range.endDate,
										startDate: range.startDate,
									})
								}
							/>
							<div className="flex justify-end mt-3 ">
								<Button
									endIcon={<Send />}
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
					<div className="md:flex gap-4 justify-between w-full py-2">
						<div
							className={`w-10 h-10 flex justify-center items-center rounded-md shadow-lg bg-theme
                `}
						>
							<IconButton
								onClick={() => {
									setSelectDate(null);
									setMeetingStatus(null);
									setMeetingPerson("");
								}}
							>
								<Tooltip
									title={
										selectDate != null ||
										meetingStatus != null ||
										meetingPerson != ""
											? `Remove Filters`
											: `Filter`
									}
								>
									{selectDate != null ||
									meetingStatus != null ||
									meetingPerson != "" ? (
										<Close className={"!text-white"} />
									) : (
										<FilterListRounded className={"!text-white"} />
									)}
								</Tooltip>
							</IconButton>
						</div>
						<div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
							<TextField
								fullWidth
								size="small"
								id="meetingPerson"
								placeholder="Member Name"
								value={meetingPerson ? meetingPerson : ""}
								name="meetingPerson"
								onChange={(e) => setMeetingPerson(e.target.value)}
							/>
							<TextField
								fullWidth
								select
								label="Select Status"
								size="small"
								value={meetingStatus ? meetingStatus : null}
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
								value={
									selectDate ? moment(selectDate).format("YYYY-MM-DD") : null
								}
								onChange={(e) => {
									setSelectDate(new Date(e.target.value).toISOString());
								}}
							/>
						</div>
					</div>

					{isGrid ? (
						<>
							{isLoading && <SkeletonLoader />}
							<MeetingsGrid data={meetingData} mutate={mutate} />
						</>
					) : (
						<>
							{isLoading && <Loader />}
							<MeetingsColumn data={meetingData} mutate={mutate} />
						</>
					)}
					{meetingData?.length === 0 ? (
						<LoaderAnime text="No Meetings Available" />
					) : null}
					{meetingData?.length === 0 ? <LoaderAnime /> : null}
					<section className="mb-6">
						{Math.ceil(
							Number(pagination?.total || 1) / Number(pagination?.limit || 1)
						) > 1 ? (
							<div className="flex justify-center md:py-8 py-4">
								<Stack spacing={2}>
									<Pagination
										count={Math.ceil(
											Number(pagination?.total || 1) /
												Number(pagination?.limit || 1)
										)}
										onChange={(e, v: number) => {
											setPageNumber(v);
										}}
										page={pageNumber}
										variant="outlined"
									/>
								</Stack>
							</div>
						) : null}
					</section>
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
