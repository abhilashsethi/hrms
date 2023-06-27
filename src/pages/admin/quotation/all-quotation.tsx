import { Close, FilterListRounded, Send } from "@mui/icons-material";
import {
	Button,
	Card,
	IconButton,
	Modal,
	TextField,
	Tooltip,
} from "@mui/material";
import { QuotationGrid } from "components/admin/quotation";
import { AdminBreadcrumbs, LoaderAnime } from "components/core";
import { UploadEmployData } from "components/dialogues";
import { useFetch } from "hooks";
import PanelLayout from "layouts/panel";
import { DateRangePicker } from "materialui-daterange-picker";
import moment from "moment";
import { useRef, useState } from "react";
import "react-datepicker/dist/react-datepicker.css";

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

const AllQuotation = () => {
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
	}

	const [meetingPerson, setMeetingPerson] = useState<string | null>(null);
	const [meetingStatus, setMeetingStatus] = useState<string | null>(null);
	const [selectDate, setSelectDate] = useState<string | null>(null);
	const {
		data: meetingData,
		mutate,
		isLoading,
	} = useFetch<any>(
		`meetings?page=${pageNumber}&limit=8${
			meetingPerson ? `&meetingPersonName=${meetingPerson}` : ""
		}${meetingStatus ? `&status=${meetingStatus}` : ""}${
			selectDate ? `&date=${selectDate}` : ""
		}${currentRange?.startDate ? `&startDate=${currentRange?.startDate}` : ""}${
			currentRange?.endDate ? `&endDate=${currentRange?.endDate}` : ""
		}`
	);
	console.log(currentRange);
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

					<UploadEmployData
						open={isUpload}
						handleClose={() => setIsUpload(false)}
					/>
					<div className="flex justify-between items-center py-4">
						<AdminBreadcrumbs links={links} />
						{/* <div className="flex gap-4 items-center">
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
						</div> */}
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
									setMeetingPerson(null);
								}}
							>
								<Tooltip
									title={
										selectDate != null ||
										meetingStatus != null ||
										meetingPerson != null
											? `Remove Filters`
											: `Filter`
									}
								>
									{selectDate != null ||
									meetingStatus != null ||
									meetingPerson != null ? (
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
								id="quotationNumber"
								placeholder="Quotation Number"
								value={meetingPerson ? meetingPerson : null}
								name="quotationNumber"
								onChange={(e) => setMeetingPerson(e.target.value)}
							/>

							<TextField
								fullWidth
								size="small"
								id="clientName"
								placeholder="Client Name"
								value={meetingPerson ? meetingPerson : null}
								name="clientName"
								onChange={(e) => setMeetingPerson(e.target.value)}
							/>

							<TextField
								fullWidth
								size="small"
								id="clientName"
								placeholder="Client Name"
								value={meetingPerson ? meetingPerson : null}
								name="clientName"
								onChange={(e) => setMeetingPerson(e.target.value)}
							/>
						</div>
					</div>
					<QuotationGrid data={meetingData?.meetings} mutate={mutate} />
					{/* {isGrid ? (
						<>
							{isLoading && <SkeletonLoader />}
							<QuotationGrid data={meetingData?.meetings} mutate={mutate} />
						</>
					) : (
						<>
							{isLoading && <Loader />}
							<QuotationColumn data={meetingData?.meetings} mutate={mutate} />
						</>
					)} */}
					{meetingData?.meetings?.length === 0 ? (
						<LoaderAnime text="No Meetings Available" />
					) : null}
				</section>
			</PanelLayout>
		</>
	);
};

export default AllQuotation;

const status = [
	{ id: 1, value: "Ongoing" },
	{ id: 2, value: "InPipeline" },
	{ id: 3, value: "QuotationSent" },
	{ id: 3, value: "Closed" },
];

const links = [
	{ id: 1, page: "Quotation", link: "/admin/quotation" },
	{ id: 2, page: "All Quotation", link: "/admin/quotation/all-quotation" },
];