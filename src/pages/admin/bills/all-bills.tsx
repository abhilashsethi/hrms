import { Close, FilterListRounded } from "@mui/icons-material";
import { IconButton, MenuItem, TextField, Tooltip } from "@mui/material";
import { BillGrid } from "components/admin/bills";
import { AdminBreadcrumbs, LoaderAnime } from "components/core";
import { useFetch } from "hooks";
import PanelLayout from "layouts/panel";
import moment from "moment";
import { useState } from "react";
import "react-datepicker/dist/react-datepicker.css";
import { Quotation } from "types";

const AllBills = () => {
	const [pageNumber, setPageNumber] = useState<number | null>(1);
	const [open, setOpen] = useState(true);
	const [meetingPerson, setMeetingPerson] = useState<string | null>(null);
	const [meetingStatus, setMeetingStatus] = useState<string | null>(null);
	const [selectDate, setSelectDate] = useState<string | null>(null);
	const {
		data: quotationData,
		mutate,
		isLoading,
	} = useFetch<Quotation[]>(`quotations?page=${pageNumber}&limit=8`);
	console.log(quotationData);
	return (
		<>
			<PanelLayout title="Bills - Admin Panel">
				<section className="px-8">
					<div className="flex justify-between items-center py-4">
						<AdminBreadcrumbs links={links} />
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
						<div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
							<TextField
								fullWidth
								size="small"
								id="invoiceNumber"
								placeholder="Invoice Number"
								value={meetingPerson ? meetingPerson : null}
								name="invoiceNumber"
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
								select
								label="Bill Type"
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
					{quotationData?.length ? (
						<BillGrid data={quotationData} mutate={mutate} />
					) : (
						<LoaderAnime text="No data" />
					)}
				</section>
			</PanelLayout>
		</>
	);
};

export default AllBills;

const status = [
	{ id: 1, value: "Unpaid" },
	{ id: 2, value: "Advance" },
	{ id: 3, value: "Paid" },
];

const links = [
	{ id: 1, page: "Bills", link: "/admin/bills" },
	{ id: 2, page: "All Bills", link: "/admin/bills/all-bills" },
];
